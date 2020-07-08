import JwtDecode from "jwt-decode";
import { API_HOST, TOKEN } from "../utils/constants";


export async function signUpApi( user ) {
    const url = `${API_HOST}/registro`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        birthday: new Date()
    };
    
    delete userTemp.repeatPassword;
    
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    }

    return await fetch(url, params)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          return { code: 404, message: "Email no disponible." }
        }
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });

}

export async function signInApi ( user ) {
  
  const url = `${API_HOST}/login`;
  const data = {
    ...user,
    email: user.email.toLowerCase()
  }

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  return await fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Usuario o contraseña incorrectos." }
    })
    .then(result => { return result; })
    .catch(err => { return err })

}

const setTokenApi = token => {
  localStorage.setItem(TOKEN, token)
}

const getToken = () => {
  return localStorage.getItem(TOKEN)
}

const logoutApi = () => {
  localStorage.removeItem(TOKEN)
}

const isUserLoggedApi = () => {
  const token = getToken()

  if (!token) {
    logoutApi()
    return null
  }

  if ( isExpiredToken(token) ) {
    logoutApi(token)
  }
  return JwtDecode(token)

}

const isExpiredToken = token => {
  const { exp } = JwtDecode(token)

  const expired = exp * 1000;
  const timeOut = expired - Date.now()

  if (timeOut < 0 ) {
    return true;
  }
  return false
}

export {
  setTokenApi,
  isUserLoggedApi,
  getToken,
  logoutApi
}
