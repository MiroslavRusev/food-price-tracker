import { writable } from 'svelte/store';
import type { FuelData } from './interfaces';

// Store for selected food IDs
export const selectedFoods = writable<string[]>([]);

// Store for selected utility IDs
export const selectedUtilityItems = writable<string[]>([]);

// Store for selected fuel ID (single selection)
export const selectedFuels = writable<string>('');

// Store for current fuel price
export const currentFuelPrice = writable<FuelData>({
	fuel: '',
	price: 0,
	dimension: '',
	date: ''
});

export const historicalFuelPrice = writable<FuelData>({
	fuel: '',
	price: 0,
	dimension: '',
	date: ''
});

// Helper functions to work with the store
export const foodStore = {
	// Add a food to selection
	add: (foodId: string) => {
		selectedFoods.update((foods) => {
			if (!foods.includes(foodId)) {
				return [...foods, foodId];
			}
			return foods;
		});
	},

	// Remove a food from selection
	remove: (foodId: string) => {
		selectedFoods.update((foods) => foods.filter((id) => id !== foodId));
	},

	// Toggle a food selection
	toggle: (foodId: string) => {
		selectedFoods.update((foods) => {
			if (foods.includes(foodId)) {
				return foods.filter((id) => id !== foodId);
			} else {
				return [...foods, foodId];
			}
		});
	},

	// Clear all selections
	clear: () => {
		selectedFoods.set([]);
	},

	// Set specific selections
	set: (foodIds: string[]) => {
		selectedFoods.set(foodIds);
	}
};

// Helper functions to work with the fuel store
export const fuelStore = {
	// Add a fuel to selection (replaces current selection)
	add: (fuelId: string) => {
		selectedFuels.set(fuelId);
	},

	// Remove a fuel from selection (if it matches the current selection)
	remove: (fuelId: string) => {
		selectedFuels.update((fuel) => (fuel === fuelId ? '' : fuel));
	},

	// Toggle a fuel selection (single selection only)
	toggle: (fuelId: string) => {
		selectedFuels.update((fuel) => (fuel === fuelId ? '' : fuelId));
	},

	// Clear selection
	clear: () => {
		selectedFuels.set('');
	},

	// Set specific selection
	set: (fuelId: string) => {
		selectedFuels.set(fuelId);
	}
};

// Helper functions to work with the utility store
export const utilityStore = {
	// Add a utility to selection
	add: (utilityId: string) => {
		selectedUtilityItems.update((utilities) => {
			if (!utilities.includes(utilityId)) {
				return [...utilities, utilityId];
			}
			return utilities;
		});
	},

	// Remove a utility from selection
	remove: (utilityId: string) => {
		selectedUtilityItems.update((utilities) => utilities.filter((id) => id !== utilityId));
	},

	// Toggle a utility selection
	toggle: (utilityId: string) => {
		selectedUtilityItems.update((utilities) => {
			if (utilities.includes(utilityId)) {
				return utilities.filter((id) => id !== utilityId);
			} else {
				return [...utilities, utilityId];
			}
		});
	},
	// Clear selection
	clear: () => {
		selectedUtilityItems.set([]);
	},

	// Set specific selection
	set: (utilityId: string) => {
		selectedUtilityItems.set([utilityId]);
	}
};
