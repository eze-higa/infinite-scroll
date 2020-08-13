import axios from 'axios';

const limit = 4;
const apiUrl = 'https://jsonplaceholder.typicode.com/photos';

const getPhotos = async (page) => {
    const result = await axios.get(`${apiUrl}?_page=${page}&_limit=${limit}`)
    return result;
}

export default { getPhotos };
