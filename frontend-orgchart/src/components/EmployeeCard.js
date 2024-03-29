import React from 'react'
import { Avatar } from '@mui/material'

function EmployeeCard({ item, selectedUserEmail }) {


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            {
                <div id="employee_node" style={{
                    minHeight: '100px',
                    margin: '10px'
                }}>
                    <div className="details row" >
                        <div className='col-lg-3 col-md-3' style={{ display: 'flex', alignItems: "center" }}>
                            <Avatar style={{
                                height: '2.8rem', width: '2.8rem', borderRadius: "3rem", marginLeft: '36%', backgroundColor: "whitesmoke",
                                color: "#070F2B"
                            }}>{item.name.charAt(0).toUpperCase() + item.name.charAt(1).toUpperCase()}</Avatar>
                        </div>
                        <div className=' col-lg-9 col-md-9  text'>
                            <span className='iname'>{capitalizeFirstLetter(item.name)} </span>
                            <span className='irole'>{item.role?.replace(/_/g, ' ')} </span>
                            <span className='idpt'>{item.department?.replace(/_/g, ' ')} </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EmployeeCard