import { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import EmployeeContent from "../EmployeeContent/EmployeeContent";
import appStyles from "../../App.module.scss";
import styles from "./ManageEmployees.module.scss";
import EmployeeForm from "../EmployeeForm/EmployeeForm";

const ManageEmployees = ({
  employeeData,
  newEmployee,
  setNewEmployee,
  handleSubmit,
  // updateEmployee,
  handleUpdateSubmit,
  deleteEmployee,
  // showForm,
  // setShowForm,
}) => {
  const [showForm, setShowForm] = useState(false);

  // const handleShowForm = () => {
  //   setShowForm(true);
  // };

  console.log("ManageEmployees newEmployee", newEmployee);

  return (
    <>
      <header>
        <nav>
          <Link
            className={appStyles.link}
            to="/"
            title="Return to Employees"
            aria-label="Return to Employees"
          >
            <img src={homeIcon} alt="" className={appStyles.icon} />
          </Link>
        </nav>
        <h1 className={appStyles.heading} aria-label="Manage Employees">
          Manage Employees
        </h1>
      </header>
      <main>
        {!showForm && (
          <button className={styles.button} onClick={() => setShowForm(true)}>
            {employeeData.length ? "Add Another Employee" : "Add An Employee"}
          </button>
        )}
        <div className={`${styles.show} ${showForm ? styles.open : ""}`}>
          {
            showForm && (
              <>
                <h2 className={styles.show__heading}>
                  {employeeData.length
                    ? "Add Another Employee"
                    : "Add An Employee"}
                </h2>
                <EmployeeForm
                  newEmployee={newEmployee}
                  setNewEmployee={setNewEmployee}
                  handleSubmit={handleSubmit}
                  setShowForm={setShowForm}
                  btnLabel="Add Employee"
                />
              </>
            ) //: (
            // <button className={styles.button} onClick={() => setShowForm(true)}>
            //   {employeeData.length ? "Add Another Employee" : "Add An Employee"}
            // </button>
          }
        </div>

        {employeeData.length ? (
          <EmployeeContent
            employeeData={employeeData}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            // updateEmployee={updateEmployee}
            handleUpdateSubmit={handleUpdateSubmit}
            deleteEmployee={deleteEmployee}
            // showForm={showForm}
            // setShowForm={setShowForm}
          />
        ) : (
          <p style={{ marginTop: "2rem" }}>No Employees Have Been Added Yet</p>
        )}
      </main>
    </>
  );
};

export default ManageEmployees;
