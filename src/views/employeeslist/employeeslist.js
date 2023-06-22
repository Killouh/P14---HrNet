import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import { Link } from "react-router-dom";
import "./employeeslist.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { TablePagination } from "@material-ui/core";

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
          <table className="pagination-container">
            <tbody>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[10, 50]}
                  colSpan={3}
                  count={displayedData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tbody>
          </table>


        <div className="textfield-container">
          <TextField
            style={{ width: "200px", height: "10px", marginBottom: "50px" }}
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
