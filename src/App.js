import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeCard from './EmployeeCard';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([
    { name: 'Katha', empId: 'E101', department: 'Engineering', gender: 'Female', phone: '9876543210', localAddr: 'Sector V, Kolkata', permAddr: 'Sector V, Kolkata' },
    { name: 'Nilimesh', empId: 'E102', department: 'Agriculture', gender: 'Male', phone: '9123456780', localAddr: 'New Town, Kolkata', permAddr: 'Burdwan' }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleSave = (employeeData) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.empId === employeeData.empId ? employeeData : emp));
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, employeeData]);
    }
  };

  const handleDelete = (empId) => {
    setEmployees(employees.filter(emp => emp.empId !== empId));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.empId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="app-container">
      <header className="header animated-bg">
        {/* The word "Farm" is now removed! */}
        <h1 className="bounce-text">Employee Directory</h1>
      </header>
      
      <div className="main-content">
        <div className="slide-in-left">
          <EmployeeForm onSave={handleSave} editingEmployee={editingEmployee} onCancel={() => setEditingEmployee(null)} />
        </div>
        
        <div className="directory-container">
          <div className="controls slide-in-right">
            <input 
              type="text" 
              placeholder="Search by Name or ID..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="search-bar"
            />
            <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="filter-dropdown">
              <option value="All">All Departments</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Agriculture">Agriculture</option>
            </select>
            <div className="count-badge pulse-animation">Total: {filteredEmployees.length}</div>
          </div>

          <div className="employee-grid">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <div key={emp.empId} className="staggered-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <EmployeeCard employee={emp} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
              ))
            ) : (
              <p>No employees found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;