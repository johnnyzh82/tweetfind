const URI = "https://t-api.vercel.app/api/search";

export const findTweets = async (searchQuery, amount) => {
    const response = await fetch(`${URI}?query=${searchQuery}&max_results=${amount}`);
    
    if (!response.ok) {
        throw new Error(`Network wasn't ok!`);
    }

    return response.json();
};