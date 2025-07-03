export const productCodes = {
    bread: "CP01113",
    pork: "CP01122",
    poultry: "CP01124",
    milk: "CP01141",
    eggs: "CP01147",
    oil: "CP0115",
    butter: "CP01151",
    potatoes: "CP01174",
    sugar: "CP01181"
};

// Define the food items with their Eurostat codes and colors
export const foodItems = [
    { id: 'bread', name: 'Bread', code: 'CP01113', color: '#D4A574' },
    { id: 'pork', name: 'Pork', code: 'CP01122', color: '#8B0000' },
    { id: 'poultry', name: 'Poultry', code: 'CP01124', color: '#FFB6C1' },
    { id: 'milk', name: 'Milk', code: 'CP01141', color: '#3371FF' },
    { id: 'eggs', name: 'Eggs', code: 'CP01147', color: '#FFFACD' },
    { id: 'oil', name: 'Cooking Oil', code: 'CP0115', color: '#FFE66D' },
    { id: 'butter', name: 'Butter', code: 'CP01151', color: '#FFD700' },
    { id: 'potatoes', name: 'Potatoes', code: 'CP01174', color: '#33FF5E' },
    { id: 'sugar', name: 'Sugar', code: 'CP01181', color: '#FF8E53' }
]; 

export const timeRanges = [
	{ id: '3months', label: '3 months', period: 'months', length: 3 },
	{ id: '6months', label: '6 months', period: 'months', length: 6 },
	{ id: '1year', label: '1 year', period: 'months', length: 12 },
	{ id: '5years', label: '5 years', period: 'years', length: 5 },
	{ id: '10years', label: '10 years', period: 'years', length: 10 }
];
