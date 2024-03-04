import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
	TCart,
	addUserAndContactToCart,
	emptyTheCart,
} from '../../app/store/cart';
import { TContactInfo } from '../../controllers/contact';
import { TUser } from '../../app/auth/auth';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createAnOrder } from '../../controllers/order';
import { useNavigate } from 'react-router-dom';

type ChooseContactAddressProps = {
	contacts: (TContactInfo | null)[];
	user: TUser | null;
};

export default function ChooseContactAddress({
	contacts,
	user,
}: ChooseContactAddressProps) {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const [selectedAddress, setSelectedAddress] =
		useState<string>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedAddress(e.target.value);
		dispatch(
			addUserAndContactToCart({
				userId: user?._id as string,
				contactId: e.target.value as string,
			}),
		);
	};

	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const checkSelectedAddress = () =>
		selectedAddress != undefined && selectedAddress !== '';

	const handleSubmit = (e: FormEvent<Element> | undefined) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			dispatch(createAnOrder({ cart, user }));
			dispatch(emptyTheCart());
			location.pathname = '/home';
			setIsLoading(false);
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<>
			{contacts && contacts?.length > 0 ? (
				<FormControl>
					<RadioGroup
						row
						aria-labelledby='demo-radio-buttons-group-label'
						name='radio-buttons-group'
					>
						{contacts?.map((contact, index) => (
							<FormControlLabel
								label={null}
								value={contact?._id}
								control={
									<Card
										sx={{
											display: 'flex',
											mb: 2,
										}}
										key={contact?._id}
									>
										<Box
											sx={{
												display: 'flex',
												alignItems:
													'center',
												pl: 1,
												pb: 1,
											}}
										>
											<Radio
												name='defaultAddress'
												value={
													contact?._id
												}
												onChange={
													handleChange
												}
											/>
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection:
													'column',
											}}
										>
											<CardContent
												sx={{
													flex: '1 0 auto',
												}}
											>
												<Typography
													component='div'
													variant='h5'
												>
													{
														contact
															?.address
															.city
													}
													-{index + 1}
												</Typography>
												<Typography
													variant='subtitle1'
													color='text.secondary'
													component='div'
												>
													{
														contact
															?.address
															.street
													}
													<br />
													{
														contact?.contactNumber
													}
												</Typography>
											</CardContent>
										</Box>
									</Card>
								}
							/>
						))}
					</RadioGroup>
				</FormControl>
			) : (
				<main>
					<Card
						sx={{
							width: 200,
							height: 100,
							mb: 5,
							cursor: 'pointer',
						}}
						onClick={() =>
							navigate(
								`/account/profile/${user?.profile}/contact-info/new-contact`,
							)
						}
					>
						<Box>
							<CardContent>
								<Typography
									color='text.secondary'
									component='div'
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<AddIcon
										sx={{ fontSize: 60 }}
									/>
								</Typography>
							</CardContent>
						</Box>
					</Card>
				</main>
			)}

			<LoadingButton
				startIcon='أكمل الطلب'
				loading={isLoading}
				onClick={handleSubmit}
				variant='outlined'
				disabled={!checkSelectedAddress()}
			/>
		</>
	);
}
