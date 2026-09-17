import React from 'react';

function EmployeeCard({ employee, onDelete, onEdit }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{employee.name}</h3>
        <span className="badge">{employee.department}</span>
      </div>
      <div className="card-body">
        <p><strong>ID:</strong> {employee.empId}</p>
        <p><strong>Gender:</strong> {employee.gender}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Local Address:</strong> {employee.localAddr}</p>
        <p><strong>Perm. Address:</strong> {employee.permAddr}</p>
      </div>
      <div className="card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(employee)}>Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(employee.empId)}>Delete</button>
      </div>
    </div>
  );
}

export default EmployeeCard;
