const request = require('request')

const BASE_URL = 'https://private-anon-8b9b2a44ff-spectrocoin.apiary-mock.com'
const GET_ACCESS_TOKEN = '/api/r/oauth2/auth'
const REFRESH_ACCESS_TOKEN = '/api/r/oauth2/refresh'
const SEND_MONEY = '/api/r/wallet/send/'
const GET_ADDRESS = '/api/r/wallet/deposit/'
const CALCULATE_BUY_ORDER = '/api/r/wallet/exchange/calculate/buy'
const EXCHANGE_BUY_ORDER = '/api/r/wallet/exchange/buy'
const CALCULATE_SELL_ORDER = '/api/r/wallet/exchange/calculate/sell'
const EXCHANGE_SELL_ORDER = '/api/r/wallet/exchange/sell'
const ACCOUNTS_INFO = '/api/r/wallet/accounts'
const HISTORY = '/api/r/wallet/account/'


function SpectroCoin() {

	let data = {
		clientId: '',
		clientSecret: '',
		version: '',
		scope: '',
		accessToken: '',
		refreshToken: ''
	}

	this.getAccessToken = (clientId, clientSecret, version, scope, done) => {

		request({
			method: 'POST',
  			url: BASE_URL + GET_ACCESS_TOKEN,
  			headers: { 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				client_id: clientId,
  				client_secret: clientSecret,
  				version: version,
  				scope: scope
  			})
		},
		(error, response, body) => {
			const obj = JSON.parse(body)
			clientId = obj.client_id
			clientSecret = obj.client_secret
			version = obj.version
			scope = obj.scope
			data.accessToken = obj.access_token
			data.refreshToken = obj.refresh_token
			return done(obj)
		})
	}

	this.refreshAccessToken = (done) => {

		request({
			method: 'POST',
  			url: BASE_URL + REFRESH_ACCESS_TOKEN,
  			headers: { 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				client_id: data.clientId,
  				client_secret: data.clientSecret,
  				refresh_token: data.refreshToken,
  				version: data.version
  			})
		},
		(error, response, body) => {
			const obj = JSON.parse(body)
			data.accessToken = obj.access_token
			data.refreshToken = obj.refresh_token
			return done(obj)
		})
	}

	this.sendMoney = (receiver, currency, done) => {

		request({
			method: 'POST',
  			url: BASE_URL + SEND_MONEY + currency,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'},
  			body: JSON.stringify(receiver)
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}

	this.getAddress = (currency, done) => {

		request({
			method: 'GET',
  			url: BASE_URL + GET_ADDRESS + currency + '/last',
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}

	this.generateNewAddress = (currency, done) => {

		request({
			method: 'GET',
  			url: BASE_URL + GET_ADDRESS + currency + '/fresh',
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}

	this.calculateBuyOrder = (receiveAmount, receiveCurrency, payCurrency, done) => {

		request({
			method: 'GET',
  			url: BASE_URL + CALCULATE_BUY_ORDER + `?receiveAmount=${receiveAmount}&receiveCurrency=${receiveCurrency}&payCurrency=${payCurrency}`,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}

	this.exchangeBuyOrder = (receiveAmount, receiveCurrency, payCurrency, done) => {

		request({
			method: 'POST',
  			url: BASE_URL + EXCHANGE_BUY_ORDER,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				receiveAmount: receiveAmount,
  				receiveCurrency: receiveCurrency,
  				payCurrency: payCurrency
  			})
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}

	this.calculateSellOrder = (payAmount, payCurrency, receiveCurrency, done) => {

		request({
			method: 'GET',
  			url: BASE_URL + CALCULATE_SELL_ORDER + `?payAmount=${payAmount}&payCurrency=${payCurrency}&receiveCurrency=${receiveCurrency}`,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}


	this.exchangeSellOrder = (payAmount, payCurrency, receiveCurrency, done) => {

		request({
			method: 'POST',
  			url: BASE_URL + EXCHANGE_SELL_ORDER,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive', 'Content-Type': 'application/json'},
  			body: JSON.stringify({
  				payAmount: payAmount,
  				payCurrency: payCurrency,
  				receiveCurrency: receiveCurrency
  			})
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}


	this.accountsInfo = (done) => {

		request({
			method: 'GET',
  			url: BASE_URL + ACCOUNTS_INFO,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}


	this.getHistory = (accountId, page, size, done) => {

		request({
			method: 'GET',
  			url: BASE_URL + HISTORY + `${accountId}?page=${page}&size=${size}`,
  			headers: { 'Authorization': 'Bearer ' + data.accessToken, 'Connection': 'Keep-Alive'}
		},
		(error, response, body) => {
			return done(JSON.parse(body))
		})

	}


}

module.exports = SpectroCoin