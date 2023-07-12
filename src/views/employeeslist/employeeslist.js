import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import { Link } from "react-router-dom";
import "./employeeslist.css";
import { Table, Pagination, Form, InputGroup } from "react-bootstrap";

/**
 * Provide a table to display context data registered from the index's form
 * @param {data}, from index's form
 * @returns {JSX}
 * Render all the user and their informations with a table with pagination and search mangement
 */

export default function EmployeesList() {
  const { employeeData } = useContext(EmployeeContext);

  const formattedData = employeeData.map((employee) => ({
    ...employee,
    street: employee.address.street,
    city: employee.address.city,
    zipCode: employee.address.zipCode,
    stateAbbreviation: employee.address.state.abbreviation,
    department: employee.department.label,
    dateOfBirth: new Date(employee.dateOfBirth).toLocaleDateString("en-US"),
    startDate: new Date(employee.startDate).toLocaleDateString("en-US"),
  }));


  // Search 
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = formattedData.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const dateOfBirth = employee.dateOfBirth;
    const startDate = employee.startDate;
    const address = `${employee.street} ${employee.city} ${employee.stateAbbreviation} ${employee.zipCode}`;
    const department = employee.department;

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  const displayedData = searchTerm ? filteredData : formattedData;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(displayedData.length / rowsPerPage);

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.text, 10) - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="employeelist-title">Current Employees</h2>
        </section>
      </div>

      <div className="paginationtextfield-container">
        <div className="pagination-container">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={handlePageChange}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
          <Form.Select
            className="rows-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Form.Select>
        </div>

        <div className="textfield-container">
          <InputGroup>
            <Form.Control
              type="text"
              className="searchbar"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date Of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {displayedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.startDate}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.stateAbbreviation}</td>
                <td>{employee.zipCode}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Link className="home-link" to="/">
        Home
      </Link>
    </main>
  );
}
