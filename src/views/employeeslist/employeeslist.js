import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../../components/employeecontext/employeecontext';
import { Link } from 'react-router-dom';
import './employeeslist.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EmployeesList() {
  const classes = useStyles();
  const { employeeData } = useContext(EmployeeContext);



  const formattedData = employeeData.map((employee) => ({
    ...employee,
    street: employee.address.street,
    city: employee.address.city,
    zipCode: employee.address.zipCode,
    stateAbbreviation: employee.address.state.abbreviation,
    department: employee.department.label,
    dateOfBirth: new Date(employee.dateOfBirth).toLocaleDateString('en-US'),
    startDate: new Date(employee.startDate).toLocaleDateString('en-US'),
  }));

  useEffect(() => {
    console.log('Employee objet:', formattedData);
  }, [formattedData]);


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = formattedData.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedData = searchTerm ? filteredData : formattedData;


  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="employeelist-title">Current Employees</h2>
        </section>
      </div>
      
      <TableContainer component={Paper} className="employee-table">
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
      />
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
            {displayedData.map((employee) => (
              <TableRow key={employee.firstName}>
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
