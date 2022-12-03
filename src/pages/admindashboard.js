import React, { Component } from "react";

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            admindetails: localStorage.getItem('admindetails') ? JSON.parse(localStorage.getItem('admindetails')) : null
        }
    }

    render() {
        const { admindetails } = this.state
        return (<div className="homeWrapper">
            <h1 className="text-center">Welcome {admindetails ? `${admindetails.FirstName} ${admindetails.LastName}` : ''}</h1>
        </div>)
    }
}

export default AdminDashboard
