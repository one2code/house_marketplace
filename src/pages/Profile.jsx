import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);
	// Accepts the username and email (from Firebase) of the logged in user as state
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;
	const navigate = useNavigate();

	// Logs the user out of firebase when this function is called
	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async () => {
		try {
			// Checks for any changes in the display name, and if the name value is different, it updates the display name stored in Firebase Auth to the new name value
			auth.currentUser.displayName !== name &&
				(await updateProfile(auth.currentUser, {
					displayName: name,
				}));

			auth.currentUser.email !== email &&
				(await updateEmail(auth.currentUser, email));
			// Takes in the db from Firebase Firestore, the 'users' collection, and the current users id, and updates the document by changing the name value in the updateDoc function
			const userRef = doc(db, "users", auth.currentUser.uid);
			await updateDoc(userRef, {
				name,
				email
			});
			toast.success('Profile update successful')
		} catch (error) {
			toast.error("Could not update profile details");
		}
	};

	// Updates each key in the prevState with the value passed into e.target.value
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="PageHeader">My Profile</p>
				{/* Log out button that fires the onLogout function when clicked */}
				<button type="button" className="logOut" onClick={onLogout}>
					Log Out
				</button>
			</header>
			<main>
				<div className="profileDetailsHeader">
					<div className="profileDetailsText">
						{/* Change to a button later for better web accessibility: make the outline hidden to keep the current style in place */}
						<p
							className="changePersonalDetails"
							onClick={() => {
								changeDetails && onSubmit();
								setChangeDetails((prevState) => !prevState);
							}}
						>
							{changeDetails ? "done" : "change"}
						</p>
					</div>
				</div>
				<div className="profileCard">
					<form action="">
						<input
							type="text"
							id="name"
							className={changeDetails ? "profileName" : "profileNameActive"}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type="text"
							id="email"
							className={changeDetails ? "profileEmail" : "profileEmailActive"}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	);
}
export default Profile;
