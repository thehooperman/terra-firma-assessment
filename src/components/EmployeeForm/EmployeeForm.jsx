import { useEffect } from "react";
import styles from "./EmployeeForm.module.scss";

const EmployeeForm = ({
  employee,
  newEmployee,
  setNewEmployee,
  handleSubmit,
  setShowForm,
  btnLabel,
}) => {
  console.log("EmployeeForm newEmployee", newEmployee);

  useEffect(() => {
    console.log("EmployeeForm useEffect employee", employee);
    if (employee) {
      setNewEmployee(employee);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevNewEmployee) => ({
      ...prevNewEmployee,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevNewEmployee) => ({
      ...prevNewEmployee,
      address: {
        ...prevNewEmployee.address,
        [name]: value,
      },
    }));
  };

  const handleSubmitAction = (event) => {
    handleSubmit(event);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmitAction}>
        <div className={styles.form__group}>
          <label className={styles.label} htmlFor="firstName">
            First Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            id="firstName"
            value={newEmployee.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.label} htmlFor="lastName">
            Last Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            id="lastName"
            value={newEmployee.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.label} htmlFor="phone">
            Phone
          </label>
          <input
            className={styles.input}
            type="text"
            name="phone"
            id="phone"
            pattern="\d{3}-\d{3}-\d{4}"
            placeholder="123-456-7890"
            maxLength="12"
            value={newEmployee.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Address</legend>
          <div className={styles.form__group}>
            <label className={styles.label__sub} htmlFor="streetAddress">
              Street Address
            </label>
            <input
              className={styles.input}
              type="text"
              name="streetAddress"
              id="streetAddress"
              value={newEmployee.address.streetAddress}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.label__sub} htmlFor="city">
              City
            </label>
            <input
              className={styles.input}
              type="text"
              name="city"
              id="city"
              value={newEmployee.address.city}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.label__sub} htmlFor="state">
              State
            </label>
            <input
              className={styles.input}
              type="text"
              name="state"
              id="state"
              value={newEmployee.address.state}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.label__sub} htmlFor="postalCode">
              Postal Code
            </label>
            <input
              className={styles.input}
              type="number"
              name="postalCode"
              id="postalCode"
              maxLength={5}
              pattern="[0-9]"
              value={newEmployee.address.postalCode}
              onChange={handleAddressChange}
              required
            />
          </div>
        </fieldset>
        <div className={styles.form__button_group}>
          <button
            className={styles.button}
            type="submit"
            aria-label="Add Employee"
            // onClick={() => inputRef.current.focus()}
          >
            {btnLabel}
          </button>
          <button className={styles.button} onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
