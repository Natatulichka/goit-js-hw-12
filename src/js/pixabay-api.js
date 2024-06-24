import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export async function getQuery(value, page, perPage) {
  const params = new URLSearchParams({
    key: '44351431-da99bbc5aa576d6c36cc46a59',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });

  const res = await axios(`/?${params}`);
  return res.data;
}
