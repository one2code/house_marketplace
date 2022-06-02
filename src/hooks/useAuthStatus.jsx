import {useEffect, useState} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

// Checks to see if the user is logged in
export const useAuthStatus = () => {
const [loggedIn, setLoggedIn] = useState(false)
const [checkingStatus, setCheckingStatus] = useState(true)

// Passes getAuth() from Firebase as an argument, and checks to see if the user is logged in, if so, then the useEffect will change the checkingStatus state to false and return loggedIn and checkingStatus
useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true)
        }
        setCheckingStatus(false)
    })
})

  return (
    {loggedIn, checkingStatus}
  )
}