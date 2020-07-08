import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { map } from "lodash"
import { configRoutes } from "./configRoutes"

const Routing = (props) => {

  const { setRefreshCheckLogin } = props;

    return (
      <Router>
        <Switch>
          {map(configRoutes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
            >
              <route.page setRefreshCheckLogin={ setRefreshCheckLogin } />
              {/* <route.page setRefreshCheckLogin={ setRefreshCheckLogin } component={route.page} /> */}
            </Route>
          ))}
        </Switch>
      </Router>
    );
}

export {
    Routing
}