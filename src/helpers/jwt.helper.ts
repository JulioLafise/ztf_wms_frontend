


export const parseJwt = <T,>(token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = decodeURIComponent(window.atob(base64).split('').map(item => {
    return '%' + ('00' + item.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(payload) as T;
};