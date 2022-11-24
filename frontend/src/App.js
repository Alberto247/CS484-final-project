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
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [session, setSession] = useState(null)
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if(session!==null){
        retrieveFavouriteShoes()
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  }, []);

  
  const retrieveFavouriteShoes= async () => {
      //retrieve of favorite shoes
      const {data , error} = await supabase.from('preferred_shoes').select(`productId`)
      if(error){
        console.log(error)
        throw error
      }
      const parsedData = []
      data.forEach((e)=>parsedData.push(e.productId));
      console.log(parsedData)
      setFavourites(parsedData);
  }

  const getInitSneakers = async () => {
    setLoading(true);

    const ebay = await (await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/firstPage')).json();
    console.log(ebay);
    
    const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/firstPage');
    const product = await response.json();
    if(response.ok) {
     // console.log(product.products.length);
      setSneakers(product.products);
    } else {
      throw product;  
    }
    window.scrollTo(0, 0);
    setLoading(false);
  };
  
  useEffect(() => {
    getInitSneakers();
  }, []);

  const changeFavourite = async (element) => {
    console.log(favourites);
    if(favourites.includes(element._id)){
      let newFavourites = [];
      favourites.forEach((e)=>{if(e!==element._id){newFavourites.push(e)}})
      console.log(newFavourites);
      console.log(element._id)
      setFavourites(newFavourites);
   
      try{
        await supabase.from("preferred_shoes").delete().eq('productId', element._id)        
      }catch (err){
        console.error(err);
      }
    }else{
      let newFavourites = favourites.slice();
      newFavourites.push(element._id);
      setFavourites(newFavourites);
      const user_id = (await supabase.auth.getSession()).data.session.user.id;
      try{
        await supabase.from("preferred_shoes").insert({ user_id: user_id, productInfo:element, productId:element._id})
      }catch(err){
        console.error(err);
      }
    }
  };

  function showError(message) {
    toast.error(message, { position: "top-center" }, { toastId: 0 });
  }
  
  function showSuccess(message) {
    toast.success(message, { position: "top-center" }, { toastId: 0 });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if(error){
        throw error;
    }
    showSuccess("Log out");
    setSession(null)
  }

  return (<>
    <ToastContainer />
      <HashRouter>
      <Topbar session={session} setSneakers={setSneakers} getInitSneakers={getInitSneakers} signOut={signOut} setSearch={setSearch} setLoading={setLoading} setActivePage={setActivePage}></Topbar>
        <Routes>
          <Route path="/" element={<SneakerTable sneakers={sneakers} changeFavourite={changeFavourite} favourites={favourites} search={search} setSearch={setSearch} setSneakers={setSneakers} loading={loading} setLoading={setLoading} activePage={activePage} setActivePage={setActivePage} session={session}/>}/>
          <Route path='/login' element={<Login supabase={supabase} showSuccess={showSuccess} showError={showError} session={session}/>} />
          <Route path='/signup' element={<Signup supabase={supabase} showSuccess={showSuccess} showError={showError}/>}/>
          <Route path='/view/:sneaker' element={<SneakerFinder sneakers={sneakers}/>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}


export default App;
