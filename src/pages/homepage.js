import React, { useState } from "react";
import { Modal } from 'antd';
import feature1 from '../images/seamless-travel-card-1.jpg'
import feature2 from '../images/seamless-travel-card-2.jpg'
import feature3 from '../images/seamless-travel-card-3.jpg'
import feature4 from '../images/seamless-travel-card-4.svg'
import feature5 from '../images/seamless-travel-card-5.svg'
import feature6 from '../images/seamless-travel-card-6.svg'


const HomePage = () => {
    const [popOpen, updatePopupOpen] = useState(false)
    const [popuptitle, updatepopupTitle] = useState('')
    const [popupImage, updatepopupImage] = useState(null)
    const [popupContent, updatepopupContent] = useState('')

    const OpenFeaturePopup = (title, content, image) => {
        updatepopupTitle(title)
        updatepopupImage(image)
        updatepopupContent(content)
        updatePopupOpen(true)
    }

    return (<div className="listwrapper">
        <h1 className="text-center">Best Travel Expereince</h1>
        <p className="text-center">
            Our travel experience gives new opportunities to life
        </p>

        <header className="showcase">
            &nbsp;
        </header>
        <a href="/flights" className="btn linkshop">
            Shop Now <i className="fas fa-chevron-right"></i>
        </a>
        <section className="home-cards">
            <div>
                <img src={feature1} alt="" />
                <h2>Air Canada Signature Class</h2>
                <p>
                    See how Katie Sowers, Asst. Coach for the 49ers, uses Surface Pro 7
                    to put her plans into play.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Air Canada Signature Class', ' See how Katie Sowers, Asst. Coach for the 49ers, uses Surface Pro 7 to put her plans into play.', feature1) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature2} alt="" />
                <h3>Premium Economy Class</h3>
                <p>
                    Express yourself powerfully with a thin, light, and elegant design,
                    faster performance, and up to 11.5 hours battery life.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Premium Economy Class', 'Express yourself powerfully with a thin, light, and elegant design, faster performance, and up to 11.5 hours battery life.', feature2) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature3} alt="" />
                <h3>Economy Class</h3>
                <p>
                    Buy an Xbox One X console and double your fun with a free select
                    extra controller. Starting at $349.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Economy Class', ' Buy an Xbox One X console and double your fun with a free select extra controller. Starting at $349.', feature3) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature4} alt="" />
                <h3>200+ Destinations Worldwide</h3>
                <p>
                    Expect more. World class performance, with more privacy, more
                    productivity, and more value.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('200+ Destinations Worldwide', ' Expect more. World class performance, with more privacy, more productivity, and more value.', feature3) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
        </section>
        <section className="xbox">
            <div className="content">
                <h2>Xbox Game For Premium Economy Class</h2>
                <p>Xbox Games are with rich live Gaming experience and over 100 high-quality
                    Games and Videos On Air. Play together with friends and discover your
                    next favorite game.</p>
                <a href="/aboutus" className="btn">
                    Book Now <i className="fas fa-chevron-right"></i>
                </a>
            </div>
        </section>
        <section className="home-cards">
            <div>
                <img src={feature5} alt="" />
                <h3>Earn on Star Alliance member airlines </h3>
                <p>
                    Unleash the power of your team.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Earn on Star Alliance member airlines', ' Unleash the power of your team.', feature5) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature6} alt="" />
                <h3>Your Aeroplan program</h3>
                <p>
                    Get students future-ready with Windows 10 devices. Starting at $219.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Your Aeroplan program', 'Get students future-ready with Windows 10 devices. Starting at $219.', feature6) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature1} alt="" />
                <h3>Air Canada Signature Class</h3>
                <p>
                    Download the free 90-day evaluation for IT professionals.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Air Canada Signature Class', ' Download the free 90-day evaluation for IT professionals.', feature1) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
            <div>
                <img src={feature5} alt="" />
                <h3>Premium Economy Class </h3>
                <p>
                    Learn how Kubernetes works and get started with cloud native app
                    development today.
                </p>
                <button className="removeDefaultStyle" onClick={(event) => { OpenFeaturePopup('Premium Economy Class', 'Learn how Kubernetes works and get started with cloud native app development today.', feature5) }}>Learn More <i className="fas fa-chevron-right"></i></button>
            </div>
        </section>
        <p className="text-justify">AirFare's New Intiative will be carbon negative by 2030 and by 2050 we will remove
            all carbon the company has emitted since it was founded in 1975</p>
        <section className="carbon dark">
            <div className="content">

                <a href="/contactus" className="btn">
                    Learn More <i className="fas fa-chevron-right"></i>
                </a>
            </div>
        </section>
        <Modal title={popuptitle} open={popOpen} onOk={() => updatePopupOpen(!popOpen)} onCancel={() => updatePopupOpen(!popOpen)}>
            <img src={popupImage} alt="Popup Details" width={300} style={{ margin: '0 auto', display: 'block' }} />
            <p className="my-3 text-center">{popupContent}</p>
        </Modal>
    </div>)
}

export default HomePage