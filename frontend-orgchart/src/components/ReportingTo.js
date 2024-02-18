import React from 'react'
import EmployeeCard from './EmployeeCard'

function ReportingTo({ reportingTo }) {
  return (
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
  )
}

export default ReportingTo