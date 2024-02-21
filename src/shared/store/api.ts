import { BASE_URL } from '../utils/constants';

interface FetchDataOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export const fetchDataFromApi = async <T>(
  url: string,
  options?: FetchDataOptions
): Promise<T> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      ...options
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error during fetching data: ${error}`);
    throw error;
  }
};
