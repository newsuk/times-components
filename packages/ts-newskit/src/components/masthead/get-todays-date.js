const dateStr = new Date();

export const getTodaysDate = () => {
    render() {
        const day = dateStr.getDate();
        const longday = dateStr.toLocaleDateString(locale, { weekday: 'long' });
        const month = dateStr.toLocaleString('default', { month: 'long' });
        const year = dateStr.getFullYear();

        // const today = getTodaysDate(dateStr, "en-US"); // Gives back Friday.
        
        let todaysDate = `${longday} ${day} ${month} ${year}`;
    }
};