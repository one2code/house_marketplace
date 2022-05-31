import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

// Function that manages the state and creates an input form for sign-in
function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = formData;

	const navigate = useNavigate();

	// Passes in an event and takes the previous state of the form and replaces it with the value being entered in the form. e.target.id accepts any of the properties listed in the formData useState object
	const onChangeHandler = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			// Returns the authentication instance from getAuth()
			const auth = getAuth();
			// userCredential registers the user with the returned promise function and its passed in values
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			//    Updates the database with the displayname
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			//    Copys the formData object and deletes the password before being submitted to the database
			// severTimestamp adds a timestamp to the formDataCopy upon submission
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			//    Updates our user and adds it to the 'users' collection
			await setDoc(doc(db, "users", user.uid), formDataCopy);

			//    Redirects to the homepage
			navigate("/");
		} catch (error) {
            toast.error(error)
        }
	};
	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<main>
					{/* Sign up page that requests a name, email and password */}
					<form onSubmit={onSubmit}>
						<input
							type="name"
							className="nameInput"
							placeholder="Name"
							id="name"
							value={name}
							onChange={onChangeHandler}
						/>
						<input
							type="email"
							className="emailInput"
							placeholder="Email"
							id="email"
							value={email}
							onChange={onChangeHandler}
						/>

						<div className="passwordInputDiv">
							<input
								type={showPassword ? "text" : "password"}
								className="passwordInput"
								placeholder="Password"
								id="password"
								value={password}
								onChange={onChangeHandler}
							/>
							<img
								src={visibilityIcon}
								alt="an eye that when clicked makes the password input visible"
								className="showPassword"
								onClick={() => setShowPassword((prevState) => !prevState)}
							/>
						</div>
						{/* Redirects to the forgot password page when clicked */}
						<Link to="/forgot-password" className="forgotPasswordLink">
							Forgot Password
						</Link>
						<div className="signUpBar">
							<p className="signUpText">Sign Up</p>
							<button className="signUpButton">
								<ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
							</button>
						</div>
					</form>
					{/* Google 0Auth Component will go here */}
					<Link to="/sign-in" className="registerLink">
						Sign in Instead
					</Link>
				</main>
			</div>
		</>
	);
}
export default SignUp;
