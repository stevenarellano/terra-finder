import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CoinsEle from "../components/coinsEle";
import AddressHead from "../components/address";
import TransactionsEle from "../components/transactionsEle";
import Navbar from "../components/navbar";
import TokensEle from "../components/tokensEle";


export default function Account() {
	const router = useRouter();

	const [accountHash, setAccountHash] = useState("");
	useEffect(() => {
		if (!router.isReady) return;
		if (router.query.hash) {
			setAccountHash(router.query.hash);
		}
	}, [router.query.hash]);

	let eles = null;
	if (accountHash) {
		eles = (
			<Flex m='4rem' flexDir='column'>
				<Box color='#0B3693' fontSize='2rem'>
					Account Detail
				</Box>
				<AddressHead accountHash={accountHash} />

				<CoinsEle accountHash={accountHash} />

				<TokensEle accountHash={accountHash} />
				<TransactionsEle accountHash={accountHash} />
			</Flex>
		);
	}

	return (
		<>
			<Navbar />
			{eles}
		</>
	);
}
