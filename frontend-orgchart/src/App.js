import './Styles/App.css';
import Login from './Pages/Login';
import Chart from './Pages/Chart';
import User from './Pages/User';

import AddUser from './Pages/AddUser';
import DeleteUser from './Pages/DeleteUser';
import PromoteUser from './Pages/PromoteUser';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCompleteUsersData } from './Utils/endpoints';

function App() {

  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {

    try {

      const response = await axios.get(getCompleteUsersData())
      setAllUsers(response.data.data)

    } catch (error) {

      console.log('error for status', error.response.status)

    }

  }

  useEffect(() => {

    getAllUsers()

  }, [])

  return (
    // had container fluid previously
    <div className="App container-fluid p-0 m-0">
      <BrowserRouter>

        <ToastContainer
          position="top-right"
          style={{ marginTop: '3rem' }}
          limit={1}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chart" element={<Chart chartdata={allUsers} />} />
          <Route path="/user/*" element={<User />} />
        </Routes>

        

      </BrowserRouter>
    </div>
  );
}

export default App;
