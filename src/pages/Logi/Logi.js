import { React, useContext, useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase-config";
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        dispatch({ type: "LOGIN", payload: user });
        console.log("user ::" + JSON.stringify(user));
        const selected = document.querySelector(
          'input[name="type_user"]:checked'
        ).value;
        if (selected === "0") {
          navigate("/Dashboard");
        } else if (selected === "1") navigate("/Client");
        else navigate("/Login");

        // ...
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="typeUser">
          admin:
          <input type="radio" name="type_user" value="0" required />
          normal user :
          <input type="radio" name="type_user" value="1" required />
        </div>

        <button className="login" type="submit">
          Login
        </button>
        {error && <span>wrong password or email</span>}
        <p style={{ color: "rgb(6, 143, 255)" }}>forget password?</p>
        <br />
        <p style={{ margin: "0px" }}>
          Need account?{" "}
          <Link to="/Signup">
            <span style={{ color: "rgb(6, 143, 255)", fontWeight: "bold" }}>
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
