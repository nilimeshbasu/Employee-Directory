import React, { useState, useEffect } from 'react';

// We moved initialState OUTSIDE the function so React knows it never changes
const initialState = {
  name: '', empId: '', department: 'HR', gender: 'Male', phone: '', localAddr: '', permAddr: ''
};

function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData(initialState);
    }
  }, [editingEmployee]); // No more warning here!

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <div className="form-container">
      <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="empId" placeholder="Employee ID" value={formData.empId} onChange={handleChange} required disabled={!!editingEmployee} />
        
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Agriculture">Agriculture</option>
        </select>

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <textarea name="localAddr" placeholder="Local Address" value={formData.localAddr} onChange={handleChange} required></textarea>
        <textarea name="permAddr" placeholder="Permanent Address" value={formData.permAddr} onChange={handleChange} required></textarea>
        
        <div className="form-buttons">
          <button type="submit" className="btn btn-save">{editingEmployee ? 'Update' : 'Add'} Employee</button>
          {editingEmployee && <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;