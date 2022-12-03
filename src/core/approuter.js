import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navbar'
import AboutUs from '../pages/aboutus'
import ContactUs from '../pages/contactus'
import Login from '../pages/login'
import Footer from '../components/footer'
import SignUp from '../pages/signup'
import CustomerDashboard from '../pages/customerdashboard'
import FlightList from '../pages/flightslist'
import FlightDetails from '../pages/flightdetails'
import HomePage from '../pages/homepage'
import FlightBooking from '../pages/flightbooking'
import ManageBooking from '../pages/managebookings'
import FlightPrediction from '../pages/flightprediction'
import AdminSignUp from '../pages/adminsignup'
import AdminLogin from '../pages/adminlogin'
import AdminDashboard from '../pages/admindashboard'
import CreateFlighTransaction from '../pages/createflighttransaction'
import Payment from '../pages/payment'
import ExternalFlightList from '../pages/aviationstacklist'
import EditBooking from '../pages/editbooking'
import AviationStackFlightBooking from '../pages/aviationstackbooking'
import AviationPayment from '../pages/aviationstackpayment'

export default function AppRouter() {


    return (
        <div>
            <NavBar />
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/customerdashboard" element={<CustomerDashboard />} />
                        <Route path="/flights" element={<FlightList />} />
                        <Route path="/flightdetails/:flightId" element={<FlightDetails />} />
                        <Route path="/flightbooking/:flightId/:seattype" element={<FlightBooking />} />
                        <Route path="/managebookings" element={<ManageBooking />} />
                        <Route path="/flightprediction" element={<FlightPrediction />} />
                        <Route path="/adminsignin" element={<AdminLogin />} />
                        <Route path="/adminsignup" element={<AdminSignUp />} />
                        <Route path="/admindashboard" element={<AdminDashboard />} />
                        <Route path="/createflight" element={<CreateFlighTransaction />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/externalflights" element={<ExternalFlightList />} />
                        <Route path="/editseats/:bookingid/:flightid/:seattype" element={<EditBooking />} />
                        <Route path="/aviationstackflightbooking/:flightId/:seattype" element={<AviationStackFlightBooking />} />
                        <Route path="/aviationstackpayment" element={<AviationPayment />} />
                    </Routes>
                </Suspense>
            </Router>
            <Footer />
        </div>
    )
}