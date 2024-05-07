import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TPromoCode } from '../../app/store/promo';
import { fetchPromos } from '../../controllers/promo';
import AddIcon from '@mui/icons-material/Add';
import AddPromoForm from '../../components/forms/AddPromoForm';
import PromoSettings from '../../components/dashboardComponents/PromoSettings';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Typography,
} from '@mui/material';

const PromosActions = memo(() => {
	const [showPromoForm, setShowPromoForm] = useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();

	const promos: (TPromoCode | null)[] = useAppSelector(
		(state) => state.promos,
	);

	const handleClickAddBrand = () => {
		setShowPromoForm(!showPromoForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	useEffect(() => {
		dispatch(fetchPromos());
	}, [dispatch]);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: { sm: 10 } }}
				>
					<Typography variant='h3' sx={{ ml: 3 }}>
						كوبونات الخصم
					</Typography>
					<TextField
						type='search'
						label='ابحث عن كوبون'
						value={queryInput}
						onChange={handleQueryChange}
						sx={{ ml: 3 }}
					/>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									{promos
										? promos.length
										: '#'}
								</TableCell>
								<TableCell>Code</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{promos?.map((promo, index) => (
								<PromoSettings
									key={promo?._id}
									promo={promo}
									index={index}
								/>
							))}
						</TableBody>
					</Table>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
				</TableContainer>
			</main>

			<AddPromoForm
				show={showPromoForm}
				handleClose={handleClickAddBrand}
			/>
		</>
	);
});

export default PromosActions;
