const fetch = require("node-fetch")
handler = async () => {
	//getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
	let ret = undefined;
	const data = await (await fetch("https://www.klekt.com/brands")).text();
	let api_path = data.split('/_buildManifest.js" defer=""></script>')[0].split('<script src="/_next/static/');
	api_path = api_path[api_path.length - 1]
	const api = "https://www.klekt.com/_next/data/"+api_path+"/eu/list.json?category=brands&categories=brands&nextInternalLocale=eu"
	let unparsed = await(await fetch(api)).json();
	unparsed = unparsed["pageProps"]["plpData"]["data"]["search"]["items"]
	ret = []
	unparsed.forEach((e)=>{
		let newElem = {"productId":e.productId, "shoeName":e.productName, "brand": e.categoryNames.length>0?e.categoryNames[0]:"", "thumbnail":e.productAsset.preview, "description":e.description, lowestResellPrice:{"klekt":e.priceWithTax.min/100}, resellLinks:{"klekt":"https://www.klekt.com/product/"+e.slug}};
		ret.push(newElem);
	})
	return {
		statusCode: 200,
		body: JSON.stringify({
			products: ret
		})
	};
	
}



handler()