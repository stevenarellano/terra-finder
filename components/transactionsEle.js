import { useState, useEffect } from "react";
import { Coins, LCDClient, MnemonicKey } from "@terra-money/terra.js";

import {
	Box,
	Flex,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Button,
	Td,
	TableCaption,
	TableContainer,
	useClipboard,
} from "@chakra-ui/react";
import axios from "axios";

export default function TransactionsEle({ accountHash }) {
	const terra = new LCDClient({
		URL: "https://lcd.terra.dev",
		chainId: "columbus-5",
	});
	const [tx, setTx] = useState([]);
	const [offset, setOffset] = useState(0);
	const [remaining, setRemaining] = useState(true);
	const [loading, setLoading] = useState(true);
	async function getTXs(walletAddress, offsetId) {
		setLoading(true);
		axios
			.get(
				`https://fcd.terra.dev/v1/txs?account=${walletAddress}&offset=${offsetId}`
			)
			.then((res) => {
				setLoading(false);
				const txArr = res.data.txs;
				setTx(tx.concat(txArr));
				setOffset(txArr[txArr.length - 1].id);
				if (txArr.length !== 10) {
					setRemaining(false);
				}
			});
	}
	const [toCopy, setToCopy] = useState("");
	const { hasCopied, onCopy } = useClipboard(toCopy);
	const copyText = (e) => {
		setToCopy(e.target.innerHTML);
		onCopy();
	};

	useEffect(() => {
		getTXs(accountHash, offset);
	}, []);

	const txEles = tx.map((transaction) => (
		<Tr key={tx.indexOf(transaction)}>
			<Td
				onClick={(e) => {
					copyText(e);
				}}
				_hover={{
					textDecoration: "underline",
				}}
				_active={{
					color: "blue",
				}}
				maxW='10rem'
				textOverflow='ellipsis'
				whiteSpace='nowrap'
				cursor='pointer'
				overflow='hidden'
				variant='link'>
				{transaction.txhash}
			</Td>
			<Td>{transaction.tx.type}</Td>
			<Td isNumeric>{transaction.height}</Td>
			<Td>{transaction.timestamp}</Td>
			<Td isNumeric>{transaction.tx.value.fee.gas}</Td>
		</Tr>
	));

	const wallet = terra.wallet(accountHash);

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
				Transactions
			</Box>
			<TableContainer>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Tx Hash</Th>
							<Th>Type</Th>
							<Th isNumeric>Block</Th>
							<Th>Timestamp</Th>
							<Th isNumeric>Fee</Th>
						</Tr>
					</Thead>
					<Tbody>{txEles}</Tbody>
				</Table>
				{remaining ? (
					<Button
						isLoading={loading}
						loadingText='Loading Transactions'
						onClick={() => getTXs(accountHash, offset)}
						variant='ghost'
						cursor='pointer'
						justify='center'
						align='center'
						w='100%'>
						More
					</Button>
				) : null}
			</TableContainer>
		</Flex>
	);
}
