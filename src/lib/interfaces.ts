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

// Type definitions for the fuel items
interface FuelItem {
	id: string;
	name: string;
	color: string;
}

// Type definitions for form field
interface FormField {
	id: string;
	label: string;
	type: string;
	key: string;
}

// Type definitions for food API response
interface FoodApiResponse {
	foodItems: FoodItem[];
	labels: string[];
	priceData: { [key: string]: number[] };
}

// Type definitions for fuel API response
interface FuelApiResponse {
	fuelData: FuelData[];
}

// Type definitions for the fuel request object
interface FuelRequest {
	fuelType: string;
	date: string;
}

interface FuelData {
	fuel: string;
	price: number;
	dimension: string;
	date: string;
	status?: string;
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
	currentDisposableIncome: number;
	previousDisposableIncome: number;
	inflationRate: number;
	netExpensesDifference: number;
	previousSalaryValueMatchingCurrentPurchasingPower: number;
}

export type {
	FoodPriceData,
	ChartData,
	FoodItem,
	FuelItem,
	FoodApiResponse,
	FuelApiResponse,
	EurostatResponse,
	FormField,
	FormCalculationResult,
	FuelRequest,
	FuelData
};
