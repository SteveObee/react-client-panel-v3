import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import Spinner from "../layout/Spinner";

const Clients = () => {
  const [totalOwed, setTotalOwed] = useState(0);
  const { data: user } = useUser();

  const collectionReference = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("clients");

  const { data: clients } = useFirestoreCollectionData(collectionReference, {
    idField: "id",
  });

  useEffect(() => {
    const total = clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

    setTotalOwed(total);
  }, [clients]);

  return clients ? (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>
            <i className="fas fa-users" /> Clients
          </h2>
        </div>
        <div className="col-md-6">
          <h5 className="text-right text-secondary">
            Total Owed{" "}
            <span className="text-primary">
              ${parseFloat(totalOwed.toFixed(2))}
            </span>
          </h5>
        </div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th className="d-none d-md-block">Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td className="d-none d-md-block">{client.email}</td>
                <td>${parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    to={`/client/${client.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right" /> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Clients;
