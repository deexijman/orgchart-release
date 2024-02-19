import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardComponent from "../components/CardComponent";
import {
  callChartData,
  callSameDesignationData,
  callReportingToData
} from '../Utils/dataFetching.js'
import SameDesignation from '../components/SameDesignation.js';
import ReportingTo from '../components/ReportingTo.js';

function Chart({ chartdata }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);   //Stores the heirachy details
  const [selectedUser, setSelectedUser] = useState(null);  //Stores the selected user in dropdown
  const [sameDesignation, setSameDesignation] = useState([]);  //Stores users with same designation
  const [reportingTo, setReportingTo] = useState([]);   //Stores users reporting to
  const [selectedUserEmail, setSelectedUserEmail] = useState(  
    localStorage.getItem("email")
  );

  useEffect(() => {
    // to handle unwanted login
    if (
      localStorage.getItem("email") === null &&
      localStorage.getItem("reportsTo") === null
    ) {
      navigate("/");
      toast.error("Kindly Login To View Chart");
    } else {
      // set userData Initially
      callChartData({
        email: localStorage.getItem("email"),
        reportsTo: localStorage.getItem("reportsTo"),
        setUserData: setUserData,
      });
    }
  }, []);

  //Get detials when a user is selected in dropdown
  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      // to handle server crash
      if (selectedUser !== undefined && selectedUser !== null) {
        setSelectedUserEmail(selectedUser.email);
        //Heirachy details
        callChartData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo,
          setUserData: setUserData,
        });
        

        callSameDesignationData({
          email: selectedUser.email,
          reportsTo: selectedUser.reportsTo,
          setSameDesignation: setSameDesignation,
        });

        callReportingToData({
          email: selectedUser.email,
          setReportingTo: setReportingTo,
        });

        
      }
    }
  }, [selectedUser]);
  
  //Template for search field
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
  
  //Template for options of dropdown
  const OptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };
  
  //To handle logout
  const handleLogout = () => {
    const cookie = localStorage.getItem("email");
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfull");
  };

  return (
    <div className="chart-body" style={{ paddingBottom: "20px" }}>
      <div className="container-fluid chart-nav">
        <div className="row" style={{ padding: "10px", marginBottom: "20px" }}>
          <div className="col-md-3 col-sm-12 py-2">
            <i
              className="fa-solid fa-sitemap"
              style={{ fontSize: "2.5rem" }}
            ></i>
          </div>

          <div className="col-md-6 py-2 col-sm-12">
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={chartdata}
              optionLabel="name"
              placeholder="Select a user"
              filter
              valueTemplate={searchTemplate}
              itemTemplate={OptionTemplate}
              className="w-full md:w-14rem"
              style={{ width: "100%" }}
            />
          </div>

          <div
            className="col-md-3 col-sm-12 py-2"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ right: "7%" }}
              onClick={handleLogout}
            >
              Logout&nbsp;&nbsp;
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="org-chart">
          {userData.map((item, index) => (
            <CardComponent
              key={index}
              index={index}
              item={item}
              selectedUserEmail={selectedUserEmail}
            />
          ))}
        </div>

        {/* Folks in your rank  */}
        <SameDesignation sameDesignation={sameDesignation} selectedUserEmail={selectedUserEmail} />

        {/* Reporting to you  */}
        <ReportingTo reportingTo={reportingTo} />

      </div>
    </div>
  );
}

export default Chart;
