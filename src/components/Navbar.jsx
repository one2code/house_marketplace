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
                {/* If the path being passed in pathMatchRoute matches the path being passed into navigate, it will return a bold fill when the respective icon is clicked to represent a selected state, and return a light grey otherwise to represent an unselected state */}
                <li className="navbarListItem" onClick={()=> navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height ='36px'/>
                    <p className = {pathMatchRoute('/') ? 'navbarListemItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/offers')}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height ='36px'/>
                    <p className= {pathMatchRoute('/offers') ? 'navbarListemItemNameActive' : 'navbarListItemName'}>Offer</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/profile')}>
                    <PersonOutlineIcon fill= {pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height ='36px'/>
                    <p className= {pathMatchRoute('/profile') ? 'navbarListemItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}
export default Navbar