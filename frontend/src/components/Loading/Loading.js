import '../../App.css';
import logo from "../../logos/logo.png";
//Spinning logo
function Loading(props) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
        <div>
            <img style={{animation: `spin 3s linear infinite`}} src={logo} alt="img"/>
        </div>
        </div>)
}
export {Loading}