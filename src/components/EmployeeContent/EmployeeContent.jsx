import EmployeeSection from "../EmployeeSection/EmployeeSection";

const EmployeeContent = ({
  employeeData,
  newEmployee,
  setNewEmployee,
  // updateEmployee,
  handleUpdateSubmit,
  deleteEmployee,
  // showForm,
  // setShowForm,
}) => {
  return (
    <>
      {employeeData.map((employee, index) => (
        <EmployeeSection
          key={index}
          employee={employee}
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          // updateEmployee={updateEmployee}
          handleUpdateSubmit={handleUpdateSubmit}
          deleteEmployee={deleteEmployee}
          // showForm={showForm}
          // setShowForm={setShowForm}
        />
      ))}
    </>
  );
};

export default EmployeeContent;
