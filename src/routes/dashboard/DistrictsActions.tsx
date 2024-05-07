import { ChangeEvent, memo, useEffect, useState } from 'react';
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
import DistrictSettings from '../../components/dashboardComponents/DistrictSettings';

const DistrictsActions = memo(() => {
	const [showDistrictForm, setShowDistrictForm] =
		useState(false);

	const [queryInput, setQueryInput] = useState('');

	const [districts, setDistricts] = useState<
		(TDistrict | null)[]
	>([]);

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
		const getDistricts = async () => {
			const fetchedDistricts = await fetchDistricts();
			setDistricts(fetchedDistricts);
		};
		getDistricts();
	}, []);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: { sm: 10 } }}
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
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									{districts
										? districts.length
										: '#'}
								</TableCell>
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
				addToDistricts={addToDistricts}
			/>
		</>
	);
});

export default DistrictsActions;
