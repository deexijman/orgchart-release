import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faSitemap } from '@fortawesome/free-solid-svg-icons';

function OrganizationStructure({ chartdata }) {

  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [worksWith, setWorksWith] = useState([])

  const callChartData = async ({ email, reportsTo }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/getorgchart',
        {
          email: email,
          reportsTo: reportsTo
        })

      console.log('response from get org chart : ', response.data)
      setUserData(response.data.reverse())
    }
    catch (error) {
      console.log("Error response", error.response)
    }

  }

  useEffect(() => {

    // to handle unwanted login
    if (localStorage.getItem('email') === null) {
      console.log('Just handle unwanted login')
      navigate('/')
    } 
    else{

      console.log('reached here and went 2')

      // to handle login properly
      console.log("Get details from storage", {
        email: localStorage.getItem('email'),
        reportsTo: localStorage.getItem('reportsTo')
      })

      // set userData Initially
      callChartData({
        email: localStorage.getItem('email'),
        reportsTo: localStorage.getItem('reportsTo')
      })

    }

    

  }, [])

  useEffect(() => {


    if (selectedUser !== null) {
      console.log("all come", selectedUser)
      callChartData({
        email: selectedUser.email,
        reportsTo: selectedUser.reportsTo
      })
    }
  }, [selectedUser])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const searchTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const OptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const handleLogout = () => {
    const cookie = localStorage.getItem("email")
    console.log(cookie)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='chart-body'>

      <div className="container-fluid chart-nav">
        <div className="row" >
          <div className='col-md-3 col-sm-12 py-2'>
            <i className="fa-solid fa-sitemap" style={{ fontSize: '2.5rem' }}></i>
          </div>

          <div className=' col-md-6 py-2 col-sm-12'>
            <Dropdown value={selectedUser} onChange={(e) => setSelectedUser(e.value)} options={chartdata} optionLabel="name" placeholder="Select a user"
              filter valueTemplate={searchTemplate} itemTemplate={OptionTemplate} className="w-full md:w-14rem" style={{ width: "100%" }} />
          </div>

          <div className='col-md-3 col-sm-12 py-2' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-outline-dark" style={{ right: "7%" }} onClick={handleLogout}>Logout&nbsp;&nbsp;<FontAwesomeIcon icon={faSignOutAlt} /></button>
          </div>
        </div>
      </div>
      <div >
        <div className="org-chart" >
          {userData.map((item, index) => (

            <div>
              {index !== 0 && <div id='line'></div>}
              <div key={index} className="node">
                <div className="details row" >
                  <div className='col-lg-3 col-md-3' style={{ display: 'flex', alignItems: "center" }}>
                    <Avatar style={{
                      height: '2.8rem', width: '2.8rem', borderRadius: "3rem", marginLeft: '36%', backgroundColor: "white  ",
                      color: "#9d79a1"
                    }}>{item.name.charAt(0).toUpperCase() + item.name.charAt(1).toUpperCase()}</Avatar>
                  </div>
                  <div className=' col-lg-9 col-md-9  text'>
                    <span className='iname'>{capitalizeFirstLetter(item.name)} </span>
                    <span className='irole'>{item.role} </span>
                    <span className='idpt'>{item.department} </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizationStructure;