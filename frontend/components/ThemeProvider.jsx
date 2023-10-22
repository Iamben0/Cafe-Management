'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: 'blue.800',
				color: 'white',
			},
		}),
	},
});

const ThemeProvider = ({ children }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
