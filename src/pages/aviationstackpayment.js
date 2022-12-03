import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { logoimagemapping } from '../core/enums'
import { ReplaceWhiteSpaces } from '../core/utilities'
import { Card, Modal, Button } from 'antd'
import moment from "moment";
import { toast } from "react-toastify";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../images/Logo.png'

const AviationPayment = () => {
    const [flightDetails, updateflightDetails] = useState(localStorage.getItem('bookingdetails') ? JSON.parse(localStorage.getItem('bookingdetails')).FlightDetails : null)
    const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)
    const [bookingdetails, updatebookingdetails] = useState(localStorage.getItem('aviationstackbookingdetails') ? JSON.parse(localStorage.getItem('aviationstackbookingdetails')) : null)
    const [orderID, setOrderID] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentDetails, updatePaymentDetails] = useState(null)
    const [popOpen, updatePopupOpen] = useState(false)
    const [pdfpopOpen, updatepdfpopOpen] = useState(false)

    console.log(flightDetails, 'flightDetails')
    console.log(bookingdetails, 'bookingdetails')
    console.log(paymentDetails, 'paymentDetails')
    console.log(userdetails, 'userdetails')

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: '-70px',
            padding: 10,
            fontSize: 30,
        },
        sectiontwo: {
            padding: 10,
            fontSize: 20,
            justifyContent: 'center',
            flexDirection: 'row'
        },
        image: {
            height: 200,
            marginHorizontal: 250
        },
        receipttitle: {
            marginVertical: -80,
            fontSize: 25,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        label: {
            fontSize: 13,
            textAlign: 'left',
            paddingLeft: 100
        },
        labelvalue: {
            fontSize: 13,
            textAlign: 'right',
            paddingRight: 100
        }
    });



    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: `${flightDetails.FlightName} - ${bookingdetails ? bookingdetails.rateType ? bookingdetails.rateType : '' : ''} - (${bookingdetails.seats.length} Tickets)`,
                        amount: {
                            currency_code: "USD",
                            value: parseFloat(bookingdetails.bookedPrice),
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
            updatePaymentDetails(details);
            updatePopupOpen(true)
        });
    };

    return (<div>
        <h1 className="text-center">Payment via PayPal</h1>
        <h1 className="text-center my-3">Flight Booking - {bookingdetails ? bookingdetails.rateType ? bookingdetails.rateType : '' : ''}</h1>
        {flightDetails && <div className="wrapper">
            <Card title={<div>{flightDetails.airline.name}</div>} bordered={false} extra={<div><h4>$ {bookingdetails.bookedPrice} {`(${bookingdetails.seats.length} Tickets Booked)`}</h4></div>} className="flightDetails">
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
                </div>
            </Card>
        </div>}
        <div className="w-50 mx-auto my-4">
            <PayPalScriptProvider options={{ "client-id": 'AdENYRf9xiTEDa_54aj8nSN5OhO4xJ9m3USk6hYM3CItA6_C8SstNUuk92BwgptMx1Lw7Cwx7UEyrVLN', debug: true }}>
                <PayPalButtons style={{ layout: "horizontal" }} createOrder={createOrder} onApprove={onApprove} />
            </PayPalScriptProvider>
        </div>
        <Modal title="Payment Details Received (PayPal)" open={popOpen} okText="Generate Receipt" onOk={() => {
            updatePopupOpen(!popOpen);
            toast.success('Tickets Booked Successfully !!!');
            setTimeout(() => { updatepdfpopOpen(true) }, 1000)
        }} onCancel={() => updatePopupOpen(!popOpen)}>
            <div className="paymentdetails">
                <dl>
                    <div className="payment">
                        <dt>ORDER ID</dt>
                        <dd>{paymentDetails ? paymentDetails.id : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>STATUS</dt>
                        <dd>{paymentDetails ? paymentDetails.status : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYMENT CURRENCY</dt>
                        <dd>{paymentDetails ? paymentDetails.purchase_units.length > 0 ? paymentDetails.purchase_units[0].amount.currency_code : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYMENT VALUE</dt>
                        <dd>$ {paymentDetails ? paymentDetails.purchase_units.length > 0 ? paymentDetails.purchase_units[0].amount.value : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYER GIVER NAME</dt>
                        <dd>{paymentDetails ? paymentDetails.payer ? paymentDetails.payer.name.given_name : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYER LAST NAME</dt>
                        <dd>{paymentDetails ? paymentDetails.payer ? paymentDetails.payer.name.surname : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYER EMAIL</dt>
                        <dd>{paymentDetails ? paymentDetails.payer ? paymentDetails.payer.email_address : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYER ID</dt>
                        <dd>{paymentDetails ? paymentDetails.payer ? paymentDetails.payer.payer_id : '' : ''}</dd>
                    </div>
                    <div className="payment">
                        <dt>PAYER COUNTRY</dt>
                        <dd>{paymentDetails ? paymentDetails.address ? paymentDetails.payer.country_code : '' : ''}</dd>
                    </div>

                </dl>
            </div>
        </Modal>
        <Modal title="Tickets Receipt" width={1200} height={900} open={pdfpopOpen} okText="Close" onOk={() => {
            updatepdfpopOpen(false);
            setTimeout(() => { window.location.href = '/managebookings' }, 2000)
        }}
            onCancel={() => updatepdfpopOpen(false)}>
            <PDFViewer height={600} width={'100%'}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Image
                                style={styles.image}
                                src={Logo}
                            />
                            <Text style={styles.receipttitle}>Receipt</Text>
                            <View style={{ flexDirection: 'row', marginTop: 100, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>First Name</Text>
                                <Text style={{ ...styles.labelvalue }}>{userdetails.FirstName ? userdetails.FirstName : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Last Name</Text>
                                <Text style={{ ...styles.labelvalue }}>{userdetails.LastName ? userdetails.LastName : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Email</Text>
                                <Text style={{ ...styles.labelvalue }}>{userdetails.Email ? userdetails.Email : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Phone</Text>
                                <Text style={{ ...styles.labelvalue }}>{userdetails.Phone ? userdetails.Phone : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Flight Name</Text>
                                <Text style={{ ...styles.labelvalue }}>{flightDetails.FlightName ? flightDetails.FlightName : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Origin</Text>
                                <Text style={{ ...styles.labelvalue }}>{flightDetails.Origin ? flightDetails.Origin : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Destination</Text>
                                <Text style={{ ...styles.labelvalue }}>{flightDetails.Destination ? flightDetails.Destination : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Total Duration</Text>
                                <Text style={{ ...styles.labelvalue }}>{flightDetails.TotalDuration ? flightDetails.TotalDuration : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Seat Class</Text>
                                <Text style={{ ...styles.labelvalue }}>{bookingdetails.rateType ? bookingdetails.rateType : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Seats Booked</Text>
                                <Text style={{ ...styles.labelvalue }}>{bookingdetails.seats.length ? bookingdetails.seats.length : '0'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Total Charges</Text>
                                <Text style={{ ...styles.labelvalue }}>$ {bookingdetails.bookedPrice ? bookingdetails.bookedPrice : '0'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Payment Mode<small>(inc tax)</small></Text>
                                <Text style={{ ...styles.labelvalue }}>PAYPAL</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label }}>Payment ID<small>(inc tax)</small></Text>
                                <Text style={{ ...styles.labelvalue }}>{paymentDetails ? paymentDetails.id ? paymentDetails.id : '' : ''}</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Modal>
    </div>)
}

export default AviationPayment