import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../logos/logo_con_sfondo_bianco.png";
function About(){

    return(
        
       <div className="text-style">
        <img
          src={logo}
          width="250px"
          height="250px"
          className="d-inline-block align-top"
          alt="SneakerScanner logo"
        />
        <h1>
            About us!
        </h1>
        <h2>
          <p>
            Monitor the prices of your favourites sneakers in few easy steps!<br/>
            First you need to create an account, if you don't already have one and then log in!<br/>
            Now you can add your favourite shoes by clicking on the heart.<br/>
            All your selected sneakers will appear on your favourite section, here you can add a "threashold price" and press enter to save it!
            Then when the price of that sneaker will be lower than that price you will be advised by email!
          </p>
        </h2>
       </div>
    )
}
export{About}