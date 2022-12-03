import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces, RemoveDuplicatesValues } from '../core/utilities'
import moment from "moment";

const { Option } = Select;
const FlightList = (props) => {
    const [completetransactions, updatecompletetransactions] = useState([])
    const [transactions, updatetransactions] = useState([])
    const [flightName, updateFlightName] = useState('')
    const [originAipportName, updateOriginAirportName] = useState('')
    const [destAipportName, updateDestAirportName] = useState('')
    const [departureDate, updateDepartureDate] = useState('')
    const [priceRange, updatePriceRange] = useState('')
    const [airplaneType, updateAirplaneType] = useState('')
    const [flightNames, updateflightNames] = useState([])
    const [originAirports, updateoriginAirports] = useState([])
    const [destAirports, updatedestAirports] = useState([])
    const [airplaneTypes, updateairplaneTypes] = useState([])

    useEffect(() => { fetchflightTransaction() }, [1])

    const fetchflightTransaction = async () => {
        await axios.post('http://localhost:2000/transactions/flights', { filtercriteria: null }).then((response) => {
            if (response.status === 200) {
                if (response.data.length > 0) {
                    const flightTransactions = [...response.data]
                    updatetransactions(flightTransactions)
                    updatecompletetransactions(flightTransactions)
                    updateflightNames(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.FlightName)))
                    updateoriginAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.Origin)))
                    updatedestAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.Destination)))
                    updateairplaneTypes(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.flightmanufacturer)))
                }
            }
        })
    }

    const SearchFlights = () => {
        let completeDetails = [...completetransactions]
        if (flightName) {
            completeDetails = completeDetails.filter((transaction) => transaction.FlightName === flightName)
        }
        if (originAipportName) {
            completeDetails = completeDetails.filter((transaction) => transaction.Origin === originAipportName)
        }

        if (destAipportName) {
            completeDetails = completeDetails.filter((transaction) => transaction.Destination === destAipportName)
        }

        if (departureDate) {
            completeDetails = completeDetails.filter((transaction) => moment(transaction.Destination).format("YYYY-MM-DD") === departureDate)
        }

        if (priceRange) {
            let minprice = 0
            let maxprice = 0
            switch (priceRange) {
                case "1":
                    minprice = 500
                    maxprice = 1000
                    break;
                case "2":
                    minprice = 1000
                    maxprice = 1500
                    break;
                case "3":
                    minprice = 1500
                    maxprice = 2000
                    break;
                case "4":
                    minprice = 2000
                    maxprice = 2500
                    break;
                case "5":
                    minprice = 2500
                    maxprice = 3000
                    break;
                default:
                    minprice = 0
                    maxprice = 0
            }
            if (minprice > 0 && maxprice > 0) {
                completeDetails = completeDetails.filter((transaction) => parseInt(transaction.economyPrice) > minprice && parseInt(transaction.economyPrice) < maxprice)
            }

        }

        if (airplaneType) {
            completeDetails = completeDetails.filter((transaction) => transaction.flightmanufacturer === airplaneType)
        }

        updatetransactions(completeDetails)

    }

    return (<div className="pagewrappper">
        <h1 className="text-center my-3">Airfare Flight Lists</h1>
        <h2 className="text-center my-3">Internal Flights</h2>
        <div className="filterwrapper">
            <div className="filterfield">
                <label className="mb-1" for="flightname"><b>Flight Name</b></label>
                <Select value={flightName} id="flightname" title="Flight Name" onChange={(flightname) => updateFlightName(flightname)}>
                    <Option value="">All Flights</Option>
                    {flightNames.map((flightname) => {
                        return <Option key={flightname} value={flightname}>{flightname}</Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1" for="originlocation" ><b>Origin Location</b></label>
                <Select value={originAipportName} id="originlocation" onChange={(originaipport) => updateOriginAirportName(originaipport)}>
                    <Option value="">All Locations</Option>
                    {originAirports.map((airport) => {
                        return <Option key={airport} value={airport}>{airport}</Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1" for="destinationlocation" ><b>Destination Location</b></label>
                <Select value={destAipportName} id="destinationlocation" onChange={(destinationairport) => updateDestAirportName(destinationairport)}>
                    <Option value="">All Locations</Option>
                    {destAirports.map((airport) => {
                        return <Option key={airport} value={airport}>{airport}</Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1" for="departuredate"><b>Departure Date</b></label>
                <DatePicker value={departureDate} id="departuredate" onChange={(departureDate) => updateDepartureDate(departureDate)} />
            </div>
            <div className="filterfield">
                <label className="mb-1" for="pricerange" ><b>Price Range</b></label>
                <Select value={priceRange} id="pricerange" onChange={(priceRange) => updatePriceRange(priceRange)}>
                    <Option value="">All Price Ranges</Option>
                    <Option value="1">$500 - $1000</Option>
                    <Option value="2">$1000 - $1500</Option>
                    <Option value="3">$1500 - $2000</Option>
                    <Option value="4">$2000 - $2500</Option>
                    <Option value="5">$2500 - $3000</Option>
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1" for="airplanetype"><b>Airplane Type</b></label>
                <Select value={airplaneType} id="airplanetype" onChange={(airplaneType) => updateAirplaneType(airplaneType)}>
                    <Option value="">All Types</Option>
                    {airplaneTypes.map((airplaneType) => {
                        return <Option key={airplaneType} value={airplaneType}>{airplaneType}</Option>
                    })}
                </Select>
            </div>
            <div className="w-100 d-flex justify-content-center my-3">
                <Button type="primary" className="w-25 text-dark" onClick={SearchFlights}>Search</Button>
            </div>
        </div>
        <div className="listwrapper">
            {transactions.map((flighttransaction) => {
                return (<div className="details" key={flighttransaction._id}>
                    <div className="flight">
                        <img src={logoimagemapping[ReplaceWhiteSpaces(flighttransaction.FlightName)]} className="flightlogo" alt={`flight logo ${ReplaceWhiteSpaces(flighttransaction.FlightName)}`} />
                        <h3>{flighttransaction.FlightName}</h3>
                    </div>
                    <div className="origin">
                        <h3>{flighttransaction.Origin}</h3>
                        <span>{`(${moment(flighttransaction.departureDateTime).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="airtime">
                        <h4>{flighttransaction.TotalDuration}</h4>
                        <span>{flighttransaction.stops.length > 0 ? `(${flighttransaction.stops.length} stop)` : 'No Stops'}</span>
                    </div>
                    <div className="destination">
                        <h4>{flighttransaction.Destination}</h4>
                        <span>{`(${moment(flighttransaction.arrivalDateTime).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="price">
                        <h4>$ {flighttransaction.economyPrice}</h4>
                    </div>
                    <div className="action">
                        <Link className="CancelBookingLink" to={{
                            pathname: `/flightdetails/${flighttransaction._id}`,
                            state: { details: flighttransaction }
                        }}>View Details</Link>
                    </div>
                </div>)
            })}
        </div>
    </div>)
}

export default FlightList