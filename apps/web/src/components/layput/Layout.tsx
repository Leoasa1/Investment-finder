import Head from 'next/head';
// import { useRouter } from 'next/router';
// import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export interface Props {
	title: string;
	description: string;
	children: React.ReactNode;
}

export default function Layout({ title, description, children }: Props) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<Navbar />
			{children}
			{/* {router.pathname === '/' && <Footer />} */}
		</div>
	);
}

Layout.defaultProps = {
	title: 'Invest',
	description: 'Get to know your money',
};
