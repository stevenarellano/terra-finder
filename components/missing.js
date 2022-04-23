import { Flex } from "@chakra-ui/react";

export default function Missing({ which }) {
	return (
		<Flex py='3rem' w='100%' h='100%' justify='center' align='center'>
			There are no {which} available under this account.
		</Flex>
	);
}
