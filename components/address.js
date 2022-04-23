import { useEffect } from "react";

import { Box, Flex } from "@chakra-ui/react";

export default function AddressHead({ accountHash }) {
	useEffect(() => {}, [accountHash]);

	return (
		<Flex
			borderRadius='.25rem'
			flexDir='column'
			border='solid #D9DEF0 .1rem'>
			<Box
				bg='#EEF4FE'
				color='#0B3693'
				fontSize='1.25rem'
				borderBottom='solid #D9DEF0 .1rem'
				padding=' .75rem .75rem .75rem 1.5rem'>
				Address
			</Box>
			<Box p='1.5rem'>{accountHash}</Box>
		</Flex>
	);
}
