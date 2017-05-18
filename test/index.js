const expect = require('chai').expect
const request = require('request')

const SC = require('../index')

// Testing account
const clientId = 'wallet_8f452af79dcb7fed5979d11cc33910bb'
const clientSecret = 'test-secret'
const version = '1.0'
const scope = 'user_account send_currency currency_exchange'
const receiver = 'test_cs7@spectrocoin.com'
const accountId = 666666


describe('obtain access token', ()=> {

	const SpectroCoin = new SC()

	it('obtains access token', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			expect(body).to.have.keys(['access_token', 'token_type', 'expires_in', 'refresh_token', 'scope'])
			done()
		})		
	})
})


describe('refresh access token', ()=> {

	const SpectroCoin = new SC()

	it('refreshes access token', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.refreshAccessToken((body) => {
				expect(body).to.have.keys(['access_token', 'token_type', 'expires_in', 'refresh_token', 'scope'])
				done()
			})
		})		
	})
})


describe('send money', ()=> {

	const SpectroCoin = new SC()
	const one = {amount: 12.99, receiver: receiver}
	const two = [{amount: 12.99, receiver: receiver}, {amount: 20.99, receiver: receiver}]

	it('sends money', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.sendMoney(one, 'USD', (body)=>{
				expect(body).to.have.property('status', 'PAID')
				done()
			})
		})		
	})

	it('sends bulk', (done)=> {
		SpectroCoin.sendMoney(two, 'USD', (body)=>{
			expect(body).to.have.property('status', 'PAID')
			done()
		})
	})
})

describe('get address', ()=> {

	const SpectroCoin = new SC()

	it('gets BTC address', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.getAddress('BTC', (body) => {
				expect(body).to.have.property('currency', 'BTC')
				done()
			})
		})		
	})

	// Not working with test account?

	// it('gets DASH address', (done)=> {
	// 	SpectroCoin.getAddress('DASH', (body) => {
	// 		expect(body).to.have.property('currency', 'DASH')
	// 		done()
	// 	})
	// })
})

describe('generate new address', ()=> {

	const SpectroCoin = new SC()

	it('generates new BTC address', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.generateNewAddress('BTC', (body) => {
				expect(body).to.have.property('currency', 'BTC')
				done()
			})
		})		
	})

	// Not working with test account?

	// it('generates new DASH address', (done)=> {
	// 	SpectroCoin.generateNewAddress('DASH', (body) => {
	// 		expect(body).to.have.property('currency', 'DASH')
	// 		done()
	// 	})
	// })
})

describe('calculate buy order', ()=> {

	const SpectroCoin = new SC()

	it('calculates buy order', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.calculateBuyOrder(12.99, 'BTC', 'EUR', (body) => {
				expect(body).to.have.keys(['payAmount', 'payCurrency'])
				done()
			})
		})		
	})
})

describe('exchange buy order', ()=> {

	const SpectroCoin = new SC()

	it('exchange buy order', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.exchangeBuyOrder(12.99, 'BTC', 'EUR', (body) => {
				expect(body).to.have.keys(['exchangeId', 'payAmount', 'payCurrency', 'receiveAmount', 'receiveCurrency', 'status'])
				done()
			})
		})		
	})
})

describe('calculate sell order', ()=> {

	const SpectroCoin = new SC()

	it('calculates sell order', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.calculateSellOrder(12.99, 'EUR', 'BTC', (body) => {
				expect(body).to.have.keys(['receiveAmount', 'receiveCurrency'])
				done()
			})
		})		
	})
})

describe('exchange sell order', ()=> {

	const SpectroCoin = new SC()

	it('exchange sell order', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.exchangeSellOrder(12.99, 'EUR', 'BTC', (body) => {
				expect(body).to.have.keys(['exchangeId', 'payAmount', 'payCurrency', 'receiveAmount', 'receiveCurrency', 'status'])
				done()
			})
		})		
	})
})

describe('get accounts info', ()=> {

	const SpectroCoin = new SC()

	it('gets accounts info', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.accountsInfo((body) => {
				expect(body).to.have.keys(['accounts'])
				done()
			})
		})		
	})
})

describe('get history', ()=> {

	const SpectroCoin = new SC()

	it('gets history', (done)=> {
		SpectroCoin.getAccessToken(clientId, clientSecret, version, scope, (body) => {
			SpectroCoin.getHistory(accountId, 1, 4, (body) => {
				expect(body).to.have.keys(['totalCount', 'history'])
				done()
			})
		})		
	})
})





