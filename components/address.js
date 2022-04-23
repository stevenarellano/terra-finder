import { useState } from "react";
import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
import { Box, Flex } from "@chakra-ui/react";

export default function AddressHead({ accountHash }) {
	return (
		<Flex
			borderRadius='.25rem'
			flexDir='column'
			border='solid #D9DEF0 .1rem'>
			<Box
				bg='#EEF4FE'
				borderBottom='solid #D9DEF0 .1rem'
				padding=' .75rem .75rem .75rem 1.5rem'>
				Address
			</Box>
			<Box p='1.5rem'>{accountHash}</Box>
		</Flex>
	);
}
