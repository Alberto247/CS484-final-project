import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Pag(props) {
  const [activePage, setActivePage] = useState(1);

  const getSneakers = async (i) => {
    props.setLoading(true);
    const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page='+i+'&search='+props.search);
    const product = await response.json();
    if(response.ok) {
      console.log(product.products.length);
      props.setSneakers(product.products);
    } else {
      throw product;
    }
    props.setLoading(false);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => {getSneakers(1); setActivePage(1);}}/>
      {activePage > 1 ? <Pagination.Prev onClick={() => {getSneakers(activePage-1); setActivePage(activePage-1);}}/> : ""}

      <Pagination.Item active>{activePage}</Pagination.Item>

      {activePage < 10 ? <Pagination.Next onClick={() => {getSneakers(activePage+1); setActivePage(activePage+1);}}/> : ""}
      <Pagination.Last onClick={() => {getSneakers(10); setActivePage(10);}}/>
    </Pagination>
  );
}

export { Pag }