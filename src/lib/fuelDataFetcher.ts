import { fetchApiData } from '$lib/dataFetch';
import type { FuelData, FuelRequest } from '$lib/interfaces';

export const getFuelData = async (params: FuelRequest): Promise<FuelData[]> => {
	const queryString = new URLSearchParams({
		fuelType: params.fuelType,
		date: params.date
	}).toString();

	const data = await fetchApiData({ url: `/api/fuel-prices?${queryString}` });
	// Validate that the response is from the correct type
	if (!('fuelData' in data)) {
		throw new Error('Invalid API response: fuelData not found');
	}
	return data.fuelData;
};
