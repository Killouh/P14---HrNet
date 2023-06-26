import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import { Link } from "react-router-dom";
import "./employeeslist.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Pagination } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';



/**
 * Render a table that display employee with search and pagination
 * @param {data[id: number, firstName: string, lastName: string, dateOfBirth: date, startDate: date, address: {street: string, city: string, state: string, zipCode: number,},department: string] }
 * , submitted User(s)'s Array(s)
 * @returns {JSX} to render table and search/pagination
 */

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function EmployeesList() {

  const classes = useStyles();
  const { employeeData } = useContext(EmployeeContext);
  console.log(employeeData);

  // Table data managing
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

  useEffect(() => {
    console.log("Employee objet:", formattedData);
  }, [formattedData]);

  // Searchterm managing
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = formattedData.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedData = searchTerm ? filteredData : formattedData;

  //Pagination managing

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


const totalPages = Math.ceil(displayedData.length / rowsPerPage);
const currentPage = page + 1;

const handlePageChange = (event, newPage) => {
  setPage(newPage - 1);
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

      <TableContainer component={Paper} className="employee-table">
      <div className="paginationtextfield-container">
      <div className="pagination-container">
  <Pagination
    count={totalPages || 1}
    page={currentPage}
    onChange={handlePageChange}
    color="primary"
    variant="outlined"
    shape="rounded"
  />
  <InputLabel id="rows-per-page-label">Rows per page:</InputLabel>
  <Select
    labelId="rows-per-page-label"
    id="rows-per-page"
    value={rowsPerPage}
    onChange={handleChangeRowsPerPage}
  >
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={25}>25</MenuItem>
    <MenuItem value={50}>50</MenuItem>
  </Select>
</div>

  <div className="textfield-container">
    <TextField
      style={{ width: '200px', height: '10px', marginBottom: '50px' }}
      className="searchbar"
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
    />
  </div>
</div>


        <Table className={classes.table} aria-label="Employee Table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.startDate}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.dateOfBirth}</TableCell>
                  <TableCell>{employee.street}</TableCell>
                  <TableCell>{employee.city}</TableCell>
                  <TableCell>{employee.stateAbbreviation}</TableCell>
                  <TableCell>{employee.zipCode}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link className="home-link" to="/">
        Home
      </Link>
    </main>
  );
}
