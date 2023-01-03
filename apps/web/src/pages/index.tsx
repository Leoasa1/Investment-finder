import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
const isValidZip = require('is-valid-zip');

export default function Web() {
	const [budgetValue, setBudgetValue] = useState('');
	const [zipValue, setZipValue] = useState('');
	const router = useRouter();

	useEffect(() => {
		sessionStorage.setItem('budget', 'null');
		sessionStorage.setItem('zip', 'null');
		sessionStorage.setItem('properties', '[]');
		sessionStorage.setItem('industry-stocks', '[]');
		sessionStorage.setItem('categorie-stocks', '[]');
		sessionStorage.setItem('crypto', '[]');
		sessionStorage.setItem('previous-search', 'false');
	});

	const onSubmit = (e: any) => {
		e.preventDefault();
		if (parseInt(budgetValue) >= 1 && isValidZip(zipValue)) {
			sessionStorage.setItem('budget', budgetValue);
			sessionStorage.setItem('zip', zipValue);
			router.push('/statement/invest-options');
		} else {
			toast.error('Budget or Zip-Code is Invalid!');
		}
	};

	return (
		<div className='hero h-[calc(100vh-(var(--navbar-header-height)+var(--navbar-height)))]'>
			<ToastContainer theme='colored' position='top-center' />
			<div className='hero-content text-center'>
				<div>
					<h1 className='playfair pb-16 text-5xl font-bold md:pb-10'>
						test
					</h1>
					<form onSubmit={onSubmit}>
						<div className='input-wrapper relative'>
							<div className='absolute inset-x-0 right-20 w-6 text-4xl'>
								$
							</div>
							<button
								className='btn absolute inset-0 top-20 mx-28 mt-8'
								type='submit'
							>
								Submit
							</button>
							<NumericFormat
								name='budget'
								className='w-80 px-5 text-4xl md:w-auto'
								aria-label='Ask us anything'
								displayType='input'
								valueIsNumericString={true}
								placeholder=' '
								maxLength={13}
								value={budgetValue}
								onValueChange={(e) => {
									setBudgetValue(e.value);
								}}
								allowLeadingZeros
								thousandSeparator=','
							/>
							<span className='placeholder absolute inset-x-0 text-4xl'></span>
						</div>
						<div
							className={`${
								budgetValue ? 'show-zip' : 'invisible'
							} inset-x-50 absolute ml-20 mt-2 w-6 text-2xl font-medium`}
						>
							Zip
						</div>
						<NumericFormat
							displayType='input'
							className={`input-zip w-52 text-3xl ${
								budgetValue ? 'show-zip' : ''
							}`}
							name='zip'
							value={zipValue}
							maxLength={10}
							onValueChange={(e) => {
								setZipValue(e.value);
							}}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
