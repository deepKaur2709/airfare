import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'

const AdminLogin = () => {
    const [Email, updateEmail] = useState('')
    const [Password, updatePassword] = useState('')
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

        if (Email !== '' || Password !== '') {
            if (!validateEmail()) {
                toast.warn('Please enter a Valid Email ID !!!!')
                return
            }

            if (!validatePassword()) {
                toast.warn('Please enter a Valid Password !')
                return
            }

            const user = {
                Password: Password,
                Email: Email
            }
            loginUser(user)
        } else {
            toast.warn('Please enter all fields !!!!');
        }
    }

    const loginUser = async (user) => {
        await axios.post('http://localhost:2000/admin/signin', user).then((response) => {
            if (response.status === 200) {
                if (response.data) {
                    toast.success('Admin Logged In Successfully !!!');
                    localStorage.setItem('admindetails', JSON.stringify(response.data))
                    setTimeout(() => { window.location.href = '/' }, 4000)
                } else {
                    toast.warn('Admin Invalid Credentials !!!');
                }
            } else {
                toast.warn('Something Went Wrong ! Please try again later !');
            }
        })
    }


    return (<div className="body adminlogin_bg">
        <div className="login-box">
            <i className="fas fa-user fa-3x"></i>
            <h1 style={{ color: '#fff' }}>Admin Login here</h1>
            <div className="text-box">
                <label for="adminemail">Admin Email</label>
                <input type="text" id="adminemail" placeholder="Enter Email" value={Email} onChange={(event) => updateEmail(event.target.value)} />
            </div>
            <div className="text-box">
                <label for="adminpassword">Admin Password</label>
                <input type="password" id="adminpassword" placeholder="Enter Password" value={Password} onChange={(event) => updatePassword(event.target.value)} />
            </div>
            <div className="text-box">
                <input type="submit" value="Login" onClick={(event) => validateSignup(event)} />
            </div>
            <a href="/adminsignup">Don't have an account ?</a>
        </div>
    </div>)
}

export default AdminLogin