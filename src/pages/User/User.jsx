import React, { useState, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import { toast } from "react-toastify"
// Componentes / funciones / recursos
import { BasicLayout } from "../../layout/BasicLayout/BasicLayout"
import { getUserApi } from "../../api/User"
// Componentes y estilos
import "./User.scss"

const User = (props) => {

    const { match } = props;
    const [user, setUser] = useState(null)
    const { params } = match;

    console.log(user)

    useEffect(() => {
      getUserApi(params.id)
        .then(response => {
            if (!response) toast.error("El usuario que has visitado no existe.")
            setUser(response)
        })
        .catch(() => {
          toast.error("El usuario que has visitado no existe.");
        })
    }, [params])
    

    return (
      <BasicLayout className="user">
        <div className="user__title">
          <h2>{ user ? `${user.name} ${user.lastName}` : "El usuario no existe." }</h2>
        </div>
        <div>Banner usuario</div>
        <div>Info usuarios</div>
        <div className="user__tuits">Lista de Tuitappes</div>

        <Button>Traer Información</Button>
      </BasicLayout>
    );
}

export default withRouter(User)