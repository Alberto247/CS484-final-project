const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const fetch = require("node-fetch")
const Redis = require("ioredis");
var crypto = require('crypto')
const handler = async (event, context, callback) => {

	let ret = undefined;
	let i=1;
	let s="";
	if(event!=undefined && event.queryStringParameters!=undefined){
		i = event.queryStringParameters.page;
		s = event.queryStringParameters.search;
	}

	let redis_password = process.env.REDIS_PASSWORD;
    let client = undefined;
	if(redis_password!=undefined) {
        try {
		    client = new Redis("redis://default:"+redis_password+"@us1-key-cow-39211.upstash.io:39211");
            const data = await client.get("search="+s+"&page="+i);
            if(data!=null){
                const parsedData = JSON.parse(data);
                const now = Math.floor(Date.now() / 1000);
                if(now<parsedData["time"]+60*10){
                    const oldRet = parsedData["data"];
					const over = parsedData["end"];
                    console.log("Getting data from redis as it is not stale yet");
					await client.quit();
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            products: oldRet,
                            cached: true,
							end: over
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
	let sneaksOver=false;
	//sneaks API
	sneaks.getProducts(s, 14*i+1, function(err, products){
		if(products) {
			console.log(products.length, 14*i-14,14*i)
			ret = products.slice(14*i-14,14*i);
			if(products.length!==14*i+1){
				sneaksOver=true;
			}
		}
		else
			ret = [];
	});
	

	while(ret === undefined) {
		await new Promise(r => setTimeout(r, 100));
	}
	

	//klekt
	const data = await (await fetch("https://www.klekt.com/brands")).text();
	let api_path = data.split('/_buildManifest.js" defer=""></script>')[0].split('<script src="/_next/static/');
	api_path = api_path[api_path.length - 1]
	const api = "https://www.klekt.com/_next/data/"+api_path+"/eu/list.json?category=brands&categories=brands&page="+i+"&search="+s
	let unparsed = await(await fetch(api)).json();
	if(unparsed) {
		unparsed = unparsed["pageProps"]["plpData"]["data"]["search"]["items"];
		unparsed.forEach((e) => {
			let newElem = {"_id":e.productId, "shoeName":e.productName, "brand": e.brandNames?.length>0?e.brandNames[0]:"", "thumbnail":e.productAsset?.preview, "description":e.description, "lowestResellPrice":{"klekt":e.priceWithTax.min/100}, "resellLinks":{"klekt":"https://www.klekt.com/product/"+e.slug}};
			ret.push(newElem);
		});
	}
	let klektOver=false;
	if(unparsed.length!==16){
		klektOver=true;
	}else{
		const api2 = "https://www.klekt.com/_next/data/"+api_path+"/eu/list.json?category=brands&categories=brands&page="+i+"&search="+s
		let unparsed2 = await(await fetch(api2)).json();
		unparsed2 = unparsed2["pageProps"]["plpData"]["data"]["search"]["items"];
		if(unparsed2.length===0){
			klektOver=true;
		}
	}

	const newRet=[];
	for(let e of ret){
		tmp=crypto.createHash('sha256').update(e.shoeName).digest('hex');
		e["_id"]=tmp;
		// console.log(e)
		newRet.push({"_id":tmp, "shoeName":e.shoeName, "brand": e.brand, "thumbnail":e.thumbnail, "description":e.description, "lowestResellPrice":e.lowestResellPrice, "resellLinks":e.resellLinks})
	}

	const over = sneaksOver && klektOver;
	if(client!=undefined){
        client.set("search="+s+"&page="+i, JSON.stringify({time:Math.floor(Date.now() / 1000), data: newRet, end: over}), "ex", 60*10);
		await client.quit();
    }
	
	return {
		statusCode: 200,
		body: JSON.stringify({
			products: newRet,
			cached: false,
			end: over
		}),
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	};
	
}

handler().then((e)=>{console.log(e)})