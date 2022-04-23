import { useEffect, useState } from "react";
import { LCDClient } from "@terra-money/terra.js";
import { Box, Flex } from "@chakra-ui/react";
import CoinEle from "./coinEle";

import Missing from "./missing";

export default function TokensEle({ accountHash }) {
	const [loading, setLoading] = useState(true);
	const [tokensEle, setTokensEle] = useState([]);

	const terra = new LCDClient({
		URL: "https://lcd.terra.dev",
		chainId: "columbus-5",
	});

	const mostPopular = [
		{
			name: "BETH",
			address: "terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun",
			balance: 0,
		},
		{
			name: "mETH",
			address: "terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx",
			balance: 0,
		},
		{
			name: "SPEC",
			address: "terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr",
			balance: 0,
		},
		{
			name: "mAMZN",
			address: "terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2",
			balance: 0,
		},
		{
			name: "bLUNA",
			address: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
			balance: 0,
		},
		{
			name: "ANC",
			address: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
			balance: 0,
		},
		{
			name: "mNFLX",
			address: "terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k",
			balance: 0,
		},
		{
			name: "MSPY",
			address: "terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc",
			balance: 0,
		},
		{
			name: "LUNAX",
			address: "terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup",
			balance: 0,
		},
	];

	const getBalances = async () => {
		const tokens = [];
		for (let i = 0; i < mostPopular.length; i += 1) {
			const response = await terra.wasm.contractQuery(
				mostPopular[i].address,
				{ balance: { address: accountHash } }
			);

			if (response.balance > 0) {
				mostPopular[i].balance = response.balance;
				tokens.push(mostPopular[i]);
			}
		}
		setLoading(false);

		const coinsEles = tokens.map((token) => (
			<CoinEle
				key={tokens.indexOf(token)}
				name={token.name}
				amount={token.balance}
			/>
		));
		setTokensEle(coinsEles);
	};

	useEffect(() => {
		setLoading(true);
		setTokensEle([]);
		getBalances();
	}, [accountHash]);

	let body = null;
	if (tokensEle.length !== 0) {
		body = tokensEle;
	} else if (loading) {
		body = (
			<Flex w='100%' h='2rem' justify='center' align='center'>
				Loading...
			</Flex>
		);
	} else {
		body = <Missing which='tokens' />;
	}

	return (
		<Flex
			borderRadius='.25rem'
			border='solid #D9DEF0 .1rem'
			my='2rem'
			flexDir='column'>
			<Box
				bg='#EEF4FE'
				color='#0B3693'
				fontSize='1.25rem'
				borderBottom='solid #D9DEF0 .1rem'
				padding=' .75rem .75rem .75rem 1.5rem'>
				Tokens
			</Box>

			<Flex py='2rem' gap='2rem' flexDir='column'>
				{body}
			</Flex>
		</Flex>
	);
}
