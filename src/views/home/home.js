import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import states from "../../data/data.json";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import Modal from "@killouh/modalpackage";

/**
 * Provide a Form to register a new employee
 * @param {html}, static html
 * @param {form}
 * @returns {JSX}
 * Get the user information from each form fields when submitted
 *
 * @param {form} id New id
 * @param {data[id: number, firstName: string, lastName: string, dateOfBirth: date, startDate: date, address: {street: string, city: string, state: string, zipCode: number,},department: string] }, submitted User's Array
 * @returns {form} to a database
 */

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { createEmployee, getMaxId } = useContext(EmployeeContext);
  const [employeeData, setEmployeeData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    department: "",
  });

  // Input listeners
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];

      setEmployeeData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];

      setEmployeeData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: selectedOption,
        },
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: selectedOption,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Keep the track of assigned's IDs
    const currentMaxId = getMaxId();
    const newId = currentMaxId + 1;

    const newEmployee = {
      id: newId,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      dateOfBirth: employeeData.dateOfBirth,
      startDate: employeeData.startDate,
      address: {
        street: employeeData.address.street,
        city: employeeData.address.city,
        state: employeeData.address.state,
        zipCode: employeeData.address.zipCode,
      },
      department: employeeData.department,
    };
    createEmployee(newEmployee);
    openModal();
  };

  // Modal actions
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // department choices
  const options = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "human-resources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
  ];

  const dataStates = states;
  const customOptionValue = (option) => option.abbreviation;
  const customOptionLabel = (option) => option.name;

  // test that generate 11 entries by click
  // const handleTestButtonClick = () => {
  //   const employeeTemplate = {
  //     firstName: employeeData.firstName,
  //     lastName: employeeData.lastName,
  //     dateOfBirth: employeeData.dateOfBirth,
  //     startDate: employeeData.startDate,
  //     address: {
  //       street: employeeData.address.street,
  //       city: employeeData.address.city,
  //       state: employeeData.address.state,
  //       zipCode: employeeData.address.zipCode,
  //     },
  //     department: employeeData.department,
  //   };
  //   const currentMaxId = getMaxId();
  //   const newId = currentMaxId + 1;

  //   for (let i = 0; i < 11; i++) {
  //     const newEmployee = {
  //       ...employeeTemplate,
  //       id: newId + i, // Utiliser newId + i pour générer des ID différents pour chaque employé
  //     };
  //     createEmployee(newEmployee);
  //   }
  // };


  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h1 className="home-title">HRnet</h1>
          <Link className="home-link" to="/employeeslist">
            View Current Employees
          </Link>
          <h2 className="home-subtitle">Create Employee</h2>
        </section>
      </div>

      <section className="employee-form">
        <form onSubmit={handleSubmit} action="#" id="create-employee">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            type="date"
            selected={employeeData.dateOfBirth}
            onChange={(date) =>
              setEmployeeData((prevState) => ({
                ...prevState,
                dateOfBirth: date,
              }))
            }
            id="dateOfBirth"
            name="dateOfBirth"
            dateFormat="dd/MM/yyyy"
            required
          />

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            type="date"
            selected={employeeData.startDate}
            onChange={(date) =>
              setEmployeeData((prevState) => ({
                ...prevState,
                startDate: date,
              }))
            }
            id="startDate"
            name="startDate"
            dateFormat="dd/MM/yyyy"
            required
          />
          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={employeeData.address.street}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="address.city"
              value={employeeData.address.city}
              onChange={handleInputChange}
              required
            />
            <div aria-label="State">
              <label htmlFor="state" >State</label>
              <div data-testid="statetest">
              <Select
                options={dataStates}
                getOptionLabel={customOptionLabel}
                getOptionValue={customOptionValue}
                id="state"
                type="text"
                name="address.state"
                value={employeeData.address.state}
                onChange={handleSelectChange}
                required

              />
              </div>
            </div>
            <div className="ZipCode" aria-label="ZipCode">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                type="number"
                name="address.zipCode"
                value={employeeData.address.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>
          <div aria-label="Department">
          <label htmlFor="department" >Department</label>
          <div data-testid="departmenttest">
          <Select
            options={options}
            id="department"
            name="department"
            type="text"
            value={employeeData.department}
            onChange={handleSelectChange}
            
            required
          />
          </div>
          </div>

          <button type="submit" className="create-btn" data-testid="createBtn">
            Save
          </button>
          {/* test button x11 entries <button type="button" onClick={handleTestButtonClick}>
            Test
          </button> */}
        </form>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          modalClassName="modale"
          contentClassName="modal--content"
          closeClassName="close"
        >
          <p className="modal-text">Employee Created!</p>
        </Modal>
      </section>
    </main>
  );
}
