import React from "react";
import { Link } from "react-router-dom";
import gearIcon from "../../assets/gear.svg";
import appStyles from "../../App.module.scss";
import styles from "./Employees.module.scss";

const Employees = ({ employeeData }) => {
  return (
    <>
      <header>
        <h1 className={appStyles.heading} aria-label="Employees">
          Employees
        </h1>
        <nav>
          <Link
            className={appStyles.link}
            to="/manage"
            title="Manage Employees"
            aria-label="Manage Employees"
          >
            <img src={gearIcon} alt="" className={appStyles.icon} />
          </Link>
        </nav>
      </header>
      <main>
        {employeeData.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table__head}>Name</th>
                <th className={styles.table__head}>Phone</th>
                <th className={styles.table__head}>Address</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={employee.id} className={styles.table__row}>
                      <td
                        className={styles.table__cell}
                      >{`${employee.lastName}, ${employee.firstName}`}</td>
                      <td className={styles.table__cell}>{employee.phone}</td>
                      <td className={styles.table__cell}>
                        {`${employee.address.streetAddress}, ${employee.address.city},`}{" "}
                        <br />
                        {`${employee.address.postalCode}, ${employee.address.state}`}{" "}
                        <br />
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <p className={styles.table__footer}>
                    Click on the "
                    <img src={gearIcon} alt="" />" icon to manage employees
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <>
            <h2>There are currently no employees</h2>
            <p className={styles.table__footer}>
              Click on the "
              <img src={gearIcon} alt="" />" icon to add employees
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default Employees;
