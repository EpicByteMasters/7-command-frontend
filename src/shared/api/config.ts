import { RequestMethod } from './type';

const baseOptions: RequestInit = {
  method: RequestMethod.Get,
  mode: 'no-cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'manual',
  referrerPolicy: 'origin',
  body: null
};

export { baseOptions };
