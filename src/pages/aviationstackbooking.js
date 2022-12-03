import React, { useState, useEffect } from "react";
import { Card, Collapse } from 'antd'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import moment from "moment";
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces } from '../core/utilities'

const { Panel } = Collapse;
const Seats = [[{ Seat: '1A', Booked: false }, { Seat: '1B', Booked: false }, { Seat: '1C', Booked: false }, { Seat: '1D', Booked: false }, { Seat: '1E', Booked: false }, { Seat: '1F', Booked: false }],
[{ Seat: '2A', Booked: false }, { Seat: '2B', Booked: false }, { Seat: '2C', Booked: false }, { Seat: '2D', Booked: false }, { Seat: '2E', Booked: false }, { Seat: '2F', Booked: false }],
[{ Seat: '3A', Booked: false }, { Seat: '3B', Booked: false }, { Seat: '3C', Booked: false }, { Seat: '3D', Booked: false }, { Seat: '3E', Booked: false }, { Seat: '3F', Booked: false }],
[{ Seat: '4A', Booked: false }, { Seat: '4B', Booked: false }, { Seat: '4C', Booked: false }, { Seat: '4D', Booked: false }, { Seat: '4E', Booked: false }, { Seat: '4F', Booked: false }],
[{ Seat: '5A', Booked: false }, { Seat: '5B', Booked: false }, { Seat: '5C', Booked: false }, { Seat: '5D', Booked: false }, { Seat: '5E', Booked: false }, { Seat: '5F', Booked: false }],
[{ Seat: '6A', Booked: false }, { Seat: '6B', Booked: false }, { Seat: '6C', Booked: false }, { Seat: '6D', Booked: false }, { Seat: '6E', Booked: false }, { Seat: '6F', Booked: false }],
[{ Seat: '7A', Booked: false }, { Seat: '7B', Booked: false }, { Seat: '7C', Booked: false }, { Seat: '7D', Booked: false }, { Seat: '7E', Booked: false }, { Seat: '7F', Booked: false }],
[{ Seat: '8A', Booked: false }, { Seat: '8B', Booked: false }, { Seat: '8C', Booked: false }, { Seat: '8D', Booked: false }, { Seat: '8E', Booked: false }, { Seat: '8F', Booked: false }],
[{ Seat: '9A', Booked: false }, { Seat: '9B', Booked: false }, { Seat: '9C', Booked: false }, { Seat: '9D', Booked: false }, { Seat: '9E', Booked: false }, { Seat: '9F', Booked: false }],
[{ Seat: '10A', Booked: false }, { Seat: '10B', Booked: false }, { Seat: '10C', Booked: false }, { Seat: '10D', Booked: false }, { Seat: '10E', Booked: false }, { Seat: '10F', Booked: false }
]]

const AviationStackFlightBooking = (props) => {
    const locationDetails = useParams();
    const [flightDetails, updateflightDetails] = useState(localStorage.getItem('aviationstackdetails') ? JSON.parse(localStorage.getItem('aviationstackdetails')) : null)
    const [seatType, updateseatType] = useState(null)
    const [flightSeats, updateflightSeats] = useState([])
    const [BookedSeats, updateBookedSeats] = useState([])
    const [TicketPrice, updateTicketPrice] = useState([])
    const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)
    const [flightid, updateflightid] = useState('')

    useEffect(() => {
        updateflightSeats(Seats)
        updateTicketPrice('1000')
        updateseatType(locationDetails.seattype)
        updateflightid(locationDetails.flightId)
    }, [locationDetails.flightId])

    const updateRowSeats = (rowseat) => {
        const Seats = new Set([...BookedSeats])
        if (Seats.has(rowseat)) {
            Seats.delete(rowseat)
        } else {
            Seats.add(rowseat)
        }
        const finalSeats = [...Seats]
        updateBookedSeats(finalSeats)
        updateTicketPrice(parseInt(parseFloat(1000) * finalSeats.length))
    }

    const BookTickets = async () => {
        if (BookedSeats.length > 0) {
            const BookingDetails = {
                customerId: userdetails._id,
                flightId: flightid,
                seats: BookedSeats,
                rateType: seatType,
                bookedPrice: TicketPrice
            }
            BookingDetails.FlightDetails = flightDetails
            localStorage.setItem("aviationstackbookingdetails", JSON.stringify(BookingDetails))
            setTimeout(() => { window.location.href = '/payment' }, 4000)
        } else {
            toast.error('Please select a seat to book ticket !')
        }
    }


    return (<div className="pagewrappper">
        <h1 className="text-center my-3">Aviation Stack Flight Booking - {seatType}</h1>
        {flightDetails && <div className="wrapper">
            <Card title={<div>{flightDetails.airline.name}</div>} bordered={false} extra={<div><h4>$ {TicketPrice} {`(${BookedSeats.length} Tickets Booked)`}</h4></div>} className="flightDetails">
                <div className="flightdetailswrapper">
                    <div className="flightdetailsmetrics">
                        <label><b>Origin Airport</b></label>
                        <span>{flightDetails.departure.airport}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Destination Airport</b></label>
                        <span>{flightDetails.arrival.airport}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Departure Date & Time</b></label>
                        <span>{moment(flightDetails.departure.estimated).format('DD-MM-YYYY hh:mm')}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Arrival Date & Time</b></label>
                        <span>{moment(flightDetails.arrival.estimated).format('DD-MM-YYYY hh:mm')}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Origin Terminal </b></label>
                        <span>{flightDetails.arrival.terminal || ''}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Destination Terminal</b></label>
                        <span>{flightDetails.departure.terminal || 'Not Available'}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Destination TimeZone</b></label>
                        <span>{flightDetails.arrival.timezone || 'Not Available'}</span>
                    </div>
                    <div className="flightdetailsmetrics">
                        <label><b>Origin TimeZone</b></label>
                        <span>{flightDetails.departure.timezone || 'Not Available'}</span>
                    </div>
                    <button className="BookTickets" onClick={BookTickets}>Book Ticket</button>
                </div>
            </Card>
        </div>}
        {flightDetails && <React.Fragment>
            <div className="plane">
                <div className="cockpit">
                    <h1>Cockpit</h1>
                </div>
                <div className="exit exit--front fuselage">

                </div>
                <ol className="cabin fuselage">
                    {flightSeats.map((rows, index) => {
                        return (<li className="row row--1" key={`rowkey_${index}`}>
                            <ol className="seats" type="A">
                                {rows.map((rowdetails) => {
                                    return (<li className="seat" key={`seatkey_${rowdetails.Seat}`}>
                                        <input type="checkbox" checked={BookedSeats.includes(rowdetails.Seat) ? true : false} disabled={rowdetails.Booked} id={rowdetails.Seat} />
                                        <label for={rowdetails.Seat} onClick={() => { updateRowSeats(rowdetails.Seat) }}>{rowdetails.Seat}</label>
                                    </li>)
                                })}
                            </ol>
                        </li>)
                    })}
                </ol>
                <div className="exit exit--back fuselage">

                </div>
            </div>
        </React.Fragment>}
    </div>)
}

export default AviationStackFlightBooking