import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Alert from "../layout/Alert";

const Login = () => {
  const auth = getAuth();

  const history = useNavigate();

  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history("/");
    } catch (e) {
      setMessage({ text: e.message, messageType: "error" });
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-lock" /> Login
              </span>
            </h1>
            {message ? (
              <Alert message={message.text} messageType={message.messageType} />
            ) : null}
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Email (test@example.com)</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password (123456)</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
