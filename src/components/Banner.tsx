/* eslint-disable no-mixed-spaces-and-tabs */
import { TBanner } from '../app/store/banner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TUser } from '../app/auth/auth';
import { useEffect, useState } from 'react';
import { fetchUser } from '../controllers/user';
import EditBannerForm from './forms/EditBannerForm';

function Banner({ banner }: { banner: TBanner | null }) {
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const [showEditBannerForm, setShowEditBannerForm] =
		useState(false);

	const handleClickEditBanner = () => {
		setShowEditBannerForm(!showEditBannerForm);
	};

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<>
			{banner?.bannerImages &&
				banner?.bannerImages?.length !== 0 && (
					<Box>
						<Paper sx={{ mb: { sm: 3 } }}>
							{banner.bannerImages &&
							banner.bannerImages.length < 2 ? (
								banner.bannerImages?.map(
									(image) => (
										<Link
											to={
												banner?.bannerType ===
												'offers'
													? '/offers'
													: image?.link ||
													  '#'
											}
											key={image?._id}
										>
											<Paper
												sx={{
													backgroundColor:
														!image?.path
															? 'none'
															: '#07a180',
													width: '100%',
													height: {
														xs: '190px',
														sm: '250px',
													},
												}}
											>
												<Avatar
													src={
														image?.path
													}
													sx={{
														width: '100%',
														height: {
															xs: '190px',
															sm: '250px',
														},
														opacity:
															'.85',
													}}
													variant='square'
												/>
											</Paper>
										</Link>
									),
								)
							) : (
								<Carousel
									indicators={false}
									swipe
									fullHeightHover
									animation='slide'
								>
									{banner.bannerImages &&
										banner.bannerImages.map(
											(image) => (
												<Link
													key={
														image?._id
													}
													to={
														image?.link ||
														'#'
													}
												>
													<div
														style={{
															backgroundColor:
																'#07a180',
															width: '100%',
															height: '300px',
														}}
													>
														<img
															src={
																image?.path
															}
															style={{
																width: '1200px',
																height: '300px',
															}}
														/>
													</div>
												</Link>
											),
										)}
								</Carousel>
							)}
						</Paper>
					</Box>
				)}

			{(user?.role === 'admin' ||
				user?.role === 'editor') && (
				<legend>
					<Button
						color='warning'
						variant='contained'
						onClick={() => handleClickEditBanner()}
					>
						تعديل اللافتة
					</Button>
					<EditBannerForm
						banner={banner}
						show={showEditBannerForm}
						handleClose={handleClickEditBanner}
					/>
				</legend>
			)}
		</>
	);
}

export default Banner;
