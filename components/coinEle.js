import { Box, Flex, Image } from "@chakra-ui/react";

export default function CoinEle({ name, amount, toUSD }) {
	return (
		<Flex
			borderRadius='.25rem'
			border='solid #D9DEF0 .1rem'
			justify='space-between'
			p='2rem'
			mx='2rem'>
			<Flex align='center'>
				<Image src={`/coins/${name}.png`} boxSize='2rem' />
				<Box pl='.5rem' textTransform='uppercase'>
					{name}
				</Box>
			</Flex>
			<Flex flexDir='column'>
				<Box textTransform='uppercase'>
					{amount} {name}
				</Box>
				<Box>to {toUSD} USD</Box>
			</Flex>
		</Flex>
	);
}
