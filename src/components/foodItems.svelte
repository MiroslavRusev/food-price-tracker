<script lang="ts">
	import type { FoodItem } from '$lib/interfaces';
	import { selectedFoods, foodStore } from '$lib/stores';

	export let foodItems: FoodItem[] = [];

	function handleFoodSelect(foodId: string) {
		foodStore.toggle(foodId);
	}
</script>

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
	<h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">Списък с продукти</h2>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
		{#each foodItems as food (food.id)}
			<button
				class="relative px-4 py-4 text-center rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 {$selectedFoods.includes(
					food.id
				)
					? 'bg-green-50 border-green-200 text-green-900 shadow-sm'
					: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}"
				on:click={() => handleFoodSelect(food.id)}
			>
				<div class="font-medium text-sm">{food.name}</div>
				{#if $selectedFoods.includes(food.id)}
					<div class="absolute top-2 right-2 w-2 h-2 bg-green-600 rounded-full"></div>
				{/if}
			</button>
		{/each}
	</div>
</div>
