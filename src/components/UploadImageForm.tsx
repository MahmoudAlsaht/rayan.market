import { Col, Form, Row, Image } from 'react-bootstrap';
import defaultAvatar from '../default_avatar.png';
import { ChangeEvent, FormEvent, useState } from 'react';
import { uploadImage } from '../firebase/firestore/uploadFile';
import { IUser } from '../controllers/user';

function UploadImageForm({
	profileOwner,
}: {
	profileOwner: IUser;
}) {
	const [reviewImage, setReviewImage] = useState(
		profileOwner?.photoURL,
	);
	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (!e.target.files) return;
		const files: FileList | null = e.target.files;
		setSelectedImage(files[0]);
		setReviewImage(URL.createObjectURL(files[0]));
	};

	const handleFileSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await uploadImage(
			selectedImage,
			profileOwner?.username as string,
			profileOwner?.uid as string,
		);
	};

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

export default UploadImageForm;
