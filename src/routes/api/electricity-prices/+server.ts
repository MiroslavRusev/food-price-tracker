import { json } from '@sveltejs/kit';
import { BASE_API_URL_ELE } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { processEurostatElectricityData } from '$lib/dataElectricityProcessing';

export const GET: RequestHandler = async () => {
	try {
		// Get all product codes as comma-separated string
		const apiUrl = `${BASE_API_URL_ELE}`;
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const rawData = await response.json();
		// Process the raw data to get the structured data
		const structuredData = processEurostatElectricityData(rawData);
		// Return the structured data as JSON
		return json(structuredData);
	} catch (error) {
		console.error('Error fetching data:', error);
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
};
