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
	return fetch(`${BASE_URL}api/v1/user/me`, {
		method: 'GET',
		headers,
	})
		.then(getResponseData<UserData[]>)
		.catch((error) => Promise.reject(error));
};

export const getEmployeeIPRs = (id: number): Promise<UserData[]> => {
	return fetch(`${BASE_URL}/employee/iprs/ipr/${id}`, {
		method: 'GET',
		headers,
	})
		.then(getResponseData<UserData[]>)
		.catch((error) => Promise.reject(error));
};

//тут нужен id руководеля где-то
export const getMyTeamIprs = (): Promise<UserData[]> => {
	return fetch(`${BASE_URL}api/v1/mentor/iprs`, {
		method: 'GET',
		headers,
	})
		.then(getResponseData<UserData[]>)
		.catch((error) => Promise.reject(error));
};

export const createDraft = (id: number): Promise<any> => {
	return fetch(`${BASE_URL}api/v1/mentor/iprs/ipr/create`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			employeeId: id,
		}),
	})
		.then((response: Response) => getResponseData(response))
		.catch((error) => Promise.reject(error));
};

export const deleteDraft = (id: number): Promise<any> => {
	return fetch(`${BASE_URL}api/v1/mentor/iprs/ipr/${id}`, {
		method: 'DELETE',
		headers,
		body: JSON.stringify({
			employeeId: id,
		}),
	})
		.then((response: Response) => getResponseData(response))
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

export const onLogin = (username: string, password: string): Promise<any> => {
	return fetch(`${BASE_URL}api/v1/login`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	})
		.then((response: Response) => getResponseData(response))
		.catch((error) => Promise.reject(error));
};
