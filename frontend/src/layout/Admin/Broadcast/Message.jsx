import React from 'react';
import { Link } from 'react-router-dom';

const Message = () => {
    return (
        <div>
            <div className="page-content">
                <div className="chat-wrapper">
                    <div className="chat-content ps ps--active-y">
                        <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 2:35 PM</p>
                                    <p className="chat-left-msg">
                                        Hi, harvey where are you now a days?
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="chat-content-rightside">
                            <div className="d-flex ms-auto">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 2:37 PM</p>
                                    <p className="chat-right-msg">I am in USA</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 2:48 PM</p>
                                    <p className="chat-left-msg">okk, what about admin template?</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="chat-content-rightside">
                            <div className="d-flex">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 2:49 PM</p>
                                    <p className="chat-right-msg">
                                        i have already purchased the admin template
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 3:12 PM</p>
                                    <p className="chat-left-msg">
                                        ohhk, great, which admin template you have purchased?
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="chat-content-rightside">
                            <div className="d-flex">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 3:14 PM</p>
                                    <p className="chat-right-msg">
                                        i purchased dashtreme admin template from themeforest. it is very
                                        good product for web application
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 3:16 PM</p>
                                    <p className="chat-left-msg">who is the author of this template?</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-content-rightside">
                            <div className="d-flex">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 3:22 PM</p>
                                    <p className="chat-right-msg">
                                        codervent is the author of this admin template
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 3:16 PM</p>
                                    <p className="chat-left-msg">
                                        ohh i know about this author. he has good admin products in his
                                        portfolio.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-content-rightside">
                            <div className="d-flex">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 3:30 PM</p>
                                    <p className="chat-right-msg">
                                        yes, codervent has multiple admin templates. also he is very
                                        supportive.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-content-leftside">
                            <div className="d-flex">
                                <img
                                    src="assets/images/avatars/avatar-3.png"
                                    width={48}
                                    height={48}
                                    className="rounded-circle"
                                    alt=""
                                />
                                <div className="flex-grow-1 ms-2">
                                    <p className="mb-0 chat-time">Harvey, 3:33 PM</p>
                                    <p className="chat-left-msg">
                                        All the best for your target. thanks for giving your time.
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="chat-content-rightside">
                            <div className="d-flex">
                                <div className="flex-grow-1 me-2">
                                    <p className="mb-0 chat-time text-end">you, 3:35 PM</p>
                                    <p className="chat-right-msg">thanks Harvey</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                            <div
                                className="ps__thumb-x"
                                tabIndex={0}
                                style={{ left: 0, width: 0 }}
                            />
                        </div>
                        <div className="ps__rail-y" style={{ top: 0, height: 520, right: 0 }}>
                            <div
                                className="ps__thumb-y"
                                tabIndex={0}
                                style={{ top: 0, height: 235 }}
                            />
                        </div>
                    </div>
                    {/*start chat overlay*/}
                    <div className="overlay chat-toggle-btn-mobile" />
                    {/*end chat overlay*/}
                </div>
            </div>

        </div>
    );
}

export default Message;
