import { Nav, Container, Dropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCategories } from '../controllers/category';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';
import '../assets/styles/CategoryNavbar.css';
import { TCategory } from '../app/store/category';

function CategoryNavbar() {
	const dispatch = useAppDispatch();
	const categories: TCategory[] | null = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Container fluid>
			<Nav
				variant='tabs'
				className='justify-content-center mb-5 bg-white rounded d-none d-sm-flex'
			>
				{categories?.map(
					(category: TCategory, index) =>
						index <= 7 && (
							<Nav.Item key={category?.id}>
								<Nav.Link
									href={`/store/categories/${category?.id}/products`}
								>
									{category?.name}
								</Nav.Link>
							</Nav.Item>
						),
				)}
				{categories && categories?.length > 7 && (
					<Dropdown>
						<Dropdown.Toggle
							className='text-info'
							id='dropdown-basic'
						>
							more <BsArrowRight />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{categories?.map(
								(category: TCategory, index) =>
									index > 7 && (
										<Nav.Item
											key={category?.id}
										>
											<Nav.Link
												href={`/store/categories/${category?.id}/products`}
											>
												{category?.name}
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
				className='justify-content-center mb-5 bg-white rounded d-sm-none'
			>
				{categories?.map(
					(category: TCategory, index) =>
						index <= 2 && (
							<Nav.Item key={category?.id}>
								<Nav.Link
									href={`/store/categories/${category?.id}/products`}
								>
									{category?.name}
								</Nav.Link>
							</Nav.Item>
						),
				)}
				{categories && categories?.length > 2 && (
					<Dropdown>
						<Dropdown.Toggle
							className='text-info'
							id='dropdown-basic'
						>
							more <BsArrowRight />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{categories?.map(
								(category: TCategory, index) =>
									index > 2 && (
										<Nav.Item
											key={category?.id}
										>
											<Nav.Link
												href={`/store/categories/${category?.id}/products`}
											>
												{category?.name}
											</Nav.Link>
										</Nav.Item>
									),
							)}
						</Dropdown.Menu>
					</Dropdown>
				)}
			</Nav>
		</Container>
	);
}

export default CategoryNavbar;
