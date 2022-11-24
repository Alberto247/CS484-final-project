const eBayApi = require('ebay-api');

const handler = async () => {

    const eBay = new eBayApi({
    appId: 'DaivideP-SneakerS-SBX-ea27d63e4-590d5e99',
    certId: 'SBX-a27d63e48ec7-1833-453c-b948-a50e',
    sandbox: true
    });

    let ret=await eBay.buy.browse.search({
        q: 'sneakers',
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            products: ret
        })
    };

}

handler().then((e)=>{console.log(e)})