import axios from 'axios';
import qs from 'query-string';

export const HTTP = axios.create({
  baseURL: `http://kyc-server-dev.app3prj8ks.us-east-1.elasticbeanstalk.com:80/`,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

export const HttpPost = (path, body) => {
    return HTTP.post(path, qs.stringify(body))
}