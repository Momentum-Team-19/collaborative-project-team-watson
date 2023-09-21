import axios from 'axios';

export const fetchData = async (endpoint, token = null) => {
    // Build headers
    let headers = {
        'Accept': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    try {
        // Make the API call
        const response = await axios.get(endpoint, { headers });
        
        // Return the response data
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
        throw error;  // You might want to re-throw the error if you want the calling function to handle it
    }
};
