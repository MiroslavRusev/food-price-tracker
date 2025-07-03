import { timeRanges } from '$lib/constants';
import type { FoodPriceData, ChartData, FoodItem, ApiResponse } from '$lib/interfaces';


// Cache for API data
let cachedData: ApiResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes

// Fetch data from API
const fetchApiData = async (): Promise<ApiResponse> => {
	const now = Date.now();
	
	// Return cached data if it's still valid
	if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
		return cachedData;
	}
	
	try {
		const url = '/api/food-prices';
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		cachedData = data;
		lastFetchTime = now;
		return data;
	} catch (error) {
		console.error('Error fetching API data:', error);
		// Return empty data structure if API fails
		return {
			foodItems: [],
			labels: [],
			priceData: {}
		};
	}
};

// Get available food items from API
export const getFoodItems = async (): Promise<FoodItem[]> => {
	const data = await fetchApiData();
	return data.foodItems;
};

// Get chart data using real API data
export const getChartData = async (selectedRange: string, selectedFoods: string[]): Promise<ChartData> => {
	// Filter labels based on selected range
	const range = timeRanges.find(r => r.id === selectedRange);
	if (!range) {
		return { labels: [], datasets: [] };
	}

	const data = await fetchApiData();

	
	if (!data.foodItems.length || !data.labels.length) {
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
	const datasets: FoodPriceData[] = [];

	selectedFoods.forEach(foodId => {
		const food = data.foodItems.find(f => f.id === foodId);
		const prices = data.priceData[foodId];
		if (food && prices) {
			// Get the most recent price data
			const recentPrices = prices.slice(-dataPointsToShow);
			
			datasets.push({
				label: food.name,
				data: recentPrices,
				backgroundColor: food.color,
				borderColor: food.color
			});
		}
	});

	return { labels: recentLabels, datasets };
};
