const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

export const handler = async () => {
	//getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
	let ret = undefined;
	await sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
		ret = products
	})
	while(ret==undefined){
		await new Promise(r => setTimeout(r, 100));
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: ret
		})
	};
	
}



