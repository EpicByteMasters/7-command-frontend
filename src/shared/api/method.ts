import { RequestMethod } from './type';
import { baseOptions } from './config';
import { makeUrl } from './util';

const getRequest = async <Res>(uri: string, options: RequestInit): Promise<{ errors: string[]; data: Res | null }> => {
  const response = await fetch(makeUrl(uri), { ...baseOptions, method: RequestMethod.Get, ...options });
  if (!response.ok) return { errors: ['response is not ok'], data: null };
  const { data, errors } = await response.json();
  return { data, errors };
};

const postRequest = async <Res>(uri: string, options: RequestInit): Promise<{ errors: string[]; data: Res | null }> => {
  const response = await fetch(makeUrl(uri), { ...baseOptions, method: RequestMethod.Post, ...options });
  if (!response.ok) return { errors: ['response is not ok'], data: null };
  const { data, errors } = await response.json();
  return { data, errors };
};

const patchRequest = async <Res>(
  uri: string,
  options: RequestInit
): Promise<{ errors: string[]; data: Res | null }> => {
  const response = await fetch(makeUrl(uri), { ...baseOptions, method: RequestMethod.Patch, ...options });
  if (!response.ok) return { errors: ['response is not ok'], data: null };
  const { data, errors } = await response.json();
  return { data, errors };
};

const deleteRequest = async <Res>(
  uri: string,
  options: RequestInit
): Promise<{ errors: string[]; data: Res | null }> => {
  const response = await fetch(makeUrl(uri), { ...baseOptions, method: RequestMethod.Delete, ...options });
  if (!response.ok) return { errors: ['response is not ok'], data: null };
  const { data, errors } = await response.json();
  return { data, errors };
};

export { getRequest, postRequest, patchRequest, deleteRequest };
