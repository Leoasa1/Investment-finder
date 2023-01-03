import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import AXIOS from 'axios';
import Style from './style.module.scss';
import Card from '../../components/card/Card';

export default function Investments() {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);

	const [showProp, setShowProp] = useState(true);
	const [showIndus, setShowIndus] = useState(true);
	const [showCateo, setShowCateo] = useState(true);
	const [showCrypto, setShowCrypto] = useState(true);

	const BUDGET =
		typeof window !== 'undefined' ? sessionStorage.getItem('budget') : null;
	const ZIP =
		typeof window !== 'undefined' ? sessionStorage.getItem('zip') : null;
	const PREV_SEARCH =
		typeof window !== 'undefined'
			? sessionStorage.getItem('previous-search')
			: null;

	const [budget, setBudget] = useState<string | null>(BUDGET);

	const getPrevResult = () => {
		setLoaded(true);
		console.log(sessionStorage.getItem('properties'));
		{
			sessionStorage.getItem('properties') !== '[]'
				? setShowProp(true)
				: setShowProp(false);
		}
	};

	const getResult = async () => {
		const OPTIONS = {
			method: 'GET',
			url: 'http://localhost:5000/search/single-invest',
			params: {
				budget: `${budget}`,
				zip: `${ZIP}`,
			},
		};
		console.log(budget);

		await AXIOS.request(OPTIONS)
			.then(function (response) {
				setLoaded(true);
				console.log(response.data);
				sessionStorage.setItem('previous-search', 'true');

				sessionStorage.setItem(
					'properties',
					JSON.stringify(response.data[0].properties)
				);
				sessionStorage.setItem(
					'industry-stocks',
					JSON.stringify(response.data[1])
				);
				sessionStorage.setItem(
					'categorie-stocks',
					JSON.stringify(response.data[2].gainers)
				);
				sessionStorage.setItem(
					'crypto',
					JSON.stringify(response.data[3].data.coins)
				);
				{
					response.data[0].properties.length !== 0
						? setShowProp(true)
						: setShowProp(false);
				}
				{
					response.data[1].length !== 0
						? setShowIndus(true)
						: setShowIndus(false);
				}
				{
					response.data[2].gainers.length !== 0
						? setShowCateo(true)
						: setShowCateo(false);
				}
				{
					response.data[3].data.coins.length !== 0
						? setShowCrypto(true)
						: setShowCrypto(false);
				}
			})
			.catch(function (error) {
				console.error(error);
			});
		return;
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		setLoaded(false);
		setShowProp(true);
		setShowIndus(true);
		setShowCateo(true);
		setShowCrypto(true);
		sessionStorage.setItem('budget', budget || '');
		getResult();
	};

	useEffect(() => {
		if (BUDGET === 'null' || ZIP === 'null') {
			router.push('/');
		}
		if (PREV_SEARCH === 'true') {
			getPrevResult();
		} else {
			getResult();
		}
	}, []);

	return (
		<div className='container mx-auto px-5 text-center'>
			<div className='mx-auto grid justify-items-center gap-5'>
				<h1 className='playfair mx-auto text-4xl font-bold md:text-5xl'>
					Budget
				</h1>
				<NumericFormat
					name='budget'
					className={`h-16 w-80 px-5 text-3xl md:w-auto md:text-4xl ${Style.budgetInput} text-center`}
					aria-label='Ask us any amount'
					displayType='input'
					valueIsNumericString={true}
					placeholder=' '
					maxLength={13}
					value={budget}
					onValueChange={(e) => {
						setBudget(e.value);
					}}
					allowLeadingZeros
					thousandSeparator=','
				/>
				<button
					className='btn btn-outline btn-submit'
					onClick={onSubmit}
				>
					Submit
				</button>
			</div>
			<div className='my-20 grid justify-items-center gap-20 md:px-32 lg:grid-cols-2'>
				<Card
					image='/images/house.png'
					loaded={loaded}
					title='Properties'
					description=''
					showCard={showProp}
					link='/statement/properties'
				/>
				<Card
					image='/images/inventory.png'
					loaded={loaded}
					title='Insdustry Stocks'
					description=''
					showCard={showIndus}
					link='/statement/industry-stocks'
				/>
				<Card
					image='/images/stock.png'
					loaded={loaded}
					title='Best Performing Stocks'
					description=''
					showCard={showCateo}
					link='/statement/performing-stocks'
				/>
				<Card
					image='/images/bitcoin.png'
					loaded={loaded}
					title='Crypto'
					description=''
					showCard={showCrypto}
					link='/statement/crypto'
				/>
			</div>
		</div>
	);
}
