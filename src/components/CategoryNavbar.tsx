import { Nav, Dropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCategories } from '../controllers/category';
import { BsArrowLeft } from 'react-icons/bs';
import { useEffect } from 'react';
import '../assets/styles/CategoryNavbar.css';
import { TCategory } from '../app/store/category';

function CategoryNavbar() {
	const dispatch = useAppDispatch();
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<div
			className='categoryNavbar'
			style={{
				zIndex: 1,
			}}
		>
			<Nav
				variant='tabs'
				className='border-0 bg-white d-none d-sm-flex arb-text'
			>
				{categories?.map(
					(category: TCategory | null, index) =>
						index <= 5 && (
							<Nav.Item key={category?._id}>
								<Nav.Link
									className='btn'
									href={`/categories/${category?._id}`}
								>
									{category?.name}
								</Nav.Link>
							</Nav.Item>
						),
				)}
				{categories && categories?.length > 5 && (
					<Dropdown>
						<Dropdown.Toggle className='viewMore'>
							المزيد <BsArrowLeft />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{categories?.map(
								(
									category: TCategory | null,
									index,
								) =>
									index > 5 && (
										<Nav.Item
											key={category?._id}
										>
											<Nav.Link
												href={`/categories/${category?._id}`}
												className='btn'
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
				className='arb-text bg-white rounded d-sm-none'
			>
				{categories?.map(
					(category: TCategory | null, index) =>
						index <= 2 && (
							<Nav.Item key={category?._id}>
								<Nav.Link
									className='btn'
									href={`/categories/${category?._id}`}
								>
									{category?.name}
								</Nav.Link>
							</Nav.Item>
						),
				)}
				{categories && categories?.length > 2 && (
					<Dropdown>
						<Dropdown.Toggle className='viewMore'>
							المزيد <BsArrowLeft />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{categories?.map(
								(
									category: TCategory | null,
									index,
								) =>
									index > 2 && (
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
						</Dropdown.Menu>
					</Dropdown>
				)}
			</Nav>
		</div>
	);
}

export default CategoryNavbar;
