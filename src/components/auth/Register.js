import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, useFirestore } from "reactfire";
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Alert from "../layout/Alert";

const Register = () => {
  const history = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const auth = getAuth();

  const firestore = useFirestore();

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage({ text: "Passwords do not match", messageType: "error" });
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const settingsReference = doc(firestore, "settings", res.user.uid);
        
        setDoc(settingsReference, {
          disableBalanceOnAdd: false,
          disableBalanceOnEdit: false,
        });
       

        setMessage(null);

        history("/");
      } catch (e) {
        setMessage({ text: e.message, messageType: "error" });
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-lock" /> Register
              </span>
            </h1>
            {message ? (
              <Alert message={message.text} messageType={message.messageType} />
            ) : null}
            <form className="form" onSubmit={(e) => onSubmit(e)} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  required
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
