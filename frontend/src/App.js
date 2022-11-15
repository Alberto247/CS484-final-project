import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Navbar/Navbar.js'
import { Login } from './components/Login/Login.js'
import { useEffect, useState } from 'react';
import { Homepage } from './components/Homepage/Homepage.js';
import { createClient } from '@supabase/supabase-js'
import { Signup } from './components/Login/Signup';
import { BigSneaker } from './components/Sneaker/BigSneaker';
import { Sneaker } from './components/Sneaker/Sneaker';
import { SneakerTable } from './components/Sneaker/SneakerTable';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient('https://otbiiqvlokfkqkyekqlm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YmlpcXZsb2tma3FreWVrcWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1OTQ0MTYsImV4cCI6MTk4MzE3MDQxNn0.Am6ZmsQnKvDy7pEM1af-LkYlZkVV8QzupW3gdcoLbzc')


function App() {
  const [sneakers, setSneakers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const getSneakers = async () => {
      const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/firstPage?i=1');
      const user = response.products;
      if (response.ok) {
        return user;
      } else {
        throw user;  // an object with the error coming from the server
      }
    };

    let products = getSneakers();
    setSneakers(products);
    
  }, []);


  function showError(message) {
    toast.error(message, { position: "top-center" }, { toastId: 0 });
  }
  
  function showSuccess(message) {
    toast.success(message, { position: "top-center" }, { toastId: 0 });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(error){
        throw error
    }
    setLoggedIn(false)
}
    
  return (<>
    <ToastContainer />
    <HashRouter>
    <Topbar isLoggedIn={isLoggedIn} signOut={signOut}></Topbar>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}/>
        <Route path='/login' element={<Login supabase={supabase} showSuccess={showSuccess} showError={showError} setLoggedIn={setLoggedIn}/>} />
        <Route path='/signup' element={<Signup supabase={supabase} showSuccess={showSuccess} showError={showError}/>}/>
        <Route path="/bigsneaker" element={<BigSneaker sneaker={{"lowestResellPrice":{"stockX":156,"flightClub":122,"goat":122},"imageLinks":[],"_id":"6372b8cec24cb70008c500a4","shoeName":"adidas Yeezy Boost 350 V2 Mono Cinder","brand":"adidas","silhoutte":"adidas Yeezy Boost 350 V2","styleID":"GX3791","make":"adidas Yeezy Boost 350 V2","colorway":"Mono Cinder/Mono Cinder/Mono Cinder","retailPrice":220,"thumbnail":"https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Mono-Cinder-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1635434704","releaseDate":"2021-06-24","description":"The Yeezy Boost 350 V2 'Mono Cinder' features a blacked-out look on its updated construction. Releasing as part of the Mono Pack, the shoe's upper is built with monofilament mesh in place of the usual Primeknit, finished entirely in black. The signature side stripe adds a minor deviation, while an internal cage and webbing heel pull-loop support the fit. Underfoot, the tonal tooling includes a Boost midsole wrapped in a rubber cage for cushioning, while the shoe itself dropped exclusively on Yeezy Supply.","urlKey":"adidas-yeezy-boost-350-v2-mono-cinder","resellLinks":{"stockX":"https://stockx.com/adidas-yeezy-boost-350-v2-mono-cinder","flightClub":"https://www.flightclub.com/yeezy-boost-350-v2-mono-light-yzy-350-v2-mono-light","goat":"http://www.goat.com/sneakers/yeezy-boost-350-v2-mono-light-yzy-350-v2-mono-light"},"goatProductId":743922}}></BigSneaker>} /> 
        <Route path="/smallsneaker" element={<Sneaker sneaker={{"lowestResellPrice":{"stockX":156,"flightClub":122,"goat":122},"imageLinks":[],"_id":"6372b8cec24cb70008c500a4","shoeName":"adidas Yeezy Boost 350 V2 Mono Cinder","brand":"adidas","silhoutte":"adidas Yeezy Boost 350 V2","styleID":"GX3791","make":"adidas Yeezy Boost 350 V2","colorway":"Mono Cinder/Mono Cinder/Mono Cinder","retailPrice":220,"thumbnail":"https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Mono-Cinder-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1635434704","releaseDate":"2021-06-24","description":"The Yeezy Boost 350 V2 'Mono Cinder' features a blacked-out look on its updated construction. Releasing as part of the Mono Pack, the shoe's upper is built with monofilament mesh in place of the usual Primeknit, finished entirely in black. The signature side stripe adds a minor deviation, while an internal cage and webbing heel pull-loop support the fit. Underfoot, the tonal tooling includes a Boost midsole wrapped in a rubber cage for cushioning, while the shoe itself dropped exclusively on Yeezy Supply.","urlKey":"adidas-yeezy-boost-350-v2-mono-cinder","resellLinks":{"stockX":"https://stockx.com/adidas-yeezy-boost-350-v2-mono-cinder","flightClub":"https://www.flightclub.com/yeezy-boost-350-v2-mono-light-yzy-350-v2-mono-light","goat":"http://www.goat.com/sneakers/yeezy-boost-350-v2-mono-light-yzy-350-v2-mono-light"},"goatProductId":743922}}></Sneaker>} /> 
        <Route path="/sneakertable" element={<SneakerTable sneakers={sneakers}></SneakerTable>} />
      </Routes>
    </HashRouter>
  </>
  );
}


export default App;
