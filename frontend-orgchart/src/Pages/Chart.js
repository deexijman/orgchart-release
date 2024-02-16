import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComponent from '../components/CardComponent';
import EmployeeCard from '../components/EmployeeCard'
import {
  callChartData,
  callSameDesignationData,
  callReportingToData
} from '../Utils/dataFetching.js'

function Chart({ chartdata }) {

  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [sameDesignation, setSameDesignation] = useState([])
  const [reportingTo, setReportingTo] = useState([])
  const [selectedUserEmail, setSelectedUserEmail] = useState(localStorage.getItem('email'))

  useEffect(() => {
    // to handle unwanted login
    if (localStorage.getItem('email') === null && localStorage.getItem('reportsTo') === null) {
      navigate('/')
      toast.error('Kindly Login To View Chart')
    }
    else {
      // set userData Initially
      callChartData({
        email: localStorage.getItem('email'),
        reportsTo: localStorage.getItem('reportsTo'),
        setUserData: setUserData
      })
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('email') !== null) { // to handle server crash
      if (selectedUser !== undefined && selectedUser !== null) {

        setSelectedUserEmail(selectedUser.email)
        callChartData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo,
          setUserData: setUserData
        })

        callSameDesignationData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo,
          setSameDesignation: setSameDesignation
        })

        callReportingToData({
          email: selectedUser.email,
          setReportingTo: setReportingTo
        })

        callReportingToData({
          email: selectedUser.email,
          setReportingTo: setReportingTo
        })

      } else {

        callChartData({
          email: localStorage.getItem('email'),
          reportsTo: localStorage.getItem('reportsTo'),
          setUserData: setUserData
        })

        callSameDesignationData({
          email: localStorage.getItem('email'),
          reportsTo: localStorage.getItem('reportsTo'),
          setSameDesignation: setSameDesignation
        })

        callReportingToData({
          email: localStorage.getItem('email'),
          setReportingTo: setReportingTo
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
            <CardComponent key={index} index={index} item={item} selectedUserEmail={selectedUserEmail} />
          ))}
        </div>

        <div id="samedesig-container">
          {
            sameDesignation.length > 0
            &&
            <div class="container" style={{
              border: "3px solid #070F2B",
              padding: '10px',
              minWidth: '100%',
              marginTop: '40px'
            }}>
              <div class="row justify-content-center">

                <div class="col-12">
                  <p
                    style={{
                      fontFamily: 'Ubuntu',
                      fontWeight: 500
                    }}
                  >Folks in your rank ({sameDesignation.length})</p>
                </div>

                {sameDesignation.map((item, index) => (
                  <div key={index} class="col-lg-4 col-md-6 col-xs-12">
                    <EmployeeCard item={item} selectedUserEmail={selectedUserEmail} />
                  </div>
                ))}

              </div>
            </div>
          }

        </div>

        <div id="reportingTo-Container">
          {
            reportingTo.length > 0 &&
            <div class="container" style={{
              border: "3px solid #070F2B",
              padding: '10px',
              minWidth: '100%',
              marginTop: '40px',
            }}>

              <div class="row justify-content-center">

                <div class="col-12">
                  <p
                    style={{
                      fontFamily: 'Ubuntu',
                      fontWeight: 500
                    }}
                  >Reporting to you ({reportingTo.length})</p>
                </div>

                {reportingTo.map((item, index) => (
                  <div key={index} class="col-lg-4 col-md-6 col-xs-12">
                    <EmployeeCard item={item} />
                  </div>
                ))}

              </div>
            </div>
          }

        </div>

      </div>
    </div>
  );
}

export default Chart;