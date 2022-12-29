import React from 'react';
import Image from 'next/image';

export interface props {
	image: string;
	title: string;
	description: string;
	loaded: boolean;
	showCard: boolean;
}

function Card({ image, title, description, loaded, showCard = true }: props) {
	return (
		<>
			{showCard === true ? (
				<div
					className={`${
						loaded === false ? 'animate-pulse' : ''
					} btn btn-outline btn-options bg-base-100 h-96 w-96 cursor-pointer shadow-xl`}
				>
					<div className={loaded === false ? 'p-0' : 'p-10'}>
						{loaded === false ? (
							<div className='h-56 w-96 bg-gray-400' />
						) : (
							<Image
								src={image}
								alt='investment'
								width={150}
								height={150}
							/>
						)}
					</div>
					<div className='card-body items-center px-6 py-10 text-center'>
						{loaded === false ? (
							<div className='h-8 w-56 rounded-md bg-gray-200' />
						) : (
							<h2 className='card-title text-center'>{title}</h2>
						)}
						{loaded === false ? (
							<div className='h-8 w-full rounded-md bg-gray-200' />
						) : (
							<p className='card-title'>{description}</p>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default Card;
