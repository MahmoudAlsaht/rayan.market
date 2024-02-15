/* eslint-disable no-mixed-spaces-and-tabs */
import { BsFilter } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	TProduct,
	sortProductsBasedOnPrice,
} from '../app/store/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	// fetchFilteredProducts,
	fetchProducts,
} from '../controllers/product';
import { filterData } from '../utils';

function FilterProducts() {
	const [showSearchResult, setShowSearchResult] =
		useState(false);

	const [queryInput, setQueryInput] = useState('');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	// const [products, setProducts] = useState<
	// 	(TProduct | null)[]
	// >([]);

	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);
	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setShowSearchResult(e.target.value !== '');
		handleQueryChange(e);
		console.log(showSearchResult);
	};

	const filteredProducts = useMemo(() => {
		return filterData(
			products,
			queryInput,
		) as (TProduct | null)[];
	}, [products, queryInput]);

	useEffect(() => {
		dispatch(fetchProducts);
	}, [dispatch]);

	return (
		<div className='w-100 bg-white d-flex justify-content-center'>
			<Dropdown show={showSearchResult}>
				<Dropdown.Toggle
					variant='none'
					className='searchInputToggle border-0 '
				>
					<input
						type='search'
						className='searchInput'
						placeholder='search products'
						value={queryInput}
						onChange={handleChange}
					/>
				</Dropdown.Toggle>
				<Dropdown.Menu className='w-100'>
					{filteredProducts
						? filteredProducts?.map((product) => (
								<Dropdown.Item
									href={`/store/products/${product?._id}`}
									key={product?._id}
								>
									<img
										width='50'
										height='50'
										src={
											(product?.productImages &&
												product
													?.productImages[0]
													?.path) ||
											''
										}
										alt={`${product?.name}'s image`}
										className='mx-2'
									/>
									{product?.name}
								</Dropdown.Item>
						  ))
						: null}
				</Dropdown.Menu>
			</Dropdown>

			<Dropdown>
				<Dropdown.Toggle
					id='filterProducts'
					variant='outline-secondary'
					size='sm'
					style={{ marginTop: '7px' }}
				>
					<BsFilter />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item
						key='highest'
						onClick={() =>
							dispatch(
								sortProductsBasedOnPrice(
									'highest',
								),
							)
						}
					>
						Highest
					</Dropdown.Item>
					<Dropdown.Item
						key='lowest'
						onClick={() =>
							dispatch(
								sortProductsBasedOnPrice(
									'lowest',
								),
							)
						}
					>
						Lowest
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export default FilterProducts;
