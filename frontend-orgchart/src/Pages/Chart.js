import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from '../components/CardComponent';
import { getOrganizationChart, sameDesignationEndpoint } from '../Utils/Endpoints';
import EmployeeCard from '../components/EmployeeCard'

function Chart({ chartdata }) {

  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [sameDesignation, setSameDesignation] = useState([])

  const callChartData = async ({ email, reportsTo }) => {
    try {
      const response = await axios.post(getOrganizationChart(),
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

  const callSameDesignationData = async ({ reportsTo }) => {

    try {

      console.log("Frontend : ",reportsTo)

      const response = await axios.post(sameDesignationEndpoint(),
      {
        reportsTo: reportsTo
      })

      setSameDesignation(response.data.data)

    }
    catch (error) {
      console.log("Error response", error.response)
    }

  }

  useEffect(() => {

    // to handle unwanted login
    if (localStorage.getItem('email') === null && localStorage.getItem('reportsTo') === null) {
      console.log('Just handle unwanted login')
      navigate('/')
      toast.error('Kindly Login To View Chart')
    }
    else {

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

    if (localStorage.getItem('email') !== null) { // to handle server crash

      if (selectedUser !== undefined && selectedUser !== null) {

        callChartData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo
        })
        //toast.success("Fetched User")

      } else {

        callChartData({
          email: localStorage.getItem('email'),
          reportsTo: localStorage.getItem('reportsTo')
        })

      }


    }

  }, [selectedUser])


  // update the same design employee list
  useEffect(() => {

    // if (selectedUser !== undefined && selectedUser !== null) {

    //   console.log("Selected User", selectedUser)
    //   callSameDesignationData({
    //     reportsTo: selectedUser.reportsTo
    //   })

    // }

    if (localStorage.getItem('reportsTo') !== null) { // to handle server crash

      if (selectedUser !== undefined && selectedUser !== null) {

        callSameDesignationData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo
        })
        //toast.success("Fetched User")

      } else {

        callSameDesignationData({
          reportsTo: localStorage.getItem('reportsTo')
        })

      }


    }


  }, [selectedUser])

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
    toast.success("Logged out successfull")
  }

  return (
    <div className='chart-body' style={{ paddingBottom: '20px' }}>

      <div className="container-fluid chart-nav">
        <div className="row" style={{ padding: '10px', marginBottom: '20px' }}>
          <div className='col-md-3 col-sm-12 py-2'>
            <i className="fa-solid fa-sitemap" style={{ fontSize: '2.5rem' }}></i>
          </div>

          <div className='col-md-6 py-2 col-sm-12'>
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

            <CardComponent key={index} index={index} item={item} />

          ))}
        </div>

        <div class="container" style={{
          border: "3px solid #070F2B",
          padding: '10px',
          minWidth: '100%',
          marginTop: '40px'
        }}>
          <div class="row">

            {sameDesignation.map((item, index) => (
              <div key={index} class="col-lg-4 col-md-6 col-xs-12">
                <EmployeeCard item={item} />
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Chart;