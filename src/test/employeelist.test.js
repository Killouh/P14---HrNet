import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeesList from '../views/employeeslist/employeeslist';
import { EmployeeContext } from '../components/employeecontext/employeecontext';

describe('EmployeesList', () => {
  const employeeData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      startDate: '2022-01-01',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: { abbreviation: 'NY', name: 'New York' },
        zipCode: '12345',
      },
      department: { value: 'sales', label: 'Sales' },
    },
    // Add more test data here if needed
  ];

  it('renders the employee data correctly', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData }}>
        <EmployeesList />
      </EmployeeContext.Provider>
    );

    // Check if the table headers are rendered
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();
    expect(screen.getByText(/Date Of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Street/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/State/i)).toBeInTheDocument();
    expect(screen.getByText(/Zip Code/i)).toBeInTheDocument();

    // Check if the employee data is rendered
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/Sales/i)).toBeInTheDocument();
    expect(screen.getByText(/01\/01\/1990/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/NY/i)).toBeInTheDocument();
    expect(screen.getByText(/12345/i)).toBeInTheDocument();
  });

  it('filters the employee data based on search term', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData }}>
        <EmployeesList />
      </EmployeeContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Check if the filtered data is rendered correctly
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.queryByText(/Doe/i)).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Doe' } });

    // Check if the filtered data is rendered correctly
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument();
  });

  it('paginates the employee data', () => {
    render(
      <EmployeeContext.Provider value={{ employeeData }}>
        <EmployeesList />
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

  // Add more tests for pagination, rows per page, and other interactions if needed
});
