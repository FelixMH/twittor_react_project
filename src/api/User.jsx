import { API_HOST } from "../utils/constants"
import { getToken } from "./Auth"

const getUserApi = async id => {
    const url = `${ API_HOST }/ver-perfil?id=${id}`

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        }
    }

    return await fetch(url, params)
      .then(response => {
        // eslint-disable-next-line no-throw-literal
        if (response.status >= 400) throw null;
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
}

export {
    getUserApi
}