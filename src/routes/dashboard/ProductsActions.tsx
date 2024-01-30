import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { BsPlusLg } from 'react-icons/bs';
import AddProductForm from '../../components/forms/AddProductForm';
import { Table, Button, Container } from 'react-bootstrap';
import ProductSettings from '../../components/dashboardComponents/ProductSettings';
import { TProduct } from '../../app/store/product';
import { filteredData } from '../../utils';
import { DocumentData } from 'firebase/firestore';

function ProductsSettings() {
	const [showAddProductForm, setShowAddProductForm] =
		useState(false);
	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const products: TProduct[] | null = useAppSelector(
		(state) => state.products,
	);

	const handleClickAddProduct = () => {
		setShowAddProductForm(!showAddProductForm);
	};

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredProducts = useMemo(() => {
		return filteredData(
			products as DocumentData[],
			queryInput,
		);
	}, [products, queryInput]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<>
			<Container>
				<h1 className='ms-5 mt-3'>Products</h1>
				<input
					className='searchInput'
					type='search'
					placeholder='search Products'
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<Button
					className='ms-2'
					onClick={handleClickAddProduct}
					variant='outline-primary'
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
				<Table>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts?.map(
							(product, index) => (
								<ProductSettings
									key={product?.id}
									product={product as TProduct}
									index={index}
								/>
							),
						)}
					</tbody>
				</Table>
				<Button
					variant='outline-primary'
					onClick={handleClickAddProduct}
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
			</Container>

			<AddProductForm
				show={showAddProductForm}
				handleClose={handleClickAddProduct}
			/>
		</>
	);
}

export default ProductsSettings;
