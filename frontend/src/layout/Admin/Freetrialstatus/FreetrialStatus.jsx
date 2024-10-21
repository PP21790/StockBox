import React, { useEffect, useState } from 'react';
import { addfreeClient, basicsettinglist } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';

const FreetrialStatus = () => {
  const token = localStorage.getItem('token');


  const [data, setData] = useState([]);
  const [addStatus, setAddStatus] = useState({
    id: "",
    freetrial: ""
  });


  useEffect(() => {
    getApidetail();
  }, []);



  const getApidetail = async () => {
    try {
      const response = await basicsettinglist(token);
      if (response?.status && response?.data) {
        setData(response.data);
        const defaultTrial = response.data.length > 0 ? response.data[0].freetrial : "1";
        setAddStatus({ ...addStatus, freetrial: defaultTrial });
      }
    } catch (error) {
      console.error('Error fetching API details:', error);
    }
  };



  const UpdateClientstatus = async () => {
    try {
      const data = {
        freetrial: addStatus.freetrial
      };

      const response = await addfreeClient(data, token);
      if (response?.status) {
        Swal.fire({
          icon: 'success',
          title: response.message || 'Update Successful!',
          text: 'Your API information was updated successfully.',
          timer: 1500,
          timerProgressBar: true,
        });

        getApidetail();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the API information. Please try again.',
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };





  const handleSelectChange = (event) => {
    setAddStatus({ ...addStatus, freetrial: event.target.value });
  };




  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,

    },
    {
      name: 'Status',
      selector: row => `${row.freetrial}Day`,
      sortable: true,
    },

    {
      name: 'Created At',
      selector: row => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Updated At',
      selector: row => new Date(row.updated_at).toLocaleDateString(),
      sortable: true,
    },
  ];
  



  return (
    <div>

      <div className="page-content">

        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Free Trial Status</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/admin/dashboard">
                    <i className="bx bx-home-alt" />
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <hr />

        <div className="card">
          <div className="card-body">
            <div>
              <label htmlFor="" className='mb-1'> Select Free Days Trial</label>
              <div className='col-lg-4 d-flex '>

                <select class="form-select" value={addStatus.freetrial} onChange={handleSelectChange}>
                  <option value="" disabled>
                    Select days
                  </option>
                  {[...Array(7)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1} day{index > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <button className='btn btn-primary ms-2' onClick={UpdateClientstatus}>
                  Update
                </button>

              </div>
              <div className="ms-auto">
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Service
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <label htmlFor="">Title</label>
                              <input
                                className="form-control mb-3"
                                type="text"
                                placeholder='Enter Service Title'

                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"

                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive mt-5">
              <Table
                columns={columns}
                data={data}
                pagination
                striped
                highlightOnHover
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default FreetrialStatus;
