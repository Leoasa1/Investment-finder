import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className='navbar bg-base-100 h-[var(--navbar-header-height)] md:px-20'>
			<div className='flex-1'>
				<Link href={'/'}>
					<a className='text-xl normal-case'>Invest</a>
				</Link>
			</div>
			<div className='flex-none'>
				<ul className='menu menu-horizontal p-0'>
					<li>
						<Link href={'/'}>
							<a>Privacy</a>
						</Link>
					</li>
					<li>
						<Link href={'/'}>
							<a>About</a>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
