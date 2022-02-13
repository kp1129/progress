import "./Login.css";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useMainContext } from "../../hooks/useMainContext";

function LoginForm() {
  const { setUser } = useMainContext();
  // local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // defaults to existing user login flow
  const [registration, setRegistration] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        const sessionUser = {
          uid: userAuth.user.uid,
          email: userAuth.user.email,
          firstName,
          lastName,
        };
        setUser(sessionUser);
        return userAuth;
      })
      .then((userAuth) => {
        return db.collection("users").doc(userAuth.user.uid).set({
          firstName,
          lastName,
          email,
        });
      })
      .catch((err) => {
        // error handling, copied from firebase docs
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === "auth/weak-password") {
          alert("The password is too weak");
        } else {
          alert(errorMessage);
        }
      });
  };

  const handleSignIn = () => {
    if (email.length < 4) {
      alert("Please enter an email address");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password");
      return;
    }
    // sign in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        return db
          .collection("users")
          .doc(userAuth.user.uid)
          .get()
          .then((querySnapshot) => {
            return {
              uid: userAuth.user.uid,
              data: querySnapshot.data(),
            };
          });
      })
      .then((userInfo) => {
        setUser({
          uid: userInfo.uid,
          email: userInfo.data.email,
          firstName: userInfo.data.firstName,
          lastName: userInfo.data.lastName,
        });
      })
      .catch((err) => {
        // error handling
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert(errorMessage);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registration) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-controls">
          <button onClick={() => setRegistration(false)} type="text">
            Sign in
          </button>
          <button onClick={() => setRegistration(true)} type="text">
            Sign up
          </button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {registration && (
            <>
              <label htmlFor="firstName">First name</label>
              <input
                required
                name="firstName"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label htmlFor="lastName">Last name</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-submit" type="submit">{registration ? "SIGN UP" : "SIGN IN"}</button>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
