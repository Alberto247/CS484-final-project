import { Sneaker } from './Sneaker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pag } from '../Pagination/Pagination'
import { Loading } from '../Loading/Loading';

function SneakerTable(props) {

    if(props.loading) {
        return <Loading/>
    }

    return(
        <>
            <div className="d-flex mt-3 justify-content-center" ><h1>{props.search ? "Results for :"+props.search : "Most popular sneakers"}</h1></div>
            <div className="d-flex flex-row mb-3 align-items-center justify-content-center flex-wrap m-5"> 
                {props.sneakers.map((e)=> {return <div key={e.productId} className="p-2"><Sneaker sneaker={e}> </Sneaker></div>})}
            </div>  
            {props.search ? <div className="d-flex mb-3 fixed-bottom justify-content-center" ><Pag setSneakers={props.setSneakers} setLoading={props.setLoading} search={props.search} activePage={props.activePage} setActivePage={props.setActivePage}/></div> : ""}
        </>
    );
}

export { SneakerTable }