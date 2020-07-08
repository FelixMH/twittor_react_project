import { size, values } from "lodash"
import React, { useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"
import { setTokenApi, signInApi } from "../../api/Auth"
// Componentes / funciones / utils
import isEmailValid from "../../utils/validations"
import "../SignUp/SignUp.scss"








const SignInModal = (props) => {
    const { setShowModal, setRefreshCheckLogin } = props;

    // Hooks de estado
    const [formData, setFormData] = useState(initialFormValues());
    const [loadingData, setLoadingData] = useState(false)

    const onSubmit = e => {
        e.preventDefault()

        let validCount = 0;
        values(formData).some(value => {
          value && validCount++
          return null;
        })

        if ( size(formData) !== validCount ) {
          toast.warning("Ningún campo puede estar vacío.")
        } else {
          if ( !isEmailValid(formData.email) ) {
            toast.warning("El email es inválido.")
          } else {
            setLoadingData(true)
            signInApi(formData)
              .then((response) => {
                if (response.message) {
                  toast.warning(response.message);
                } else {
                  setTokenApi(response.token)
                  setRefreshCheckLogin(true)
                  // console.log(response.token);
                }
              })
              .catch(() =>
                toast.error(
                  "Error en alguna operación del servidor, intentelo mas tarde."
                )
              )
              .finally(() => setLoadingData(false) );
          }
        }
        setShowModal(false)
    }

    const onChange = e => {
      setFormData( { ...formData, [e.target.name]: e.target.value } )
    }



    return (
      <div className="signUp">
        <h2>Inicia sesión en tu cuenta.</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              defaultValue={ formData.email }
              name="email"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              defaultValue={ formData.password }
              name="password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            { !loadingData ? "Iniciar sesión" : <Spinner animation="border" /> }
          </Button>
        </Form>
      </div>
    );
}

const initialFormValues = () => {
  return {
    email: "",
    password: ""
  }
}

export default SignInModal