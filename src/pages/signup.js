import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

const SignUp = () => {
    const [Email, updateEmail] = useState('')
    const [Phone, updatePhone] = useState('')
    const [FirstName, updateFirstName] = useState('')
    const [LastName, updateLastName] = useState('')
    const [Password, updatePassword] = useState('')
    const [confirmPassword, updateconfirmPassword] = useState('')

    const validateSignup = (event) => {
        event.preventDefault();
        const validateEmail = () => {
            const re = /\S+@\S+\.\S+/;
            return re.test(Email);
        };

        const validatePassword = () => {
            const pwdRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
            return pwdRegex.test(Password)
        }

        const validateMobile = () => {
            const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
            return mobileRegex.test(Phone)
        }

        if (Email !== '' || Phone !== '' || FirstName !== '' || LastName !== '') {
            if (!validateEmail()) {
                toast.warn('Please enter a Valid Email ID !!!!')
                return
            }

            if (!validatePassword()) {
                toast.warn('Please enter a Valid Password !')
                return
            }

            if (!validateMobile()) {
                toast.warn('Please enter a Valid Contact Number !!!!')
                return
            }

            if (confirmPassword !== Password) {
                toast.warn('Password and Confirm Password does not match !!!!')
                return
            }

            const newuser = {
                FirstName: FirstName,
                LastName: LastName,
                Password: Password,
                Email: Email,
                Phone: Phone
            }
            addNewUser(newuser)
        } else {
            toast.warn('Please enter all fields !!!!');
        }
    }

    const addNewUser = async (newuser) => {
        await axios.post('http://localhost:2000/api/signup', newuser).then((response) => {
            if (response.status === 201) {
                toast.success('User Created Successfully !!!');
                setTimeout(() => { window.location.href = '/login' }, 4000)
            }
        })
    }

    return (<div className="body signup_bg">
        <div className="login-box">
            <i className="fas fa-user fa-3x"></i>
            <h1>Sign Up here</h1>
            <div className="text-box">
                <span>Email</span>
                <input type="text" placeholder="Enter Email" value={Email} onChange={(event) => updateEmail(event.target.value)} />
            </div>
            <div className="text-box">
                <span>First Name</span>
                <input type="text" placeholder="Enter First Name" value={FirstName} onChange={(event) => updateFirstName(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Last Name</span>
                <input type="text" placeholder="Enter Last Name" value={LastName} onChange={(event) => updateLastName(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Phone</span>
                <input type="text" placeholder="Enter Phone" value={Phone} onChange={(event) => updatePhone(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Password</span>
                <input type="password" placeholder="Enter Password" value={Password} onChange={(event) => updatePassword(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Confirm Password</span>
                <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(event) => updateconfirmPassword(event.target.value)} />
            </div>
            <div className="text-box">
                <input type="submit" value="SignUp" onClick={(event) => validateSignup(event)} />
            </div>
            <a href="/login">Already have an account ?</a>
        </div>
    </div>)
}

export default SignUp