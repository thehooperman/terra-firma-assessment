import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Employees from "./components/Employees/Employees";
import ManageEmployees from "./components/ManageEmployees/ManageEmployees";
import NoPage from "./components/NoPage/NoPage";
import apiRequest from "./libs/apiRequest.Jsx";

function App() {
  const API_URL = "http://localhost:3500/employees";

  const [employeeData, setEmployeeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setEmployeeData(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        console.log(errorMessage);
      }
    };
    (async () => await fetchEmployees())();
  }, []);

  const addNewEmployee = async (newEmployee) => {
    const id = employeeData.length
      ? employeeData[employeeData.length - 1].id + 1
      : 1;
    const employeeToAdd = { ...newEmployee, id };
    const newEmployeeData = [...employeeData, employeeToAdd];
    setEmployeeData(newEmployeeData);

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeToAdd),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const updateEmployee = async (id) => {
    const updatedEmployeeDate = employeeData.map((item) =>
      item.id === id ? { ...item, ...newEmployee } : item
    );

    const employeeToUpdate = updatedEmployeeDate.filter(
      (item) => item.id === id
    );
    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: employeeToUpdate[0].firstName,
        lastName: employeeToUpdate[0].lastName,
        phone: employeeToUpdate[0].phone,
        address: {
          streetAddress: employeeToUpdate[0].address.streetAddress,
          city: employeeToUpdate[0].address.city,
          state: employeeToUpdate[0].address.state,
          postalCode: employeeToUpdate[0].address.postalCode,
        },
      }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) {
      setFetchError(result);
    } else {
      setEmployeeData(updatedEmployeeDate);
    }
  };

  const deleteEmployee = async (id) => {
    const newEmployeeData = employeeData.filter((item) => item.id !== id);
    setEmployeeData(newEmployeeData);

    // Perform Delete operation
    const deleteOptions = {
      method: "DELETE",
    };
    const requestURL = `${API_URL}/${id}`;
    const result = await apiRequest(requestURL, deleteOptions);
    if (result) setFetchError(result);
  };

  const clearNewEmployee = () => {
    setNewEmployee({
      firstName: "",
      lastName: "",
      phone: "",
      address: {
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newEmployee) return;
    addNewEmployee(newEmployee);
    clearNewEmployee();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    if (!newEmployee) return;
    updateEmployee(newEmployee.id);
    clearNewEmployee();
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Employees employeeData={employeeData} />} />
            <Route
              path="manage"
              element={
                <ManageEmployees
                  employeeData={employeeData}
                  newEmployee={newEmployee}
                  setNewEmployee={setNewEmployee}
                  handleSubmit={handleSubmit}
                  handleUpdateSubmit={handleUpdateSubmit}
                  deleteEmployee={deleteEmployee}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
