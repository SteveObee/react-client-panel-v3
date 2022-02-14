import { doc, updateDoc } from "@firebase/firestore";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import Spinner from "../layout/Spinner";

const Settings = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const settingsReference = doc(firestore, "settings", user.uid);

  const { data: settings } = useFirestoreDocData(settingsReference);

  const disableBalanceOnAddChange = () => {
    updateDoc(settingsReference, {
      disableBalanceOnAdd: !settings.disableBalanceOnAdd
    });
  };

  const disableBalanceOnEditChange = () => {
    updateDoc(settingsReference, {
      disableBalanceOnEdit: !settings.disableBalanceOnEdit,
    });
  };

  return settings ? (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Disable Balance On Add</label>{" "}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={settings.disableBalanceOnAdd}
                onChange={disableBalanceOnAddChange}
              />
            </div>

            <div className="form-group">
              <label>Disable Balance On Edit</label>{" "}
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={settings.disableBalanceOnEdit}
                onChange={disableBalanceOnEditChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Settings;
