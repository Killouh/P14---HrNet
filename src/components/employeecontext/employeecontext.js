import React, { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeeData, setEmployees] = useState([]);

  const createEmployee  = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  useEffect(() => {
    console.log('Employee objet:', employeeData);
  }, [employeeData]);

  return (
    <EmployeeContext.Provider value={{ employeeData, createEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};