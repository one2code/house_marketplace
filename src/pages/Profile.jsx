import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom'

function Profile() {
	const auth = getAuth();

    // Accepts the username and email (from Firebase) of the logged in user as state
	const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData
    const navigate = useNavigate()

    // Logs the user out of firebase when this function is called
    const onLogout = () => {
        auth.signOut();
        navigate('/')
    }
	
	return (
        <div className='profile'>
            <header className="profileHeader">
                <p className="PageHeader">
                    My Profile
                </p>
                {/* Log out button that fires the onLogout function when clicked */}
                <button type = 'button' className="logOut" onClick={onLogout}>Log Out</button>
            </header>
        </div>
    )
}
export default Profile;
