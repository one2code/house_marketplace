import {useNavigate, useLocation} from 'react-router-dom'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()

    // Checks the path in the location object, and if the path matches the route being passed in, it will return true
    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }
  return (
    //   Footer based navbar that displays an icon; when the icon is clicked, it uses the navigate hook to navigate to the listed route in the onClick function, passed in from React Router
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={()=> navigate('/')}>
                    <ExploreIcon fill= '#2c2c2c' width='36px' height ='36px'/>
                    <p>Explore</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/offers')}>
                    <OfferIcon fill= '#2c2c2c' width='36px' height ='36px'/>
                    <p>Offer</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/profile')}>
                    <PersonOutlineIcon fill= '#2c2c2c' width='36px' height ='36px'/>
                    <p>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}
export default Navbar