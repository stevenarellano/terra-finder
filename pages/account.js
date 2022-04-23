import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Coins, LCDClient, MnemonicKey } from "@terra-money/terra.js";
import styles from "../styles/Home.module.css";

import CoinsEle from "../components/coinsEle";
import AddressHead from "../components/address";
import TransactionsEle from "../components/transactionsEle";
import Navbar from "../components/navbar";

export default function Account() {
	// for account we'll need to be able to display the following
	// tokens/coins, address, its transactions (and their contents)

	const router = useRouter();
	const accountHash = router.query.hash;
	console.log(router.query);
	const terra = new LCDClient({
		URL: "https://lcd.terra.dev",
		chainId: "columbus-5",
	});

	const wallet = terra.wallet(accountHash);
	// console.log(wallet);

	// const getBalance = async () => {
	// 	const address = "terra1j5tyxu0d7tejjqe9u9d5vvme4ngqucwlgdx4v0";
	// 	const [balance] = await lcd.bank.balance(address);
	// 	console.log(balance.toData());
	// };

	let [tx, setTx] = useState();

	return (
		<>
			<Navbar />
			<Flex m='4rem' flexDir='column'>
				<Box fontSize='2rem'>Account Detail</Box>
				<AddressHead accountHash={accountHash} />

				<CoinsEle accountHash={accountHash} />
				<TransactionsEle accountHash={accountHash} />
			</Flex>
		</>
	);
}
