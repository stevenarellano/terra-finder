import { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Button,
	Td,
	TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Missing from "./missing";

export default function TransactionsEle({ accountHash }) {
	const [tx, setTx] = useState([]);
	const [offset, setOffset] = useState(0);
	const [remaining, setRemaining] = useState(true);
	const [loading, setLoading] = useState(true);
	const [isNew, setNew] = useState(true);

	async function getTXs(walletAddress, offsetId, first) {
		setLoading(true);
		axios
			.get(
				`https://fcd.terra.dev/v1/txs?account=${walletAddress}&offset=${offsetId}`
			)
			.then((res) => {
				setLoading(false);
				setNew(false);
				const txArr = res.data.txs;
				if (first) {
					setTx(txArr);
				} else {
					setTx(tx.concat(txArr));
				}

				if (txArr[txArr.length - 1]) {
					setOffset(txArr[txArr.length - 1].id);
				}

				if (txArr.length !== 10) {
					setRemaining(false);
				}
			});
	}

	useEffect(() => {
		setOffset(0);
		setRemaining(true);
		setNew(true);
		getTXs(accountHash, 0, true);
	}, [accountHash]);

	const txEles = tx.map((transaction) => (
		<Tr key={tx.indexOf(transaction)}>
			<Td display='flex' align='center' maxW='15rem' variant='link'>
				<Box
					fontSize='.75rem'
					whiteSpace='nowrap'
					cursor='pointer'
					overflowX='scroll'>
					{transaction.txhash}
				</Box>
			</Td>
			<Td>{transaction.tx.type}</Td>
			<Td isNumeric>{transaction.height}</Td>
			<Td>{transaction.timestamp}</Td>
			<Td isNumeric>{transaction.tx.value.fee.gas}</Td>
		</Tr>
	));

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
				Transactions
			</Box>
			{txEles.length !== 0 && !isNew ? (
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
							onClick={() => getTXs(accountHash, offset, false)}
							variant='ghost'
							cursor='pointer'
							justify='center'
							align='center'
							w='100%'>
							More
						</Button>
					) : null}
				</TableContainer>
			) : (
				<Missing which='transaction' />
			)}
		</Flex>
	);
}
