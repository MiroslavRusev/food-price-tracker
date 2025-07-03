<script lang="ts">
	import { timeRanges } from '$lib/constants';
	
	export let selectedRange: string;
	
	function handleRangeSelect(rangeId: string) {
		selectedRange = rangeId;
	}
</script>

<section class="max-w-4xl mx-auto mb-8">
	<h2 class="text-xl font-semibold text-center mb-4">Filter by period</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each timeRanges as range}
			<button 
				class="border rounded-md p-4 text-center shadow-sm transition-colors {selectedRange === range.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}"
				on:click={() => handleRangeSelect(range.id)}
			>
				{range.label}
			</button>
		{/each}
	</div>
</section>