import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from "./views/home/home";
import EmployeesList from "./views/employeeslist/employeeslist";

function App() {
  return (
    <div id="App">
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
    </div>
  );
}

export default App;
