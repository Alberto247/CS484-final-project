import Spinner from 'react-bootstrap/Spinner';
function Loading(props) {

    return (
        <div>
            <p>Loading...</p> 
            <Spinner animation="border" role="status">
            </Spinner>
        </div>)
}
export {Loading}