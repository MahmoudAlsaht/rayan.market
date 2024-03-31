import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequestToServer } from '../utils';
import { TPromoCode } from '../app/store/promo';

export const fetchPromos = createAsyncThunk(
	'promos/fetchPromos',
	async () => {
		try {
			const promos: (TPromoCode | null)[] =
				await sendRequestToServer('GET', `promo`);

			return promos;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const createPromo = createAsyncThunk(
	'promos/postPromo',
	async ({
		code,
		discount,
		startDate,
		endDate,
	}: {
		code: string;
		discount: number | undefined;
		startDate: string | undefined;
		endDate: string | undefined;
	}) => {
		try {
			const promo: TPromoCode | null =
				await sendRequestToServer('POST', `promo`, {
					code,
					discount,
					startDate,
					endDate,
				});

			return promo;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);
