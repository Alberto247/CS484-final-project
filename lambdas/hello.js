const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

export const handler = async () => {
	//getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
	sneaks.getMostPopular(10, function(err, products){
		if(err) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: 'Error!'
				})
			};
		}
		else {
			return {
				statusCode: 200,
				body: JSON.stringify({
					sneakers: products
				})
			};
		}
	});
	
}



