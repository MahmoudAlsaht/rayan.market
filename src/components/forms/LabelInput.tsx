import {
	Box,
	Button,
	Chip,
	FormGroup,
	Grid,
	Menu,
	MenuItem,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	TLabel,
	createLabel,
	getLabels,
} from '../../controllers/label';

export default function LabelInput() {
	const [selectedLabels, setSelectedLabels] = useState<
		TLabel[] | null
	>(null);

	const [labels, setLabels] = useState<TLabel[] | null>(null);

	const labelRef = useRef<HTMLInputElement>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(
		null,
	);
	const open = Boolean(anchorEl);

	const handleClickLabelMenu = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseLabelMenu = () => {
		setAnchorEl(null);
	};

	const handleAddLabel = async () => {
		const label = await createLabel({
			labelValue: labelRef.current?.value as string,
		});

		setSelectedLabels((prevLabels) => {
			if (prevLabels)
				return [...prevLabels, label] as TLabel[];
			return [label] as TLabel[];
		});

		labelRef.current!.value = '';
	};

	const handleDelete = () => null;

	useEffect(() => {
		const fetchLabels = async () => {
			const fetchedLabels = await getLabels();
			setLabels(fetchedLabels);
		};
		fetchLabels();
	}, [setSelectedLabels]);

	return (
		<>
			<Box sx={{ m: 5 }}>
				{selectedLabels?.map((label) => (
					<Chip
						key={label?._id}
						variant='outlined'
						label={label.value}
						onDelete={handleDelete}
					/>
				))}
			</Box>
			<Grid
				container
				sx={{ alignItems: 'center' }}
				spacing={0}
			>
				<Grid xs={6}>
					<FormGroup sx={{ ml: 5 }}>
						<TextField
							required
							type='text'
							label='الكلمات المفتاحية'
							inputRef={labelRef}
						/>
					</FormGroup>
				</Grid>

				<Grid xs={1} sx={{ ml: 0.5 }}>
					<Button
						size='large'
						id='label-button'
						variant='contained'
						aria-controls={
							open ? 'label-menu' : undefined
						}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClickLabelMenu}
						endIcon={<KeyboardArrowDownIcon />}
					/>
					<Menu
						id='label-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleCloseLabelMenu}
						MenuListProps={{
							'aria-labelledby': 'label-button',
						}}
					>
						{labels?.map((label) => (
							<MenuItem
								key={label?._id}
								onClick={() => {
									setSelectedLabels(
										(prevLabels) => {
											if (prevLabels) {
												return [
													...prevLabels.filter(
														(
															optionLabel,
														) => {
															return (
																optionLabel?._id !==
																	label?._id &&
																optionLabel
															);
														},
													),
													label,
												];
											}
											return [
												label,
											] as TLabel[];
										},
									);
									handleCloseLabelMenu();
								}}
							>
								{label.value}
							</MenuItem>
						))}
					</Menu>
				</Grid>

				<Grid xs={1}>
					<Button
						variant='outlined'
						color='primary'
						onClick={handleAddLabel}
					>
						إضافة
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
