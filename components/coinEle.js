import { Box, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";

export default function CoinEle({ name, amount }) {
	const [imageFound, setImageFound] = useState(true);

	switch (name) {
		case "krw":
			name = "KRT";
			break;
		case "aud":
			name = "AUT";
			break;
		case "cad":
			name = "CAT";
			break;
		case "chf":
			name = "CHT";
			break;
		case "cny":
			name = "CNT";
			break;
		case "dkk":
			name = "DKT";
			break;
		case "eur":
			name = "EUT";
			break;
		case "gbp":
			name = "GBT";
			break;
		case "idr":
			name = "IDT";
			break;
		case "inr":
			name = "INT";
			break;
		case "jpy":
			name = "JPT";
			break;
		case "php":
			name = "PHT";
			break;
		case "sek":
			name = "SET";
			break;
		case "thb":
			name = "THT";
			break;
		case "usd":
			name = "UST";
			break;
		default:
			break;
	}

	return (
		<Flex
			borderRadius='.25rem'
			border='solid #D9DEF0 .1rem'
			justify='space-between'
			p='2rem'
			mx='2rem'>
			<Flex align='center'>
				<Image
					src={
						imageFound
							? `/coins/${name}.png`
							: "/coins/not-found.png"
					}
					onError={() => setImageFound(false)}
					boxSize='2rem'
				/>
				<Box
					color='#0B3693'
					pl='.5rem'
					maxW='30rem'
					textTransform='uppercase'>
					{name}
				</Box>
			</Flex>
			<Flex justify='center' flexDir='column'>
				<Flex
					color='#0B3693'
					overflowX='hidden'
					display='inline'
					whiteSpace='nowrap'
					overflowY='hidden'
					maxW='8rem'
					textTransform='uppercase'>
					{amount / 1000000} {name}
				</Flex>
			</Flex>
		</Flex>
	);
}
