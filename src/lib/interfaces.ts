// Type definitions for the food price data structure
interface FoodPriceData {
	label: string;
	data: number[];
	backgroundColor: string;
	borderColor: string;
}
// Type definitions for the chart data structure
interface ChartData {
	labels: string[];
	datasets: FoodPriceData[];
}
// Type definitions for the food items
interface FoodItem {
	id: string;
	name: string;
	color: string;
}
// Type definitions for the API response
interface ApiResponse {
	foodItems: FoodItem[];
	labels: string[];
	priceData: { [key: string]: number[] };
}

// Type definitions for Eurostat API response
interface EurostatResponse {
	dimension: {
		time?: {
			category: {
				index: Record<string, string>;
			};
		};
		coicop?: {
			category: {
				label: Record<string, string>;
				index: Record<string, number>;
			};
		};
	};
	value: Record<string, string>;
}

// Type definitions for form calculation result
interface FormCalculationResult {
	monthlyBudget: number;
	monthlyBudgetThen: number;
	totalExpensesNow: number;
	totalExpensesThen: number;
	remainingBudget: number;
	remainingBudgetThen: number;
	inflationRate: number;
	netExpensesDifference: number;
	previousSalaryValueMatchingCurrentPurchasingPower: number;
}

export type { FoodPriceData, ChartData, FoodItem, ApiResponse, EurostatResponse, FormCalculationResult };