import { json } from '@sveltejs/kit';
import { BASE_API_URL_ELE } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { processEurostatElectricityData } from '$lib/dataElectricityProcessing';

export const GET: RequestHandler = async () => {
	try {
		// Get all product codes as comma-separated string
		console.log(BASE_API_URL_ELE + ' BASE_API_URL_ELE');
		const apiUrl = `${BASE_API_URL_ELE}`;
		const response = await fetch(apiUrl);
		console.log(response + ' response');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		console.log(rawData + ' rawData');
		const structuredData = processEurostatElectricityData(rawData);
		return json(structuredData);
	} catch (error) {
		console.error('Error fetching data:', error);
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
};
