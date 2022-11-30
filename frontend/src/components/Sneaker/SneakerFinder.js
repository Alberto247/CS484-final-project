import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { BigSneaker } from './BigSneaker';
import { useEffect, useState } from 'react';

function SneakerFinder(props){
    let { sneaker } = useParams();
    const [toLoad, setToLoad] = useState(undefined);
    const setLoading = props.setLoading;
    const sneakers = props.sneakers;
    const setSneakers = props.setSneakers;

    useEffect(() => {
        const getSneaker = async () => {
            let result;
            setLoading(true);
            if(!sneakers.map((e)=>e.shoeName).includes(sneaker)) {
                const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page=1&search=' + encodeURIComponent(sneaker));
                const product = await response.json();
                if(response.ok) {
                    setSneakers(product.products);
                    result = product.products.filter((e)=>e.shoeName===sneaker);
                } else {
                throw product;
                }
            }
            else{
                result = sneakers.filter((e)=>e.shoeName===sneaker);
            }
            if(result.length !== 0) {
                setToLoad(result[0]);
            }
            window.scrollTo(0, 0);
            setLoading(false);
        };

        getSneaker();
    }, [setLoading, sneakers, sneaker, setSneakers]);

    return <BigSneaker sneaker={toLoad} changeFavourite={props.changeFavourite} isFavourite={props.favourites?.map((e) => {return e.productId}).includes(toLoad?._id)} ></BigSneaker>;    
}

export {SneakerFinder};