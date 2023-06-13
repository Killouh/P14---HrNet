import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";
import states from "../../data/data.json";



// Mods :
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Modal from '../../components/modal/modal';

export default function Home() {
// Modal package
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  // Employee data creation :
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    adress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("adress.")) {
      const addressField = name.split(".")[1];

      setEmployeeData((prevData) => ({
        ...prevData,
        adress: {
          ...prevData.adress,
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
    if (name.includes("adress.")) {
      const addressField = name.split(".")[1];

      setEmployeeData((prevData) => ({
        ...prevData,
        adress: {
          ...prevData.adress,
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
    // Traduire les commentaires
    // Créer un objet pour représenter le nouvel employé / voir avec state
    const newEmployee = {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      dateOfBirth: employeeData.dateOfBirth,
      startDate: employeeData.startDate,
      adress: {
        street: employeeData.adress.street,
        city: employeeData.adress.city,
        state: employeeData.adress.state,
        zipCode: employeeData.adress.zipCode,
      },
      department: employeeData.department,
    };



    // Effectuer une requête POST pour ajouter le nouvel employé à employees.json
    axios
      .post("data/employees.json", newEmployee)
      .then((response) => {
        // Gérer la réponse de la requête si nécessaire
        console.log(response.data);
      })
      .catch((error) => {
        // Gérer les erreurs si nécessaire
        console.error(error);
      });
  };



  // Datepicker state and settings
  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  // React-Select settings :
  const options = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "human-resources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
  ];

  const data = states;
  // React select custom label/value for the json
  const customOptionValue = (option) => option.abbreviation;
  const customOptionLabel = (option) => option.name;

  const handleRawBirthDateChange = (e) => {
    const { value } = e.target;
    // Mettez à jour la valeur de la date de naissance dans l'état
    setEmployeeData((prevState) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  };
  const handleRawStartDateChange = (e) => {
    const { value } = e.target;
    // Mettez à jour la valeur de la date de naissance dans l'état
    setEmployeeData((prevState) => ({
      ...prevState,
      startDate: value,
    }));
  };
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
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            id="dateOfBirth"
            name="dateOfBirth"
            value={employeeData.dateOfBirth}
            dateFormat="dd/MM/yyyy"
            onChangeRaw={(e) => handleRawBirthDateChange(e)}
          />

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            type="date"
            selected={startDate}
            onChange={(datee) => setStartDate(datee)}
            id="startDate"
            name="startDate"
            value={employeeData.startDate}
            dateFormat="dd/MM/yyyy"
            onChangeRaw={(e) => handleRawStartDateChange(e)}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="adress.street"
              value={employeeData.adress.street}
              onChange={handleInputChange}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="adress.city"
              value={employeeData.adress.city}
              onChange={handleInputChange}
            />

            <label htmlFor="state">State</label>
            <Select
              options={data}
              getOptionLabel={customOptionLabel}
              getOptionValue={customOptionValue}
              id="state"
              name="adress.state"
              value={employeeData.adress.state}
              onChange={handleSelectChange}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zipCode"
              type="number"
              name="adress.zipCode"
              value={employeeData.adress.zipCode}
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
                <button onClick={openModal} type="submit" className="create-btn">
        Save
      </button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Contenu de la modal</h2>
        <p>Ceci est le contenu de la modal.</p>
      </Modal>
        </form>
      </section>

    </main>
  );
}
