import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DocumentData } from 'firebase/firestore';
import { fetchProducts } from '../../controllers/product';
import '../../assets/styles/ShowProduct.css';

import { BsCart } from 'react-icons/bs';
import ProductImageCarousel from '../../components/ProductImageCarousel';

function ShowProduct() {
	const { productId } = useParams();
	const [product, setProduct] = useState<
		TProduct | undefined
	>();

	const dispatch = useAppDispatch();
	const products: (DocumentData | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
		setProduct(() => {
			return products?.filter(
				(product) =>
					productId === product?.id && product,
			)[0] as TProduct;
		});
	}, [dispatch, productId, products]);

	return (
		<Container fluid>
			<Row>
				<Col xs={12} md={6}>
					<ProductImageCarousel
						product={product as TProduct}
					/>
				</Col>
				<Col xs={12} md={6} className='mt-5 mt-md-0'>
					<h3 className='text-muted'>
						{product?.name}
					</h3>
					<h4 className='text-muted'>
						{product?.price} JOD
					</h4>
					<hr className='mb-5' />
					<Button
						size='lg'
						variant='outline-primary'
						className='w-100'
					>
						Add To Cart
						<BsCart className='ms-2' />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default ShowProduct;
