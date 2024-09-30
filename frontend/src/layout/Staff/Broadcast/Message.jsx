import React from 'react';
import { Link } from 'react-router-dom';

const Message = () => {
    return (
        <div>
            <div className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Message Broadcast</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="/staff/dashboard">
                                        <i className="bx bx-home-alt" />
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-tabs nav-success" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link active"
                                    data-bs-toggle="tab"
                                    href="#successhome"
                                    role="tab"
                                    aria-selected="true"
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="tab-icon">
                                            <i className="bx bx-home font-18 me-1" />
                                        </div>
                                        <div className="tab-title">Send</div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#successprofile"
                                    role="tab"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="tab-icon">
                                            <i className="bx bx-user-pin font-18 me-1" />
                                        </div>
                                        <div className="tab-title">Sent Messages</div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#successcontact"
                                    role="tab"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="tab-icon">
                                            <i className="bx bx-microphone font-18 me-1" />
                                        </div>
                                        <div className="tab-title">Received Messages</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content py-3">
                            <div
                                className="tab-pane fade active show"
                                id="successhome"
                                role="tabpanel"
                            >
                                <div className="row">
                                    <div className="col-xl-6 mx-auto">
                                        <div className="card">
                                            <div className="card-body p-4">

                                                <form className="row g-3">

                                                    <div className="col-md-6">
                                                        <label htmlFor="input2" className="form-label">
                                                            Staff
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="input2"
                                                            placeholder="Last Name"
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="input3" className="form-label">
                                                            Client
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="input3"
                                                            placeholder="Phone"
                                                        />
                                                    </div>

                                                    <div className="col-md-12">
                                                        <label htmlFor="input11" className="form-label">
                                                            Message
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="input11"
                                                            placeholder="Address ..."
                                                            rows={3}
                                                            defaultValue={""}
                                                        />
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="d-md-flex d-grid align-items-center gap-3">
                                                            <button type="button" className="btn btn-primary px-4">
                                                                Send
                                                            </button>

                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="successprofile" role="tabpanel">
                                <p>
                                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                                    single-origin coffee squid. Exercitation +1 labore velit, blog
                                    sartorial PBR leggings next level wes anderson artisan four loko
                                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo
                                    enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum
                                    PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus
                                    mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente
                                    labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
                                    sustainable jean shorts beard ut DIY ethical culpa terry richardson
                                    biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui
                                    sapiente accusamus tattooed echo park.
                                </p>
                            </div>
                            <div className="tab-pane fade" id="successcontact" role="tabpanel">
                                <p>
                                    Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out
                                    mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table
                                    readymade. Messenger bag gentrify pitchfork tattooed craft beer,
                                    iphone skateboard locavore carles etsy salvia banksy hoodie helvetica.
                                    DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred
                                    pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork
                                    biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you
                                    probably haven't heard of them, vinyl craft beer blog stumptown.
                                    Pitchfork sustainable tofu synth chambray yr.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
