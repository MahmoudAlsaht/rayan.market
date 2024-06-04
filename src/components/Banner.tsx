/* eslint-disable no-mixed-spaces-and-tabs */
import { TBanner, TBannerImage } from '../app/store/banner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TUser } from '../app/auth/auth';
import { useEffect, useState } from 'react';
import { fetchUser } from '../controllers/user';
import EditBannerForm from './forms/EditBannerForm';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Banner({ banner }: { banner: TBanner | null }) {
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const [webImages, setWebImages] = useState<
		TBannerImage[] | undefined
	>(undefined);

	const [mobileImages, setMobileImages] = useState<
		TBannerImage[] | undefined
	>(undefined);

	const [showEditBannerForm, setShowEditBannerForm] =
		useState(false);

	const handleClickEditBanner = () => {
		setShowEditBannerForm(!showEditBannerForm);
	};

	useEffect(() => {
		dispatch(fetchUser());
		setWebImages(() =>
			banner?.bannerImages?.filter(
				(image) => !image?.showForMobile && image,
			),
		);
		setMobileImages(() =>
			banner?.bannerImages?.filter(
				(image) => image?.showForMobile && image,
			),
		);
	}, [banner?.bannerImages, dispatch]);

	return (
		<main dir='rtl'>
			{banner?.bannerImages &&
				banner?.bannerImages?.length !== 0 && (
					<legend>
						<Box
							sx={{
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
						>
							<Paper sx={{ mb: { sm: 3 } }}>
								{webImages &&
								webImages.length < 2 ? (
									webImages?.map((image) => (
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
									))
								) : (
									<Carousel
										NextIcon={
											<ArrowBackIosIcon />
										}
										PrevIcon={
											<ArrowForwardIosIcon />
										}
										indicators={false}
										swipe
										fullHeightHover
										animation='slide'
									>
										{webImages &&
											webImages.map(
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

						<Box
							sx={{
								display: {
									sm: 'none',
								},
							}}
						>
							<Paper sx={{ mb: { sm: 3 } }}>
								{mobileImages &&
								mobileImages.length < 2 ? (
									mobileImages?.map(
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
										NextIcon={
											<ArrowBackIosIcon />
										}
										PrevIcon={
											<ArrowForwardIosIcon />
										}
										indicators={false}
										swipe
										fullHeightHover
										animation='slide'
									>
										{mobileImages &&
											mobileImages.map(
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
					</legend>
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
		</main>
	);
}

export default Banner;
