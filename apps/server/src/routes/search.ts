import express from 'express';
import { query, validationResult } from 'express-validator';
import axios from 'axios';
// import statementModel from '../models/Statement';
const router = express.Router();

const getValues = (priceMax: any, postalCode: any) => {
	const priceMin = Math.round(parseInt(priceMax) - parseInt(priceMax) * 0.1);

	const properties = {
		method: 'GET',
		url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
		params: {
			postal_code: `${postalCode}`,
			offset: '0',
			limit: '20',
			sort: 'relevance',
			price_min: `${priceMin}`,
			price_max: `${priceMax}`,
			radius: '20',
			prop_type: `${priceMax < 300000 ? 'land' : ''}`,
		},
		headers: {
			'X-RapidAPI-Key':
				'0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51',
			'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
		},
	};

	const stocksByIndustry = {
		method: 'GET',
		url: 'https://webull.p.rapidapi.com/industries/list-best-performing',
		params: {
			regionId: '6',
			pageIndex: '1',
			industryType: '3m',
			pageSize: '20',
			direction: '-1',
		},
		headers: {
			'X-RapidAPI-Key':
				'0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51',
			'X-RapidAPI-Host': 'webull.p.rapidapi.com',
		},
	};

	const stocksByCategorie = {
		method: 'GET',
		url: 'https://ms-finance.p.rapidapi.com/market/v2/get-movers',
		headers: {
			'X-RapidAPI-Key':
				'0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51',
			'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com',
		},
	};

	const crypto = {
		method: 'GET',
		url: 'https://coinranking1.p.rapidapi.com/coins',
		params: {
			referenceCurrencyUuid: 'yhjMzLPhuIDl',
			timePeriod: '24h',
			'tiers[0]': '1',
			orderBy: 'marketCap',
			orderDirection: 'desc',
			limit: '20',
			offset: '0',
		},
		headers: {
			'X-RapidAPI-Key':
				'0fe077be1emshd40962bc735f0ccp1ca7dcjsnc61b720bed51',
			'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
		},
	};

	return axios
		.all([
			axios.request(properties),
			axios.request(stocksByIndustry),
			axios.request(stocksByCategorie),
			axios.request(crypto),
		])
		.then(function (response) {
			return response.map((resp) => resp.data || []);
		})
		.catch((errors) => {
			return console.error(errors);
		});
};

router.get(
	'/single-invest',
	[
		query('budget', 'Need to fix Budget')
			.not()
			.isEmpty()
			.isLength({ min: 4 })
			.isInt(),
		query('zip', 'Need valid zip code').isPostalCode('US').not().isEmpty(),
	],
	async (req, res) => {
		let budget = req.query.budget;
		let zip = req.query.zip;

		if (!budget || !zip) {
			res.status(500).send('Budget and zip code is required.');
		}

		try {
			res.status(200).json(await getValues(budget, zip));
		} catch {
			console.log(res);
		}
	}
);

router.get(
	'/multi-invest',
	[
		query('budget', 'Need to fix Budget')
			.not()
			.isEmpty()
			.isLength({ min: 4 })
			.isInt(),
		query('zip_code', 'Need valid zip code')
			.isPostalCode('US')
			.not()
			.isEmpty(),
	],
	async (req, res) => {
		let budget = req.query.budget;
		let zip_code = req.query.zip_code;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		try {
			res.status(200).json(await getValues(budget, zip_code));
		} catch {
			console.log(res);
		}
	}
);

module.exports = router;
