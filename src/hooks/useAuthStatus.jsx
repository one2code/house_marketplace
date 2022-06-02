import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Checks to see if the user is logged in
export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const isMounted = useRef(true);

	// Passes getAuth() from Firebase as an argument, and checks to see if the user is logged in, if so, then the useEffect will change the checkingStatus state to false and return loggedIn and checkingStatus
	useEffect(() => {
		// isMounted manages any potential memory leaks
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				}
				setCheckingStatus(false);
			});
		}
		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);
	return { loggedIn, checkingStatus };
};
