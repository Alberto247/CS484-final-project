import eBayApi from 'ebay-api';

export const handler = async () => {

    const eBay = new eBayApi({
    appId: '-- also called Client ID --',
    certId: '-- also called Client Secret --',
    sandbox: false
    });
    

    eBay.buy.browse.search({
    q: 'sneakers',
    })
    .then(result => {
        ret = result
    })
    .catch(e => {
        console.log(e);
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            products: ret
        })
    };

}