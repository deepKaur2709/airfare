import React, { useState } from "react";
import { Select, DatePicker, Input, Button, Table } from 'antd'
import airports from '../stub/airports.json'
import { toast } from "react-toastify";
import { DeleteTwoTone } from '@ant-design/icons';
import moment from "moment";
import axios from "axios";

const { Option } = Select
const airportsList = [...airports]
const AirplaneTypes = ['Boeing 777', 'Airbus A350-900']

const CreateFlighTransaction = () => {
    const [flightName, updateFlightName] = useState('')
    const [flightNames, updateflightNames] = useState([])
    const [originAirport, updateOriginAirport] = useState('')
    const [destAirport, updatedestAirport] = useState('')
    const [departureDate, updateDepartureDate] = useState('')
    const [airplaneType, updateAirplaneType] = useState('')
    const [arrivalDate, updatearrivalDate] = useState('')
    const [duration, updateduration] = useState('')
    const [arrivalTerminal, updatearrivalTerminal] = useState('')
    const [destinationTerminal, updatedestinationTerminal] = useState('')
    const [rateType, updaterateType] = useState('')
    const [price, updateprice] = useState('')
    const [flightPrices, updateflightPrices] = useState([])
    const [flightStop, updateflightStop] = useState('')
    const [transitDuration, updatetransitDuration] = useState('')
    const [departureTransitDate, updatedepartureTransitDate] = useState('')
    const [arrivalTransitDate, updatearrivalTransitDate] = useState('')
    const [transitairplaneType, updatetransitAirplaneType] = useState('')
    const [arrivalTrasitTerminal, updatearrivalTrasitTerminal] = useState('')
    const [destinatioTransitTerminal, updatedestinatioTransitTerminal] = useState('')
    const [transitStops, updatetransitStops] = useState([])
    const PricingColumns = [
        {
            title: 'Action',
            dataIndex: 'RateType',
            render: (value, record, index) => <DeleteTwoTone onClick={() => deletePrice(index)} />
        },
        {
            title: 'Rate Type',
            dataIndex: 'RateType'
        },
        {
            title: 'Rate Type',
            dataIndex: 'Rate',
            render: (rate) => `$ ${rate}`
        }
    ]

    const deletePrice = (index) => {
        const flightPriceList = [...flightPrices]
        flightPriceList.splice(index, 1)
        updateflightPrices(flightPriceList)
    }

    const AddFlightPrice = () => {
        if (flightPrices.length < 3) {
            if (rateType !== '' && price !== '') {
                const flightPriceList = [...flightPrices]
                if (flightPriceList.filter((rateObj) => rateObj.RateType === rateType).length <= 0) {
                    const rateDetails = {
                        RateType: rateType,
                        Rate: price
                    }
                    flightPriceList.push(rateDetails)
                    updateflightPrices(flightPriceList)
                    updaterateType('')
                    updateprice('')
                } else {
                    toast.error('Rate Type Already Added !!!')
                }
            } else {
                toast.error('Please enter rate type and price to proceed further !')
            }
        } else {
            toast.error('Maximum 3 Rate Types can be added !!')
        }
    }

    const TransitColumns = [
        {
            title: 'Action',
            dataIndex: 'RateType',
            render: (value, record, index) => <DeleteTwoTone color="red" onClick={() => deleteTransit(index)} />
        },
        {
            title: 'Airport Name',
            dataIndex: 'airportname'
        },
        {
            title: 'Transit Duration',
            dataIndex: 'duration'
        },
        {
            title: 'Arrival Date & Time',
            dataIndex: 'arrivalDateTime',
            render: (arrivalDateTime) => moment(arrivalDateTime).format('DD-MM-YYYY HH:mm')
        },
        {
            title: 'Departure Date & Time',
            dataIndex: 'departureDateTime',
            render: (departureDateTime) => moment(departureDateTime).format('DD-MM-YYYY HH:mm')
        },
        {
            title: 'Destination Terminal',
            dataIndex: 'destinationTerminal'
        },
        {
            title: 'Arrival Terminal',
            dataIndex: 'arrivalTerminal'
        },
        {
            title: 'Airplane Type',
            dataIndex: 'flightmanufacturer'
        }
    ]

    const deleteTransit = (index) => {
        const transitStopsList = [...transitStops]
        transitStopsList.splice(index, 1)
        updatetransitStops(transitStopsList)
    }


    const AddTransitStops = () => {
        if (transitStops.length < 10) {
            if (flightStop !== '' && transitDuration !== '' && arrivalTransitDate !== '' && departureTransitDate !== '' && arrivalTrasitTerminal !== '' && destinatioTransitTerminal !== '' && transitairplaneType !== '' && departureTransitDate !== '') {
                const transitStopsList = [...transitStops]
                const transitDetails = {
                    airportname: flightStop,
                    duration: transitDuration,
                    departureDateTime: moment(departureTransitDate).toISOString(),
                    arrivalDateTime: moment(arrivalTransitDate).toISOString(),
                    arrivalTerminal: arrivalTrasitTerminal,
                    destinationTerminal: destinatioTransitTerminal,
                    flightmanufacturer: transitairplaneType
                }
                transitStopsList.push(transitDetails)
                updatetransitStops(transitStopsList)
                updateflightStop('')
                updatetransitDuration('')
                updatearrivalTransitDate('')
                updatedepartureTransitDate('')
                updatearrivalTrasitTerminal('')
                updatedestinatioTransitTerminal('')
                updatetransitAirplaneType('')
            } else {
                toast.error('Please enter all details proceed further !!!')
            }
        } else {
            toast.error('Maximum 10 Stops Allowed !!')
        }
    }

    const AddFlights = async () => {
        if (flightName !== '' && originAirport !== '' && destAirport !== '' && departureDate !== '' && arrivalDate !== '' && duration !== '' && airplaneType !== '' && destinationTerminal !== '' && arrivalTerminal !== '') {
            if (flightPrices.length === 3) {
                const flightTransaction = {
                    FlightName: flightName,
                    TotalDuration: duration,
                    Origin: originAirport,
                    Destination: destAirport,
                    economyPrice: flightPrices.find((pricedetails) => pricedetails.RateType === 'Economy').Rate,
                    departureDateTime: moment(departureDate).toISOString(),
                    arrivalDateTime: moment(arrivalDate).toISOString(),
                    arrivalTerminal: arrivalTerminal,
                    destinationTerminal: destinationTerminal,
                    flightmanufacturer: airplaneType,
                    stops: transitStops,
                    rates: flightPrices
                }
                await axios.post('http://localhost:2000/transactions/createflight', flightTransaction).then((response) => {
                    if (response.status === 200) {
                        toast.success('Flight Created Successfully !!!')
                        setTimeout(() => window.location.href = '/flights', 3000)
                    }
                })
            } else {
                toast.error('Please enter seat prices for all types of seats to proceed further !!!')
            }
        } else {
            toast.error('Please enter all details proceed further !!!')
        }
    }


    return (<div>
        <h1 style={{ textAlign: 'center' }}>Create Flight</h1>
        <div className="createflight">
            <h2 style={{ textAlign: 'center' }}>Basic Flight Details</h2>
            <div className="filterwrapper">
                <div className="filterfield">
                    <label className="mb-1" for="flightname"><b>Flight Name</b></label>
                    <Select value={flightName} id="flightname" onChange={(flightname) => updateFlightName(flightname)}>
                        <Option value="Air Canada">Air Canada</Option>
                        <Option value="Lufthansa">Lufthansa</Option>
                        <Option value="Vistara">Vistara</Option>
                    </Select>
                </div>
                <div className="filterfield">
                    <label for="originairport"><b>Origin Airport</b></label>
                    <Select
                        id="originairport"
                        showSearch
                        placeholder="Select a Airport"
                        value={originAirport}
                        onChange={(airport) => updateOriginAirport(airport)}>
                        {airportsList.map((airport, index) => <Select.Option key={`${index}_${airport.iata}`} value={airport.name}>{`${airport.name} (${airport.iata})`}</Select.Option>)}
                    </Select>
                </div>
                <div className="filterfield">
                    <label className="mb-1" for="destinationairport"><b>Destination Airport</b></label>
                    <Select
                        id="destinationairport"
                        showSearch
                        placeholder="Select a Airport"
                        value={destAirport}
                        onChange={(airport) => updatedestAirport(airport)}>
                        {airportsList.map((airport, index) => <Select.Option key={`${index}_${airport.iata}`} value={airport.name}>{`${airport.name} (${airport.iata})`}</Select.Option>)}
                    </Select>
                </div>
                <div className="filterfield">
                    <label for="departuredate" className="mb-1"><b>Departure Date & Time</b></label>
                    <DatePicker showTime id="departuredate" value={departureDate} onChange={(departureDate) => updateDepartureDate(departureDate)} />
                </div>
                <div className="filterfield">
                    <label for="arrivaldate" className="mb-1"><b>Arrival Date & Time</b></label>
                    <DatePicker showTime id="arrivaldate" value={arrivalDate} onChange={(arrivalDate) => updatearrivalDate(arrivalDate)} />
                </div>
                <div className="filterfield">
                    <label for="totalduration" className="mb-1"><b>Total Duration</b></label>
                    <Input className="resetTextInput" id="totalduration" placeholder="Enter Duration" size="small" value={duration} onChange={(event) => updateduration(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <label for="airplanetype" className="mb-1"><b>Airplane Type</b></label>
                    <Select value={airplaneType} id="airplanetype" onChange={(airplaneType) => updateAirplaneType(airplaneType)}>
                        {AirplaneTypes.map((airplaneType) => {
                            return <Option key={airplaneType} value={airplaneType}>{airplaneType}</Option>
                        })}
                    </Select>
                </div>
                <div className="filterfield">
                    <label for="arrivalterminal" className="mb-1"><b>Arrival Terminal</b></label>
                    <Input className="resetTextInput" id="arrivalterminal" placeholder="Enter Terminal" size="small" value={arrivalTerminal} onChange={(event) => updatearrivalTerminal(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <label for="destinationterminal" className="mb-1"><b>Destination Terminal</b></label>
                    <Input className="resetTextInput" id="destinationterminal" placeholder="Enter Terminal" size="small" value={destinationTerminal} onChange={(event) => updatedestinationTerminal(event.target.value)}></Input>
                </div>
                <div className="w-100 d-flex justify-content-center my-3">
                    <Button type="primary" className="w-25 text-dark" onClick={AddFlights}>Add Flights</Button>
                </div>
            </div>
            <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Flight Prices</h3>
            <div className="filterwrapper">
                <div className="filterfield">
                    <label for="ratetype" className="mb-1"><b>Rate Type</b></label>
                    <Select value={rateType} id="ratetype" onChange={(flightname) => updaterateType(flightname)}>
                        <Option value="Economy">Economy</Option>
                        <Option value="Premium Economy">Premium Economy</Option>
                        <Option value="Business Class">Business Class</Option>
                    </Select>
                </div>
                <div className="filterfield">
                    <label for="seatprice"><b>Seat Price</b></label>
                    <Input className="resetTextInput" id="seatprice" placeholder="Enter Price" size="small" value={price} onChange={(event) => updateprice(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <span className="mb-1"><b>&nbsp;</b></span>
                    <Button type="primary" className="text-dark" onClick={AddFlightPrice}>Add Price</Button>
                </div>
                {/* <div className="w-100 d-flex justify-content-center my-3">
                    <Button type="primary" className="w-25" onClick={SearchFlights}>Search</Button>
                </div> */}
            </div>
            <div className="tableWrapper">
                <Table className="my-3" dataSource={flightPrices} columns={PricingColumns}></Table>
            </div>
            <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Transit Stops</h3>
            <div className="filterwrapper">
                <div className="filterfield">
                    <label for="transitoriginairport" className="mb-1"><b>Airport</b></label>
                    <Select
                        id="transitoriginairport"
                        showSearch
                        placeholder="Select a Airport"
                        value={flightStop}
                        onChange={(airport) => updateflightStop(airport)}>
                        {airportsList.map((airport, index) => <Select.Option key={`${index}_${airport.iata}`} value={airport.name}>{`${airport.name} (${airport.iata})`}</Select.Option>)}
                    </Select>
                </div>
                <div className="filterfield">
                    <label for="transitduration"><b>Transit Duration</b></label>
                    <Input className="resetTextInput" id="transitduration" placeholder="Enter Transit Duration" size="small" value={transitDuration} onChange={(event) => updatetransitDuration(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <label for="transitarrivaldate" className="mb-1"><b>Arrival Date & Time</b></label>
                    <DatePicker showTime id="transitarrivaldate" value={arrivalTransitDate} onChange={(arrivalDate) => updatearrivalTransitDate(arrivalDate)} />
                </div>
                <div className="filterfield">
                    <label for="transitdeparturedate" className="mb-1"><b>Departure Date & Time</b></label>
                    <DatePicker showTime id="transitdeparturedate" value={departureTransitDate} onChange={(departureDate) => updatedepartureTransitDate(departureDate)} />
                </div>
                <div className="filterfield">
                    <label for="transitarrivalterminal" className="mb-1"><b>Arrival Terminal</b></label>
                    <Input className="resetTextInput" id="transitarrivalterminal" placeholder="Enter Terminal" size="small" value={arrivalTrasitTerminal} onChange={(event) => updatearrivalTrasitTerminal(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <label className="mb-1" for="transitdestinationterminal"><b>Destination Terminal</b></label>
                    <Input className="resetTextInput" id="transitdestinationterminal" placeholder="Enter Terminal" size="small" value={destinatioTransitTerminal} onChange={(event) => updatedestinatioTransitTerminal(event.target.value)}></Input>
                </div>
                <div className="filterfield">
                    <label for="transitairplanetype" className="mb-1"><b>Airplane Type</b></label>
                    <Select value={transitairplaneType} id="transitairplanetype" onChange={(airplaneType) => updatetransitAirplaneType(airplaneType)}>
                        {AirplaneTypes.map((airplaneType) => {
                            return <Option key={airplaneType} value={airplaneType}>{airplaneType}</Option>
                        })}
                    </Select>
                </div>
                <div className="filterfield">
                    <span className="mb-1"><b>&nbsp;</b></span>
                    <Button type="primary" onClick={AddTransitStops} className="text-dark">Add Stop</Button>
                </div>
            </div>
            <div className="tableWrapper">
                <Table className="my-3" dataSource={transitStops} columns={TransitColumns}></Table>
            </div>
        </div>
    </div>)
}

export default CreateFlighTransaction