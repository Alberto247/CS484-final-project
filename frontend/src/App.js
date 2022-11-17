import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Navbar/Navbar.js'
import { Login } from './components/Login/Login.js'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Signup } from './components/Login/Signup';
import { SneakerTable } from './components/Sneaker/SneakerTable';
import { SneakerFinder } from './components/Sneaker/SneakerFinder';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient('https://otbiiqvlokfkqkyekqlm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YmlpcXZsb2tma3FreWVrcWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1OTQ0MTYsImV4cCI6MTk4MzE3MDQxNn0.Am6ZmsQnKvDy7pEM1af-LkYlZkVV8QzupW3gdcoLbzc')


function App() {
  const [loading, setLoading] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);

  const getInitSneakers = async () => {
    setLoading(true);
    const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/firstPage');
    const product = await response.json();
    if(response.ok) {
      console.log(product.products.length);
      setSneakers(product.products);
    } else {
      throw product;  
    }
    setLoading(false);
  };
  
  useEffect(() => {
    getInitSneakers();
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
    showSuccess("Log out")
    setLoggedIn(false)
  }

  return (<>
    <ToastContainer />
      <HashRouter>
      <Topbar isLoggedIn={isLoggedIn} setSneakers={setSneakers} getInitSneakers={getInitSneakers} signOut={signOut} setSearch={setSearch} setLoading={setLoading} setActivePage={setActivePage}></Topbar>
        <Routes>
          <Route path="/" element={<SneakerTable sneakers={sneakers} search={search} setSearch={setSearch} setSneakers={setSneakers} loading={loading} setLoading={setLoading} activePage={activePage} setActivePage={setActivePage}/>}/>
          <Route path='/login' element={<Login supabase={supabase} showSuccess={showSuccess} showError={showError} setLoggedIn={setLoggedIn}/>} />
          <Route path='/signup' element={<Signup supabase={supabase} showSuccess={showSuccess} showError={showError}/>}/>
          <Route path='/view/:sneaker' element={<SneakerFinder sneakers={sneakers}/>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}


export default App;
