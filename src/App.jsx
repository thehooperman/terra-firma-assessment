import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Employees from "./components/Employees/Employees";
import ManageEmployees from "./components/ManageEmployees/ManageEmployees";
import NoPage from "./components/NoPage/NoPage";
import apiRequest from "./libs/apiRequest.Jsx";
// import "./App.scss";
// import { DataContext } from "./components/Context/DataContext";

function App() {
  const API_URL = "http://localhost:3500/employees";

  const [employeeData, setEmployeeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [showForm, setShowForm] = useState(false);

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

  console.log("App newEmployee", newEmployee);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setEmployeeData(data);
        // console.table(data);

        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    // * NOTE: Add setTimeout to simulate a slow network
    // setTimeout(() => {
    (async () => await fetchEmployees())();
    // }, 2000);
  }, []);

  const addNewEmployee = async (newEmployee) => {
    console.log("addNewEmployee newEmployee", newEmployee);
    const id = employeeData.length
      ? employeeData[employeeData.length - 1].id + 1
      : 1;
    const employeeToAdd = { ...newEmployee, id };
    const newEmployeeData = [...employeeData, employeeToAdd];
    setEmployeeData(newEmployeeData);

    // Perform Create operation
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeToAdd),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const updateEmployee = async (id) => {
    console.log("updateEmployee id", id);
    // const employeeToUpdate = employeeData.find((item) => item.id === id);
    const updatedEmployeeDate = employeeData.map((item) =>
      item.id === id ? { ...item, ...newEmployee } : item
    );
    console.log("updateEmployee employeeToUpdate", updatedEmployeeDate);

    // Perform Update operation
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
    console.log("deleteEmployee id", id);
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
    // console.log("handleSubmit newEmployee", newEmployee);
    if (!newEmployee) return;
    addNewEmployee(newEmployee);
    clearNewEmployee();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    // console.log("handleUpdateSubmit newEmployee", newEmployee);
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
                  // updateEmployee={updateEmployee}
                  handleUpdateSubmit={handleUpdateSubmit}
                  deleteEmployee={deleteEmployee}
                  // showForm={showForm}
                  // setShowForm={setShowForm}
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
