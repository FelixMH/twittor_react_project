import React, { useEffect, useState } from "react";
// import {  } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { isUserLoggedApi } from "./api/Auth";
// Componentes y páginas
import SignIn from "./pages/Sign/SignIn";
import { AuthContext } from "./utils/context";
import { Routing } from "./routes/Routing"


const App = () => {

  const [ user, setUser ] = useState(null);
  const [loadUser, setLoadUser] = useState(false)
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)


  useEffect(() => {
    setUser(isUserLoggedApi())
    setRefreshCheckLogin(false)
    setLoadUser(true)
  }, [refreshCheckLogin])

  if ( !loadUser ) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshCheckLogin={setRefreshCheckLogin} />
      ) : (
        <SignIn setRefreshCheckLogin={setRefreshCheckLogin} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );

}

export default App;
