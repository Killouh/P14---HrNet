import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import states from "../../data/data.json";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Modal from "../../components/modal/modal";

export default function Home() {
  const { createEmployee } = useContext(EmployeeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
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
   
    openModal();
    const newEmployee = {
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
    
  };

  const handleRawBirthDateChange = (e) => {
    const { value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  };

  const handleRawStartDateChange = (e) => {
    const { value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      startDate: value,
    }));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const options = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "human-resources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
  ];

  const data = states;
  const customOptionValue = (option) => option.abbreviation;
  const customOptionLabel = (option) => option.name;

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
            id="first-name"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleInputChange}
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
            onChangeRaw={handleRawBirthDateChange}
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
            onChangeRaw={handleRawStartDateChange}
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
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="address.city"
              value={employeeData.address.city}
              onChange={handleInputChange}
            />

            <label htmlFor="state">State</label>
            <Select
              options={data}
              getOptionLabel={customOptionLabel}
              getOptionValue={customOptionValue}
              id="state"
              name="address.state"
              value={employeeData.address.state}
              onChange={handleSelectChange}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zipCode"
              type="number"
              name="address.zipCode"
              value={employeeData.address.zipCode}
              onChange={handleInputChange}
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select
            options={options}
            id="department"
            name="department"
            type="text"
            value={employeeData.department}
            onChange={handleSelectChange}
          />

          <button type="submit" className="create-btn">
            Save
          </button>
        </form>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <h2>Contenu de la modal</h2>
          <p>Ceci est le contenu de la modal.</p>
        </Modal>
      </section>
    </main>
  );
}
