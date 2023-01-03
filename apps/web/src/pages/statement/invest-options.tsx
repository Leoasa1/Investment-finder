import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useRouter } from 'next/router';
import Style from './style.module.scss';

const InvestOptions = () => {
	const [investOption, setInvestOption] = useState('');
	const [budget, setBudget] = useState('');
	const router = useRouter();

	useEffect(() => {
		setBudget(sessionStorage.getItem('budget') || 'null');
	}, []);

	const onSubmit = (e: any) => {
		e.preventDefault();
		sessionStorage.setItem('invest-option', investOption);
		sessionStorage.setItem('budget', budget);
		router.push('/statement/investments');
	};

	return (
		<div className='hero relative h-[calc(100vh-(var(--navbar-header-height)+var(--navbar-height)))]'>
			<div className='hero-content'>
				<div className='inset-x-50 absolute -top-10 grid gap-5 text-center'>
					<h1 className='playfair mx-auto pt-10 text-4xl font-bold md:text-5xl'>
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
					<button className='btn btn-outline' onClick={onSubmit}>
						Submit
					</button>
				</div>
				<form
					className='mt-56 flex flex-col gap-10 md:flex-row md:gap-20'
					onSubmit={onSubmit}
				>
					<button
						className='btn btn-outline btn-options align-text-center relative h-80 w-80 text-7xl drop-shadow-xl md:text-8xl'
						onClick={() => {
							setInvestOption('single');
						}}
						type='submit'
					>
						<span className='absolute inset-x-0 top-8 text-5xl'>
							$
						</span>
						💵
						<span className='absolute inset-x-0 bottom-8 text-lg md:text-2xl'>
							Single Invest
						</span>
					</button>
					<button
						className='btn btn-outline align-text-center btn-options relative h-80 w-80 text-7xl drop-shadow-xl md:text-8xl'
						onClick={() => {
							setInvestOption('multi');
						}}
						type='submit'
					>
						<span className='absolute inset-x-0 top-8 text-5xl'>
							$$$
						</span>
						💰💰
						<span className='absolute inset-x-0 bottom-8 text-lg md:text-2xl'>
							Mutli Invest
						</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default InvestOptions;
