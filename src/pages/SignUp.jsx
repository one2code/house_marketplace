import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

// Function that manages the state and creates an input form for sign-in
function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
        name:'',
		email: "",
		password: "",
	});
	const { name, email, password } = formData;

    const navigate = useNavigate()

    // Passes in an event and takes the previous state of the form and replaces it with the value being entered in the form. e.target.id accepts any of the properties listed in the formData useState object
	const onChangeHandler = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };
	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<main>
					{/* Sign up page that requests a name, email and password */}
					<form>
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
                    <Link to='/sign-in' className='registerLink'>Sign in Instead</Link>
				</main>
			</div>
		</>
	);
}
export default SignUp;
