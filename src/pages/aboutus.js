import React, { Component } from "react";
import aboutUsImage from '../images/aboutusbanner.jpg'

class AboutUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (<React.Fragment>
            <div className="about-section">
                <h1>About Us</h1>
                <p>AirFare serves every province and its domestic schedule includes service to 51 Canadian airports. New domestic flights from Montreal to Gander, Vancouver to Halifax, Vancouver to Quebec, Calgary to Quebec, and Calgary to Fort St. John begin in summer 2022. </p>
                <p>AirFare expands its summer schedule with the recent service resumption announcement of 34 routes to Europe, Asia, Africa and The Middle East. The airline’s international network extends to 67 airports from its Toronto, Montreal and Vancouver hubs, as well as from Calgary and Halifax, and 96 total routes.</p>
            </div>

            <section className="inline-image-right my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 align-vertical no-align-mobile">
                            <h1>Why Airfare ?</h1>
                            <h6>Because We love to service People !</h6>
                            <p className="lead">
                                The airline is the second largest Canada based carrier, based on fleet size and passengers carried.
                                And It is also the world's third-largest airline group in terms of annual revenue and the second-largest in Canada.
                            </p>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img alt="Product" className="product-image" src={aboutUsImage} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="duplicatable-content">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="py-4">A few things you need to know</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-sm-6">
                            <div className="feature feature-icon-large">
                                <div className="pull-left">
                                <i className="fad fa-ticket"></i>
                                </div>
                                <div className="pull-right">
                                    <h5>Priority Check-In</h5>
                                    <p>
                                        Dedicated Priority Check-In counters for accelerated services are available at all airports. Air Canada Signature Class passengers departing from a Canadian airport receive personalized check-in service from our team of specially trained Premium Agents.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="feature feature-icon-large">
                                <div className="pull-left">
                                    <i className="icon icon-phone"></i>
                                </div>
                                <div className="pull-right">
                                    <h5>Concierge Service</h5>
                                    <p>
                                        Our industry-leading concierges are there to help with check-in assistance inside our exclusive concierge offices at our Toronto, Montreal and Vancouver airports
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="feature feature-icon-large">
                                <div className="pull-left">
                                    <i className="icon icon-strategy"></i>
                                </div>
                                <div className="pull-right">
                                    <h5>Exclusive Lounge Access</h5>
                                    <p>
                                        Located at Toronto Pearson International Airport and Vancouver International Airport, our two luxury suites feature complimentary à la carte dining with dishes created by Air Canada’s award-winning chef
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="feature feature-icon-large">
                                <div className="pull-left">
                                    <i className="icon icon-profile-male"></i>
                                </div>
                                <div className="pull-right">
                                    <h5>Air Canada Chauffeur Service</h5>
                                    <p>
                                        Air Canada Chauffeur Service, our one-of-a-kind airport premium experience in Canada, is being reintroduced to eligible customers in partnership with one of the world’s most iconic luxury car brands, Porsche.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <h2 style={{ textAlign: 'center', marginTop: '70px' }}>Our Team</h2>
            <div className="row_w4">
                <div className="column_w3">
                    <div className="card_w3">
                        <div className="container_w3">
                            <h2>Sai Reddy</h2>
                            <p className="title">Frontend Developer</p>
                            <p>Primarily Contributes to Frontend Developement</p>
                            <p>saireddybandi086@gmail.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column_w3">
                    <div className="card_w3">
                        <div className="container_w3">
                            <h2>Deep kaur</h2>
                            <p className="title">Backend Developer</p>
                            <p>Primarily Contributes to Backend Developement</p>
                            <p>mndeepkaur2007@gmail.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column_w3">
                    <div className="card_w3">
                        <div className="container_w3">
                            <h2>Sapna Sandhu</h2>
                            <p className="title">Database Developer</p>
                            <p>Primarily Contributes to Database Development</p>
                            <p>sapnasandhu15@gmail.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </React.Fragment>)
    }

}

export default AboutUs