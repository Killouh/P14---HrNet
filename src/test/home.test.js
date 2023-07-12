import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Home from '../views/home/home';
import { EmployeeProvider } from '../components/employeecontext/employeecontext';
import { MemoryRouter } from 'react-router-dom';


describe('Home', () => {

    it('renders the form inputs correctly', () => {
        render(
            <EmployeeProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </EmployeeProvider>
        );

        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/ZipCode/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    });

    it('updates the input values when typed in', async () => {
        render(
            <EmployeeProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </EmployeeProvider>
        );

        const firstNameInput = screen.getByLabelText(/First Name/i);
        const lastNameInput = screen.getByLabelText(/Last Name/i);
        const dateOfBirthInput = screen.getByLabelText(/Date of Birth/i);
        const startDateInput = screen.getByLabelText(/Start Date/i);
        const streetInput = screen.getByLabelText(/Street/i);
        const cityInput = screen.getByLabelText(/City/i);
        const zipCodeInput = screen.getByLabelText(/Zip Code/i);

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(dateOfBirthInput, { target: { value: '1990-01-01' } });
        fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
        fireEvent.change(streetInput, { target: { value: '123 Main St' } });
        fireEvent.change(cityInput, { target: { value: 'New York' } });
        fireEvent.change(zipCodeInput, { target: { value: '12345' } });;

        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
        expect(dateOfBirthInput.value).toBe('01/01/1990');
        expect(startDateInput.value).toBe('01/01/2022');
        expect(streetInput.value).toBe('123 Main St');
        expect(cityInput.value).toBe('New York');
        expect(zipCodeInput.value).toBe('12345');
    });


});

