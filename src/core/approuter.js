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
                    </Routes>
                </Suspense>
            </Router>
            <Footer />
        </div>
    )
}