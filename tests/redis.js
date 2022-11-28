const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const fetch = require("node-fetch")
const Redis = require("ioredis");

const handler = async (event, context, callback) => {

	let redis_password = process.env.REDIS_PASSWORD;
    let client=undefined;
	if(redis_password!=undefined){
        try{
		    client = new Redis("redis://default:"+redis_password+"@us1-key-cow-39211.upstash.io:39211");
            const data = await client.get("most_popular");
            if(data!=null){
                const parsedData=JSON.parse(data);
                const now = Math.floor(Date.now() / 1000);
                if(now<parsedData["time"]+60*10){
                    let oldRet=parsedData["data"];
                    console.log("Getting data from redis as it is not stale yet");
					await client.quit();
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            products: oldRet,
                            cached: true
                        }),
						headers: {
							'Access-Control-Allow-Origin': '*'
						}
                    };
                }
            }
        } catch (err){
            console.error(err);
        }
	}else{
		console.error("REDIS_PASSWORD env variable not found, disabling cache.");
	}
	
	let ret = undefined;
	
	//sneaks API
	sneaks.getMostPopular(14, function(err, products) { 
		if(products) {
			ret = products;
		}
		else 
			ret = [];
	});

	while(ret === undefined){
		await new Promise(r => setTimeout(r, 100));
	}
	console.log(ret.length);

	//klekt
	const data = await (await fetch("https://www.klekt.com/brands")).text();
	let api_path = data.split('/_buildManifest.js" defer=""></script>')[0].split('<script src="/_next/static/');
	api_path = api_path[api_path.length - 1]
	const api = "https://www.klekt.com/_next/data/"+api_path+"/eu/list.json?category=brands&categories=brands&page=1"
	let unparsed = await (await fetch(api)).json();
	if(unparsed) {
		unparsed = unparsed["pageProps"]["plpData"]["data"]["search"]["items"];
		unparsed.forEach((e) => {
			let newElem = {"_id":e.productId, "shoeName":e.productName, "brand": e.brandNames?.length>0?e.brandNames[0]:"", "thumbnail":e.productAsset?.preview, "description":e.description, "lowestResellPrice":{"klekt":e.priceWithTax.min/100}, "resellLinks":{"klekt":"https://www.klekt.com/product/"+e.slug}};
			ret.push(newElem);
		});
	}

    if(client!=undefined){
        client.set("most_popular", JSON.stringify({time:Math.floor(Date.now() / 1000), data:ret}), "ex", 60*10);
		await client.quit();
    }

	return {
		statusCode: 200,
		body: JSON.stringify({
			products: ret,
            cached: false
		}),
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	};
	
}

handler().then((r)=>{
    console.log(r);
});



