const TokenKey = "access_token";

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
export function getAppName() {
  return sessionStorage.getItem("appName");
}
export function setAppName(data) {
  return sessionStorage.setItem("appName", data);
}
export function removeAppName() {
  return sessionStorage.removeItem("appName");
}
