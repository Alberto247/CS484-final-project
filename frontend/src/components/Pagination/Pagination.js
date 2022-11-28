import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom'

function Pag(props) {
  const navigate = useNavigate()

  return (
    <Pagination>
      {props.page > 2 ? <Pagination.Item onClick={() => {navigate("/search/"+encodeURIComponent(props.search)+"/"+(parseInt(props.page)-2)); }}>{parseInt(props.page)-2}</Pagination.Item> : ""}
      {props.page > 1 ? <Pagination.Item onClick={() => {navigate("/search/"+encodeURIComponent(props.search)+"/"+(parseInt(props.page)-1)); }}>{parseInt(props.page)-1}</Pagination.Item> : ""}
      <Pagination.Item active>{props.page}</Pagination.Item>
      {!props.end ? <Pagination.Item onClick={() => {navigate("/search/"+encodeURIComponent(props.search)+"/"+(parseInt(props.page)+1));}}>{parseInt(props.page)+1}</Pagination.Item> : ""}
    </Pagination>
  );
}

export { Pag }