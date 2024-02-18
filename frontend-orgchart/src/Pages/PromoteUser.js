import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
// Need to send in request.body
// DOMAIN,
// DESIGNATION,
// DEPARTMENTS,
// EMAIL,
// PROMOTE_DESIGNATION,
// REPORT_TO, // promoted employee report to 
// JR_EMAIL_USERS, // list of all employees who should be redirected
// JR_REPORTS_TO // whom to redirect juniors to

const HIERARCHY = {
  PR: ["CFO", "MANAGER", "SENIOR_HR", "JUNIOR_HR"],
  TECH: ["CTO", "TRIBE_MASTER", "TEAM_LEAD", "DEVELOPER"],
};

const DEPARTMENTS = {
  PR: ["BUSINESS_MANAGEMENT", "FINANCIAL_SERVICES"],
  TECH: ["FULL_STACK", "DATA_ENGINEER", "UI"],
};

function PromoteUser() {

  const [formData, setFormData] = useState({
    DOMAIN: "",
    DESIGNATION: "",
    DEPARTMENTS: "",
    EMAIL: "",
    PROMOTE_DESIGNATION: "",
    REPORT_TO: "", 
    JR_EMAIL_USERS: [], // make api call 
    JR_REPORTS_TO: ""
  });

  useEffect(()=>{

    console.log('Changed Form Data ... ',formData)

  },[formData])


  const handlePromoteSubmit = () =>{

  }

  const handleLogout = () =>{
    console.log('Just logout')
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
                  <h5 className="text-center display-4 mb-4 fw-bold" style={{ fontSize: "3rem", maxWidth: '100%', color: '#070F2B' }}>Promote</h5>
                  <form>
                    
                    <div className="form-outline m-3">
                      <input type="email" name="email" placeholder="Email" autoComplete="off"
                        style={{ fontSize: '17px' }}
                        value={formData.EMAIL} id="form3Example3cg" className="form-control form-control-lg" 
                        onChange={(e)=>{
                          console.log('Email changes',e.target.value)
                          setFormData({
                            ...formData,
                            ['EMAIL']:e.target.value
                          })
                        }} />
                    </div>

                    <div className="form-outline m-3 times-new-roman-font">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={formData['DOMAIN']}
                          onChange={(e) => {

                            setFormData({
                              ...formData,
                              ['DOMAIN']: e.value
                            });

                          }}
                          options={["PR", "TECH"]}

                          placeholder="Select Domain"
                          className="w-full md:w-14rem times-new-roman-font"
                        />
                      </div>
                    </div>


                    <div className="d-flex justify-content-center m-3" style={{
                      fontFamily: 'Times New Roman'
                    }}>
                      <button type="button"
                        className="btn  btn-block btn-lg gradient-custom-4 text-body" onClick={handlePromoteSubmit}>Promote</button>
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

export default PromoteUser