import Cookies from 'js-cookie'

const authToken = 'token';
const authority = 'authority';
const authProfile = 'profile';

export function getToken() {
    return Cookies.get(authToken)
}
export function setToken(value) {
Cookies.set(authToken,value)
}

export function removeToken() {
Cookies.remove(authToken)
}


export function getAuth() {
   return Cookies.get(authority)
}
export function setAuth(value) {
    Cookies.set(authority,value)
}

export function removeAuth() {
    Cookies.remove(authority)
}

export function getProfile() {
    return  Cookies.get(authProfile)
}
export function setProfile(value) {
    Cookies.set(authProfile,value)
}

export function removeProfile() {
    Cookies.remove(authProfile)
}
