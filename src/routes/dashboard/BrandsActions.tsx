import {
	FormEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TBrand } from '../../app/store/brand';
import { fetchBrands } from '../../controllers/brand';
import { BsPlusLg } from 'react-icons/bs';
import BrandForm from '../../components/forms/AddBrandForm';
import { Table, Button, Container } from 'react-bootstrap';
import BrandSettings from '../../components/dashboardComponents/BrandSettings';
import { filterData } from '../../utils';

const BrandsActions = memo(() => {
	const [showBrandForm, setShowBrandForm] = useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	const handleClickAddBrand = () => {
		setShowBrandForm(!showBrandForm);
	};

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredBrands = useMemo(() => {
		return filterData(brands as any, queryInput);
	}, [brands, queryInput]);

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	return (
		<>
			<Container>
				<h1 className='ms-5 mt-5'>Brands</h1>
				<input
					className='searchInput'
					type='search'
					placeholder='search brands'
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<Button
					className='ms-2'
					onClick={handleClickAddBrand}
					variant='outline-primary'
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
				<Table>
					<thead>
						<tr>
							<th scope='col'></th>
							<th scope='col'>Name</th>
							<th scope='col'>Image</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{filteredBrands?.map((brand, index) => (
							<BrandSettings
								key={brand?._id}
								brand={brand}
								index={index}
							/>
						))}
					</tbody>
				</Table>
				<Button
					variant='outline-primary'
					onClick={handleClickAddBrand}
					className='mb-5'
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
			</Container>

			<BrandForm
				show={showBrandForm}
				handleClose={handleClickAddBrand}
			/>
		</>
	);
});

export default BrandsActions;
