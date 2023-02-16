//New next JS typescript page
import { useState, useContext, useCallback } from "react";

import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "@/lib/context";

import debounce from "lodash.debounce";
import { signInWithPopup } from "firebase/auth";
export default function Enter({}) {
	const { user, username } = useContext(UserContext);
	return (
		<main>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
}

function SignInButton() {
	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<button className='btn-google' onClick={signInWithGoogle}>
			<img src={"/google-logo.png"} alt='google' /> Sign in with Google
		</button>
	);
}
function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm(): JSX.Element {
	const [formValue, setFormValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, username } = useContext(UserContext);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = auth.currentUser;
		try {
			if (user) {
				const userDoc = firestore.doc(`users/${user.uid}`);
				const usernameDoc = firestore.doc(`usernames/${formValue}`);

				const batch = firestore.batch();
				batch.set(userDoc, {
					username: formValue,
					photoURL: user.photoURL,
					displayName: user.displayName,
				});
				batch.set(usernameDoc, { uid: user.uid });

				await batch.commit();
			} else {
				console.log("User not signed in");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
			setFormValue(val);
			setIsValid(false);
			setLoading(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	const checkUsername = useCallback(
		debounce(async (username) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log("Firestore read executed");
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={onSubmit}>
					<input
						name='username'
						placeholder='username'
						value={formValue}
						onChange={onChange}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<button type='submit' className='btn-green' disabled={!isValid}>
						Choose
					</button>
				</form>
				<h3>Debug State</h3>
				<div>
					Username: {formValue} <br />
					Loading: {loading.toString()} <br />
					Username Valid: {isValid.toString()}
				</div>
			</section>
		)
	);
}

function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <p>Checking...</p>;
	} else if (isValid) {
		return <p className='text-success'>{username} is available</p>;
	} else if (username && !isValid) {
		return <p className='text-danger'>{username} is NOT available</p>;
	} else {
		return <p></p>;
	}
}
