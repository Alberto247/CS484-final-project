
function SearchBar(props){

    const [searchInput, setSearchInput] = useState("");
    const sneakers={};
    //get sneakers from API

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
    const handleSubmit=()=>{  
      if (searchInput.length > 0) {
          sneakers.filter((sneaker) => {
          return sneaker.name.match(searchInput);
      });
      }
    }
    return(
    <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={handleChange}
              aria-label="Search"
              value={searchInput}
              />
            <Button variant="outline-success" onCLick={()=>{handleSubmit}}>Search</Button>
    </Form>
    )
}