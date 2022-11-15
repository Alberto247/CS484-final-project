const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const fetch = require("node-fetch")

export const handler = async (event, context, callback) => {
	//sneaks API
	let ret = [];
	let i=1;
	if(event!=undefined && event.queryStringParameters!=undefined){
		i = event.queryStringParameters.page;
	}
	console.log(i)
	sneaks.getMostPopular(16*i, function(err, products){
		ret = products.slice(-16)
	})
	while(ret==undefined){
		await new Promise(r => setTimeout(r, 100));
	}

	//klekt

	const data = await (await fetch("https://www.klekt.com/brands")).text();
	let api_path = data.split('/_buildManifest.js" defer=""></script>')[0].split('<script src="/_next/static/');
	api_path = api_path[api_path.length - 1]
	const api = "https://www.klekt.com/_next/data/"+api_path+"/eu/list.json?category=brands&categories=brands&page="+i
	let unparsed = await(await fetch(api)).json();
	unparsed = unparsed["pageProps"]["plpData"]["data"]["search"]["items"]
	unparsed.forEach((e)=>{
		let newElem = {"productId":e.productId, "shoeName":e.productName, "brand": e.categoryNames.length>0?e.categoryNames[0]:"", "thumbnail":e.productAsset.preview, "description":e.description, "lowestResellPrice":{"klekt":e.priceWithTax.min/100}, "resellLinks":{"klekt":"https://www.klekt.com/product/"+e.slug}};
		ret.push(newElem);
	})

	return {
		statusCode: 200,
		body: JSON.stringify({
			products: ret
		}),
		headers: {
			'Allow-Access-Control-Origin': '*'
		}
	};
	
}



