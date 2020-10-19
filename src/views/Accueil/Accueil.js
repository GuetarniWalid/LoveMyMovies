import React, { Fragment } from 'react'
import Navbar from './Navbar/Navbar'
import Slider from './Slider/Slider'
import BottomNavbar from './BottomNavbar/BottomNavbar'
import styles from './Slider/Slider.module.css'

export default function Accueil() {
    return (
        <Fragment>
            <div className={styles.bodyBackgroundCover}></div>
            <Navbar />
            <Slider />
            <BottomNavbar />
        </Fragment>
    )
}
