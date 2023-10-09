import { Col, Form, Row } from 'react-bootstrap';

export function UploadImageForm() {
	return (
		<Form onSubmit={handleFileSubmit} className='mb-5'>
			<h3 className='text-muted mb-3'>Profile Image</h3>
			<Row>
				<Col md={2}>
					<Image
						className='rounded-circle'
						src={
							reviewImage ||
							profileOwner?.photoURL ||
							defaultAvatar
						}
						width={130}
						height={130}
						alt='profileImage'
					/>
				</Col>
				<Col md={4}>
					<Form.Group
						controlId='profileImage'
						className='mt-2 mb-3'
					>
						<Form.Control
							type='file'
							onChange={handleFileChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Control
							type='submit'
							value='Update'
							className='btn btn-outline-primary'
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
}
