import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchBanners } from '../../controllers/banner';
import { BsPlusLg } from 'react-icons/bs';
import AddBannerForm from '../../components/forms/AddBannerForm';
import { Table, Button, Container } from 'react-bootstrap';
import BannerSettings from '../../components/dashboardComponents/BannerSettings';
import { TBanner } from '../../app/store/banner';
import { filteredData } from '../../utils';
import { DocumentData } from 'firebase/firestore';

function BannersActions() {
	const [showAddBannerForm, setShowAddBannerForm] =
		useState(false);
	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const banners: TBanner[] | null = useAppSelector(
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
		return filteredData(
			banners as DocumentData[],
			queryInput,
		);
	}, [banners, queryInput]);

	useEffect(() => {
		dispatch(fetchBanners());
	}, [dispatch]);

	const updateBannersActivation = () => {
		dispatch(fetchBanners());
	};

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
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{filteredBanners?.map(
							(banner, index) => (
								<BannerSettings
									updateBannersActivation={
										updateBannersActivation
									}
									key={banner?.id}
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
}

export default BannersActions;
