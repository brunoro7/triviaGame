export const SEND_TOKEN = 'SEND_TOKEN';
export const SEND_PERFIL = 'SEND_PERFIL';

export const REQUEST_API = 'REQUEST_API';

export const sendToken = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const sendPerfil = (perfil) => ({
  type: SEND_PERFIL,
  perfil,
});

export const requestApi = (apiResult) => ({
  type: REQUEST_API,
  apiResult,
});
