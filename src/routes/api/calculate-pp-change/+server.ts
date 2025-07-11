import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { FormCalculationResult } from '$lib/interfaces';
import { formFields } from '$lib/constants';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();

		// Validation constants
		const MAX_VALUE = 1000000; // 1 million limit
		const MIN_POSITIVE_VALUE = 0.01; // Minimum positive value

		// Extract and validate all form values
		const values: Record<string, number> = {};
		for (const field of formFields) {
			const value = parseFloat(formData.get(field.id) as string);
			values[field.key] = value;
			// Validate each value
			if (isNaN(value)) {
				return json({ error: `${field.label} не е валидно число` }, { status: 400 });
			}
			if (value < MIN_POSITIVE_VALUE) {
				return json({ error: `${field.label} трябва да има стойност по-голяма от 0` }, { status: 400 });
			}
			if (value > MAX_VALUE) {
				return json({ error: `${field.label} не може да надвишава 1,000,000` }, { status: 400 });
			}
		}
		// Inflation rate and historical fuel  calculated programmatically not from user input, so it's not part of form fields
		values['inflationRate'] = parseFloat(formData.get('inflationRate') as string);
		values['historicalFuelPrice'] = JSON.parse(formData.get('historicalFuelPrice') as string);
		if (isNaN(values['inflationRate'])) {
			return json({ error: 'Инфлацията не е валидно число' }, { status: 400 });
		}
		if (isNaN(values['historicalFuelPrice'])) {
			return json({ error: 'Историческите цени на горивото не са валидни' }, { status: 400 });
		}

		// Destructure values for easier access
		const { 
			monthlyBudget, 
			monthlyBudgetThen, 
			foodExpense, 
			fuelExpense,
			utilityExpense, 
			inflationRate, 
			historicalFuelPrice 
		} = values;

		// Calculate purchasing power change
		// This is a simplified calculation - you can make it more sophisticated
		const totalExpensesNow = foodExpense + fuelExpense + utilityExpense;
		// Calculate total expenses at the start of the period by dividing the current expenses by (1 + inflation rate)
		const totalExpensesThen = (foodExpense / (1 + inflationRate)) + historicalFuelPrice + utilityExpense;
		// Calculate the remaining budget for each period
		const currentDisposableIncome = monthlyBudget - totalExpensesNow;
		const previousDisposableIncome = monthlyBudgetThen - totalExpensesThen;

		// Calculate the net expenses difference on current prices
		// (the difference between the current expenses and the expenses at the start of the period)
		const netExpensesDifference = totalExpensesNow - totalExpensesThen;

		// Calculate what the previous salary should have been to match current purchasing power
		// Formula: previousSalary = currentDisposableIncome + previousExpenses
		// This gives us the salary needed in the past to have the same disposable income
		const previousSalaryValueMatchingCurrentPurchasingPower = currentDisposableIncome + totalExpensesThen;

		const result: FormCalculationResult = {
			monthlyBudget,
			monthlyBudgetThen,
			totalExpensesNow,
			totalExpensesThen,
			currentDisposableIncome,
			previousDisposableIncome,
			inflationRate: inflationRate * 100,
			netExpensesDifference,
			previousSalaryValueMatchingCurrentPurchasingPower
		};
		// Calculate new purchasing power
		return json(result);
	} catch (error) {
		console.error('Error processing form:', error);
		return json({ error: 'Failed to process form data' }, { status: 500 });
	}
};
