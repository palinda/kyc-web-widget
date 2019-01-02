import axios from 'axios';
import qs from 'query-string';
import { Configs } from './configs'

export const HTTP = (token) => axios.create({
  baseURL: Configs.endpoint,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': token,
  }
})

export const HttpPost = (path, token, body) => {
    return HTTP(token).post(path, qs.stringify(body))
}