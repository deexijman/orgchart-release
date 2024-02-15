import './Styles/App.css';
import Login from './Pages/Login';
import Chart from './Pages/Chart';
import Register from './Pages/Register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    <div className="App container-fluid" style={{
      backgroundColor:'#F7F0EA;'
    }}>
      <BrowserRouter>

        <ToastContainer
          position="top-right"
          style={{ marginTop: '3rem' }}
          limit={1}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chart" element={<Chart chartdata={allUsers} />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
