import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Pag(props) {
  const [activePage, setActivePage] = useState(1);

  const getSneakers = async (i) => {
    const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page='+i+'&search='+props.search);
    const product = await response.json();
    if(response.ok) {
      console.log(product.products.length);
      props.setSneakers(product.products);
    } else {
      throw product;
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => {props.setLoading(true);getSneakers(1); setActivePage(1);props.setLoading(false)}}/>
      {activePage > 1 ? <Pagination.Prev onClick={() => {props.setLoading(true);getSneakers(activePage-1); setActivePage(activePage-1);props.setLoading(false)}}/> : ""}

      <Pagination.Item active>{activePage}</Pagination.Item>

      {activePage < 10 ? <Pagination.Next onClick={() => {props.setLoading(true);getSneakers(activePage+1); setActivePage(activePage+1);props.setLoading(false)}}/> : ""}
      <Pagination.Last onClick={() => {props.setLoading(true);getSneakers(10); setActivePage(10);props.setLoading(false)}}/>
    </Pagination>
  );
}

export { Pag }