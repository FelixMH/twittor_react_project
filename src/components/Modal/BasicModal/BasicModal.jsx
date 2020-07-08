import React from "react"

// Componentes
import LogoWhite from "../../../assets/img/logo-white.png"

// React-bootstrap
import { Modal } from "react-bootstrap"


const BasicModal = ({ show, setShow, children }) => (
    <Modal
        className="basic-modal"
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
    >
        <Modal.Header>
            <Modal.Title>
                <img className="logo-modal" src={LogoWhite} alt=""/>
            </Modal.Title>
            <Modal.Body>
                { children }
            </Modal.Body>
        </Modal.Header>
    </Modal>
)

export default BasicModal

// alt: TuitApp Login