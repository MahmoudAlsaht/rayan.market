import { BsFilter } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { FormEvent } from 'react';

type filterProductsProps = {
	handleQueryChange: (e: FormEvent<HTMLInputElement>) => void;
	queryInput: string;
	handleFilterOptionChange: (option: string) => void;
};

function FilterProducts({
	handleQueryChange,
	queryInput,
	handleFilterOptionChange,
}: filterProductsProps) {
	return (
		<div className='d-flex justify-content-center'>
			<input
				type='search'
				className='searchInput me-2'
				placeholder='search products'
				value={queryInput}
				onChange={handleQueryChange}
			/>
			<Dropdown>
				<Dropdown.Toggle
					id='filterProducts'
					variant='outline-secondary'
				>
					<BsFilter />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item
						key='highest'
						onClick={() =>
							handleFilterOptionChange('highest')
						}
					>
						Highest
					</Dropdown.Item>
					<Dropdown.Item
						key='lowest'
						onClick={() =>
							handleFilterOptionChange('lowest')
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
