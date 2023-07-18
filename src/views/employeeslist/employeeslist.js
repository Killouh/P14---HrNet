import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../components/employeecontext/employeecontext";
import { Link } from "react-router-dom";
import "./employeeslist.css";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Search } = Input;

export default function EmployeeList() {
  const { employeeData } = useContext(EmployeeContext);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);


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

  const dataSource = formattedData.map((data) => ({
    ...data,
    key: uuidv4(),
  }));

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "stateAbbreviation",
      key: "state",
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);

    const filtered = dataSource.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const dateOfBirth = employee.dateOfBirth;
      const startDate = employee.startDate;
      const address = `${employee.street} ${employee.city} ${employee.stateAbbreviation} ${employee.zipCode}`;
      const department = employee.department;
      return (
        fullName.toLowerCase().includes(value.toLowerCase()) ||
        dateOfBirth.toLowerCase().includes(value.toLowerCase()) ||
        startDate.toLowerCase().includes(value.toLowerCase()) ||
        address.toLowerCase().includes(value.toLowerCase()) ||
        department.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  const paginationConfig = {
    showSizeChanger:true,
    pageSizeOptions: ["10", "25", "50", "100"], // Options de sélection du nombre d'éléments par page
    showTotal: (total) => `Total ${total} employés`, // Texte affiché pour le total des éléments
  };



  const dataToRender = searchText ? filteredData : dataSource;

  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="employeelist-title">Current Employees</h2>
        </section>
      </div>
      <Search
        placeholder="Search..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        allowClear
      />
<Table
  dataSource={dataToRender}
  columns={columns}
  pagination={paginationConfig}
/>
      <Link className="home-link" to="/">
        Home
      </Link>
    </main>
  );
}
