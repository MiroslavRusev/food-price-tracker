import { timeRanges, utilityItems } from '$lib/constants';
import { fetchApiData } from '$lib/dataFetch';
import type { ElectricityPriceData, ChartData, UtilityApiResponse } from '$lib/interfaces';



// Get chart data using real API data
export const getUtilityChartData = async (selectedRange: string, selectedUtilityItems: string[]): Promise<ChartData> => {
	// Filter labels based on selected range
	const range = timeRanges.find((r) => r.id === selectedRange);
	if (!range) {
		return { labels: [], datasets: [] };
	}
	
	let data: UtilityApiResponse;
	if (selectedUtilityItems.includes('electricity')) {
		data = await fetchApiData({ url: '/api/electricity-prices' }) as UtilityApiResponse;
	} else if (selectedUtilityItems.includes('water')) {
		data = await fetchApiData({ url: '/api/water-prices' }) as UtilityApiResponse;
	} else {
		return { labels: [], datasets: [] };
	}

	// Validate that the response is from the correct type
	if (!('electricityItem' in data)) {
		throw new Error('Invalid API response: electricityItem not found');
	}

	if (!data.electricityItem || !data.labels.length) {
		return { labels: [], datasets: [] };
	}

	// Calculate how many data points to show based on the range
	let dataPointsToShow: number;
	switch (range.period) {
		case 'months':
			dataPointsToShow = Math.min(range.length, data.labels.length);
			break;
		case 'years':
			dataPointsToShow = Math.min(range.length * 12, data.labels.length);
			break;
		default:
			dataPointsToShow = data.labels.length;
	}

	// Get the most recent data points
	const recentLabels = data.labels.slice(-dataPointsToShow);
	const datasets: ElectricityPriceData[] = [];

	selectedUtilityItems.forEach((utilityId) => {
		const utility = utilityItems.find((item) => item.id === utilityId);
		const prices = data.priceData[utility!.id];
		if (utility && prices) {
		// Get the most recent price data
		const recentPrices = prices.slice(-dataPointsToShow);

		datasets.push({
			label: utility!.name,
			data: recentPrices,
			backgroundColor: utility!.color,
			borderColor: utility!.color
		});
		}
	});

	return { labels: recentLabels, datasets };
};
