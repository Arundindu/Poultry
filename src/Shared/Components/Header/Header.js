import React, { useEffect } from 'react'
import './Header.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServiceUtils } from '../../Utils/ServiceUtils'
import Toaster from '../../Utils/Toaster'

const Header = ({ dataFromSidebar }) => {
  const navigate = useNavigate()
  const [subHeader, setSubHeader] = useState('')
  const [pathName, setPathName] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([{
    key: '',
    label: ''
  }]);


  useEffect(() => {
    const storedSubHeader = sessionStorage.getItem('selectedSubHeader');
    if (storedSubHeader) {
      setSubHeader(storedSubHeader);
    }
    let pathName = window.location.pathname.split('/')
    let name = pathName[pathName.length - 1]
    setPathName(name)
  }, []);

  const logout = () => {
    navigate('/login')
    sessionStorage.clear()
  }
  const userManual = () => {
    // navigate('/configurations')
  }
  const deactivateUser = () => {
    const payload = {
      userName: localStorage.getItem('userName')
    }
    ServiceUtils.postRequest("deActivateUser", payload).then((responseData) => {
      let response = JSON.parse(window.atob(responseData.data))
      if (response.status === 'success') {
        navigate('/Login')
        Toaster.success(response.message || "Success");
      } else {
        Toaster.error(response.message || "Error");
      }
    });
  }
  const deleteUser = () => {
    try {
      const payload = {
        userName: localStorage.getItem('userName')
      }
      ServiceUtils.postRequest("deleteUser", payload).then((responseData) => {
        let response = JSON.parse(window.atob(responseData.data))
        if (response.status === 'success') {
          navigate('/Login')
          Toaster.success(response.message || "Success");
        } else {
          Toaster.error(response.message || "Error");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
  const addNewTab = () => {
    setShowModal(true);
  }
  const closeModalAndNavigate = () => {
    setShowModal(false);
  }
  const addTab = () => {
    try {
      const payload = {
        data: data,
        type: 'add'
      }
      ServiceUtils.postRequest("", payload).then((responseData) => {
        let response = JSON.parse(window.atob(responseData.data))
        if (response.status === 'success') {
          setData([{
            key: '',
            label: ''
          }])
          Toaster.success(response.message || "Success");
        } else {
          Toaster.error(response.message || "Error");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
  const changeHandler = (e, index) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [e.target.name]: e.target.value,
      };
      return updatedData;
    });
  }

  const addNewRow = () => {
    setData((prevData) => [
      ...prevData,
      { key: '', label: '' },
    ]);
  }

  return (
    <>
      <div className='container d-flex justify-content-between align-items-center'>
        <div style={{ fontWeight: '600' }}>{dataFromSidebar === null ? pathName : dataFromSidebar.data.label}
          {subHeader ? <span> /&nbsp;{subHeader}</span> : ''}
        </div>
        <div className='profile d-flex align-items-center'>
          <div className="dropdown">
            <span className="navbar-name dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"><i className="fa fa-user" aria-hidden="true"></i>&nbsp; {localStorage.getItem('userName')}
            </span>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <span className="dropdown-item" onClick={userManual}><i className="fa fa-book" aria-hidden="true"></i>&nbsp; User Manual</span>
              <span className="dropdown-item" onClick={deactivateUser}><i className="fa fa-user-times" aria-hidden="true"></i>&nbsp; Deactivate User</span>
              <span className="dropdown-item" onClick={deleteUser}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Delete User</span>
              <span className="dropdown-item" onClick={addNewTab}><i className="fa fa-cogs" aria-hidden="true"></i>&nbsp; Settings Configuration</span>
              <span className="dropdown-item" onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i> &nbsp;Logout</span>
            </div>
          </div>
        </div >
      </div >
      {showModal && (

        <div className="modal fade show" role="dialog" style={{ display: 'flex' }}>
          <div className="modal-dialog w-100 d-flex align-items-center">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New</h5>
                <button type="button" className="close btn-group" data-dismiss="modal" aria-label="Close" onClick={closeModalAndNavigate}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <div className='row'> */}

                {data.map((item, index) => (
                  <div className='row' key={index}>
                    <div className='col-md-5'>
                      <label className='mb-1' htmlFor='key'>Key</label>
                      <input className='form-control my-2' placeholder='Key' type='text' name='key' id='key' onChange={(e) => changeHandler(e, index)} />
                    </div>
                    <div className='col-md-5'>
                      <label className='mb-1' htmlFor='label'>Label</label>
                      <input className='form-control my-2' placeholder='Label' type='text' name='label' id='label' onChange={(e) => changeHandler(e, index)} />
                    </div>
                    {data.length - 1 === index ? <div className="col-md-2 d-flex align-items-center">
                      <button type="button" className='btn btn-primary' onClick={addNewRow}><i class="fa fa-plus" aria-hidden="true"></i></button>
                    </div> : ''}
                  </div>
                ))}
                {/* </div> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={addTab}>Add</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModalAndNavigate}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header