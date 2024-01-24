interface UserData {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	role: 'MENTOR' | 'EMPLOYEE' | 'MANAGER';
	imageUrl: string;
}

export const BASE_URL = 'http://localhost:8000';
export const TOKEN = '3ce1649ddce9c5aa867a4a9de993da7d5bc850e7';

const headers: HeadersInit = {
	authorization: `Token ${TOKEN}`,
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const getResponseData = <T>(res: Response): Promise<T> => {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
};

export const getUserData = (): Promise<UserData[]> => {
	return fetch(`${BASE_URL}api/v1/user/:id`, {
		method: 'GET',
		headers,
	})
		.then(getResponseData<UserData[]>)
		.catch((error) => Promise.reject(error));
};

export const logout = (): Promise<void> => {
	return fetch(`${BASE_URL}api/v1/logout`, {
		method: 'POST',
		credentials: 'include',
	})
		.then((res) => getResponseData<void>(res))
		.catch((error) => Promise.reject(error));
};
