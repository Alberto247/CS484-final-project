import Spinner from 'react-bootstrap/Spinner';
function Loading(props) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
        <div>
            <p>Loading...</p> 
        </div>
        <div>
            <Spinner animation="border" role="status">
            </Spinner>
        </div>
        </div>)
}
export {Loading}