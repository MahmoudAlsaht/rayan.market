import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
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

	const [selectedAddress, setSelectedAddress] =
		useState<string>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedAddress(e.target.value);
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
			dispatch(
				addUserAndContactToCart({
					userId: user?._id as string,
					contactId: selectedAddress as string,
				}),
			);
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
											alignItems: 'center',
											pl: 1,
											pb: 1,
										}}
									>
										<Radio
											name='defaultAddress'
											value={contact?._id}
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
												-{index}
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
