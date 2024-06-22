import axios from 'axios';

const hitsApi = axios.create({
  baseURL: 'https://pixabay.com',
});

export async function getQuery(value, page) {
  const params = {
    key: '44351431-da99bbc5aa576d6c36cc46a59',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  };

  const res = await hitsApi.get('/api', { params });
  return res.data;
}
