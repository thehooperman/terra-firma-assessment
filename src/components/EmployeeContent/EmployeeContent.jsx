import EmployeeSection from "../EmployeeSection/EmployeeSection";

const EmployeeContent = ({
  employeeData,
  newEmployee,
  setNewEmployee,
  handleUpdateSubmit,
  deleteEmployee,
}) => {
  return (
    <>
      {employeeData.map((employee, index) => (
        <EmployeeSection
          key={index}
          employee={employee}
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          handleUpdateSubmit={handleUpdateSubmit}
          deleteEmployee={deleteEmployee}
        />
      ))}
    </>
  );
};

export default EmployeeContent;
