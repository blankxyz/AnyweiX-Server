const getResult = require('../api/wx.js')

const router = function (app) {

	app.get('/', (req, res, next) => {
		var options = {
			root: __dirname + '/../pages/',
			dotfiles: 'deny',
			headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
			}
		};
		res.sendFile('welcome.html', options, function(err) {
			if (err) {
				next(err)
			}
		})
	})

	// API 路由
	app.get('/api', (req, res) => {
		getResult(req.query, (data) => {
			if(data.data === []) {
				res.status(200).send({
					"isSucceeded": true,
					"data": {
						"message": "NO_RESULT"
					}
				})
			} else {
				res.status(200).send(data)
			}
		})
	})

	// TODO: 视图路由
	app.get('/view', (req, res) => {

	});

}

module.exports = router
