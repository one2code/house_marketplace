import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoutes = () => {

    const loggedIn = false
  return(
    loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
  ) 
}
export default PrivateRoutes