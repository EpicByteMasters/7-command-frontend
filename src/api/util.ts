import { BACKEND_URL } from './const';

const handleErrors = (errors: string[]) => {
  const err = new Error(errors?.map((errorMessage: string) => errorMessage).join('\n') ?? 'unknown');
  console.warn({ err });
  return Promise.reject(new Error('Can`t get data'));
};

const bearerHeader = (token?: string) => (token ? `bearer: ${token}` : undefined);

const reqBody = (data: unknown) => JSON.stringify(data);

const makeUrl = (uri: string) => `${BACKEND_URL}`;

export { handleErrors, bearerHeader, reqBody, makeUrl };
