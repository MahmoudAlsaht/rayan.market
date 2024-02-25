/* eslint-disable no-mixed-spaces-and-tabs */

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import {
	useState,
	ChangeEvent,
	FormEvent,
	useMemo,
	useEffect,
} from 'react';
import { TProduct } from '../app/store/product';
import { filterData } from '../utils';
import { fetchFilteredProducts } from '../controllers/product';
import SearchDialog from './SearchDialog';
import FilterMenu from './FilterMenu';

export default function FilterProducts() {
	const [openSearch, setOpenSearch] = useState(false);

	const handleClickOpenSearch = () => {
		setOpenSearch(true);
	};

	const handleCloseSearch = () => {
		setOpenSearch(false);
	};

	const [queryInput, setQueryInput] = useState('');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const [products, setProducts] = useState<
		(TProduct | null)[]
	>([]);

	const [showSearchResult, setShowSearchResult] =
		useState(false);

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
		const getProducts = async () => {
			const fetchedProducts =
				await fetchFilteredProducts();
			setProducts(fetchedProducts);
		};
		getProducts();
	}, []);

	return (
		<Paper
			component='form'
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				border: 'none',
				bgcolor: 'inherit',
			}}
		>
			<IconButton onClick={handleClickOpenSearch}>
				<SearchIcon />
			</IconButton>

			<FilterMenu />

			<SearchDialog
				products={filteredProducts}
				openSearch={openSearch}
				queryInput={queryInput}
				handleChange={handleChange}
				handleCloseSearch={handleCloseSearch}
			/>
		</Paper>
	);
}
