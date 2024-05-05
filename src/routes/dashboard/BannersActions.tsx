import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchBanners } from '../../controllers/banner';
import AddBannerForm from '../../components/forms/AddBannerForm';
import BannerSettings from '../../components/dashboardComponents/BannerSettings';
import { TBanner } from '../../app/store/banner';
import { filterData } from '../../utils';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BannersActions = memo(() => {
	const [showAddBannerForm, setShowAddBannerForm] =
		useState(false);
	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);

	const handleClickAddBanner = () => {
		setShowAddBannerForm(!showAddBannerForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredBanners = useMemo(() => {
		return filterData(banners as TBanner[], queryInput);
	}, [banners, queryInput]);

	useEffect(() => {
		dispatch(fetchBanners());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<TableContainer component={Paper} sx={{ ml: 10 }}>
				<Typography variant='h3' sx={{ ml: 3 }}>
					اللافتات
				</Typography>
				<TextField
					type='search'
					label='البحث عن لافتة'
					value={queryInput}
					onChange={handleQueryChange}
				/>

				<IconButton onClick={handleClickAddBanner}>
					<AddIcon />
				</IconButton>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								{banners ? banners.length : '#'}
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{filteredBanners?.map(
							(banner, index) => (
								<BannerSettings
									key={banner?._id}
									banner={banner as TBanner}
									index={index}
								/>
							),
						)}
					</TableBody>
				</Table>
				<IconButton onClick={handleClickAddBanner}>
					<AddIcon />
				</IconButton>
			</TableContainer>

			<AddBannerForm
				show={showAddBannerForm}
				handleClose={handleClickAddBanner}
			/>
		</main>
	);
});

export default BannersActions;
