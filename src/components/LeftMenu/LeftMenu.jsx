import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from "@fortawesome/free-solid-svg-icons"

// Componentes y funciones
import { logoutApi } from "../../api/Auth"
import useAuth from "../../hooks/useAuth"
import LogoWhite from "../../assets/img/logo-white.png"

// Estilos 
import "./LeftMenu.scss"

const LeftMenu = (props) => {

  const { setRefreshCheckLogin } = props;

  const user = useAuth()

  const logout = () => {
    logoutApi()
    setRefreshCheckLogin(true)
  }

    return (
      <div className="left-menu">
        <img className="logo" src={LogoWhite} alt="Logo" />

        
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Inicio
          </Link>

          <Link to={`/perfil/${user?._id}`}>
            <FontAwesomeIcon icon={faUser} /> Perfil
          </Link>

          <Link to="/usuarios">
            <FontAwesomeIcon icon={faUsers} /> Usuarios
          </Link>

          <Link to="" onClick={logout}>
            <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
          </Link>
        

        <Button> TuitAppear </Button>
      </div>
    );
}

export {
    LeftMenu
}