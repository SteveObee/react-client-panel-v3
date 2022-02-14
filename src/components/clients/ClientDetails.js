import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFirestore, useUser, useFirestoreDocData } from "reactfire";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import Spinner from "../layout/Spinner";

const ClientDetails = () => {
  const [showBalanceUpdate, setShowBalanceUpdate] = useState(false);
  const [balanceUpdateAmount, setBalanceUpdateAmount] = useState();
  const firestore = useFirestore();

  const { data: user } = useUser();
  const { id } = useParams();
  const history = useNavigate();

  const documentReference = doc(firestore, "users", user.uid, "clients", id );

  const { data: client } = useFirestoreDocData(documentReference, {
    idField: "id",
  });

  useEffect(() => {
    if (client) {
      const currentClientBalance = parseFloat(client.balance.toString()).toFixed(2);
      setBalanceUpdateAmount(currentClientBalance);
    } 
  }, [client]);
  
  const onDeleteClick = (e) => {
    deleteDoc(documentReference).then(() => history("/"));
  };

  const balanceSubmit = (e) => {
    e.preventDefault();

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    };

    setDoc(documentReference, clientUpdate, { merge: true });

    setShowBalanceUpdate(false);
  };

  return client ? (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
        <div className="col-md-6">
          <div className="btn-group float-right">
            <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
              Edit
            </Link>
            <button
              onClick={(e) => onDeleteClick(e)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="card">
        <h3 className="card-header">
          {client.firstName} {client.lastName}
        </h3>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h4>
                Client ID: <span className="text-secondary">{client.id}</span>
              </h4>
            </div>
            <div className="col-md-4 col-sm-6">
              <h3 className="pull-right">
                Balance:{" "}
                <span className="success">
                  ${parseFloat(client.balance).toFixed(2)}
                </span>{" "}
                <a
                  href="#!"
                  onClick={() => setShowBalanceUpdate(!showBalanceUpdate)}
                >
                  <i className="fas fa-pencil-alt" />
                </a>
              </h3>
              {showBalanceUpdate && (
                <form onSubmit={(e) => balanceSubmit(e)}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="balanceUpdateAmount"
                      placeholder="Add New Balance"
                      value={balanceUpdateAmount}
                      onChange={(e) => setBalanceUpdateAmount(e.target.value)}
                    />
                    <div className="input-group-append">
                      <input
                        type="submit"
                        value="Update"
                        className="btn btn-outline-dark"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <hr />
          <ul className="list-group">
            <li className="list-group-item">Contact Email: {client.email}</li>
            <li className="list-group-item">Contact Phone: {client.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ClientDetails;
