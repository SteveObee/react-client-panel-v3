import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData, useUser, useSigninCheck } from "reactfire";
import { collection, query } from 'firebase/firestore';
import Spinner from "../layout/Spinner";

const Clients = () => {
  const [totalOwed, setTotalOwed] = useState(0);
  const { data: user } = useUser();
  const { status, data: signInCheckResult } = useSigninCheck();
  const firestore = useFirestore();

  const clientsCollection = collection(firestore, 'users', user.uid, 'clients' );
  const clientsQuery = query(clientsCollection);
  
  const { data: clients } = useFirestoreCollectionData(clientsQuery, {
    idField: "id",
  });
 
  useEffect(() => {
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      const fixedTotal = parseFloat(total).toFixed(2);

      setTotalOwed(fixedTotal);  
    }
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
              ${totalOwed}
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
  )
};

export default Clients;
