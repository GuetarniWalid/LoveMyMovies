import React, { Fragment } from 'react'
import Navbar from './Navbar/Navbar'
import Slider from './Slider/Slider'
import BottomNavbar from './BottomNavbar/BottomNavbar'

export default function Accueil() {
    return (
        <Fragment>
            <Navbar />
            <Slider />
            <BottomNavbar />
        </Fragment>
    )
}
