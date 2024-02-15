import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import hierarchyImage from './static/Hierarchy_Vector.png'

const Login = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async () => {

    try {

      const response = await axios.post('http://localhost:4000/api/login', {
        NAME: employeeName,
        EMAIL: email,
        ROLE: userType,
        PASSWORD: password,
      });

      const { name, email: resEmail, role, reportsTo, accessRole } = response.data

      console.log("object obtained", { name, resEmail, role, reportsTo, accessRole })

      if (response.status === 200 && accessRole === 'ADMIN') {

        console.log("response accessRole : ", accessRole)

        localStorage.clear();
        localStorage.setItem("email", resEmail);
        localStorage.setItem("reportsTo", reportsTo);

        navigate('/register')

      } else if (response.status === 200 && accessRole === 'USER') {

        console.log("response accessRole : ", accessRole)

        localStorage.clear();
        localStorage.setItem("email", resEmail);
        localStorage.setItem("reportsTo", reportsTo);

        // toast for success login
        toast.success("Login Successful")

        navigate('/chart')

      }
      else {
        throw new Error("some internal error")
      }

    } catch (error) {

      console.error('Error occurred at LOGIN :', error?.request?.responseText);
      toast.error(`Login Error : ${error?.request?.responseText}`)
    }
  };


  return (

    <section className="h-100 gradient-form" >
      <div className="container-fluid  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100"  >
          <div className="col-xl-12">
            <div className="card rounded-3 text-black h-100">
              <div className="row g-0 "  >
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4 text-center display-3 fw-bold" style={{ fontFamily: 'Times New Roman', fontSize: '3rem', maxWidth: '100%' }}>Organization Chart</h4>

                    <img src={hierarchyImage} alt="Hierarchy_Vector" className="img-fluid" />
                  </div>
                </div>
                <div className="col-lg-6 login-body">
                  <div className="card-body p-md-5 mx-md-4">


                    <form>


                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Employee Name"
                          style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                          onChange={(event) => {
                            setEmployeeName(event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email Address"
                          style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </div>
                      <div className="radio-button mb-4">
                        <div className="form-check pr-5">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radioUser"
                            name="optradio"
                            value="user"
                            checked={userType === 'user'}
                            onChange={(e) => { setUserType(e.target.value) }}
                          />
                          <label className="form-check-label" htmlFor="radioUser" style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}>
                            User
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="radioAdmin"
                            name="optradio"
                            value="admin"
                            checked={userType === 'admin'}
                            onChange={(e) => { setUserType(e.target.value) }}
                          />
                          <label className="form-check-label" htmlFor="radioAdmin" style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}>
                            Admin
                          </label>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          style={{ fontSize: '18px', fontFamily: 'Times New Roman' }}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Log in
                        </button>

                      </div>


                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login;