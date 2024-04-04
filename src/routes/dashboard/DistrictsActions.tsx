import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TDistrict } from '../../controllers/district';
import { fetchDistricts } from '../../controllers/district';
import AddIcon from '@mui/icons-material/Add';
import AddDistrictForm from '../../components/forms/AddDistrictForm';
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
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';
import DistrictSettings from '../../components/dashboardComponents/DistrictSettings';

const DistrictsActions = memo(() => {
	const [showDistrictForm, setShowDistrictForm] =
		useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();

	const [districts, setDistricts] = useState<
		(TDistrict | null)[]
	>([]);

	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const handleClickAddBrand = () => {
		setShowDistrictForm(!showDistrictForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const addToDistricts = (newDistrict: TDistrict | null) => {
		setDistricts((prevDistricts) => [
			...prevDistricts,
			newDistrict,
		]);
	};

	const removeFromDistricts = (districtId: string) => {
		setDistricts((prevDistricts) => {
			return prevDistricts.filter(
				(district) =>
					district?._id !== districtId && district,
			);
		});
	};

	const updateDistricts = (
		updatedDistrict: TDistrict | null,
	) => {
		setDistricts((prevDistricts) => {
			return prevDistricts.map((district) =>
				district?._id === updatedDistrict?._id
					? updatedDistrict
					: district,
			);
		});
	};

	useEffect(() => {
		dispatch(fetchUser());
		const getDistricts = async () => {
			const fetchedDistricts = await fetchDistricts(
				user?.profile as string,
			);
			setDistricts(fetchedDistricts);
		};
		getDistricts();
	}, [dispatch, user?.profile]);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: 10 }}
				>
					<Typography variant='h3' sx={{ ml: 3 }}>
						المناطق المدعومة
					</Typography>
					<TextField
						type='search'
						label='ابحث عن منطقة'
						value={queryInput}
						onChange={handleQueryChange}
						sx={{ ml: 3 }}
					/>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell>name</TableCell>
								<TableCell>
									shipping fees
								</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{districts?.map(
								(district, index) => (
									<DistrictSettings
										key={district?._id}
										district={district}
										index={index}
										profileId={
											user?.profile as string
										}
										updateDistricts={
											updateDistricts
										}
										removeFromDistricts={
											removeFromDistricts
										}
									/>
								),
							)}
						</TableBody>
					</Table>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
				</TableContainer>
			</main>

			<AddDistrictForm
				show={showDistrictForm}
				handleClose={handleClickAddBrand}
				profileId={user?.profile as string}
				addToDistricts={addToDistricts}
			/>
		</>
	);
});

export default DistrictsActions;
