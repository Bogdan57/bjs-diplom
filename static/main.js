'use strict';

class Profile {
	constructor({
		username,
		name: {firstName, lastName},
		password
	}) {
		this.username = username;
		this.name = {firstName, lastName};
		this.password = password;
	};

	createUser(callback) {
		let username = this.username;
		let firstName = this.name.firstName;
		let lastName = this.name.lastName;
		let password = this.password;

		return ApiConnector.createUser(
		{
            username,
            name: { firstName, lastName },
            password
        },
		(err, data) => {
			console.log(`Creating user ${username}`);
			callback(err, data);
		});
	};

	performLogin(callback) {
		let username = this.username;
		let password = this.password;
		return ApiConnector.performLogin({ username, password }, (err, data) => {
			console.log(`Authorizing user ${this.username}`);
			callback(err, data);
		})
	};

	addMoney({ currency, amount }, callback) {
		return ApiConnector.addMoney({ currency, amount }, (err, data) => {
			console.log(`Adding ${amount} of ${currency} to ${this.username}`);
			callback(err, data);
		});
	};

	convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
		return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
			console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
			callback(err, data);
		});
	};

	transferMoney({ to, amount }, callback) {
		return ApiConnector.transferMoney({ to, amount }, (err, data) => {
			console.log(`Transfering ${amount} of Netcoins to ${to}`);
			callback(err, data);
		});
	};
};

function getStocks(callback) {
	return ApiConnector.getStocks((err, data) => {
	  	console.log('Getting stocks info');
		callback (err, data[99]);
	});
};


function main() {
	const ivan = new Profile({
		username: 'ivan',
		name: { firstName: 'Ivan', lastName: 'Chernyshev' },
		password: 'ivanspass'
	});

	const petya = new Profile({
		username: 'petya',
		name: { firstName: 'Petya', lastName: 'Chanov'},
		password: 'petyapass'
	});

	getStocks((err, data) => {
		if (err) {
			console.error('Error during getting stocks');
			throw err;
		} else {
			stocksInfo = data;
		}
	});

	ivan.created( (err, data) => {
		if (err) 
		{
			console.log('Failed to create user');
		} else 
			{
			console.log('Ivan is created!');
			ivan.performLogin( (err, data) => 
				{
				if (err) 
					{
					console.log('Failed to login');
					} else 
						{
						console.log('Ivan is authorized');
						ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => 
							{
							if (err) 
								{
								console.error('Error during adding money to Ivan');
								}
								else 
								{
								console.log('Added 500000 euros to Ivan');
								const targetAmount = stocksInfo['EUR_NETCOIN'] * 500000;
								ivan.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: targetAmount }, (err, data) => 
									{
									if (err) 
										{
										console.log('Error during conversion');
										} 
										else 
											{
											console.log('Converted to coins ', { name: {firstName: 'Ivan', lastName: 'Chernyshev'}, wallet: {amount: 36000, currency: 'NETCOIN'}, username: 'ivan' });
											petya.created((err, data) => 
												{
												if (err) 
													{
													console.log('Error during creating user Dima')
													} 
												else 
													{
													console.log(`petya is created!`); 
													ivan.transferMoney({ to: 'petya', amount: 36000 }, (err, data) => 
														{
														if (err) 
															{
															console.log('Failed to transfer 36000 Netcoins');
															} 
															else 
															{
															console.log('petya has got 36000 Netcoins');
															};
														});
													};
												});
											};
									});
								};
							});	
		    			};
				});
			};
		});
	};

main(); 