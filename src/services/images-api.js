import axios from 'axios';
const APIKEY = '35105940-051708562a54e8fbc749fff56';

export function getImages(q, page) {
  return axios.get(
    `https://pixabay.com/api/?key=${APIKEY}&q=${q}&per_page=12&page=${page}&orientation=horizontal`
  );
}
