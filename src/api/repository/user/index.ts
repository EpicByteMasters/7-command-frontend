import type { ICreateUserDto } from '../../dto/create-user.dto';

import type { IUserData } from './type';

import { BACKEND_URL } from '../../const';

import { bearerHeader, handleErrors } from '../../util';

import { getRequest } from '../../method';

const createUser = async (payload: ICreateUserDto, token: string) => {
  const headers = { bearer: bearerHeader(token) };
  const response = await getRequest<IUserData | null>(BACKEND_URL, { ...headers, body: JSON.stringify(payload) });
  const { data, errors } = response;

  if (errors) return handleErrors(errors);

  return data;
};

const userRepository = {
  createUser,
};

export default userRepository;
