
	const express = require('express');
	const path = require('path');
	const bodyParser = require('body-parser');
	const router = express.Router();
	const https = require('https');
	const url = require('url');
	const request = require('request');
	const googleMapsClient = require('@google/maps').createClient({
		  key: 'AIzaSyDh22NwoJ6C_oxktc8U_o-IGGujZp2ZKIQ'
		});

	router.get('/GetCurrentTime-Weather', function (req, res) {
	

			const addresses = ['1600 Amphitheatre Parkway, Mountain View, CA', 'New South Head Road, Bellevue Hill NSW, Australia','Kings Cross, Potts Point NSW, Australia'];

			for(var i = 0; i < addresses.length;i++){
			     	googleMapsClient.geocode({
			  address: addresses[i]
			}, function(err, response) {
			  if (!err) {
			  	
			     	const targetDate = new Date() 
					const findtimestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 

					googleMapsClient.timezone({
					  location: response.json.results[0].geometry.location.lat+","+response.json.results[0].geometry.location.lng,
					  timestamp: findtimestamp
					  }, function(err, ress) {
					const offsets = ress.json.dstOffset * 1000 + ress.json.rawOffset * 1000
					const localdate = new Date(findtimestamp * 1000 + offsets)
					console.log("Current Time:",localdate.toLocaleString()) 

					request('http://api.openweathermap.org/data/2.5/weather?lat='+ response.json.results[0].geometry.location.lat+'&lon='+response.json.results[0].geometry.location.lng +'&APPID=d97d2e27baa9e0545b61d696cf7a8b92', function (error, responses, body) {
						  if (!error && responses.statusCode == 200) {
						    console.log("weather:",responses); 
						  }
						});
					});
			  }
			});	
			}
	});

	module.exports = router;