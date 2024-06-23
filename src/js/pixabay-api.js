import axios from 'axios';

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

  const res = await axios.get(`https://pixabay.com/api/?${params}`);
  return res.data;
}
