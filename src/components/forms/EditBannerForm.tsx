import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { updateBanner } from '../../controllers/banner';
import { fetchBannersImages } from '../../controllers/bannerImages';
import { useAppDispatch } from '../../app/hooks';
import { TBanner, TBannerImage } from '../../app/store/banner';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { TPreviewImage } from './EditProductForm';
import AddImageLink from './AddImageLink';

type EditBannerFormProps = {
	show: boolean;
	handleClose: () => void;
	banner: TBanner;
	isLoading: boolean;
};

function EditBannerForm({
	show,
	handleClose,
	banner,
}: EditBannerFormProps) {
	const dispatch = useAppDispatch();
	const [previewImages, setPreviewImages] = useState<
		any[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);

	const [bannerImages, setBannerImages] = useState<
		(TBannerImage | null)[]
	>([]);

	useEffect(() => {
		const updateImages = async () => {
			try {
				const images = await fetchBannersImages(
					banner?._id,
				);
				setBannerImages(images);
			} catch (e: any) {
				console.log(e);
			}
		};
		updateImages();
	}, [banner?._id]);

	const handleRemovePreviewImages = (id: string) => {
		setPreviewImages((prevPreviewImages) => {
			return prevPreviewImages!.filter((image) => {
				return image.name !== id && image;
			});
		});

		const dataTransfer = new DataTransfer();
		for (const file of selectedImages!) {
			id !== file.name && dataTransfer.items.add(file);
		}
		setSelectedImages(dataTransfer.files);
	};

	const handleRemoveBannerImages = (id: string) => {
		setBannerImages((prevBannerImages) => {
			return prevBannerImages!.filter(
				(image: TBannerImage | null) => {
					return (
						image?._id !== id &&
						(image as TBannerImage | null)
					);
				},
			);
		});
	};

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const bannerNameRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			bannerNameRef.current?.value === '' ||
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: false,
					message: 'invalid fields',
				});
			} else {
				const bannerName = bannerNameRef.current?.value;
				await dispatch(
					updateBanner({
						bannerId: banner?._id,
						currName: banner?.name,
						data: {
							bannerName,
							images: selectedImages,
						},
					}),
				);
				setIsLoading(false);
				handleClose();
				bannerNameRef.current!.value = '';
				setSelectedImages(null);
				setPreviewImages(null);
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (
			e.target.files &&
			bannerImages &&
			e.target.files!.length + bannerImages!.length > 4
		) {
			setPreviewImages(null);
			setSelectedImages(null);
			setValidated(false);
			setError({
				status: false,
				message: 'Yoy Can Only Upload Up to 4 Images',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
			const files: FileList | null = e.target.files!;
			setSelectedImages(files);
			const images: TPreviewImage[] = [];
			for (const file of files) {
				images.push({
					url: URL.createObjectURL(file),
					name: file.name,
				});
			}
			setPreviewImages(images);
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				className='productEditForm'
			>
				<Form
					noValidate
					validated={!validated}
					onSubmit={handleSubmit}
					style={{ width: '100%' }}
				>
					<Modal.Body className='text-muted'>
						<Modal.Header closeButton>
							<Modal.Title>
								Edit{' '}
								<span className='text-warning'>
									{banner?.name}
								</span>
							</Modal.Title>
						</Modal.Header>
						<ErrorComponent error={error} />

						<Form.Group
							className='mt-3 mb-3'
							controlId='productNameFormInput'
						>
							<Form.Control
								onChange={handleChange}
								type='text'
								placeholder='Product Name'
								ref={bannerNameRef}
								defaultValue={banner?.name}
							/>
						</Form.Group>

						<Form.Group
							controlId='productImagesFormInput'
							className='mt-2 mb-3'
						>
							<Form.Control
								type='file'
								multiple
								onChange={handleFileChange}
							/>
						</Form.Group>

						{previewImages &&
							previewImages?.map((image) => (
								<PreviewImage
									type='PreviewImage'
									key={image?.name}
									path={image?.url}
									imageId={image?.name}
									handleRemove={
										handleRemovePreviewImages
									}
								/>
							))}
						<br />
						{bannerImages &&
							bannerImages?.map((image) => (
								<AddImageLink
									image={image}
									bannerId={banner?._id}
									setIsLoading={setIsLoading}
									isLoading={isLoading}
									handleRemoveBannerImages={
										handleRemoveBannerImages
									}
								/>
							))}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleClose}
						>
							Close
						</Button>
						<LoadingButton
							type='submit'
							body='Update'
							variant={
								!validated
									? 'secondary'
									: 'primary'
							}
							className={'w-50'}
							isLoading={isLoading}
							disabled={!validated}
						/>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default EditBannerForm;
