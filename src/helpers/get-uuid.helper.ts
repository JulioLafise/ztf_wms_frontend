import { v3, v4, v5, validate, version } from 'uuid';
import { GeneratedData } from './';

export const getUUIDFromURL = (url: string): string => {
  let response = '';
  url.split('/').forEach(fragment => {
    if (validate(fragment)) {
      response = fragment;
      return;
    }
  });
  return response;
};

type UUIDVersion = 'v3' | 'v4' | 'v5'

export const generateUUID = (version?: UUIDVersion): string => {
  switch (version) {
    case 'v3':
      return v3(GeneratedData.password(), 'v3Helpers');

    case 'v4':
      return v4();

    case 'v5':
      return v5(GeneratedData.password(), 'v5Helpers');
  
    default:
      return v4();
  }
};

export const validateUUID = (uuid: string): boolean => validate(uuid);

export const verifyVersionUUID = (uuid: string): number => version(uuid);