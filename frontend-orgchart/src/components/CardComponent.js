import React, { useEffect } from 'react'
import { Avatar } from '@mui/material'

function CardComponent({ item, index, selectedUserEmail }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log('Equate',selectedUserEmail)

  return (
    <div>
      {index !== 0 && <div id='line'></div>}
      {
        <div key={index} className={`${item.email === selectedUserEmail ? 'selected_node' : 'node'}`}>
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

export default CardComponent