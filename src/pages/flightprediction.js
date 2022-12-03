import React, { useState } from "react";
import { Select, DatePicker, Button, TimePicker, Input, Table } from 'antd';
import airports from '../stub/airports.json'
import aircrafts from '../stub/aricraftcode.json'
import { carrrierCodes } from '../core/carriercodes'
import { toast } from "react-toastify";
import { predictionDurationMapping } from '../core/enums'
import axios from "axios";
import moment from "moment";

const format = 'HH:mm:ss';
const airportsList = [...airports]
const aircraftList = [...aircrafts]
const columns = [
    {
        title: 'Prediction ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Duration',
        dataIndex: 'result',
        key: 'result',
        render: (duration) => predictionDurationMapping[duration]
    },
    {
        title: 'Probability',
        dataIndex: 'probability',
        key: 'probability',
        render: (probability) => parseFloat(probability * 100).toFixed(2) + ' %'
    }
];
const FlightPrediction = () => {
    const [originAirport, updateOriginAirport] = useState('')
    const [destinationAirport, updateDestinationAirport] = useState('')
    const [departureDate, updateDeparuteDate] = useState('')
    const [departureTime, updateDeparuteTime] = useState('')
    const [arrivalDate, updateArrivalDate] = useState('')
    const [arrivalTime, updateArrivalTime] = useState('')
    const [carrierCode, updatecarrierCode] = useState('')
    const [aircraftCode, updateaircraftCode] = useState('')
    const [flightNumber, updateflightNumber] = useState('')
    const [duration, updateDuration] = useState('')
    const [loading, updateLoading] = useState(false)
    const [predictionData, updatePredictionData] = useState([])

    const getPredictions = () => {
        if (originAirport !== '' && destinationAirport !== '' && departureDate !== ''
            && departureTime !== '' && arrivalDate !== '' && arrivalTime !== ''
            && carrierCode !== '' && aircraftCode !== '' && flightNumber !== '' && duration !== '') {
            updateLoading(true)
            const options = {
                method: 'GET',
                url: 'https://flight-delay-prediction.p.rapidapi.com/travel/predictions/flight-delay',
                params: {
                    departureTime: moment(departureTime).format(format),
                    flightNumber: flightNumber,
                    duration: duration,
                    arrivalDate: moment(arrivalDate).format('YYYY-MM-DD'),
                    destinationLocationCode: destinationAirport,
                    carrierCode: carrierCode,
                    arrivalTime: moment(arrivalTime).format(format),
                    originLocationCode: originAirport,
                    aircraftCode: aircraftCode,
                    departureDate: moment(departureDate).format('YYYY-MM-DD')
                },
                headers: {
                    'X-RapidAPI-Key': '2c2c989540msh111bd88dd03ca9ep1e7c5djsn773f09fe80c4',
                    'X-RapidAPI-Host': 'flight-delay-prediction.p.rapidapi.com'
                }
            };
            axios.request(options).then(function (response) {
                if (response.status === 200) {
                    updatePredictionData(response.data.data)
                }
                updateLoading(false)
            }).catch(function (error) {
                updateLoading(false)
            });
        } else {
            toast.error('Please enter all the fields !!!')
        }
    }

    return (<div>
        <h1 className="title">Flight Prediction</h1>
        <div className="formwrapper">
            <div className="formdetails">
                <label for="originairport">Origin Airport</label>
                <Select
                    id="originairport"
                    showSearch
                    placeholder="Select a Airport"
                    value={originAirport}
                    onChange={(airport) => updateOriginAirport(airport)}>
                    {airportsList.map((airport, index) => <Select.Option key={`${index}_${airport.iata}`} value={airport.iata}>{`${airport.name} (${airport.iata})`}</Select.Option>)}
                </Select>
            </div>
            <div className="formdetails">
                <label for="destinationairport">Destination Airport</label>
                <Select
                    id="destinationairport"
                    showSearch
                    placeholder="Select a Airport"
                    value={destinationAirport}
                    onChange={(airport) => updateDestinationAirport(airport)}>
                    {airportsList.map((airport, index) => <Select.Option key={`${index}_${airport.iata}`} value={airport.iata}>{`${airport.name} (${airport.iata})`}</Select.Option>)}
                </Select>
            </div>
            <div className="formdetails">
                <label for="aircraftcode">Aircraft Code</label>
                <Select
                    id="aircraftcode"
                    showSearch
                    placeholder="Select a Airport"
                    value={aircraftCode} onChange={(code) => updateaircraftCode(code)} options={aircraftList.map((carrier, index) => Object.assign({ key: `${index}_${carrier.iataCode}`, label: `${carrier.description} (${carrier.iataCode})`, value: carrier.iataCode }))}></Select>
            </div>
            <div className="formdetails">
                <label for="departuredate" >Departure Date</label>
                <DatePicker id="departuredate" value={departureDate} onChange={(departureDate) => updateDeparuteDate(departureDate)} />
            </div>
            <div className="formdetails">
                <label for="departuretime" >Departure Time</label>
                <TimePicker id="departuretime" value={departureTime} onChange={(Time) => updateDeparuteTime(Time)} format={format} />
            </div>
            <div className="formdetails">
                <label for="carriercode" >Carrier Code</label>
                <Select
                    id="carriercode"
                    showSearch
                    placeholder="Select a Airport" value={carrierCode} onChange={(code) => updatecarrierCode(code)} options={carrrierCodes.map((carrierCode, index) => Object.assign({ key: `${index}_${carrierCode}`, label: carrierCode, value: carrierCode }))}></Select>
            </div>
            <div className="formdetails">
                <label for="arrivaldate" >Arrival Date</label>
                <DatePicker value={arrivalDate} id="arrivaldate" onChange={(arrivalDate) => updateArrivalDate(arrivalDate)} />
            </div>
            <div className="formdetails">
                <label for="arrivaltime" >Arrival Time</label>
                <TimePicker id="arrivaltime" value={arrivalTime} onChange={(Time) => updateArrivalTime(Time)} format={format} />
            </div>
            <div className="formdetails">
                <label for="flightnumber" >Flight Number</label>
                <Input id="flightnumber" className="resetTextInput" placeholder="Enter a Flight Number" size="small" value={flightNumber} onChange={(event) => updateflightNumber(event.target.value)}></Input>
            </div>
            <div className="formdetails">
                <label for="duration" >Duration</label>
                <Input id="duration" className="resetTextInput" placeholder="Enter Duration" size="small" value={duration} onChange={(event) => updateDuration(event.target.value)}></Input>
            </div>
            <div className="formdetails">
                <span className="mt-3">&nbsp;</span>
                <Button type="primary" className="text-dark" loading={loading} onClick={getPredictions}>Get Predictions</Button>
            </div>
        </div>
        <div className="tableWrapper">
            <Table columns={columns} dataSource={predictionData}></Table>
        </div>
    </div>)
}

export default FlightPrediction