import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30738734-dcb87b478c99ce7d2b96a65dd';

async function fetchImages(name, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    return await response.data;
  } catch (error) {
    console.log(error.messege);
  }
}
