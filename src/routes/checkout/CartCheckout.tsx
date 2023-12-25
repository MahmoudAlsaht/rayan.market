import { useAppSelector } from '../../app/hooks';
import { TCart } from '../../app/store/cart';
// import { sumTotalPrice } from '../../utils';
// import { useEffect, useState } from 'react';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../../components/CartProductCard';

function CartCheckout() {
	const cart: TCart = useAppSelector((state) => state.cart);
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
				<a
					href='/checkout'
					className='float-end btn btn-outline-primary'
				>
					Add Your Info
				</a>
			</div>
		</div>
	);
}

export default CartCheckout;
