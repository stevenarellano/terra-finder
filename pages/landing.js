import {
	Box,
	Flex,
	Input,
	Image,
	IconButton,
	InputGroup,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { AccAddress } from "@terra-money/terra.js";
import { useRouter } from "next/router";

export default function Landing() {
	const [addressHash, setAddress] = useState("");
	const [isError, setIsError] = useState(false);
	const router = useRouter();

	const tryAddress = async (e, addr) => {
		e.preventDefault();
		const validAddr = AccAddress.validate(addr);
		if (!validAddr) {
			setIsError(true);
			return;
		}
		setIsError(false);
		router.push({ pathname: "account", query: { hash: addr } });
	};

	const handleType = (e) => {
		setAddress(e.target.value);
	};

	return (
		<Flex
			flexDir='column'
			align='center'
			justify='center'
			h='100vh'
			w='100vw'
			bg='#0B3693'>
			<Flex flexDir='column' align='center'>
				<Image
					position='absolute'
					left='auto'
					top='20%'
					src='/terra-finder.svg'
					w='20rem'
				/>
				<form onSubmit={(e) => tryAddress(e, addressHash)}>
					<FormControl isInvalid={isError}>
						<InputGroup>
							<Input
								autoComplete='off'
								fontSize='1.5rem'
								w='55vw'
								variant='flushed'
								color='white'
								borderBottomColor='whtie'
								placeholder='Search Accounts'
								name='address'
								type='text'
								value={addressHash}
								onChange={(e) => handleType(e)}
							/>
							<InputRightElement
								children={
									<SearchIcon
										cursor='pointer'
										onClick={(e) =>
											tryAddress(e, addressHash)
										}
										color='lightgrey'
									/>
								}
							/>
						</InputGroup>
						{!isError ? (
							<FormHelperText>
								Please enter the hash of a Terra account.
							</FormHelperText>
						) : (
							<FormErrorMessage>
								The hash entered was not a valid account hash.
							</FormErrorMessage>
						)}
					</FormControl>
				</form>
			</Flex>
		</Flex>
	);
}
