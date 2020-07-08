import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"


// Componentes
import BasicModal from "../../components/Modal/BasicModal/BasicModal"
import SignUp from "../../components/SignUp/SignUp"

import SignInModal from "../../components/SignIn/SignInModal"

// SCSS
import "./SingIn.scss"
import "../../components/Modal/BasicModal/BasicModal.scss"

// Iconos FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons"

import LogoWhite from "../../assets/img/logo-white.png"
import LogoNormal from "../../assets/img/logo.png"

const SignIn = (props) => {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true)
        setContentModal(content)
    }

    return (
      <>
        <Container className="singIn" fluid>
          <Row>
            <LeftSide />
            <RightSide
              openModal={openModal}
              setShowModal={setShowModal}
              setRefreshCheckLogin={setRefreshCheckLogin}
            />
          </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}
        </BasicModal>
      </>
    );
}

const LeftSide = () => (
    <Col className="singIn__left" xs={6} >
        <img src={LogoNormal} alt="Logo de la app." />
        <div>
            <h2>
                <FontAwesomeIcon icon={faSearch} />
                sigue lo que te interesa.
            </h2>
            <h2>
                <FontAwesomeIcon icon={faUsers} />
                Enterate de lo que está hablando la gente.
            </h2>
            <h2>
                <FontAwesomeIcon icon={faComment} />
                Únete a la conversación.
            </h2>
        </div>
    </Col>
)

const RightSide = (props) => {


    const { openModal, setShowModal, setRefreshCheckLogin } = props;

    return (
      <Col className="singIn__right" xs={6}>
        <div>
          <img src={LogoWhite} alt="TuitApp" />
          <h2>Mira lo que está pasando en el mundo en este momento</h2>
          <h3>Únete a TuitApp hoy mismo.</h3>
          <Button
            variant="primary"
            onClick={() => openModal(<SignUp setShowModal={setShowModal} />)}
          >
            Regístrate
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              openModal(
                <SignInModal
                  setShowModal={setShowModal}
                  setRefreshCheckLogin={setRefreshCheckLogin}
                />
              )
            }
          >
            Iniciar sesión
          </Button>
        </div>
      </Col>
    );
}

export default SignIn

// alt: TuitApp
// ... : TuitApp