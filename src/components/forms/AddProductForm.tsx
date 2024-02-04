import { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import HandleAddProduct from './HandleAddProduct';

type AddProductFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddProductForm({
	show,
	handleClose,
}: AddProductFormProps) {
	const [productType, setProductType] = useState<
		string | null
	>('normal');

	const handleSelect = (selectedKey: string | null) => {
		setProductType(selectedKey);
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className='border-0'>
					<Modal.Title className='text-muted'>
						Add A New Product
					</Modal.Title>
				</Modal.Header>
				<Nav
					variant='tabs'
					defaultActiveKey={productType!}
					onSelect={handleSelect}
				>
					<Nav.Item>
						<Nav.Link eventKey='normal'>
							Create A Normal Product
						</Nav.Link>
					</Nav.Item>

					<Nav.Item>
						<Nav.Link eventKey='offer'>
							Create An Offer
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<HandleAddProduct
					formType={productType}
					handleClose={handleClose}
				/>
			</Modal>
		</>
	);
}

export default AddProductForm;
