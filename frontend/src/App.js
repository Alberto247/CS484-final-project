import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Navbar/Navbar.js'
import { Login } from './components/Login/Login.js'
import { useEffect } from 'react';
import { Homepage } from './components/Homepage/Homepage.js';

function App() {
  //const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
       //const SneaksAPI = require('sneaks-api');
      // const sneaks = new SneaksAPI();

      // //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
      // sneaks.getMostPopular(10, function(err, products){
      //   console.log(products)
      // });
    }, []);
    
  return (<>
    <BrowserRouter>
    <Topbar></Topbar>
      <Routes>
        <Route path="/" component={Homepage}/>
        <Route path='/login' component={Login} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
