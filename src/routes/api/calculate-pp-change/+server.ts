import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { FormCalculationResult } from '$lib/interfaces';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        
        // Extract form values
        const monthlyBudget = parseFloat(formData.get('monthly-budget-now') as string) || 0;
        const monthlyBudgetThen = parseFloat(formData.get('monthly-budget-then') as string) || 0;
        const foodExpense = parseFloat(formData.get('food-expense') as string) || 0;
        const fuelExpense = parseFloat(formData.get('fuel-expense') as string) || 0;
        const utilityExpense = parseFloat(formData.get('utility-expense') as string) || 0;
        //  The inflationRate is in dedcimal we will convert it to percentage only in the result
        const inflationRate = parseFloat(formData.get('inflationRate') as string) || 0;
        
        // Validate input
        // if (monthlyBudget || monthlyBudgetThen <= 0) {
        //     return json({ error: 'Monthly budget must be greater than 0' }, { status: 400 });
        // }
        
    
        // Calculate purchasing power change
        // This is a simplified calculation - you can make it more sophisticated
        const totalExpensesNow = foodExpense + fuelExpense + utilityExpense;
        // Calculate total expenses at the start of the period by dividing the current expenses by (1 + inflation rate)
        const totalExpensesThen = totalExpensesNow / (1 + inflationRate);
        // Calculate the remaining budget for each period
        const remainingBudget = monthlyBudget - totalExpensesNow;
        const remainingBudgetThen = monthlyBudgetThen - totalExpensesThen;

        // Calculate the net expenses difference on current prices 
        // (the difference between the current expenses and the expenses at the start of the period)
        const netExpensesDifference = totalExpensesNow - totalExpensesThen;
        
        // Calculate what the previous salary should have been to match current purchasing power
        // Formula: previousSalary = currentSalary - (currentExpenses - previousExpenses)
        // This gives us the salary needed in the past to have the same disposable income
        const previousSalaryValueMatchingCurrentPurchasingPower = (monthlyBudget - totalExpensesNow) / (1 + inflationRate);
        
        const result: FormCalculationResult = {
            monthlyBudget,
            monthlyBudgetThen,
            totalExpensesNow,
            totalExpensesThen,
            remainingBudget,
            remainingBudgetThen,
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