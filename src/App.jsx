import React, { useState, useEffect } from 'react';
import './App.css';

// Function to generate a random integer between min and max (inclusive)
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Define the citizens array with 10 objects
const initialCitizens = [
  { id: 1, name: 'John', age: getRandomInt(20, 70), address: '123 Elm St', status: 'Active' },
  { id: 2, name: 'Jane', age: getRandomInt(20, 70), address: '456 Oak St', status: 'Active' },
  { id: 3, name: 'Mike', age: getRandomInt(20, 70), address: '789 Pine St', status: 'Inactive' },
  { id: 4, name: 'Lisa', age: getRandomInt(20, 70), address: '101 Maple St', status: 'Inactive' },
  { id: 5, name: 'John', age: getRandomInt(20, 70), address: '202 Birch St', status: 'Active' },
  { id: 6, name: 'Jane', age: getRandomInt(20, 70), address: '303 Cedar St', status: 'Active' },
  { id: 7, name: 'Mike', age: getRandomInt(20, 70), address: '404 Cherry St', status: 'Inactive' },
  { id: 8, name: 'Lisa', age: getRandomInt(20, 70), address: '505 Willow St', status: 'Inactive' },
  { id: 9, name: 'John', age: getRandomInt(20, 70), address: '606 Walnut St', status: 'Active' },
  { id: 10, name: 'Jane', age: getRandomInt(20, 70), address: '707 Ash St', status: 'Active' },
];

// Citizen Component to render each citizen's details
const Citizen = ({ citizen, toggleStatus }) => (
  <li>
    <span>{citizen.id}. </span>
    <span>{citizen.name} </span>
    <span>{citizen.age} </span>
    <span>{citizen.address} </span>
    <span>{citizen.status} </span>
    <button onClick={() => toggleStatus(citizen.id)}>Toggle Status</button>
  </li>
);

// SearchFilter Component
const SearchFilter = ({ searchQuery, setSearchQuery }) => (
  <div>
    <input
      type="text"
      placeholder="Search by name or address"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

// Main Citizens Component
const Citizens = () => {
  const [citizens, setCitizens] = useState(initialCitizens);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCitizens, setFilteredCitizens] = useState(citizens);

  // Function to toggle the status of a citizen
  const toggleStatus = (id) => {
    setCitizens(citizens.map(citizen =>
      citizen.id === id
        ? { ...citizen, status: citizen.status === 'Active' ? 'Inactive' : 'Active' }
        : citizen
    ));
  };

  // Update filtered citizens whenever searchQuery or citizens change
  useEffect(() => {
    const filterCitizens = () => {
      return citizens.filter(citizen =>
        citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        citizen.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };
    setFilteredCitizens(filterCitizens());
  }, [searchQuery, citizens]);

  return (
    <div>
      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h1>Citizens List</h1>
      <ul>
        <li>
          <strong>No.</strong> <strong>Name</strong> <strong>Age</strong> <strong>Address</strong> <strong>Status</strong>
        </li>
        {filteredCitizens.map(citizen => (
          <Citizen key={citizen.id} citizen={citizen} toggleStatus={toggleStatus} />
        ))}
      </ul>
    </div>
  );
};

export default Citizens;


