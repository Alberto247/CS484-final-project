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
    props.setLoading(false);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => {getSneakers(1); props.setActivePage(1);}}/>
      {props.activePage > 1 ? <Pagination.Prev onClick={() => {getSneakers(props.activePage-1); props.setActivePage(props.activePage-1);}}/> : ""}

      <Pagination.Item active>{props.activePage}</Pagination.Item>

      {props.activePage < 10 ? <Pagination.Next onClick={() => {getSneakers(props.activePage+1); props.setActivePage(props.activePage+1);}}/> : ""}
      <Pagination.Last onClick={() => {getSneakers(10); props.setActivePage(10);}}/>
    </Pagination>
  );
}

export { Pag }