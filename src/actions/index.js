export const SEND_TOKEN = 'SEND_TOKEN';
export const SEND_PERFIL = 'SEND_PERFIL';

export const sendToken = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const sendPerfil = (perfil) => ({
  type: SEND_PERFIL,
  perfil,
});
