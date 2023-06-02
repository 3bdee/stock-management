import { React, useContext, useState, useEffect } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../../Firebase/Firebase-config";
import welcomImg from "./analitic.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Circles } from "react-loader-spinner";
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [users, setusers] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      let user = [];
      try {
        const q = await getDocs(collection(db, "Users"));
        q.forEach((querySnapshot) => {
          user.push({ id: querySnapshot.id, ...querySnapshot.data() });
        });
        setusers(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        dispatch({ type: "LOGIN", payload: user });
        console.log("uid : " + uid);
        users.forEach((querySnapshot) => {
          if (querySnapshot.id === uid) {
            if (querySnapshot.is_admin) {
              navigate("/Dashboard");
            } else {
              navigate("/Client");
            }
          }
        });
      })
      .catch((error) => {
        setError(true);
        toast.error("email or password wrong !!");
        // ..
      });
  };
  return (
    <div className="main-login">
      {Object.keys(users).length ? (
        <div className="login-contain">
          <div className="left-side">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin} className="forLogin">
              <label for="email1">Email</label>
              <input
                placeholder="Entrer your email...."
                type="email"
                id="email1"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label for="pwd1">Password</label>
              <input
                placeholder="Enter password"
                type="password"
                id="pwd1"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <div className="typeUser">
              admin:
              <input
                type="radio"
                name="type_user"
                value="0"
                required
                className="rad"
              />
              normal user :
              <input
                type="radio"
                name="type_user"
                value="1"
                required
                className="rad"
              />
            </div> */}

              <button type="submit" id="sub_butt">
                LOG IN
              </button>
            </form>
            <div className="fott">
              <h6>
                Don't have a Account ? <Link to="/Signup">Register Now</Link>
              </h6>
            </div>
          </div>
          <div className="right-side">
            <div className="welcomeNote">
              <h3>Welcome Back !</h3>
            </div>
            <div className="welcomImg">
              <img src={welcomImg} id="wel-img-id" alt="" srcSet="" />
            </div>
          </div>
        </div>
      ) : (
        <Circles
          height="200"
          width="200"
          color="orange"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
