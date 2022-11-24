import Pagination from 'react-bootstrap/Pagination';

function Pag(props) {

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
    window.scrollTo(0, 0);
    props.setLoading(false);
  };

  return (
    <Pagination>
      {props.activePage > 2 ? <Pagination.Item onClick={() => {getSneakers(props.activePage-2); props.setActivePage(props.activePage-2);}}>{props.activePage-2}</Pagination.Item> : ""}
      {props.activePage > 1 ? <Pagination.Item onClick={() => {getSneakers(props.activePage-1); props.setActivePage(props.activePage-1);}}>{props.activePage-1}</Pagination.Item> : ""}
      <Pagination.Item active>{props.activePage}</Pagination.Item>
      <Pagination.Item onClick={() => {getSneakers(props.activePage+1); props.setActivePage(props.activePage+1);}}>{props.activePage+1}</Pagination.Item>
      <Pagination.Item onClick={() => {getSneakers(props.activePage+2); props.setActivePage(props.activePage+2);}}>{props.activePage+2}</Pagination.Item>
    </Pagination>
  );
}

export { Pag }