import React, { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employeeData, setEmployees] = useState([]);

  const createEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const getMaxId = () => {
    const maxId = employeeData.reduce((max, employee) => {
      return employee.id > max ? employee.id : max;
    }, 0);

    return maxId;
  };

  useEffect(() => {
    const maxId = getMaxId();
    console.log("Employee objects:", employeeData, maxId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeData]);

  return (
    <EmployeeContext.Provider value={{ employeeData, createEmployee, getMaxId }}>
      {children}
    </EmployeeContext.Provider>
  );
}
