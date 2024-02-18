import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { getAllUsers, sameDesignationEndpoint, terminateUserEndpoint } from '../Utils/endpoints';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function DeleteUser() {

  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState({}); // get emp data from selected email
  const [selectedReportingTo, setSelectedReportingTo] = useState(''); // selected reporting to

  const [employeeEmailDropdown, setEmployeeEmailDropdown] = useState([]) // get all emails alone
  const [employeeDetails, setEmployeeDetails] = useState([]) // get all emp details
  const [sameDesignationEmailsDropdown, setSameDesignationEmailsDropdown] = useState([])

  const navigate = useNavigate()

  const updateEmployeeEmails = async () => {
    try {
      const response = await axios.get(getAllUsers())
      setEmployeeDetails(response?.data?.data)
      setEmployeeEmailDropdown(response?.data?.data?.map((item) => item.email).filter((item) =>
        item !== 'anushnewman@jmangroup.com' &&
        item !== 'ashley@jmangroup.com' &&
        item !== 'leovalan@jmangroup.com'
      ))
    } catch (err) {
      console.log('Error fetching employee details')
    }
  }

  const updateSameDesignationEmails = async (reportsTo, department) => {
    try {
      const response = await axios.post(sameDesignationEndpoint(),
        {
          reportsTo: reportsTo
        })
      console.log('Same designation', response?.data?.data?.filter((item) => (item.email!==selectedEmployeeDetails.email && item.department === department && item.role !== 'DEVELOPER' && item.role !== 'JUNIOR_HR')))
      setSameDesignationEmailsDropdown(response?.data?.data?.filter((item) => (item.email!==selectedEmployeeDetails.email && item.department === department && item.role !== 'DEVELOPER' && item.role !== 'JUNIOR_HR')).map((item) => (item.email)))
    } catch (err) {
      console.log('Error fetching same designation details')
    }
  }

  useEffect(() => {
    updateEmployeeEmails() // just initial fetch of all details
  }, [])

  useEffect(() => {

    setSelectedReportingTo('') // clean this when the previous state is changed 
    if (selectedEmployeeDetails) {
      updateSameDesignationEmails(selectedEmployeeDetails.reportsTo, selectedEmployeeDetails.department) // filter response based on role and render
    }

  }, [selectedEmployeeDetails])

  const submissionTerminate = async(email, reportingto, isleaf) =>{

    try{
      const response = axios.delete(terminateUserEndpoint(isleaf, email, reportingto))
      console.log('deleted user',response)
      toast.success('deleted user')
    }catch(err){
      console.log('error deleting user',err.message)
      toast.error('error deleting user',err.message)
    }
    
  }

  const handleTerminateSubmit = () => {

    if(selectedReportingTo===''){

      if((selectedEmployeeDetails.role==='DEVELOPER' || selectedEmployeeDetails.role==='JUNIOR_HR')){
        console.log('Allow submit ',selectedEmployeeDetails.email, selectedReportingTo)
        toast.success('submitted')
        setSelectedEmployeeDetails({})
        setSelectedReportingTo('')

        // LAST = true
        submissionTerminate(selectedEmployeeDetails.email, selectedReportingTo, 'true')
      }else{
        toast.error('Select reporting to field is empty')
      }

    } else{
      console.log('Allow submit ',selectedEmployeeDetails.email, selectedReportingTo)
      toast.success('submitted')
      setSelectedEmployeeDetails({})
      setSelectedReportingTo('')

      // LAST = false
      submissionTerminate(selectedEmployeeDetails.email, selectedReportingTo, 'false')
    }
    
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <section className="register-body">
      <div className="d-flex align-items-center justify-content-center" style={{
        minHeight: '100vh'
      }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 p-3">
              <div className="card register-details" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="text-center display-4 mb-4 fw-bold" style={{ fontSize: "3rem", maxWidth: '100%', color: '#070F2B' }}>Terminate</h5>
                  <form>

                    <div className="form-outline m-3 times-new-roman-font">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedEmployeeDetails.email}
                          onChange={(e) => {
                            setSelectedEmployeeDetails(employeeDetails.filter((item) => (item.email === e.value))[0] || {})
                          }}
                          options={employeeEmailDropdown}

                          placeholder="Select Domain"
                          className="w-full md:w-14rem times-new-roman-font"
                          filter
                        />
                      </div>
                    </div>

                    <div>
                      {selectedEmployeeDetails && Object.entries(selectedEmployeeDetails).map(([key, value]) => {
                        if (['name', 'email', 'role', 'department', 'reportsTo'].includes(key)) {
                          return (
                            <div className="form-outline m-3" key={key}>
                              <input
                                type="text"
                                name={key}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the key for placeholder
                                autoComplete="off"
                                style={{ fontSize: '17px' }}
                                value={value}
                                id={`form-${key}`}
                                className="form-control form-control-lg"
                                readOnly // Set input to read-only
                              />
                            </div>
                          );
                        }
                        return null; // Ignore other fields
                      })}
                    </div>

                    { sameDesignationEmailsDropdown.length>0 && 
                      <div className="form-outline m-3 times-new-roman-font">
                        <div className="card flex justify-content-center">
                          <Dropdown
                            value={selectedReportingTo}
                            onChange={(e) => {
                              setSelectedReportingTo(e.value)
                            }}
                            options={sameDesignationEmailsDropdown}

                            placeholder="Alternate ReportingTo"
                            className="w-full md:w-14rem times-new-roman-font"
                          />
                        </div>
                      </div>
                    }

                    <div className="d-flex justify-content-center m-3" style={{
                      fontFamily: 'Times New Roman'
                    }}>
                      <button type="button"
                        className="btn  btn-block btn-lg gradient-custom-4 text-body" onClick={handleTerminateSubmit}>Terminate</button>
                    </div>
                    <div className="d-flex justify-content-center m-3" style={{ fontFamily: 'Times New Roman' }}>
                      <button type="button" className="btn  btn-block btn-lg gradient-custom-4 text-body" style={{
                        right: "7%"
                      }}
                        onClick={handleLogout}>Logout<i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeleteUser