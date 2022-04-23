import { useState } from "react";
import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
import { Box, Flex } from "@chakra-ui/react";

import CoinEle from "./coinEle";

export default function CoinsEle() {
	const exampleCoins = [
		{ name: "LUNA", amount: 2, toUSD: 3 },
		{ name: "USD", amount: 4, toUSD: 4 },
	];

	const coinsEle = exampleCoins.map((coin) => (
		<CoinEle
			key={coin.name}
			name={coin.name}
			amount={coin.amount}
			toUSD={coin.toUSD}
		/>
	));

	return (
		<Flex
			borderRadius='.25rem'
			border='solid #D9DEF0 .1rem'
			my='2rem'
			flexDir='column'>
			<Box
				bg='#EEF4FE'
				borderBottom='solid #D9DEF0 .1rem'
				padding=' .75rem .75rem .75rem 1.5rem'>
				Coins
			</Box>
			<Flex py='2rem' gap='2rem' flexDir='column'>
				{coinsEle}
			</Flex>
		</Flex>
	);
}
