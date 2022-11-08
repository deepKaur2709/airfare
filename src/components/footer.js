import React from "react";

const Footer = () => {

    return (<div className="mt-5 pt-5 pb-5 footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-xs-12 about-company">
          <h2>AirFare</h2>
          <p className="pr-5 text-white-50">AirFare serves every province and its domestic schedule includes service to 51 Canadian airports. New domestic flights from Montreal to Gander, Vancouver to Halifax, Vancouver to Quebec, Calgary to Quebec, and Calgary to Fort St. John begin in summer 2022.  </p>
          <p><a href="#"><i className="fa fa-facebook-square mr-1"></i></a><a href="#"><i className="fa fa-linkedin-square"></i></a></p>
        </div>
        <div className="col-lg-3 col-xs-12 links">
          <h4 className="mt-lg-0 mt-sm-3">Links</h4>
            <ul className="m-0 p-0">
            <li>- <a href="/flights">Flights</a></li>
              <li>- <a href="/aboutus">About Us</a></li>
              <li>- <a href="/contactus">Contact Us</a></li>
              <li>- <a href="/login">Login</a></li>
            </ul>
        </div>
        <div className="col-lg-4 col-xs-12 location">
          <h4 className="mt-lg-0 mt-sm-4">Location</h4>
          <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
          <p className="mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
          <p><i className="fa fa-envelope-o mr-3"></i>info@airfare.com</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col copyright">
          <p className=""><small className="text-white-50">© 2022. All Rights Reserved.</small></p>
        </div>
      </div>
    </div>
    </div>)
}

export default Footer