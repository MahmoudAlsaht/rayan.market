import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
} from '@mui/material';
import { RefObject, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type ProductOfferHandlingProps = {
	isOffer: boolean;
	handleIsOffer: () => void;
	handleChange?: () => void;
	handleIsEndDate: () => void;
	isEndDate: boolean;
	productNewPriceRef: RefObject<HTMLInputElement>;
	offerExpiresDateRef: RefObject<HTMLInputElement>;
	endOfferDate: Dayjs | null;
	startOfferDate: Dayjs | null;
	setStartOfferDate: (
		date: SetStateAction<Dayjs | null>,
	) => void;
	setEndOfferDate: (
		date: SetStateAction<Dayjs | null>,
	) => void;
};

export default function ProductOfferHandling({
	isOffer,
	endOfferDate,
	startOfferDate,
	handleIsOffer,
	offerExpiresDateRef,
	isEndDate,
	handleChange,
	handleIsEndDate,
	productNewPriceRef,
	setEndOfferDate,
	setStartOfferDate,
}: ProductOfferHandlingProps) {
	return (
		<>
			<FormGroup sx={{ m: 5 }}>
				<FormControlLabel
					control={
						<Switch
							type='switch'
							id='custom-switch'
							checked={isOffer}
							onClick={handleIsOffer}
						/>
					}
					label={isOffer ? 'الغاء العرض' : 'إضافة عرض'}
				/>
			</FormGroup>

			{isOffer && (
				<div>
					<FormGroup sx={{ m: 5 }}>
						<FormControlLabel
							control={
								<Switch
									type='switch'
									id='custom-switch'
									checked={isEndDate}
									onClick={handleIsEndDate}
								/>
							}
							label={
								isEndDate
									? 'إلغاء تاريخ النهاية'
									: 'تحديد تاريخ نهاية'
							}
						/>
					</FormGroup>

					<FormGroup sx={{ mx: 5 }}>
						<TextField
							onChange={handleChange}
							type='number'
							label='السعر الجدبد'
							inputRef={productNewPriceRef}
						/>
					</FormGroup>

					{!isEndDate ? (
						<FormGroup sx={{ m: 5 }}>
							<TextField
								onChange={handleChange}
								type='number'
								label='مدة العرض'
								required
								inputRef={offerExpiresDateRef}
								inputProps={{
									min: '1',
									max: '10',
								}}
							/>
						</FormGroup>
					) : (
						<Grid container sx={{ m: 5 }}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
							>
								<Grid>
									<DatePicker
										slots={{
											leftArrowIcon:
												KeyboardArrowRightIcon,
											rightArrowIcon:
												KeyboardArrowLeftIcon,
										}}
										label='تاريخ البداية'
										value={startOfferDate}
										onChange={(newDate) =>
											setStartOfferDate(
												newDate,
											)
										}
									/>
								</Grid>
								<Grid>
									<DatePicker
										slots={{
											leftArrowIcon:
												KeyboardArrowRightIcon,
											rightArrowIcon:
												KeyboardArrowLeftIcon,
										}}
										label='تاريخ النهاية'
										value={endOfferDate}
										onChange={(newDate) =>
											setEndOfferDate(
												newDate,
											)
										}
									/>
								</Grid>
							</LocalizationProvider>
						</Grid>
					)}
				</div>
			)}
		</>
	);
}
