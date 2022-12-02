require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://otbiiqvlokfkqkyekqlm.supabase.co', process.env.SERVER_API_KEY_SUPABASE);
const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');
const { schedule } = require("@netlify/functions");
const fetch = require("node-fetch")


const getGmailService = () => {
    const client_secret = process.env.CLIENT_SECRET;
    const client_id = process.env.CLIENT_ID;
    const redirect_uris = ["http://localhost"];
    const tokens = {
        "access_token": process.env.ACCESS_TOKEN,
        "refresh_token": process.env.REFRESH_TOKEN,
        "scope": "https://www.googleapis.com/auth/gmail.send",
        "token_type": "Bearer",
        "expiry_date": 1669678149255
    }
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(tokens);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    return gmail;
};

const encodeMessage = (message) => {
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
};

const sendMail = async (options) => {
    const gmail = getGmailService();
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
        userId: 'me',
        resource: {
            raw: rawMessage,
        },
    });
    return id;
};

const checkPrice = async (shoe, users) => {
    try {
        const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page=1&search=' + encodeURIComponent(shoe.productInfo.shoeName));
        const product = await response.json();
        if (response.ok) {
            let res = product.products.filter((e) => { return e.shoeName === shoe.productInfo.shoeName })[0];
            const x = Object.keys(res.lowestResellPrice);
            for (let j = 0; j < x.length; j++) {
                if (res.lowestResellPrice[x[j]] <= shoe.threshold) {
                    const { _, err } = await supabase.from('preferred_shoes').update({ threshold: null }).eq('id', shoe.id);
                    //const err=null;
                    if (err) {
                        console.error(err);
                        return;
                    }


                    const email = users.filter((e) => e.id === shoe.user_id)[0].email;
                    const fileAttachments = [];
                    const uri = 'https://sneakerscanner.shop/#/view/' + encodeURIComponent(shoe.productInfo.shoeName);
                    const options = {
                        to: email,
                        cc: '',
                        subject: shoe.productInfo.shoeName + '\'s price is low!',
                        text: 'We have detected that ' + shoe.productInfo.shoeName + '\'s price is lower than what you asked us to watch for!',
                        html: `<h1>Buy now your shoes!</h1>
                            <p>We have detected that <a href=${uri}>${shoe.productInfo.shoeName}'\'s</a> price is lower than what you asked us to watch for!<br>
                            <img src="${shoe.productInfo.thumbnail}"></img></p>`,

                        attachments: fileAttachments,
                        textEncoding: 'base64',
                        headers: [
                            { key: 'X-Application-Developer', value: 'Pizza Pasta Mandolino' },
                            { key: 'X-Application-Version', value: 'v1.0' },
                        ],
                    };
                    console.log("Email sent to " + email);
                    const messageId = await sendMail(options);
                    break;
                }
            }
        }else{
            console.error(response);
        }
    } catch (err) {
        console.error("Error in handle shoe", err)
        try{
            const { _, err } = await supabase.from('preferred_shoes').update({ threshold: null }).eq('id', shoe.id);
        } catch(err2) {
            console.log("Cannot set shoe back to null", err2);
        }
    }
}

const checkThreshold = async () => {
    //retrieve of favorite shoes
    const { data, error } = await supabase.from('preferred_shoes').select(`id, user_id, productInfo, productId, threshold`).not('threshold', "is", "null").order('last_controlled_at', { ascending: true }).limit(20);
    if (error) {
        console.log(error);
        throw error;
    }
    const updates = []
    for (let i = 0; i < data.length; i++)
        updates.push(supabase.from("preferred_shoes").update({ last_controlled_at: Math.floor(Date.now() / 1000) }).eq('id', data[i].id));

    console.log("Checking " + data.length + " shoes");
    const res = await supabase.from('users').select();
    const users = res.data;
    const error2 = res.error;
    if (error2) {
        console.log(error2);
        throw error2;
    }
    const promises = []
    for (let i = 0; i < data.length; i++) {
        promises.push(checkPrice(data[i], users)); //The majority of the time is asyncronous waiting for fetch results. Avoiding waiting here speeds up everything by a lot.
    }
    await Promise.all(promises); //And then we wait all fetches together
    await Promise.all(updates); //This improves a little
}

const handler = async function (event, context) {
    await checkThreshold();
    return {
        statusCode: 200,
    };
};
//handler().then((e) => { console.log(e) });
exports.handler = schedule("*/10 * * * *", handler);