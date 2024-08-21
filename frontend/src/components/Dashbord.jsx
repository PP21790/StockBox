import React from 'react'

const Dashbord = () => {
  return (
    <div>
   
  <div className="page-content">
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
      <div className="col">
        <div className="card radius-10 bg-gradient-deepblue">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 text-white">9526</h5>
              <div className="ms-auto">
                <i className="bx bx-cart fs-3 text-white" />
              </div>
            </div>
            <div
              className="progress my-2 bg-opacity-25 bg-white"
              style={{ height: 4 }}
            >
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: "55%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Total Orders</p>
              <p className="mb-0 ms-auto">
                +4.2%
                <span>
                  <i className="bx bx-up-arrow-alt" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card radius-10 bg-gradient-ohhappiness">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 text-white">$8323</h5>
              <div className="ms-auto">
                <i className="bx bx-dollar fs-3 text-white" />
              </div>
            </div>
            <div
              className="progress my-2 bg-opacity-25 bg-white"
              style={{ height: 4 }}
            >
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: "55%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Total Revenue</p>
              <p className="mb-0 ms-auto">
                +1.2%
                <span>
                  <i className="bx bx-up-arrow-alt" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card radius-10 bg-gradient-ibiza">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 text-white">6200</h5>
              <div className="ms-auto">
                <i className="bx bx-group fs-3 text-white" />
              </div>
            </div>
            <div
              className="progress my-2 bg-opacity-25 bg-white"
              style={{ height: 4 }}
            >
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: "55%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Visitors</p>
              <p className="mb-0 ms-auto">
                +5.2%
                <span>
                  <i className="bx bx-up-arrow-alt" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card radius-10 bg-gradient-moonlit">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 text-white">5630</h5>
              <div className="ms-auto">
                <i className="bx bx-envelope fs-3 text-white" />
              </div>
            </div>
            <div
              className="progress my-2 bg-opacity-25 bg-white"
              style={{ height: 4 }}
            >
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: "55%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Messages</p>
              <p className="mb-0 ms-auto">
                +2.2%
                <span>
                  <i className="bx bx-up-arrow-alt" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="row row-cols-1 row-cols-lg-3">
      <div className="col">
        <div className="card radius-10">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="w_chart easy-dash-chart1" data-percent={60}>
                <span className="w_percent">60</span>
                <canvas height={110} width={110} />
              </div>
              <div className="ms-3">
                <h6 className="mb-0">Facebook Followers</h6>
                <small className="mb-0">
                  22.14% <i className="bx bxs-up-arrow align-middle me-1" />
                  Since Last Week
                </small>
              </div>
              <div className="ms-auto fs-1 text-facebook">
                <i className="bx bxl-facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card radius-10">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="w_chart easy-dash-chart2" data-percent={65}>
                <span className="w_percent">65</span>
                <canvas height={110} width={110} />
              </div>
              <div className="ms-3">
                <h6 className="mb-0">Twitter Tweets</h6>
                <small className="mb-0">
                  32.15% <i className="bx bxs-up-arrow align-middle me-1" />
                  Since Last Week
                </small>
              </div>
              <div className="ms-auto fs-1 text-twitter">
                <i className="bx bxl-twitter" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card radius-10">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="w_chart easy-dash-chart3" data-percent={75}>
                <span className="w_percent">75</span>
                <canvas height={110} width={110} />
              </div>
              <div className="ms-3">
                <h6 className="mb-0">Youtube Subscribers</h6>
                <small className="mb-0">
                  58.24% <i className="bx bxs-up-arrow align-middle me-1" />
                  Since Last Week
                </small>
              </div>
              <div className="ms-auto fs-1 text-youtube">
                <i className="bx bxl-youtube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*End Row*/}
    
    {/*End Row*/}
    <div className="card radius-10">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div>
            <h5 className="mb-0">Orders Summary</h5>
          </div>
          <div className="dropdown options ms-auto">
            <div
              className="dropdown-toggle dropdown-toggle-nocaret"
              data-bs-toggle="dropdown"
            >
              <i className="bx bx-dots-horizontal-rounded" />
            </div>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="javascript:;">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:;">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:;">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order id</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#897656</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/chair.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Light Blue Chair</h6>
                    </div>
                  </div>
                </td>
                <td>Brooklyn Zeo</td>
                <td>12 Jul 2020</td>
                <td>$64.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-info text-info w-100">
                    In Progress
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#987549</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/shoes.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Green Sport Shoes</h6>
                    </div>
                  </div>
                </td>
                <td>Martin Hughes</td>
                <td>14 Jul 2020</td>
                <td>$45.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-success text-success w-100">
                    Completed
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#685749</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/headphones.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Red Headphone 07</h6>
                    </div>
                  </div>
                </td>
                <td>Shoan Stephen</td>
                <td>15 Jul 2020</td>
                <td>$67.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-danger text-danger w-100">
                    Cancelled
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#887459</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/idea.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Mini Laptop Device</h6>
                    </div>
                  </div>
                </td>
                <td>Alister Campel</td>
                <td>18 Jul 2020</td>
                <td>$87.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-success text-success w-100">
                    Completed
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#335428</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img
                        src="/assets/images/icons/user-interface.png"
                        alt=""
                      />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Purple Mobile Phone</h6>
                    </div>
                  </div>
                </td>
                <td>Keate Medona</td>
                <td>20 Jul 2020</td>
                <td>$75.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-info text-info w-100">
                    In Progress
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#224578</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/watch.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">Smart Hand Watch</h6>
                    </div>
                  </div>
                </td>
                <td>Winslet Maya</td>
                <td>22 Jul 2020</td>
                <td>$80.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-danger text-danger w-100">
                    Cancelled
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>#447896</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="recent-product-img">
                      <img src="/assets/images/icons/tshirt.png" alt="" />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-1 font-14">T-Shirt Blue</h6>
                    </div>
                  </div>
                </td>
                <td>Emy Jackson</td>
                <td>28 Jul 2020</td>
                <td>$96.00</td>
                <td>
                  <div className="badge rounded-pill bg-light-success text-success w-100">
                    Completed
                  </div>
                </td>
                <td>
                  <div className="d-flex order-actions">
                    {" "}
                    <a href="javascript:;" className="">
                      <i className="bx bx-cog" />
                    </a>
                    <a href="javascript:;" className="ms-4">
                      <i className="bx bx-down-arrow-alt" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
 
</div>
 
    </div>
  )
}

export default Dashbord
