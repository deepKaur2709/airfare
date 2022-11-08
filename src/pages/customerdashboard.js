import React, { Component } from "react";

class CustomerDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userdetails: localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null
        }
    }

    render() {
        const { userdetails } = this.state
        return (<div className="homeWrapper">
            <h1 className="text-center">Welcome {userdetails ? `${userdetails.FirstName} ${userdetails.LastName}` : ''}</h1>
        </div>)
    }
}

export default CustomerDashboard
