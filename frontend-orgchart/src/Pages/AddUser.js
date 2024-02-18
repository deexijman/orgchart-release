import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { addUserEndpoint, getDepartment, getRoles, getSeniorNames } from "../Utils/endpoints.js";

// type : domain
// roleType : designation
// departmentType : department 

export default function AddUser() {
  
  const [reportto, setreportto] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' });
  
  const [type, setType] = useState('');
  const [roleType, setroleType] = useState('');
  const [departmentType, setDepartmentType] = useState('');

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTypeRole, setSelectedTypeRole] = useState("")
  const [selectedDept, setselectedDept] = useState("");

  const [roledrop, setroleDrop] = useState([]);
  const [departmentdrop, setdepartmentDrop] = useState([]);
  const [reporttodrop, setreporttoDrop] = useState([]);

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  useEffect(() => {
    // to handle unwanted login
    if (localStorage.getItem('email') === null) {
      navigate('/')
    }
    
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedRole("");
        setselectedDept("");
        setreportto("");

        const response = await axios.get(getRoles(type)); // endpoint 1
        setroleDrop(response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);
      }
    };


    if (type.trim() !== '') {
      fetchData();
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setselectedDept("");
        setreportto("");
        const response = await axios.get(getDepartment(type)); // endpoint 2
        setdepartmentDrop(response.data.data);
      } catch (error) {
        toast.error("Error while registering")
      }
    };


    if (roleType.trim() !== '') {
      fetchData();
    }
  }, [roleType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setreportto("");
        const response = await axios.get(getSeniorNames(roleType,departmentType)); // endpoint 3
        setreporttoDrop(response.data.data);
      } catch (error) {
        console.error('Error in post request:', error);
      }
    };

    if (departmentType.trim() !== '') {
      fetchData();
    }
  }, [departmentType]);

  const submitFormBackend = async (formData) => {
    try {
      const response = await axios.post(addUserEndpoint(), formData)

      toast.success(`User Created`)

      setFormData({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' })
      setSelectedTypeRole('')
      setSelectedRole('')
      setselectedDept('')
      setreportto('')
    } catch (error) {
      setFormData({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' })
      setSelectedTypeRole('')
      setSelectedRole('')
      setselectedDept('')
      setreportto('')
      toast.error(`Registration Error : ${error?.request?.responseText}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    submitFormBackend(formData)
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <section className="register-body">
      <div className="d-flex align-items-center justify-content-center"  style={{
        minHeight:'100vh'
      }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 p-3">
              <div className="card register-details" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="text-center display-4 mb-4 fw-bold" style={{ fontSize:"3rem" ,maxWidth: '100%', color: '#070F2B' }}>Register</h5>
                  <form>
                    <div className="form-outline m-3 ">
                      <input type="text" name="name" placeholder="Name" autoComplete="off"
                        style={{ fontSize: '17px' }}
                        value={formData.name} id="form3Example1cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline m-3">
                      <input type="email" name="email" placeholder="Email" autoComplete="off"
                        style={{ fontSize: '17px' }}
                        value={formData.email} id="form3Example3cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline m-3">
                      <input type="password" name="password" placeholder="Password" autoComplete="false"
                        style={{ fontSize: '17px' }}
                        value={formData.password} id="form3Example4cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline m-3 times-new-roman-font">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedTypeRole} name='role'
                          onChange={(e) => {
                            setSelectedTypeRole(e.value);
                            setType(e.value);

                            setFormData({
                              ...formData,
                              ['domain']: e.value
                            });

                          }}
                          options={["PR", "TECH"]}

                          placeholder="Select Domain"
                          className="w-full md:w-14rem times-new-roman-font" 
                        />
                      </div>
                    </div>


                    <div className="form-outline m-3">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedRole} name='role'
                          onChange={(e) => {
                            console.log(e.value);
                            setSelectedRole(e.value);
                            setroleType(e.value);

                            setFormData({
                              ...formData,
                              ['role']: e.value
                            });
                          }}
                          options={roledrop}

                          placeholder="Select Designation"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="form-outline m-3">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedDept} name='role'
                          onChange={(e) => {
                            setselectedDept(e.value);
                            setDepartmentType(e.value);

                            setFormData({
                              ...formData,
                              ['department']: e.value
                            });
                          }}
                          options={departmentdrop}

                          placeholder="Select Department"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="form-outline m-3">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={reportto} name='reportingto'
                          onChange={(e) => {
                            setreportto(e.value);

                            setFormData({
                              ...formData,
                              ['reportsTo']: e.value
                            });

                          }}

                          options={reporttodrop}

                          placeholder="Reports To"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center m-3" style={{
                      fontFamily:'Times New Roman'
                    }}>
                      <button type="button"
                        className="btn  btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Register</button>
                    </div>
                    <div className="d-flex justify-content-center m-3" style={{fontFamily:'Times New Roman'}}>
                      <button type="button" className="btn  btn-block btn-lg gradient-custom-4 text-body" style={{ 
                        right: "7%"
                      }}
                        onClick={handleLogout}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}