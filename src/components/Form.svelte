<script lang="ts">
	import { formFields } from '$lib/constants';
	import type { FormCalculationResult } from '$lib/interfaces';
	import type { ChartData } from '$lib/interfaces';

	let formData: any[] = [];
	let loading = false;
	let result: FormCalculationResult | null = null;
	let error: string | null = null;

	$: formData = formFields.map((field) => ({
		id: field.id,
		label: field.label,
		type: field.type,
		inputmode: field.inputmode
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

	function calculateInflationRate(data: ChartData) {
		const numberOfDataPoints = data.datasets.length;
		let percentageChanges: number[] = [];
		for (let i = 0; i < numberOfDataPoints; i++) {
			const values = data.datasets[i].data;
			// Calculate the delta between the last and first value (the value is in percentage)
			percentageChanges.push((values[values.length - 1] - values[0]) / values[0]);
		}
		return percentageChanges;
	}

	function handleSelectedProductsAndPeriod(data: ChartData) {
		const period = data.labels.length;
		let periodString = '';
		if (period < 12) {
			periodString = data.labels.length + ' месеца';
		} else if (period === 12) {
			periodString = '1 годинa';
		} else {
			periodString = Math.floor(data.labels.length / 12) + ' години';
		}

		const products = data.datasets;
		let productsString = '';
		productsString = products.map((product) => product.label).join(', ');
		return { periodString, productsString };
	}

	// Calculate the price change when data changes
	$: inflationRate = calculateInflationRate(data);
	$: ({ periodString, productsString } = handleSelectedProductsAndPeriod(data));
</script>

<h3 class="text-2xl font-bold mb-2">
	Изчисли промяната в покупателната сила на база избраните продукти и период:
	<span class="text-amber-600 underline text-base mt-2"
		>(Моля използвайте филтрите за да изберете продукти и период)
	</span>
</h3>
<div class="bg-slate-100 border-2 border-gray-200 rounded-md p-2 mb-6">
	<p class="text-amber-600 underline text-base mt-2">Избраният период е: {periodString}</p>
	<p class="text-amber-600 underline text-base mt-2 mb-2">Избрани продукти: {productsString}</p>
</div>
<div class="space-y-6">
	<form on:submit={handleSubmit} class="grid grid-cols-1 gap-6 border-2 border-gray-200 rounded-md p-6">
		{#each formData as field}
			{#if field.id.startsWith('monthly-budget')}
				<label class="block">
					<span class="text-gray-700 text-lg">{field.label}</span>
					<input
						class="bg-gray-50 mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
						type={field.type}
						inputmode={field.inputmode}
						id={field.id}
						name={field.id}
						required
						disabled={loading}
					/>
				</label>
			{:else}
				<label class="block">
					<span class="text-gray-700 text-lg">{field.label}</span>
					<input
						class="bg-gray-50 mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
						type={field.type}
						inputmode={field.inputmode}
						id={field.id}
						name={field.id}
						disabled={loading}
					/>
				</label>
			{/if}
		{/each}
		<input type="hidden" name="inflationRate" value={inflationRate} />
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
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
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
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3 flex-1">
					<h3 class="text-lg font-medium text-green-800 mb-4">
						Анализ на покупателната сила и ефектите от инфлацията
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Месечен доход към днешна дата</div>
							<div class="text-green-600 font-semibold">{result.monthlyBudget.toFixed(2)} лв.</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Месечен доход в началото на периода</div>
							<div class="text-green-600 font-semibold">
								{result.monthlyBudgetThen.toFixed(2)} лв.
							</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Разход към днешна дата</div>
							<div class="text-red-600 font-semibold">{result.totalExpensesNow.toFixed(2)} лв.</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Разход в началото на периода</div>
							<div class="text-gray-900 font-normal text-sm italic mt-2 mb-2">
								Това е нетната сума, след приспадане на разходите.
							</div>
							<div class="text-red-600 font-semibold">
								{result.totalExpensesThen.toFixed(2)} лв.
							</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Разполагаем доход към днешна дата</div>
							<div class="text-gray-900 font-normal text-sm italic mt-2 mb-2">
								Това е нетната сума, след приспадане на разходите.
							</div>
							<div class="text-blue-600 font-semibold">
								{result.currentDisposableIncome.toFixed(2)} лв.
							</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Разполагаем доход в началото на периода</div>
							<div class="text-blue-600 font-semibold">
								{result.previousDisposableIncome.toFixed(2)} лв.
							</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Процент на инфлацията</div>
							<div class="text-gray-900 font-normal text-sm italic mt-2 mb-2">
								Осреднен процент на инфлацията за избрания период на база избраните продукти.
							</div>
							<div class="text-orange-600 font-semibold">{result.inflationRate.toFixed(2)}%</div>
						</div>
						<div class="bg-white p-3 rounded border">
							<div class="font-medium text-gray-900">Нетна разлика в разходите към днешна дата</div>
							<div class="text-gray-900 font-normal text-sm italic mt-2 mb-2">
								Положителна стойност означава, че разходите са се увеличили, а отрицателна означава, че
								са се смалили.
							</div>
							{#if result.netExpensesDifference > 0}
								<div class="text-red-600 font-semibold">
									{result.netExpensesDifference.toFixed(2)} лв.
								</div>
							{:else}
								<div class="text-green-600 font-semibold">
									{result.netExpensesDifference.toFixed(2)} лв.
								</div>
							{/if}
						</div>
					</div>
					<div class="bg-white p-3 mt-4 rounded border">
						<div class="font-medium text-gray-900">
							Сравнение на покупателната сила на дохода в началото на периода и днешния доход
						</div>
						<div class="text-gray-900 font-normal text-sm italic mt-2 mb-2">
							Сумата, която изписва показва разликата в покупателната сила между днешния доход и дохода в
							началото на периода. Базира се на потребителската кошница - избраните продукти и разходи към
							днешна дата. Ако новата заплата изпреварва инфлацията, ще е маркирана в зелено, ако изостава
							- в червено.
						</div>
						<div class="text-slate-600 font-bold text-sm italic mt-2 mb-2">
							Доход в началото на периода, който е със същата покупателна сила, като днешния:
							{result.previousSalaryValueMatchingCurrentPurchasingPower.toFixed(2)} лв.
						</div>
						{#if result.previousSalaryValueMatchingCurrentPurchasingPower > result.monthlyBudgetThen}
							<div class="text-green-600 font-semibold border-2 border-green-600 rounded-md p-2 mb-2">
								Новата заплата изпреварва инфлацията с {(
									result.previousSalaryValueMatchingCurrentPurchasingPower - result.monthlyBudgetThen
								).toFixed(2)} лв.
							</div>
						{:else}
							<div class="text-red-600 font-semibold border-2 border-red-600 rounded-md p-2 mb-2">
								Новата заплата изостава спрямо инфлацията с {(
									result.previousSalaryValueMatchingCurrentPurchasingPower - result.monthlyBudgetThen
								).toFixed(2)} лв.
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
