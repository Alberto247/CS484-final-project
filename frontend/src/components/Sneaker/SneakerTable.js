import { Sneaker } from './Sneaker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pag } from '../Pagination/Pagination';
import { Loading } from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//Component to show the collection of shoes in the main and search pages
function SneakerTable(props) {
    let { search, page } = useParams();
    const [end, setEnd] = useState(false);
    const setLoading = props.setLoading;
    const setSneakers = props.setSneakers;

    useEffect(() => { //Load sneakers
        
        const getSneakers = async () => {
            setLoading(true);
            const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page=' + page + '&search=' + encodeURIComponent(search));
            const product = await response.json();
            if (response.ok) {
                console.log(product.products.length);
                setSneakers(product.products);
                setEnd(product.end);
            } else {
                throw product;
            }
            window.scrollTo(0, 0);
            setLoading(false);
        };
        const getInitSneakers = async () => {
            setLoading(true);

            const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/firstPage');
            const product = await response.json();
            if (response.ok) {
                console.log(product.products.length);
                setSneakers(product.products);
            } else {
                throw product;
            }
            window.scrollTo(0, 0);
            setLoading(false);
        };
        if(search === undefined) { //If in main page, load first page
            getInitSneakers();
        } else { //Else, load proper shoes
            getSneakers();
        }
    }, [search, page, setLoading, setSneakers]);

    if (props.loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="d-flex mt-3 justify-content-center" ><h1>{search ? "Results for: " + search : "Most popular sneakers"}</h1></div>
            <div className="d-flex flex-row mb-3 align-items-center justify-content-center justify-content-sm-center flex-wrap m-5">
                {props.sneakers.length !==0 ? props.sneakers.map((e) => { return <div key={e._id} className="p-2"><Sneaker fromFavourite={false} isFavourite={props.favourites?.map((e) => e.productId).includes(e._id)} sneaker={e} changeFavourite={props.changeFavourite} session={props.session}> </Sneaker></div> }): <h1>404 - Sneaker not found</h1>}
            </div>
            {props.sneakers.length > 0 && search !== undefined ? <div className="d-flex mb-3 justify-content-center" ><Pag end={end} search={search} page={page} /></div> : ""}
        </>
    );
}

export { SneakerTable }