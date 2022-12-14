import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces } from '../core/utilities'
import moment from "moment";
import nexrarrow from '../images/nextarow.png'

const ManageBooking = () => {
    const [bookings, updateBookings] = useState([])
    const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)
    useEffect(() => {
        fetchflightDetailsandbookings()
    }, [])

    const fetchflightDetailsandbookings = async () => {
        const requests = []
        const flighPromises = await axios.post('https://airfareapi.herokuapp.com/transactions/flights', null)
        const bookingPromises = await axios.post('https://airfareapi.herokuapp.com/booking/getBookingsBasedOnFilter', { customerId: userdetails ? userdetails._id : '' })
        requests.push(flighPromises)
        requests.push(bookingPromises)
        Promise.all(requests).then((response) => {
            if (response.length >= 2) {
                const flightResponse = response[0]
                const bookingResponse = response[1]
                if (flightResponse.status === 200 && bookingResponse.status === 200) {
                    const flightList = flightResponse.data
                    const bookingList = bookingResponse.data
                    const finalBookingList = bookingList.map((bookingDetails) => {
                        return {
                            ...bookingDetails,
                            flightDetails: flightList.find((flightDetails) => flightDetails._id === bookingDetails.flightId)
                        }
                    })
                    updateBookings(finalBookingList)
                }
            } else {
                toast.error('something went wrong ! Please try again later !')
            }

        })
    }

    const CancelBooking = async (bookingId) => {
        await axios.delete(`https://airfareapi.herokuapp.com/booking/remove/${bookingId}`, null).then((response) => {
            if (response.status === 200) {
                toast.success('Booking Deleted Successfully !!!!')
                setTimeout(() => fetchflightDetailsandbookings(), 4000)
            }
        })
    }

    const EditSeats = async (bookingid, flightid, rateType) => {
        window.location.href = `/editseats/${bookingid}/${flightid}/${rateType}`
    }


    return (<div>
        <h1 className="text-center my-3">Manage Bookings</h1>
        <h2 className="text-center my-3">Internal Flights</h2>
        <div className="listwrapper">
            {bookings.map((bookingDetails) => {
                return (<div className="details" key={bookingDetails._id}>
                    <div className="flight">
                        <img src={logoimagemapping[ReplaceWhiteSpaces(bookingDetails.flightDetails.FlightName)]} className="flightlogo" alt={`flight logo ${ReplaceWhiteSpaces(bookingDetails.flightDetails.FlightName)}`} />
                        <h3>{bookingDetails.flightDetails.FlightName}</h3>
                    </div>
                    <div className="origin">
                        <h3>{bookingDetails.flightDetails.Origin}</h3>
                        <span>{`(${moment(bookingDetails.flightDetails.departureDateTime).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="airtime">
                        <span> <img src={nexrarrow} alt="next arrow" /></span>
                    </div>
                    <div className="destination">
                        <h4>{bookingDetails.flightDetails.Destination}</h4>
                        <span>{`(${moment(bookingDetails.flightDetails.arrivalDateTime).format('DD-MM-YYYY hh:mm')})`}</span>
                    </div>
                    <div className="airtime">
                        <h4>{bookingDetails.seats.join(',')}</h4>
                        <span>{bookingDetails.seats.length > 0 ? `(${bookingDetails.seats.length} seats)` : 'No Seats'}</span>
                        <span>{bookingDetails.rateType}</span>
                    </div>
                    <div className="price">
                        <h4>$ {bookingDetails.bookedPrice}</h4>
                    </div>
                    <div className="action">
                        <button className="CancelBooking" onClick={() => EditSeats(bookingDetails._id, bookingDetails.flightId, bookingDetails.rateType)}>Edit Seats</button>
                        <button className="CancelBooking" onClick={() => CancelBooking(bookingDetails._id)}>Cancel Booking</button>
                    </div>
                </div>)
            })}
        </div>
    </div>)
}

export default ManageBooking