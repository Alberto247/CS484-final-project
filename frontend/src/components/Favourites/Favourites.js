import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from '../Loading/Loading';
import {Sneaker} from '../Sneaker/Sneaker';


function Favourites(props) {
    console.log(props)
    if(props.loading) {
        return <Loading/>;
    }
    return(
        <>
            <div className="d-flex mt-3 justify-content-center" ><h1>Favourites</h1></div>
            <div className="d-flex flex-row mb-3 align-items-center justify-content-center flex-wrap m-5"> 
                {props.favourites.map((el)=>{const e=el.productInfo;return <div key={e._id} className="p-2"><Sneaker showSuccess={props.showSuccess} isFavourite={true} fromFavourite={true} setThreshold={props.setThreshold} threshold={el.threshold} sneaker={e} changeFavourite={props.changeFavourite} session={props.session}> </Sneaker></div>})}
            </div>  
        </>
    );
}

export { Favourites }