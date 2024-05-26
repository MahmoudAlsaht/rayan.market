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
			throw new Error('something went wrong');
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
		promoType,
	}: {
		code: string;
		discount: string | null;
		startDate: string | null;
		endDate: string | null;
		promoType: string;
	}) => {
		try {
			const promo: TPromoCode | null =
				await sendRequestToServer('POST', `promo`, {
					code,
					discount,
					startDate,
					endDate,
					promoType,
				});

			return promo;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const updatePromo = createAsyncThunk(
	'promos/updatePromo',
	async ({
		code,
		discount,
		startDate,
		endDate,
		expired,
		promoId,
	}: {
		code: string | null;
		discount: string | null;
		startDate: string | null;
		endDate: string | null;
		expired: boolean;
		promoId: string;
	}) => {
		try {
			const promo: TPromoCode | null =
				await sendRequestToServer(
					'PUT',
					`promo/${promoId}`,
					{
						code,
						discount,
						startDate,
						endDate,
						expired,
					},
				);

			return promo;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const getPromo = async ({
	promoCode,
}: {
	promoCode: string;
}) => {
	try {
		const promo: TPromoCode | null =
			await sendRequestToServer(
				'GET',
				`promo/${promoCode}`,
			);

		return promo;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const deletePromo = createAsyncThunk(
	'promos/deletePromo',
	async (promoId: string) => {
		try {
			await sendRequestToServer(
				'DELETE',
				`promo/${promoId}`,
			);
			return promoId;
		} catch (e: any) {
			throw new Error('something went wrong');		}
	},
);
