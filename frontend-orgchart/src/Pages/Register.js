import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { addUserEndpoint, getDepartment, getRoles, getSeniorNames } from "../Utils/endpoints";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTypeRole, setSelectedTypeRole] = useState("")
  const [reportto, setreportto] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' });
  const [type, setType] = useState('');
  const [roleType, setroleType] = useState('');
  const [departmentType, setDepartmentType] = useState('');
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
    } else {
      console.log('went inside')
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedRole("");
        setselectedDept("");
        setreportto("");

        const response = await axios.get(getRoles(type)); // endpoint 1
        console.log(response.data.data);
        setroleDrop(response.data.data);
        console.log('Post request successful:', response.data);

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

        console.log('response for department', response.data.data)


        setdepartmentDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);
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
        console.log('got response of senior emails', response.data.data);
        setreporttoDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

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

      console.log('response for creating : ', response.data)
      toast.success(`User Created`)

      console.log('data for submission ', response.data)
      setFormData({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' })
      setSelectedTypeRole('')
      setSelectedRole('')

      setselectedDept('')
    } catch (error) {
      setFormData({ name: '', email: '', password: '', domain: '', role: '', department: '', reportsTo: '' })
      setSelectedTypeRole('')
      setSelectedRole('')

      console.log('Error server', error?.request?.responseText)
      toast.error(`Registration Error : ${error?.request?.responseText}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Data:', formData);

    submitFormBackend(formData)
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <section className="vh-100 register-body">
      <div className="mask d-flex align-items-center">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 p-5">
              <div className="card register-details" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5 ">
                  <h5 className="mb-4 text-center display-3 fw-bold" style={{ fontFamily: 'Times New Roman', fontSize: '3rem', maxWidth: '100%', color: '#622369' }}>Register</h5>
                  <form>

                    <div className="form-outline mb-4">
                      <input type="text" name="name" placeholder="Name" autoComplete="off"
                        style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                        value={formData.name} id="form3Example1cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email" placeholder="Email" autoComplete="off"
                        style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                        value={formData.email} id="form3Example3cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="password" placeholder="Password" autoComplete="false"
                        style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                        value={formData.password} id="form3Example4cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4 times-new-roman-font">
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
                          style={{ fontFamily: 'Times New Roman' }} 
                        />
                      </div>
                    </div>


                    <div className="form-outline mb-4">
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

                    <div className="form-outline mb-4">
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

                    <div className="form-outline mb-4">
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

                    <div className="d-flex justify-content-center mb-3" style={{fontFamily:'Times New Roman'}}>
                      <button type="button"
                        className="btn  btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Register</button>
                    </div>
                    <div className="d-flex justify-content-center" style={{fontFamily:'Times New Roman'}}>
                      <button type="button" className="btn  btn-block btn-lg gradient-custom-4 text-body" style={{ right: "7%" }}
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