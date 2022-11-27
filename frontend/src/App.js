import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Topbar } from './components/Navbar/Navbar.js'
import { Login } from './components/Login/Login.js'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Signup } from './components/Login/Signup';
import { SneakerTable } from './components/Sneaker/SneakerTable';
import { SneakerFinder } from './components/Sneaker/SneakerFinder';
import { Favourites } from './components/Favourites/Favourites'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient('https://otbiiqvlokfkqkyekqlm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YmlpcXZsb2tma3FreWVrcWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1OTQ0MTYsImV4cCI6MTk4MzE3MDQxNn0.Am6ZmsQnKvDy7pEM1af-LkYlZkVV8QzupW3gdcoLbzc')

function App() {

  const [loading, setLoading] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [session, setSession] = useState(null)
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session !== null) {
        retrieveFavouriteShoes()
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  }, []);


  const retrieveFavouriteShoes = async () => {
    //retrieve of favorite shoes
    const { data, error } = await supabase.from('preferred_shoes').select(`productInfo, productId, threshold`)
    if (error) {
      console.log(error)
      throw error
    }
    //console.log("retrieve favourite",data);
    setFavourites(data);
  }

  const changeFavourite = async (element) => {
    //console.log(favourites);
    if (favourites.map((e) => e.productId).includes(element._id)) {
      let newFavourites = [];
      favourites.forEach((e) => { if (e.productId !== element._id) { newFavourites.push(e) } })
      console.log("change favourite add", newFavourites);
      setFavourites(newFavourites);

      try {
        await supabase.from("preferred_shoes").delete().eq('productId', element._id)
      } catch (err) {
        console.error(err);
      }
    } else {
      let newFavourites = favourites.slice();
      newFavourites.push({ productInfo: element, productId: element._id, thresold: null });
      setFavourites(newFavourites);
      const user_id = (await supabase.auth.getSession()).data.session.user.id;
      try {
        await supabase.from("preferred_shoes").insert({ user_id: user_id, productInfo: element, productId: element._id })
      } catch (err) {
        console.error(err);
      }
    }
  };

  const setThreshold = async (productId, threshold) => {
    let newFavourites = favourites.slice();
    newFavourites.forEach((e) => { if (e.productId === productId) { e.threshold = threshold } });
    setFavourites(newFavourites);
    try {
      await supabase.from("preferred_shoes").update({ threshold: threshold }).eq('productId', productId)
    } catch (err) {
      console.error(err);
    }
  }

  function showError(message) {
    toast.error(message, { position: "top-center" }, { toastId: 0 });
  }

  function showSuccess(message) {
    toast.success(message, { position: "top-center" }, { toastId: 0 });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    showSuccess("Log out");
    setSession(null)
  }

  return (<>
    <ToastContainer />
    <HashRouter>
      <Topbar session={session} setSneakers={setSneakers} signOut={signOut} setLoading={setLoading} favourites={favourites}></Topbar>
      <Routes>
        <Route path="/" element={<SneakerTable favourites={favourites} sneakers={sneakers} changeFavourite={changeFavourite} setSneakers={setSneakers} loading={loading} setLoading={setLoading} session={session} />} />
        <Route path='/login' element={session!=null?<Navigate to="/"></Navigate>:<Login supabase={supabase} showSuccess={showSuccess} showError={showError} session={session} />} />
        <Route path='/signup' element={session!=null?<Navigate to="/"></Navigate>:<Signup supabase={supabase} showSuccess={showSuccess} showError={showError} />} />
        <Route path='/view/:sneaker' element={<SneakerFinder sneakers={sneakers} setSneakers={setSneakers} loading={loading} setLoading={setLoading} />}></Route>
        <Route path='/favourites' element={session==null?<Navigate to="/"></Navigate>:<Favourites showSuccess={showSuccess} loading={loading} setThreshold={setThreshold} favourites={favourites} session={session} changeFavourite={changeFavourite} />}> </Route>
        <Route path="/search/:search/:page" element={<SneakerTable favourites={favourites} sneakers={sneakers} changeFavourite={changeFavourite} setSneakers={setSneakers} loading={loading} setLoading={setLoading} session={session} />} />
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </HashRouter>
  </>
  );
}


export default App;
