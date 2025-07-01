export interface FoodPriceData {
	label: string;
	data: number[];
	backgroundColor: string;
	borderColor: string;
}

export interface ChartData {
	labels: string[];
	datasets: FoodPriceData[];
}

export const timeRanges = [
	{ id: '30days', label: '30 days', period: 'days', length: 30 },
	{ id: '3months', label: '3 months', period: 'months', length: 3 },
	{ id: '6months', label: '6 months', period: 'months', length: 6 },
	{ id: '1year', label: '1 year', period: 'months', length: 12 },
	{ id: '5years', label: '5 years', period: 'years', length: 5 },
	{ id: '10years', label: '10 years', period: 'years', length: 10 }
];

export const foodItems = [
	{ id: 'flour', name: 'Flour', color: '#FF6B6B' },
	{ id: 'cookingOil', name: 'Cooking Oil', color: '#FFE66D' },
	{ id: 'sugar', name: 'Sugar', color: '#FF8E53' },
	{ id: 'tomato', name: 'Tomato', color: '#FF4757' },
	{ id: 'potato', name: 'Potato', color: '#8B4513' },
	{ id: 'onion', name: 'Onion', color: '#F39C12' },
	{ id: 'rice', name: 'Rice', color: '#FFFFFF' },
	{ id: 'bread', name: 'Bread', color: '#D4A574' },
	{ id: 'chicken', name: 'Chicken', color: '#FFB6C1' },
	{ id: 'pork', name: 'Pork', color: '#8B0000' },
	{ id: 'milk', name: 'Milk', color: '#F0F8FF' },
	{ id: 'eggs', name: 'Eggs', color: '#FFFACD' }
];

// Sample data for different time ranges
const generateLabels = (period: string, length: number): string[] => {
	const now = new Date();
	const labels: string[] = [];
	
	const dateFormats = {
		months: { month: 'short', year: '2-digit' },
		years: { year: 'numeric' },
		days: { day: '2-digit', month: 'short', year: '2-digit' }
	};
	
	const createDate = (offset: number): Date => {
		switch (period) {
			case 'months':
				return new Date(now.getFullYear(), now.getMonth() - offset, 1);
			case 'years':
				return new Date(now.getFullYear() - offset, 0, 1);
			case 'days':
				return new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset);
			default:
				return now;
		}
	};
	
	for (let i = length - 1; i >= 0; i--) {
		const date = createDate(i);
		const format = dateFormats[period as keyof typeof dateFormats] || dateFormats.days;
		labels.push(date.toLocaleDateString('en-US', format as Intl.DateTimeFormatOptions));
	}
	
	return labels;
};

const generateRandomPrices = (count: number, basePrice: number, variance: number): number[] => {
	return Array.from({ length: count }, () => 
		Math.round((basePrice + (Math.random() - 0.5) * variance) * 100) / 100
	);
};

export const getChartData = (selectedRange: string, selectedFoods: string[]): ChartData => {
	const range = timeRanges.find(r => r.id === selectedRange);
	if (!range) {
		return { labels: [], datasets: [] };
	}

	const labels = generateLabels(range.period, range.length);
	const datasets: FoodPriceData[] = [];

	selectedFoods.forEach(foodId => {
		const food = foodItems.find(f => f.id === foodId);
		if (food) {
			const basePrice = Math.random() * 5 + 1; // Random base price between 1-6
			datasets.push({
				label: food.name,
				data: generateRandomPrices(labels.length, basePrice, 2),
				backgroundColor: food.color,
				borderColor: food.color
			});
		}
	});

	return { labels, datasets };
}; 