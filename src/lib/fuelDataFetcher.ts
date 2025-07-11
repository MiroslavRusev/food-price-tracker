import { fetchApiData } from '$lib/dataFetch';
import type { FuelData, FuelRequest, FuelItem } from '$lib/interfaces';
import { fuelItems } from '$lib/constants';

export const getFuelItems = async (): Promise<FuelItem[]> => {
	return fuelItems;
};

export const getFuelData = async (params: FuelRequest): Promise<FuelData> => {
	const queryString = new URLSearchParams({
		fuelType: params.fuelType,
		date: params.date
	}).toString();

	const data = await fetchApiData({ url: `/api/fuel-prices?${queryString}` });

	// The API returns a single fuel data object, not an object with fuelData property
	// Check if the response has the expected fuel data properties
	if (!data || typeof data !== 'object' || !('fuel' in data) || !('price' in data)) {
		throw new Error('Invalid API response: fuel data not found');
	}

	// Type assertion to treat the response as a FuelData object
	const fuelData = data as unknown as FuelData;
	// Return the single fuel data object as an array to match the expected return type
	return fuelData;
};
