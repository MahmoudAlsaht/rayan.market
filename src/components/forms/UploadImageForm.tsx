import { Col, Form, Row, Image } from 'react-bootstrap';
import defaultAvatar from '../../default_avatar.png';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import { updateProfileImage } from '../../controllers/profile';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import { useParams } from 'react-router-dom';

function UploadImageForm({
	isLoading,
	setIsLoading,
	profile,
}: {
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
	profile: TProfile | null;
}) {
	const dispatch = useAppDispatch();
	const { profileId } = useParams();

	const [reviewImage, setReviewImage] = useState(
		profile?.profileImage?.path,
	);
	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);

	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const passwordRef = useRef<HTMLInputElement>(null);

	const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files: FileList | null = e.target.files;
		setSelectedImage(files[0]);
		setReviewImage(URL.createObjectURL(files[0]));
	};

	const handleFileChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLInputElement;

		updateImage(e as ChangeEvent<HTMLInputElement>);

		if (
			passwordRef.current?.value === '' ||
			selectedImage == null ||
			selectedImage.name === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	const handleFileSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				await dispatch(
					updateProfileImage({
						imageFile: selectedImage,
						password: passwordRef.current
							?.value as string,
						profileId: profileId as string,
					}),
				);
				setIsLoading(false);
				setSelectedImage(null);
				passwordRef.current!.value = '';
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	return (
		<Form
			onSubmit={handleFileSubmit}
			className='mb-5'
			noValidate
			validated={!validated}
		>
			<h3 className='text-muted mb-3'>Profile Image</h3>

			<ErrorComponent error={error} />

			<Row>
				<Col md={3} lg={2}>
					<Image
						className='rounded-circle'
						src={
							reviewImage ||
							profile?.profileImage?.path ||
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
							required
						/>
					</Form.Group>

					<Form.Group
						className='mb-3'
						controlId='passwordUploadImageFormInput'
					>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							onChange={handleFileChange}
							type='password'
							placeholder='at least 6 char'
							ref={passwordRef}
						/>
					</Form.Group>

					<Form.Group className='mb-3'>
						<LoadingButton
							type='submit'
							body='Save'
							variant='primary'
							isLoading={isLoading}
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
}

export default UploadImageForm;
