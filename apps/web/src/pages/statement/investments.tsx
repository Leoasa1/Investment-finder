import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import AXIOS from 'axios';
import Style from './style.module.scss';
import Card from '../../components/card/Card';

export default function Investments() {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [budget, setBudget] = useState('');
	const [zip, setZip] = useState('');

	const [showProp, setShowProp] = useState(true);
	const [showIndus, setShowIndus] = useState(true);
	const [showCateo, setShowCateo] = useState(true);
	const [showCrypto, setShowCrypto] = useState(true);

	const BUDGET =
		typeof window !== 'undefined' ? localStorage.getItem('budget') : null;
	const ZIP =
		typeof window !== 'undefined' ? localStorage.getItem('zip') : null;

	const getResult = async () => {
		const OPTIONS = {
			method: 'GET',
			url: 'http://localhost:5000/search/single-invest',
			params: {
				budget: `${BUDGET}`,
				zip: `${ZIP}`,
			},
		};
		await AXIOS.request(OPTIONS)
			.then(function (response) {
				setLoaded(true);
				console.log(response.data);
				{
					response.data[0].properties.length !== 0
						? localStorage.setItem(
								'properties',
								JSON.stringify(response.data[0].properties)
						  )
						: setShowProp(false);
				}
				{
					response.data[1].length !== 0
						? localStorage.setItem(
								'industry-stocks',
								JSON.stringify(response.data[1])
						  )
						: setShowIndus(false);
				}
				{
					response.data[2].gainers.length !== 0
						? localStorage.setItem(
								'categorie-stocks',
								JSON.stringify(response.data[2].gainers)
						  )
						: setShowCateo(false);
				}
				{
					response.data[3].data.coins.length !== 0
						? localStorage.setItem(
								'crypto',
								JSON.stringify(response.data[3].data.coins)
						  )
						: setShowCateo(false);
				}
			})
			.catch(function (error) {
				console.error(error);
			});
		return;
	};

	useEffect(() => {
		if (BUDGET === 'null' || ZIP === 'null') {
			router.push('/');
		}
		getResult();

		console.log(showProp);
		console.log(showIndus);
	}, []);

	return (
		<div className='container mx-auto text-center'>
			<div>
				<h1 className='playfair pb-5 text-5xl font-bold'>Budget</h1>
				<NumericFormat
					name='budget'
					className={`h-16 w-80 px-5 text-4xl md:w-auto ${Style.budgetInput} text-center`}
					aria-label='Ask us any amount'
					displayType='input'
					valueIsNumericString={true}
					placeholder=' '
					maxLength={13}
					value={BUDGET}
					onValueChange={(e) => {
						setBudget(e.value);
					}}
					allowLeadingZeros
					thousandSeparator=','
				/>
			</div>
			<div className='my-20 grid justify-items-center gap-20 px-32 lg:grid-cols-2'>
				<Card
					image='/images/house.png'
					loaded={loaded}
					title='Properties'
					description=''
					showCard={showProp}
				/>
				<Card
					image='/images/inventory.png'
					loaded={loaded}
					title='Insdustry Stocks'
					description=''
					showCard={showIndus}
				/>
				<Card
					image='/images/stock.png'
					loaded={loaded}
					title='Best Performing Stocks'
					description=''
					showCard={showCateo}
				/>
				<Card
					image='/images/bitcoin.png'
					loaded={loaded}
					title='Crypto'
					description=''
					showCard={showCrypto}
				/>
			</div>
		</div>
	);
}
