import axios from 'axios';

async function getDownloadLink(mp3Url) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/', { url: mp3Url });
        if (response.status === 200) {
            return response.data;  // return the entire data object
        } else {
            throw new Error('Failed to fetch the download link');
        }
    } catch (error) {
        console.error('Error fetching the download link:', error.message);
        return null;
    }
}

export { getDownloadLink };
