import React, { useState } from 'react'
import { Avatar, Box, Modal, Typography, Grid } from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faMessage, faPeopleGroup, faUserFriends } from "@fortawesome/free-solid-svg-icons";

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            minHeight: 300,
            bgcolor: '#070F2B',
            border: '2px solid white',
            borderRadius: '5px',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          <Grid container alignItems="center" wrap="wrap" spacing={2}>
            <Grid item xs={6} sm={3}>
              <Avatar
                style={{
                  height: '6rem',
                  width: '6rem',
                  borderRadius: "3rem",
                  backgroundColor: "whitesmoke",
                  color: "#070F2B",
                  border: '1px solid white',
                  marginRight: '2rem',
                }}
              >
                {item.name.charAt(0).toUpperCase() + item.name.charAt(1).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={6} sm={9}>
              <div className='d-flex flex-column' style={{ color: 'white' }}>
                <span className='iname'>{capitalizeFirstLetter(item.name)} </span>
                <span className='irole'>{item.role?.replace(/_/g, ' ')} </span>
              </div>
            </Grid>

            <Grid item xs={12}>
              <hr style={{ borderColor: 'white' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
                Contact Information
              </Typography>
            </Grid>

            <Grid item sm={12}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <div>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '20px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Email</span>
                  <span>{item.email}</span>
                </div>
              </div>
            </Grid>

            {/* Chat */}
            <Grid item sm={12}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <FontAwesomeIcon icon={faMessage} style={{ marginRight: '20px' }} /> {/* Reduced margin here */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Chat</span>
                  <span>{item.name}</span>
                </div>
              </div>
            </Grid>

            {/* Department */}
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <FontAwesomeIcon icon={faPeopleGroup} style={{ marginRight: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Department</span>
                  <span>{item?.department===null ? item?.role : item?.department?.toUpperCase().split('_').join(' ')}</span>
                </div>
              </div>
            </Grid>

            {/* Reports to */}
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: '20px' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Reports To</span>
                  <span>{item?.reportsTo}</span>
                </div>
              </div>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default CardComponent