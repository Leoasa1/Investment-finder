import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useRouter } from 'next/router';
import Style from './style.module.scss';

const InvestOptions = () => {
	const [investOption, setInvestOption] = useState('');
	const [budget, setBudget] = useState('');
	const router = useRouter();

	useEffect(() => {
		setBudget(localStorage.getItem('budget') || 'null');
	}, []);

	const onSubmit = (e: any) => {
		e.preventDefault();
		localStorage.setItem('invest-option', investOption);
		localStorage.setItem('budget', budget);
		router.push('/statement/investments');
	};

	return (
		<div className='hero relative h-[calc(100vh-(var(--navbar-header-height)+var(--navbar-height)))]'>
			<div className='hero-content'>
				<div className='inset-x-50 absolute -top-10 text-center'>
					<h1 className='playfair mx-auto pb-5 pt-10 text-5xl font-bold'>
						Budget
					</h1>
					<NumericFormat
						name='budget'
						className={`h-16 w-80 px-5 text-4xl md:w-auto ${Style.budgetInput} text-center`}
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
				</div>
				<form
					className='mt-40 flex flex-col gap-10 md:flex-row md:gap-20'
					onSubmit={onSubmit}
				>
					<button
						className='btn btn-outline btn-options align-text-center relative h-80 w-80 text-6xl drop-shadow-xl'
						onClick={() => {
							setInvestOption('single');
						}}
						type='submit'
					>
						<span className='absolute inset-x-0 top-8 text-3xl'>
							$
						</span>
						💵
						<span className='absolute inset-x-0 bottom-8 text-lg'>
							Single Invest
						</span>
					</button>
					<button
						className='btn btn-outline align-text-center btn-options relative h-80 w-80 text-6xl drop-shadow-xl'
						onClick={() => {
							setInvestOption('multi');
						}}
						type='submit'
					>
						<span className='absolute inset-x-0 top-8 text-3xl'>
							$$$
						</span>
						💰💰
						<span className='absolute inset-x-0 bottom-8 text-lg'>
							Mutli Invest
						</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default InvestOptions;
