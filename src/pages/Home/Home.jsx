import React from "react"

// Componentes
import { BasicLayout } from "../../layout/BasicLayout/BasicLayout"

// Estilos
import "./Home.scss"

const Home = (props) => {

  const { setRefreshCheckLogin } = props;

  return (
    <div>
      <BasicLayout className="home" setRefreshCheckLogin={ setRefreshCheckLogin } >
        <h2>Estas en HOME.</h2>
      </BasicLayout>
    </div>
  )
}

export {
    Home
}