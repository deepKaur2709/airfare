import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces, RemoveDuplicatesValues } from '../core/utilities'
import moment from "moment";
import nexrarrow from '../images/nextarow.png'

const { Option } = Select;
const ExternalFlightList = (props) => {
    const [completetransactions, updatecompletetransactions] = useState([])
    const [transactions, updatetransactions] = useState([])
    const [flightName, updateFlightName] = useState('')
    const [originAipportName, updateOriginAirportName] = useState('')
    const [destAipportName, updateDestAirportName] = useState('')
    const [departureDate, updateDepartureDate] = useState('')
    const [flightNames, updateflightNames] = useState([])
    const [originAirports, updateoriginAirports] = useState([])
    const [destAirports, updatedestAirports] = useState([])
    const [loading, updateloading] = useState(false)
    const aviationstackapikey = '6a84f290ce9462f44c775cf636916231'

    useEffect(() => { fetchflightTransaction() }, [1])
    const fetchflightTransaction = async () => {
        updateloading(true)
        await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${aviationstackapikey}`).then((response) => {
            if (response.status === 200) {
                if (response.data.data.length > 0) {
                    const flightTransactions = [...response.data.data]
                    updatetransactions(flightTransactions)
                    updatecompletetransactions(flightTransactions)
                    updateflightNames(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.airline.iata)).map((iata) => flightTransactions.find((transaction) => transaction.airline.iata === iata).airline))
                    updateoriginAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.departure.iata)).map((iata) => flightTransactions.find((transaction) => transaction.departure.iata === iata).departure))
                    updatedestAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.arrival.iata)).map((iata) => flightTransactions.find((transaction) => transaction.arrival.iata === iata).arrival))
                    updateloading(false)
                }
            }
        }).catch(() => {
            updateloading(false);
        })

    }

    const SearchFlights = async () => {
        let apiquery = ''
        if (flightName) {
            apiquery = apiquery + `&airline_iata=${flightName}`
        }
        if (originAipportName) {
            apiquery = apiquery + `&dep_iata=${originAipportName}`
        }

        if (destAipportName) {
            apiquery = apiquery + `&arr_iata=${destAipportName}`
        }

        if (departureDate) {
            apiquery = apiquery + `&flight_date=${moment(departureDate).format('YYYY-MM-DD')}`
        }
        updateloading(true)
        await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${aviationstackapikey}` + apiquery).then((response) => {
            if (response.status === 200) {
                if (response.data.data.length > 0) {
                    const flightTransactions = [...response.data.data]
                    updateloading(false)
                    updatetransactions(flightTransactions)
                    updatecompletetransactions(flightTransactions)
                    updateflightNames(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.airline.iata)).map((iata) => flightTransactions.find((transaction) => transaction.airline.iata === iata).airline))
                    updateoriginAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.departure.iata)).map((iata) => flightTransactions.find((transaction) => transaction.departure.iata === iata).departure))
                    updatedestAirports(RemoveDuplicatesValues(flightTransactions.map((transaction) => transaction.arrival.iata)).map((iata) => flightTransactions.find((transaction) => transaction.arrival.iata === iata).arrival))
                }
            }
        }).catch(() => {
            updateloading(false);
        })

    }

    return (<div className="pagewrappper">
        <h2 className="text-center my-3">Aviation Stack Flight Lists</h2>
        <div className="filterwrapper">
            <div className="filterfield">
                <label className="mb-1"><b>Flight Name</b></label>
                <Select value={flightName} onChange={(flightname) => updateFlightName(flightname)}>
                    <Option value="">All Flights</Option>
                    {flightNames.map((flight) => {
                        return <Option key={flight.iata} value={flight.iata}>{flight.name} - {flight.iata}</Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1"><b>Origin Location</b></label>
                <Select value={originAipportName} onChange={(originaipport) => updateOriginAirportName(originaipport)}>
                    <Option value="">All Locations</Option>
                    {originAirports.map((airport) => {
                        return <Option key={airport.iata} value={airport.iata}>{airport.airport} - {airport.iata}</Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1"><b>Destination Location</b></label>
                <Select value={destAipportName} onChange={(destinationairport) => updateDestAirportName(destinationairport)}>
                    <Option value="">All Locations</Option>
                    {destAirports.map((airportdetails) => {
                        console.log(airportdetails, 'airportdetails')
                        return <Option key={airportdetails.iata} value={airportdetails.iata}>{airportdetails.airport} - {airportdetails.iata} </Option>
                    })}
                </Select>
            </div>
            <div className="filterfield">
                <label className="mb-1"><b>Departure Date</b></label>
                <DatePicker value={departureDate} onChange={(departureDate) => updateDepartureDate(departureDate)} />
            </div>
            <div className="w-100 d-flex justify-content-center my-3">
                <Button type="primary" loading={loading} className="w-25" onClick={SearchFlights}>Search</Button>
            </div>
        </div>
        <div className="listwrapper">
            {transactions.map((flighttransaction, index) => {
                return (<div className="details" key={`flighttransaction_${index + 1}`}>
                    <div className="flight">
                        <h4 className="externalflightname">{flighttransaction.airline.name}</h4>
                    </div>
                    <div className="origin">
                        <h4>{flighttransaction.departure.airport}</h4>
                        <span>{`(${moment(flighttransaction.departure.scheduled).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="airtime">
                        <span> <img src={nexrarrow} alt="next arrow" /></span>
                    </div>
                    <div className="destination">
                        <h4>{flighttransaction.arrival.airport}</h4>
                        <span>{`(${moment(flighttransaction.arrival.scheduled).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="price">
                        <h4>$ 1000</h4>
                    </div>
                    <div className="action">
                        <Link to={{
                            pathname: `/flightdetails/${index + 1}`,
                            state: { details: flighttransaction }
                        }}>View Details</Link>
                    </div>
                </div>)
            })}
        </div>
    </div>)
}

export default ExternalFlightList