<script lang="ts">
	import { foodItems } from '$lib/data';
	
	export let selectedFoods: string[] = ['apple'];
	
	function handleFoodSelect(foodId: string) {
		if (selectedFoods.includes(foodId)) {
			selectedFoods = selectedFoods.filter(id => id !== foodId);
		} else {
			selectedFoods = [...selectedFoods, foodId];
		}
	}
</script>

<section class="max-w-4xl mx-auto">
    <h2 class="text-xl font-semibold text-center mb-4">Food List</h2>
    <div class="grid grid-cols-4 gap-4">
        {#each foodItems as food}
            <button 
                class="border rounded-md p-4 text-center shadow-sm transition-colors {selectedFoods.includes(food.id) ? 'bg-green-500 text-white border-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}"
                on:click={() => handleFoodSelect(food.id)}
            >
                {food.name}
            </button>
        {/each}
    </div>
</section>