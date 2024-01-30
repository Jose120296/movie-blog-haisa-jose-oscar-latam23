import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMessage();
  }, []);

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center"> 
      <div className="text-center">
        <h1>CineVerse</h1> 
        <div className="card shadow">
          <div className="card-body">
            <h1 className="mb-4">Log In</h1>
            <div className="mt-4">
              {!store.token ? (
                <Link to="/login">
                  <button className="btn btn-primary">Please Login</button>
                </Link>
              ) : (
                <button onClick={() => actions.logout()} className="btn btn-primary">
                  Sign Out
                </button>
              )}
            </div>
            <h3 className="mt-4">or</h3>
            <Link to="/signup">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};