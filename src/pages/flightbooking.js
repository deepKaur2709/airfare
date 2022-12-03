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

const FlightBooking = (props) => {
    const locationDetails = useParams();
    const [flightDetails, updateflightDetails] = useState(null)
    const [seatType, updateseatType] = useState(null)
    const [flightSeats, updateflightSeats] = useState([])
    const [BookedSeats, updateBookedSeats] = useState([])
    const [TicketPrice, updateTicketPrice] = useState([])
    const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)

    useEffect(() => {
        getflightDetails(locationDetails.flightId, locationDetails.seattype)
        updateflightSeats(Seats)
    }, [locationDetails.flightId])

    const getflightDetails = (flightId, seatType) => {
        axios.get(`https://airfareapi.herokuapp.com/transactions/details/${flightId}`).then((response) => {
            const flightDetails = response.data
            flightDetails.Price = response.data.rates.find((ratedetails) => ReplaceWhiteSpaces(ratedetails.RateType) === seatType).Rate
            updateflightDetails(flightDetails)
            updateseatType(seatType)
            updateTicketPrice(flightDetails.Price)
        })
    }

    const updateRowSeats = (rowseat) => {
        const Seats = new Set([...BookedSeats])
        if (Seats.has(rowseat)) {
            Seats.delete(rowseat)
        } else {
            Seats.add(rowseat)
        }
        const finalSeats = [...Seats]
        updateBookedSeats(finalSeats)
        updateTicketPrice(parseInt(parseFloat(flightDetails.Price) * finalSeats.length))
    }

    const BookTickets = async () => {
        if (BookedSeats.length > 0) {
            const BookingDetails = {
                customerId: userdetails._id,
                flightId: flightDetails._id,
                seats: BookedSeats,
                rateType: seatType,
                bookedPrice: TicketPrice
            }
            await axios.post('https://airfareapi.herokuapp.com/booking/create', BookingDetails).then((response) => {
                if (response.status === 200) {
                    BookingDetails.FlightDetails = flightDetails
                    localStorage.setItem("bookingdetails", JSON.stringify(BookingDetails))
                    setTimeout(() => { window.location.href = '/payment' }, 4000)
                } else {
                    toast.error('Tickets Booking Failed. Please Try Again Later !')
                }
            })
        } else {
            toast.error('Please select a seat to book ticket !')
        }
    }


    return (<div className="pagewrappper">
        <h1 className="text-center my-3">Flight Booking - {seatType}</h1>
        {flightDetails && <div className="wrapper">
            <Card title={<div><img src={logoimagemapping[ReplaceWhiteSpaces(flightDetails.FlightName)]} className="flightLogo" alt="flightLogo" />&nbsp;&nbsp;{flightDetails.FlightName}</div>} bordered={false} extra={<div><h2>$ {TicketPrice} {`(${BookedSeats.length} Tickets Booked)`}</h2></div>} className="flightDetails">
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

export default FlightBooking