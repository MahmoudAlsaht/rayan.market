import {
	FormEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchBanners } from '../../controllers/banner';
import { BsPlusLg } from 'react-icons/bs';
import AddBannerForm from '../../components/forms/AddBannerForm';
import { Table, Button, Container } from 'react-bootstrap';
import BannerSettings from '../../components/dashboardComponents/BannerSettings';
import { TBanner } from '../../app/store/banner';
import { filterData } from '../../utils';
import { DocumentData } from 'firebase/firestore';

const BannersActions = memo(() => {
	const [showAddBannerForm, setShowAddBannerForm] =
		useState(false);
	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);

	const handleClickAddBanner = () => {
		setShowAddBannerForm(!showAddBannerForm);
	};

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredBanners = useMemo(() => {
		return filterData(banners as DocumentData[], queryInput);
	}, [banners, queryInput]);

	useEffect(() => {
		dispatch(fetchBanners());
	}, [dispatch]);

	return (
		<>
			<Container>
				<h1 className='ms-5 mt-3'>Banners</h1>
				<input
					className='searchInput'
					type='search'
					placeholder='search Banners'
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<Button
					onClick={handleClickAddBanner}
					variant='outline-primary'
					className='ms-2'
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
				<Table>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>Activated</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredBanners?.map(
							(banner, index) => (
								<BannerSettings
									key={banner?._id}
									banner={banner as TBanner}
									index={index}
								/>
							),
						)}
					</tbody>
				</Table>
				<Button
					variant='outline-primary'
					onClick={handleClickAddBanner}
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
			</Container>

			<AddBannerForm
				show={showAddBannerForm}
				handleClose={handleClickAddBanner}
			/>
		</>
	);
});

export default BannersActions;
