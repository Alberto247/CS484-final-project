import{Sneaker} from './Sneaker';
import 'bootstrap/dist/css/bootstrap.min.css';

function SneakerTable(props){

    return(
        <div className="d-flex flex-row mb-3 align-items-center justify-content-center flex-wrap m-5"> 
        {props.sneakers.map((e)=> {return <div key={e.shoeName} className="p-2"><Sneaker sneaker={e}> </Sneaker></div>})}
        </div>  
    )
}
export{SneakerTable}