/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Container,
	Dialog,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Slide,
	TextField,
	Toolbar,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
	ChangeEvent,
	ReactElement,
	Ref,
	forwardRef,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TProduct } from '../app/store/product';

type SearchDialogProps = {
	handleCloseSearch: () => void;
	openSearch: boolean;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	products: (TProduct | null)[];
	queryInput: string;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function SearchDialog({
	handleCloseSearch,
	openSearch,
	handleChange,
	products,
	queryInput,
}: SearchDialogProps) {
	return (
		<Dialog
			fullScreen
			open={openSearch}
			onClose={handleCloseSearch}
			TransitionComponent={Transition}
		>
			<main dir='rtl'>
				<AppBar
					sx={{
						position: 'relative',
						bgcolor: '#fff',
					}}
				>
					<Toolbar>
						<IconButton
							edge='start'
							sx={{ color: 'black' }}
							onClick={handleCloseSearch}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<TextField
							fullWidth
							variant='standard'
							type='search'
							label='ابحث عن منتج'
							inputProps={{
								style: {
									outline: 'none',
								},
							}}
							sx={{ m: '.7rem' }}
							onChange={handleChange}
						/>
					</Toolbar>
				</AppBar>
				<Container sx={{ margin: '1rem 0' }}>
					<List>
						{products?.length !== 0
							? products.map((product) => (
									<ListItemButton
										key={product?._id}
										href={`/store/products/${product?._id}`}
										sx={{
											'&:hover': {
												color: 'black',
											},
										}}
									>
										<img
											width={150}
											height={150}
											src={
												(product?.productImages !=
													null &&
													product
														?.productImages[0]
														?.path) ||
												''
											}
										/>
										<ListItemText
											primary={
												product?.name
											}
											secondary={
												product?.price
											}
											sx={{
												ml: '1rem',
											}}
										/>
									</ListItemButton>
							  ))
							: `${queryInput} لا توجد نتائج لبحثك`}
					</List>
				</Container>
			</main>
		</Dialog>
	);
}
