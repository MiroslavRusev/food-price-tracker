import { writable } from 'svelte/store';

// Store for selected food IDs
export const selectedFoods = writable<string[]>([]);

// Helper functions to work with the store
export const foodStore = {
	// Add a food to selection
	add: (foodId: string) => {
		selectedFoods.update(foods => {
			if (!foods.includes(foodId)) {
				return [...foods, foodId];
			}
			return foods;
		});
	},

	// Remove a food from selection
	remove: (foodId: string) => {
		selectedFoods.update(foods => foods.filter(id => id !== foodId));
	},

	// Toggle a food selection
	toggle: (foodId: string) => {
		selectedFoods.update(foods => {
			if (foods.includes(foodId)) {
				return foods.filter(id => id !== foodId);
			} else {
				return [...foods, foodId];
			}
		});
	},

	// Clear all selections
	clear: () => {
		selectedFoods.set([]);
	},

    get: () => {
        return selectedFoods;
    },

	// Set specific selections
	set: (foodIds: string[]) => {
		selectedFoods.set(foodIds);
	}
}; 