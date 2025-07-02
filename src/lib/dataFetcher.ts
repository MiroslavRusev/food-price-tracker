export const fetchData = async () => {
    try {
        // Use the built-in fetch function which works with SvelteKit routing
        const response = await fetch(`/api/food-prices`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}