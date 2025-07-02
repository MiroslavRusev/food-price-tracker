import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { BASE_API_URL } from '$env/static/private';

const productCodes = {
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

const generateYearMonthRange = (monthsBack: number): string => {
    const dates: string[] = [];
    const now = new Date();
    
    for (let i = 0; i < monthsBack; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i - 2, 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        dates.push(`${year}-${month}`);
    }
    
    return dates.join(',');
};

export const GET: RequestHandler = async () => {
    try {
        // Get all product codes as comma-separated string
        const allProductCodes = Object.values(productCodes).join(',');
        
        const apiUrl = `${BASE_API_URL}?c[freq]=M&c[unit]=I15&c[indx]=HICP&c[coicop]=${allProductCodes}&c[geo]=BG&c[TIME_PERIOD]=${generateYearMonthRange(120)}&compress=false&format=json&lang=en`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}; 