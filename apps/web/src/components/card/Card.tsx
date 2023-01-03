import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface props {
	image: string;
	title: string;
	description: string;
	loaded: boolean;
	showCard: boolean;
	link: string;
}

function Card({
	image,
	title,
	description,
	loaded,
	showCard = true,
	link,
}: props) {
	const Router = useRouter();

	const Link = () => {
		if (loaded === true) Router.push(link);
	};

	return (
		<>
			{showCard === true ? (
				<div
					className={`${
						loaded === false ? 'animate-pulse' : ''
					} btn btn-outline btn-options bg-base-100 grid h-80 w-80 cursor-pointer shadow-xl md:h-96 md:w-96`}
					onClick={Link}
				>
					<div className={loaded === false ? 'p-0' : 'p-10'}>
						{loaded === false ? (
							<div className='h-56 w-96 bg-gray-400' />
						) : (
							<Image
								src={image}
								alt='investment'
								width={140}
								height={140}
							/>
						)}
					</div>
					<div className='card-body items-center px-6 text-center md:py-10'>
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
