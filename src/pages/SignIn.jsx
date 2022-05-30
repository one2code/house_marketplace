import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

// Function that manages the state and creates an input form for sign-in
function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

    const navigate = useNavigate()

    // Passes in an event and takes the previous state of the form and replaces it with the value being entered in the form. e.target.id accepts any of the properties listed in the formData useState object
	const onChangeHandler = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth()

            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            if (userCredentials.user) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<main>
					{/* Sign in page that requests an email and password */}
					<form onSubmit={onSubmit}>
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
						<div className="signInBar">
							<p className="signInText">Sign In</p>
							<button className="signInButton">
								<ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
							</button>
						</div>
					</form>
                    {/* Google 0Auth Component will go here */}
                    <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
				</main>
			</div>
		</>
	);
}
export default SignIn;
