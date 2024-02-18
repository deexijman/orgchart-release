import React from 'react'
import EmployeeCard from './EmployeeCard'

function SameDesignation({ sameDesignation, selectedUserEmail }) {
    return (
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
    )
}

export default SameDesignation