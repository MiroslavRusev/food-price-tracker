import { timeRanges, utilityItems } from '$lib/constants';
import { fetchApiData } from '$lib/dataFetch';
import type { UtilityPriceData, ChartData, UtilityApiResponse } from '$lib/interfaces';

// Get chart data using real API data
export const getUtilityChartData = async (
	selectedRange: string,
	selectedUtilityItems: string[]
): Promise<ChartData> => {
	// Only show utility data for ranges above 1 year
	const range = timeRanges.find((r) => r.id === selectedRange);
	if (!range) {
		return { labels: [], datasets: [] };
	}

	let data: UtilityApiResponse;
	if (selectedUtilityItems.includes('electricity')) {
		data = (await fetchApiData({ url: '/api/electricity-prices' })) as UtilityApiResponse;
	} else if (selectedUtilityItems.includes('water')) {
		data = (await fetchApiData({ url: '/api/water-prices' })) as UtilityApiResponse;
	} else {
		return { labels: [], datasets: [] };
	}
	// Validate that the response is from the correct type
	if (!('utilityItem' in data)) {
		throw new Error('Invalid API response: electricityItem not found');
	}

	if (!data.utilityItem || !data.labels.length) {
		return { labels: [], datasets: [] };
	}

	// Calculate how many data points to show based on the range
	// Data points are semestrial (half-year), so we need to adjust calculations
	let dataPointsToShow: number;
	switch (range.period) {
		case 'months':
			// For 3 months and 6 months, show 1 data point to avoid empty values
			if (range.length <= 6) {
				dataPointsToShow = 1;
			} else if (range.length === 12) {
				dataPointsToShow = 2;
			} else {
				throw new Error('Invalid range: ' + range.length);
			}
			break;
		case 'years':
			// For years, multiply by 2 since we have 2 data points per year
			dataPointsToShow = Math.min(range.length * 2, data.labels.length);
			break;
		default:
			dataPointsToShow = data.labels.length;
	}

	// Get the most recent data points
	const recentLabels = data.labels.slice(-dataPointsToShow);
	const datasets: UtilityPriceData[] = [];

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
