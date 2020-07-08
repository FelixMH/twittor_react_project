import React, { useState } from "react"
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import { values, size } from "lodash"
import { toast } from "react-toastify"

// Componentes / funciones
import isEmailValid from "../../utils/validations"
import { signUpApi } from "../../api/Auth"

import "./SignUp.scss"

const SignUp = (props) => {

    const { setShowModal } = props;

    const [formData, setFormData] = useState(initialFormValues())

    const [loadingData, setLoadingData] = useState(false)

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++
            return null;
        })
        
        if ( validCount !== size(formData) ) {
            toast.warning("Ningun campo puede estar vacío.")
        } else {
            if ( !isEmailValid(formData.email) ) {
                toast.warning("Email Invalido. ")
            } else if ( formData.password !== formData.repeatPassword ) {
                toast.warning("Las contraseñas no coinciden.")
            } else if ( size(formData.password) < 6 ) {
                toast.warning("La contraseña debe tener al menos seis caracteres.")
            } else {
                setLoadingData(true)
                signUpApi(formData)
                    .then(response => {
                        if ( response.code ) {
                            toast.warning(response.message)
                        } else {
                            toast.success("El registro ha sido correcto.")
                            setShowModal(false)
                            setFormData(initialFormValues())
                        }
                    })
                    .catch(() => {
                        toast.error("Error en el servidor, intente mas tarde!!! ")
                    })
                    .finally(() => {
                        setLoadingData(false)
                    })
            }
        }
    }

    return (
        <div className="signUp">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={ onSubmit } onChange={onChange}>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                defaultValue={formData.name}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="Apellidos"
                                name="lastName"
                                defaultValue={formData.lastName}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control 
                        type="email"
                        placeholder="Correo Electrónico"
                        name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                defaultValue={formData.password}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="password"
                                placeholder="Repetir Contraseña"
                                name="repeatPassword"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit">
                    { !loadingData ? "Registrar" : <Spinner animation="border" /> }
                </Button>
            </Form>
        </div>
    )
}


const initialFormValues = () => {
    return {
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}


export default SignUp