import React from "react";

const ContactUs = (props) => {



    return (<div className="container my-5">
        <div style={{ textAlign: 'center' }}>
            <h1>Contact Us</h1>
            <p>Swing by for a cup of coffee, or leave us a message:</p>
        </div>
        <div className="row_w4">
            <div className="column">
                <img src="https://www.w3schools.com/w3images/map.jpg" style={{ width: '100%' }} alt="Map" />
            </div>
            <div className="column">
                <form action="/action_page.php">
                    <label for="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.." />
                    <label for="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
                    <label for="country">Country</label>
                    <select id="country" name="country">
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                    </select>
                    <label for="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: '170px' }}></textarea>
                    <input type="submit" className="text-dark" value="Submit" />
                </form>
            </div>
        </div>
    </div>)
}

export default ContactUs