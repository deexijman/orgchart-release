import { Routes, Route, Link } from 'react-router-dom';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import PromoteUser from './PromoteUser';
import { Button } from '@mui/material';

function User() {
  return (
    <div>
      <div className="container-fluid chart-nav">
        <div className="row" style={{ padding: "10px", marginBottom: "20px" }}>
          <div className="col-md-6 col-sm-12 d-flex align-items-center m-0 p-0">
            <h5 className="fw-bold" style={{
              color:'white',
              fontFamily: 'ubuntu'
            }}>Admin Dashboard</h5>
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-end" >
            <Button component={Link} to="/user/" style={{ color: "white" }} variant="text">ADD</Button>
            <Button component={Link} to="/user/delete/" style={{ color: "white" }} variant="text">TERMINATE</Button>
            <Button component={Link} to="/user/promote/" style={{ color: "white" }} variant="text">PROMOTE</Button>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/delete" element={<DeleteUser />} />
        <Route path="/promote" element={<PromoteUser />} />
      </Routes>

    </div>
  );
}

export default User;
