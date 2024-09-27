/* eslint-disable react/prop-types */
import { Form, FormControl } from "react-bootstrap";

const SearchUser = ({ searchQuery, setSearchQuery }) => {
  return (
    <Form className="d-flex w-50">
      <FormControl
        type="search"
        placeholder="Enter name or email to search a user"
        className="me-2 py-2"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Form>
  );
};

export default SearchUser;
