import React, { useState } from 'react'
import { Avatar, Box, Modal, Typography, Grid } from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faMessage, faPeopleGroup, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import EmployeeModal from './EmployeeModal';

function CardComponent({ item, index, selectedUserEmail }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {index !== 0 && <div id='line'></div>}
      {
        <div key={index} onClick={handleOpen} className={`${item.email === selectedUserEmail ? 'selected_node' : 'node'}`}>
          <div className="details row" >
            <div className='col-lg-3 col-md-3' style={{ display: 'flex', alignItems: "center" }}>
              <Avatar style={{
                height: '2.8rem', width: '2.8rem', borderRadius: "3rem", marginLeft: '43%', backgroundColor: "whitesmoke",
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

      <EmployeeModal item={item} open={open} handleClose={handleClose} handleOpen={handleOpen} />

    </div>
  )
}

export default CardComponent