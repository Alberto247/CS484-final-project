import { Table } from 'react-bootstrap';
import{Sneaker} from './Sneaker';
function SneakerTable(props){
    console.log(props.sneakers);
    return(
        
        <div className="d-flex flex-row mb-3"> 
        {props.sneakers.map((e)=> {<div className="p-2"><Sneaker sneaker={e}> </Sneaker></div>})}
        </div>
    )
}
export{SneakerTable}