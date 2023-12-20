import { Breadcrumb, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Information({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const navigate = useNavigate();

	return (
		<>
			<Row>
				<Col
					xs={12}
					md={6}
					className='checkoutInformation'
				>
					<h1 className='logo'>mStore</h1>
					<Breadcrumb className='mb-5'>
						<Breadcrumb.Item
							className='text-info'
							onClick={() => navigate('/cart')}
						>
							Cart
						</Breadcrumb.Item>
						<Breadcrumb.Item
							className='text-info'
							active
							onClick={() =>
								handleStep('information')
							}
						>
							Information
						</Breadcrumb.Item>
					</Breadcrumb>
					Information
					<Button
						className='float-end'
						onClick={() => handleStep('payment')}
					>
						Payment
					</Button>
				</Col>

				<Col
					xs={{ order: 'first' }}
					md={{ order: 'last' }}
					className='cartSummary'
				>
					Cart Summary
				</Col>
			</Row>
		</>
	);
}

export default Information;
