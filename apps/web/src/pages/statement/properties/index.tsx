import React from 'react';

export interface Props {
	property: object;
}

const PropCard = ({ property }: Props) => {
	return (
		<div className='card lg:card-side bg-base-100 shadow-xl'>
			<figure>
				<img src='https://placeimg.com/400/400/arch' alt='Album' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>New album is released!</h2>
				<p>Click the button to listen on Spotiwhy app.</p>
				<div className='card-actions justify-end'>
					<button className='btn btn-primary'>Listen</button>
				</div>
			</div>
		</div>
	);
};

const Index = () => {
	return <div>{/* <PropCard property={} /> */}</div>;
};

export default Index;
