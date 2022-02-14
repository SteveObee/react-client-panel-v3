import { useEffect, useState } from "react";
import { useUser, useFirestore, useFirestoreDocData } from "reactfire";
import { doc, setDoc, query } from 'firebase/firestore';
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

const EditClient = () => {

  const [formData, setFormData] = useState({
    balance: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const { balance, email, firstName, lastName, phone } = formData;
  
  const history = useNavigate();
  const firestore = useFirestore();

  const { data: user } = useUser();
  const { id } = useParams();

  const clientReference = doc(firestore, "users", user.uid, "clients", id);
  const clientsQuery = query(clientReference);

  const { data: client } = useFirestoreDocData(clientsQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (client) {
      const fixedClientBalance = parseFloat(client.balance.toString()).toFixed(2);

      setFormData({
        balance: fixedClientBalance,
        email: client.email,
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
      });
    }
  }, [client]);
  
  const settingsReference = doc(firestore, "settings", user.uid);
  const { data: settings } = useFirestoreDocData(settingsReference);
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const updClient = {
      balance,
      email,
      firstName,
      lastName,
      phone,
    };

    setDoc(clientReference, updClient).then(() => history("/"));
  };

  return client && settings ? (
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
                value={firstName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                minLength="2"
                value={lastName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
                minLength="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                className="form-control"
                name="balance"
                value={balance}
                onChange={(e) => onChange(e)}
                disabled={settings.disableBalanceOnEdit}
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

export default EditClient;
