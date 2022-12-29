import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layput/Layout';
import { GlobalContextProvider } from '../contexts/searchContext';

export default function MyApp({ Component, pageProps }) {
	return (
		<GlobalContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalContextProvider>
	);
}
