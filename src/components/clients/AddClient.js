import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc, addDoc, collection } from 'firebase/firestore';
import Spinner from "../layout/Spinner";

const AddClient = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
  });
  const { firstName, lastName, email, phone, balance } = formData;

  const history = useNavigate();
  const { data: user } = useUser();
  const firestore = useFirestore();

  const clientsReference = collection(firestore, "users", user.uid, "clients" );
  const settingsReference = doc(firestore, "settings", user.uid);

  const { data: settings } = useFirestoreDocData(settingsReference);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newClient = formData;

    // If no balance make 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    addDoc(clientsReference, newClient).then(() => history("/"));
  };

  return settings ? (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fa fa-arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Add Client</div>
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                minLength="2"
                required
                onChange={(e) => onChange(e)}
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                minLength="2"
                required
                onChange={(e) => onChange(e)}
                value={lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={(e) => onChange(e)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                minLength="10"
                required
                onChange={(e) => onChange(e)}
                value={phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                className="form-control"
                name="balance"
                onChange={(e) => onChange(e)}
                value={balance}
                disabled={settings.disableBalanceOnAdd}
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default AddClient;
