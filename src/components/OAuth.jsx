import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
	const navigate = useNavigate();
	const location = useLocation();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// Checks to see if the user already exists in the Firestor

			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			// If the user doesn't exist, adds the user to the database
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate("/");
		} catch (error) {
			toast.error("Google sign in failed: " + error.message);
		}
	};

	return (
		<div className="socialLogin">
			<p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
			<button className="socialIconDiv" onClick={onGoogleClick}>
				<img src={googleIcon} alt="google logo" className="socialIconImg" />
			</button>
		</div>
	);
}
export default OAuth;
