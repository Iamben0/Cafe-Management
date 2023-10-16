import Login from '../components/Login';
import { ChakraProvider } from '@chakra-ui/react';

const Home = () => {
	return (
		<ChakraProvider>
			<section className='w-full flex-center flex-col'>
				<Login />
			</section>
		</ChakraProvider>
	);
};

export default Home;
