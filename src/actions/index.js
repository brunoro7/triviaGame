export const SEND_TOKEN = 'SEND_TOKEN';

export const sendToken = (token) => ({
  type: SEND_TOKEN,
  token,
});
