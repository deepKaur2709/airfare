import React, { useState, useEffect } from "react";
import { Card, Collapse } from 'antd'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import moment from "moment";
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces } from '../core/utilities'
import { Ticketclassdetails } from '../core/ticketclassdetails'

const { Panel } = Collapse;

const FlightDetails = () => {
    const locationDetails = useParams();
    const [flightDetails, updateflightDetails] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getflightDetails(locationDetails.flightId)
    }, [locationDetails.flightId])

    const getflightDetails = (flightId) => {
        axios.get(`http://localhost:2000/transactions/details/${flightId}`).then((response) => {
            updateflightDetails(response.data)
        })
    }

    const bookTickets = (RateType) => {
        if (localStorage.getItem('userdetails') !== 'null') {
            navigate(`/flightbooking/${flightDetails._id}/${RateType}`, { flightDetails })
        } else {
            toast.error('Please login to book tickets !')
        }
    }

    return (<div className="pagewrappper">
        <h1 className="text-center my-3">Flight Details</h1>
        {flightDetails && <div className="wrapper">
            <Card title={<div><img src={logoimagemapping[ReplaceWhiteSpaces(flightDetails.FlightName)]} className="flightLogo" alt="flightLogo" />&nbsp;&nbsp;{flightDetails.FlightName}</div>} bordered={false} extra={<div><h4>$ {flightDetails.economyPrice}</h4></div>} className="flightDetails">
                <div className="flightdetailswrapper">
                    <div className="flightdetailsmetrics">
                        <label><b>Total Duration</b></label>
                        <span>{flightDetails.TotalDuration}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Origin Airport</b></label>
                        <span>{flightDetails.Origin}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Destination Airport</b></label>
                        <span>{flightDetails.Destination}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Flight Type</b></label>
                        <span>{flightDetails.flightmanufacturer}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Departure Date & Time</b></label>
                        <span>{moment(flightDetails.departureDateTime).format('DD-MM-YYYY hh:mm')}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Arrival Date & Time</b></label>
                        <span>{moment(flightDetails.arrivalDateTime).format('DD-MM-YYYY hh:mm')}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Origin Terminal </b></label>
                        <span>{flightDetails.arrivalTerminal}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Destination Terminal</b></label>
                        <span>{flightDetails.destinationTerminal}</span>
                    </div>
                </div>
            </Card>
            {flightDetails.stops.length > 0 && <React.Fragment>
                <h4 className="stopstitle">Stops</h4>
                <Collapse accordion className="stopspanel">
                    {flightDetails.stops.map((stopDetails) => {
                        return (<Panel header={`Transit at ${stopDetails.airportname}`} key="1">
                            <div className="flightdetailswrapper">
                                <div className="flightdetailsmetrics">
                                    <label><b>Layover Time</b></label>
                                    <span>{stopDetails.duration}</span>
                                </div>
                                <div className="flightdetailsmetrics">
                                    <label><b>Arrival Date Time</b></label>
                                    <span>{moment(stopDetails.arrivalDateTime).format('DD-MM-YYYY hh:mm')}</span>
                                </div>
                                <div className="flightdetailsmetrics">
                                    <label><b>Departure Date Time</b></label>
                                    <span>{moment(stopDetails.departureDateTime).format('DD-MM-YYYY hh:mm')}</span>
                                </div>
                                <div className="flightdetailsmetrics">
                                    <label><b>Flight Type</b></label>
                                    <span>{flightDetails.flightmanufacturer}</span>
                                </div>
                                <div className="flightdetailsmetrics">
                                    <label><b>Arrival Terminal</b></label>
                                    <span>{stopDetails.arrivalTerminal}</span>
                                </div>
                            </div>
                        </Panel>)
                    })}
                </Collapse>
            </React.Fragment>}
            {flightDetails.rates.length > 0 && <React.Fragment>
                <h4 className="stopstitle">Rate Card</h4>
                <div className="d-flex justify-content-around mx-auto" style={{ width: '70%' }}>
                    {flightDetails.rates.map((rateDetails) => {
                        return (<div className="columns">
                            <ul className="ticketprice">
                                <li className="header">{rateDetails.RateType}</li>
                                <li className="grey">$ {rateDetails.Rate}</li>
                                {Ticketclassdetails[ReplaceWhiteSpaces(rateDetails.RateType)].map((featureDetails) => {
                                    return <li>{featureDetails.feature}</li>
                                })}
                                <li className="grey"><button onClick={() => bookTickets(ReplaceWhiteSpaces(rateDetails.RateType))} className="button">Book Ticket</button></li>
                            </ul>
                        </div>)
                    })}
                </div>
            </React.Fragment>}
        </div>}
    </div>)
}

export default FlightDetails