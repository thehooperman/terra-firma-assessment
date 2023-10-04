import { useState } from "react";
import binIcon from "../../assets/bin.svg";
import pencilIcon from "../../assets/pencil.svg";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import styles from "./EmployeeSection.module.scss";

const EmployeeSection = ({
  employee,
  newEmployee,
  setNewEmployee,
  handleUpdateSubmit,
  deleteEmployee,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        <li>{`${employee.lastName},  ${employee.firstName}`}</li>
        <li>{employee.phone}</li>
        <li>
          {`${employee.address.streetAddress}, ${employee.address.city},`}{" "}
          {`${employee.address.postalCode}, ${employee.address.state}`}
        </li>
      </ul>
      <div className={styles.button__group}>
        <button
          className={styles.button}
          type="button"
          onClick={() => setShowForm(true)}
          aria-label={`Update ${employee.firstName} ${employee.lastName}`}
          title={`Update ${employee.firstName} ${employee.lastName}`}
        >
          <img className={styles.icon} src={pencilIcon} alt="" />
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => deleteEmployee(employee.id)}
          aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
          title={`Delete ${employee.firstName} ${employee.lastName}`}
        >
          <img className={styles.icon} src={binIcon} alt="" />
        </button>
      </div>
      <div className={`${styles.show} ${showForm ? styles.open : ""}`}>
        {showForm && (
          <EmployeeForm
            employee={employee}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            handleSubmit={handleUpdateSubmit}
            setShowForm={setShowForm}
            btnLabel={"Update Employee"}
          />
        )}
      </div>
    </section>
  );
};

export default EmployeeSection;
