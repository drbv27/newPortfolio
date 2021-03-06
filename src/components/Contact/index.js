import './index.scss'
import React,{useState,useEffect,useRef} from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    useEffect(() => {
      const timer = setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 3000);
      return () => clearTimeout(timer);
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()
    
        emailjs
          .sendForm(
            'service_mlex5hm',
            'template_a1rus2q',
            form.current,
            '6KarAniuuTDfZyAQf'
          )
          .then(
            (result) => {
                console.log(result.text)
              alert('Message successfully sent!')
              window.location.reload(false)
            },
            (error) => {
                console.log(error.text)
              alert('Failed to send the message, please try again')
            }
          )
      }

     return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                        letterClass={letterClass} 
                        strArray={['C','o','n','t','a','c','t',' ','m','e']}
                        idx={15}/>
                 </h1>
                 <p>
                     I am interested in freelance opportunities - especially ambitious or large projects.
                     However, if you have other request or question, don't hesitate to cntact me using
                     below form either.
                 </p>
                 <div className='contact-form'>
                    <form ref={form} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type="text" name="name" placeholder="Name" required/>
                            </li>
                            <li className='half'>
                                <input type="email" name="email" placeholder="Email" required/>
                            </li>
                            <li>
                                <input placeholder="subject" type="text" name="subject" required/>
                            </li>
                            <li>
                                <textarea placeholder="Message" name="message" required></textarea>
                            </li>
                            <li>
                                <input type="submit" className='flat-button' value="SEND"/>
                            </li>
                        </ul>
                    </form>
                 </div>
             </div>
             <div className="info-map">
                Slobodan Gaji??,
                <br />
                Serbia,
                <br />
                Branka Radi??evi??a 19, 22000 <br />
                Sremska Mitrovica <br />
                <br />
                <span>freelancerslobodan@gmail.com</span>
            </div>
            <div className="map-wrap">
                <MapContainer center={[44.96366, 19.61045]} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[44.96366, 19.61045]}>
                <Popup>Sloba lives here, come over for a cup of coffee :)</Popup>
                </Marker>
            </MapContainer>
            </div>
         </div>
        <Loader type="pacman" />
    </>
  )
}

export default Contact