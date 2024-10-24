import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Naav from './components/Naav';
import EmployeeList from './components/EmployeeList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search 

  // Function to handle search term updates
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Naav onSearch={handleSearch} />
      <EmployeeList searchTerm={searchTerm} />
    </div>
  );
};

export default App;
