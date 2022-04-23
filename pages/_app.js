import { ChakraProvider } from "@chakra-ui/react";


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>

			{/* eslint-disable react/jsx-props-no-spreading */}
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
