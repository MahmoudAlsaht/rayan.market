import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { BsPlusLg } from 'react-icons/bs';
import AddProductForm from '../../components/forms/AddProductForm';
import { Table, Button, Container } from 'react-bootstrap';
import ProductSettings from '../../components/dashboardComponents/ProductSettings';
import { Product } from '../../app/store/product';

function ProductsSettings() {
	const [showAddProductForm, setShowAddProductForm] =
		useState(false);

	const dispatch = useAppDispatch();
	const products: Product[] | null = useAppSelector(
		(state) => state.products,
	);

	const handleClickAddProduct = () => {
		setShowAddProductForm(!showAddProductForm);
	};

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<>
			<Container>
				<Table>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>
								<Button
									onClick={
										handleClickAddProduct
									}
									variant='outline-primary'
								>
									<BsPlusLg className='floatingButtonIcon' />
								</Button>
							</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, index) => (
							<ProductSettings
								key={product?.id}
								productId={product?.id}
								index={index}
								productName={product?.name}
							/>
						))}
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
