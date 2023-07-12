import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeesList from '../views/employeeslist/employeeslist';
import { EmployeeContext } from '../components/employeecontext/employeecontext';
import { MemoryRouter } from 'react-router-dom';

const employeeDataPagination = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '01/01/1990',
    startDate: '01/01/2022',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: { abbreviation: 'NY', name: 'New York' },
      zipCode: '12345',
    },
    department: { value: 'sales', label: 'Sales' },
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Borderlands',
    dateOfBirth: '02/15/1992',
    startDate: '03/01/2022',
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: { abbreviation: 'CA', name: 'California' },
      zipCode: '56789',
    },
    department: { value: 'marketing', label: 'Marketing' },
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Smith',
    dateOfBirth: '07/05/1988',
    startDate: '04/15/2022',
    address: {
      street: '789 Oak St',
      city: 'San Francisco',
      state: { abbreviation: 'CA', name: 'California' },
      zipCode: '54321',
    },
    department: { value: 'engineering', label: 'Engineering' },
  },
  {
    id: 4,
    firstName: 'Emma',
    lastName: 'Brown',
    dateOfBirth: '09/20/1993',
    startDate: '05/10/2022',
    address: {
      street: '321 Pine St',
      city: 'Chicago',
      state: { abbreviation: 'IL', name: 'Illinois' },
      zipCode: '98765',
    },
    department: { value: 'finance', label: 'Finance' },
  },
  {
    id: 5,
    firstName: 'Michael',
    lastName: 'Williams',
    dateOfBirth: '11/12/1991',
    startDate: '06/20/2022',
    address: {
      street: '654 Maple St',
      city: 'Houston',
      state: { abbreviation: 'TX', name: 'Texas' },
      zipCode: '13579',
    },
    department: { value: 'sales', label: 'Sales' },
  },
  {
    id: 6,
    firstName: 'Olivia',
    lastName: 'Davis',
    dateOfBirth: '03/25/1994',
    startDate: '07/01/2022',
    address: {
      street: '987 Cherry St',
      city: 'Seattle',
      state: { abbreviation: 'WA', name: 'Washington' },
      zipCode: '56789',
    },
    department: { value: 'engineering', label: 'Engineering' },
  },
  {
    id: 7,
    firstName: 'William',
    lastName: 'Taylor',
    dateOfBirth: '06/08/1990',
    startDate: '08/15/2022',
    address: {
      street: '753 Oak St',
      city: 'Austin',
      state: { abbreviation: 'TX', name: 'Texas' },
      zipCode: '24680',
    },
    department: { value: 'marketing', label: 'Marketing' },
  },
  {
    id: 8,
    firstName: 'Sophia',
    lastName: 'Wilson',
    dateOfBirth: '12/03/1993',
    startDate: '09/10/2022',
    address: {
      street: '456 Cedar St',
      city: 'Denver',
      state: { abbreviation: 'CO', name: 'Colorado' },
      zipCode: '54321',
    },
    department: { value: 'sales', label: 'Sales' },
  },
  {
    id: 9,
    firstName: 'James',
    lastName: 'Anderson',
    dateOfBirth: '10/18/1989',
    startDate: '10/20/2022',
    address: {
      street: '789 Pine St',
      city: 'Miami',
      state: { abbreviation: 'FL', name: 'Florida' },
      zipCode: '98765',
    },
    department: { value: 'finance', label: 'Finance' },
  },
  {
    id: 10,
    firstName: 'Isabella',
    lastName: 'Clark',
    dateOfBirth: '04/30/1995',
    startDate: '11/05/2022',
    address: {
      street: '654 Elm St',
      city: 'Boston',
      state: { abbreviation: 'MA', name: 'Massachusetts' },
      zipCode: '13579',
    },
    department: { value: 'engineering', label: 'Engineering' },
  },
  {
    id: 11,
    firstName: 'Liam',
    lastName: 'Parker',
    dateOfBirth: '09/08/1994',
    startDate: '12/15/2022',
    address: {
      street: '321 Oak St',
      city: 'Atlanta',
      state: { abbreviation: 'GA', name: 'Georgia' },
      zipCode: '24680',
    },
    department: { value: 'marketing', label: 'Marketing' },
  },
];

describe('EmployeesList', () => {

  const employeeData = [
    {
      id: 20,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01/01/1990',
      startDate: '01/01/2022',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: { abbreviation: 'NY', name: 'New York' },
        zipCode: '12345',
      },
      department: { value: 'sales', label: 'Sales' },
    },
  ];


  it('renders the employee data correctly', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData }}>
        <MemoryRouter>
          <EmployeesList />
        </MemoryRouter>
      </EmployeeContext.Provider>
    );

    // Check if the table headers are rendered
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();
    expect(screen.getByText(/Street/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/State/i)).toBeInTheDocument();
    expect(screen.getByText(/Zip Code/i)).toBeInTheDocument();

    // Check if the employee data is rendered
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Sales/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/NY/i)).toBeInTheDocument();
    expect(screen.getByText(/12345/i)).toBeInTheDocument();
  });

  it('filters the employee data based on search term', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData }}>
        <MemoryRouter>
          <EmployeesList />
        </MemoryRouter>
      </EmployeeContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Check if the filtered data is rendered correctly
    expect(screen.getByText(/John/i)).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Doe' } });

    // Check if the filtered data is rendered correctly
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
  });

  it('paginates the employee data', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData: employeeDataPagination }}>
        <MemoryRouter>
          <EmployeesList />
        </MemoryRouter>
      </EmployeeContext.Provider>
    );

    // Check if the initial page data is rendered
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();

    const nextPageButton = screen.getByRole('button', { name: /2/i });

    fireEvent.click(nextPageButton);

    // Check if the next page data is rendered
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Doe/i)).not.toBeInTheDocument();
  });

});
