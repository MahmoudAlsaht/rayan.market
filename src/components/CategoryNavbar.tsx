import {
	Nav,
	Dropdown,
	Navbar,
	Container,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCategories } from '../controllers/category';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';
import '../assets/styles/CategoryNavbar.css';
import { TCategory } from '../app/store/category';
import FilterProducts from './FilterProducts';

function CategoryNavbar() {
	const dispatch = useAppDispatch();
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<FilterProducts />
			<Navbar
				className='bg-white'
				sticky='top'
				style={{
					zIndex: 1,
				}}
			>
				<Container>
					<Nav
						variant='tabs'
						className='border-0 d-none d-sm-flex'
					>
						{categories?.map(
							(
								category: TCategory | null,
								index,
							) =>
								index <= 5 && (
									<Nav.Item
										key={category?._id}
									>
										<Nav.Link
											className='btn'
											href={`/categories/${category?._id}`}
										>
											{category?.name}
										</Nav.Link>
									</Nav.Item>
								),
						)}
						{categories &&
							categories?.length > 5 && (
								<Dropdown>
									<Dropdown.Toggle
										className='text-info'
										id='dropdown-basic'
									>
										more <BsArrowRight />
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{categories?.map(
											(
												category: TCategory | null,
												index,
											) =>
												index > 5 && (
													<Nav.Item
														key={
															category?._id
														}
													>
														<Nav.Link
															href={`/categories/${category?._id}`}
															className='btn'
														>
															{
																category?.name
															}
														</Nav.Link>
													</Nav.Item>
												),
										)}
									</Dropdown.Menu>
								</Dropdown>
							)}
					</Nav>

					<Nav
						variant='tabs'
						className='rounded d-sm-none'
					>
						{categories?.map(
							(
								category: TCategory | null,
								index,
							) =>
								index <= 2 && (
									<Nav.Item
										key={category?._id}
									>
										<Nav.Link
											className='btn'
											href={`/categories/${category?._id}`}
										>
											{category?.name}
										</Nav.Link>
									</Nav.Item>
								),
						)}
						{categories &&
							categories?.length > 2 && (
								<Dropdown>
									<Dropdown.Toggle
										className='text-info'
										id='dropdown-basic'
									>
										more <BsArrowRight />
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{categories?.map(
											(
												category: TCategory | null,
												index,
											) =>
												index > 2 && (
													<Nav.Item
														key={
															category?._id
														}
													>
														<Nav.Link
															className='btn'
															href={`/categories/${category?._id}`}
														>
															{
																category?.name
															}
														</Nav.Link>
													</Nav.Item>
												),
										)}
									</Dropdown.Menu>
								</Dropdown>
							)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default CategoryNavbar;
