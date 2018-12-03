import axios from 'axios';
import qs from 'query-string';

export const HTTP = axios.create({
  baseURL: `http://localhost:8088/`,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

export const HttpPost = (path, body) => {
    return HTTP.post(path, qs.stringify(body))
}