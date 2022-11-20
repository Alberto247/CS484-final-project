import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { BigSneaker } from './BigSneaker';
import { useNavigate } from 'react-router-dom';

function SneakerFinder(props){
    const navigate = useNavigate();
    let { sneaker } = useParams();

    const result = props.sneakers.filter((e)=>e.shoeName===sneaker);
    if(result.length === 0) {
        navigate("/");
        return "404 - Sneaker not found";
    }
    const to_load = result[0];

    return <BigSneaker sneaker={to_load}></BigSneaker>;
}

export {SneakerFinder};