import { useAppSelector } from '../../app/hooks';
import { TCart } from '../../app/store/cart';
// import { sumTotalPrice } from '../../utils';
// import { useEffect, useState } from 'react';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../../components/CartProductCard';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CartCheckout() {
	const cart: TCart = useAppSelector((state) => state.cart);
	const navigate = useNavigate();
	// const [totalCartPrice, setTotalCartPrice] = useState(0);

	// useEffect(() => {
	// 	setTotalCartPrice(
	// 		sumTotalPrice(cart?.products as TCartProduct[]),
	// 	);
	// }, [cart?.products]);

	return (
		<div className='m-5'>
			{cart?.products?.map((product) => (
				<CartProductCard
					key={product?.id}
					product={product}
				/>
			))}
			<div className='totalPrice text-muted'>
				{/* Total Cart Price: {totalCartPrice} */}
				<Button
					className='float-end'
					onClick={() => navigate('/checkout')}
				>
					Add Your Info
				</Button>
			</div>
		</div>
	);
}

export default CartCheckout;
