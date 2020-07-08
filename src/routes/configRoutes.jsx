import { Home } from "../pages/Home/Home"
import User from "../pages/User/User"
import { Error404 } from "../pages/Error404/Error404"


const configRoutes = [
  {
    path: "/perfil/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
]

export {
    configRoutes
}