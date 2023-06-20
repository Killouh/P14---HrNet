import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { EmployeeProvider } from './components/employeecontext/employeecontext';

import Home from "./views/home/home";
import EmployeesList from "./views/employeeslist/employeeslist";

function App() {
  return (
    <div id="App">
      <EmployeeProvider> 
      <BrowserRouter>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/employeeslist" element={<EmployeesList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
      </EmployeeProvider>
    </div>
  );
}

export default App;
