import { useEffect, useState } from "react";
import { LCDClient } from "@terra-money/terra.js";
import { Box, Flex } from "@chakra-ui/react";

import CoinEle from "./coinEle";
import Missing from "./missing";

export default function CoinsEle({ accountHash }) {
	const [loading, setLoading] = useState(true);
	const [coinsEle, setCoinsEle] = useState([]);

	const terra = new LCDClient({
		URL: "https://lcd.terra.dev",
		chainId: "columbus-5",
	});

	const getBalances = async () => {
		let coins = await terra.bank.balance(accountHash);
		setLoading(false);
		coins = Object.values(coins[0]._coins);

		const coinsEles = coins.map((coin) => (
			<CoinEle
				key={coins.indexOf(coin)}
				name={coin.denom.slice(1)}
				amount={coin.amount.d[0]}
			/>
		));
		setCoinsEle(coinsEles);
	};

	useEffect(() => {
		setLoading(true);
		setCoinsEle([]);
		getBalances();
	}, [accountHash]);

	let body = null;
	if (coinsEle.length !== 0) {
		body = coinsEle;
	} else if (loading) {
		body = (
			<Flex w='100%' h='2rem' justify='center' align='center'>
				{" "}
				Loading...
			</Flex>
		);
	} else {
		body = <Missing which='coins' />;
	}

	return (
		<Flex
			borderRadius='.25rem'
			border='solid #D9DEF0 .1rem'
			my='2rem'
			flexDir='column'>
			<Box
				color='#0B3693'
				fontSize='1.25rem'
				bg='#EEF4FE'
				borderBottom='solid #D9DEF0 .1rem'
				padding=' .75rem .75rem .75rem 1.5rem'>
				Coins
			</Box>
			<Flex py='2rem' gap='2rem' flexDir='column'>
				{body}
			</Flex>
		</Flex>
	);
}
