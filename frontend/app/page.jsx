'use client';
import Login from '../components/Login';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: 'blue.800',
			},
		}),
	},
});

const Home = () => {
	return (
		<ChakraProvider theme={theme}>
			<section className='w-full flex-center flex-col'>
				<Login />
			</section>
		</ChakraProvider>
	);
};

export default Home;
