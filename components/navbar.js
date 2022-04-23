import {
	Flex,
	Image,
	FormControl,
	InputGroup,
	Input,
	FormErrorMessage,
	InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { AccAddress } from "@terra-money/terra.js";

export default function Navbar() {
	const router = useRouter();
	const [addressHash, setAddress] = useState("");
	const [isError, setIsError] = useState(false);

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
			bg='#0B3693'
			justify='space-between'
			align='center'
			h='6rem'
			w='100%'>
			<Image
				cursor='pointer'
				onClick={() => {
					router.push("landing");
				}}
				ml='1.5rem'
				src='/terra-finder.svg'
				w='10rem'
			/>
			<form
				style={{ width: "30%", marginRight: "1.5rem" }}
				onSubmit={(e) => tryAddress(e, addressHash)}>
				<FormControl isInvalid={isError}>
					<InputGroup>
						<Input
							autoComplete='off'
							fontSize='1rem'
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
									onClick={(e) => tryAddress(e, addressHash)}
									color='lightgrey'
								/>
							}
						/>
					</InputGroup>
					{!isError ? null : (
						<FormErrorMessage>
							The hash entered was not a valid account hash.
						</FormErrorMessage>
					)}
				</FormControl>
			</form>
		</Flex>
	);
}
