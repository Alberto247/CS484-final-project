import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://otbiiqvlokfkqkyekqlm.supabase.co', process.env.SERVER_API_KEY_SUPABASE);
const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

const getGmailService = () => {
    const client_secret = process.env.CLIENT_SECRET;
    const client_id = process.env.CLIENT_ID;
    const redirect_uris = process.env.REDIRECT_URIS;
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

const checkThreshold = async () => {
    //retrieve of favorite shoes
    const { data, error } = await supabase.from('preferred_shoes').select(`productInfo, productId, threshold`);
    if (error) {
        console.log(error);
        throw error;
    }

    for (let i = 0; i < data.length; i++) {
        const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page=1&search=' + encodeURIComponent(data[i].productInfo.shoeName));
        const product = await response.json();
        if (response.ok) {
            let res = product.products.filter((e) => { e.shoeName === data[i].productInfo.shoeName })[0];
            const x = Object.keys(res.lowestResellPrice);
            for (let j = 0; j < x.length; j++)
                if (res.lowestResellPrice[x[j]] <= data[i].threashold) {
                    const fileAttachments = [];

                    const options = {
                        to: 'davide.porello29@gmail.com',
                        cc: '',
                        replyTo: 'davide.porello29@gmail.com',
                        subject: 'Helo',
                        text: 'This email is sent from the command line',
                        html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> </p>`,
                        attachments: fileAttachments,
                        textEncoding: 'base64',
                        headers: [
                            { key: 'X-Application-Developer', value: 'Amit Agarwal' },
                            { key: 'X-Application-Version', value: 'v1.0.0.2' },
                        ],
                    };

                    const messageId = await sendMail(options);
                    break;
                }
        }
    }
}

