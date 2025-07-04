<script lang="ts">
    import { formFields } from '$lib/constants';
    import type { FormCalculationResult } from '$lib/interfaces';
    import type { ChartData } from '$lib/interfaces';

    let formData: any[] = [];
    let loading = false;
    let result: FormCalculationResult | null = null;
    let error: string | null = null;

    $: formData = formFields.map(field => ({
        id: field.id,
        label: field.label,
        type: field.type
    }));

    async function handleSubmit(event: Event) {
        event.preventDefault();
        loading = true;
        error = null;
        result = null;

        const form = event.target as HTMLFormElement;
        const formDataObj = new FormData(form);

        try {
            const response = await fetch('/api/calculate-pp-change', {
                method: 'POST',
                body: formDataObj
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to process form');
            }

            result = data;
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            loading = false;
        }
    }

    export let data: ChartData = {
		labels: [],
		datasets: []
	};

    function handleChartData(data: ChartData) {
        const numberOfDataPoints = data.datasets.length;
        let percentageChanges: number[] = [];
        for (let i = 0; i < numberOfDataPoints; i++) {
            const values = data.datasets[i].data;
            // Calculate percentage change: ((last - first) / first) * 100
            percentageChanges.push(((values[values.length - 1] - values[0]) / values[0]) * 100);
        }
        return percentageChanges;
    }

    // Calculate the price change when data changes
    $: priceChange = handleChartData(data);
</script>

<div class="space-y-6">
    <form on:submit={handleSubmit} class="grid grid-cols-1 gap-6 border-2 border-gray-200 rounded-md p-6">
        {#each formData as field}
            <label class="block">
                <span class="text-gray-700 text-lg">{field.label}</span>
                <input 
                    class="bg-gray-50 mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" 
                    type={field.type} 
                    id={field.id} 
                    name={field.id}
                    required={field.id === 'monthly-budget' ? true : false}
                    disabled={loading}
                >
            </label>
        {/each}
        <input type="hidden" name="priceChange" value={priceChange}>
        <button 
            type="submit" 
            class="bg-slate-800 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
        >
            {loading ? 'Calculating...' : 'Submit'}
        </button>
    </form>

    {#if error}
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Error</h3>
                    <div class="mt-2 text-sm text-red-700">
                        {error}
                    </div>
                </div>
            </div>
        </div>
    {/if}

    {#if result}
        <div class="bg-green-50 border border-green-200 rounded-md p-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    <h3 class="text-lg font-medium text-green-800 mb-4">Purchasing Power Analysis</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">Monthly Budget</div>
                            <div class="text-green-600 font-semibold">{result.monthlyBudget.toFixed(2)} лв.</div>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">Total Expenses</div>
                            <div class="text-red-600 font-semibold">{result.totalExpenses.toFixed(2)} лв.</div>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">Remaining Budget</div>
                            <div class="text-blue-600 font-semibold">{result.remainingBudget.toFixed(2)} лв.</div>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">Average Price Change</div>
                            <div class="text-orange-600 font-semibold">{result.averagePriceChange}%</div>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">New Purchasing Power</div>
                            <div class="text-purple-600 font-semibold">{result.newPurchasingPower} лв.</div>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <div class="font-medium text-gray-900">Purchasing Power Loss</div>
                            <div class="text-red-600 font-semibold">{result.purchasingPowerLoss} лв.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>