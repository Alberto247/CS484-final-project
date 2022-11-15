import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom'
import { BigSneaker } from './BigSneaker';
function SneakerFinder(props){
    let { sneaker } = useParams();

    const result = props.sneakers.filter((e)=>e.shoeName===sneaker)
    if(result.length===0){
        return "404 - Sneaker not found"
    }
    const to_load = result[0];

    return(
        <BigSneaker sneaker={to_load}></BigSneaker>
    )
}
export{SneakerFinder}