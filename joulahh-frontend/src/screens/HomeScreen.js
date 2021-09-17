import React, { useEffect } from 'react'

const HomeScreen = () => {

    useEffect(()=>{
        document.title = "جولاه : صفحه اصلی";
    })
    return (
        <div className='homeScreen'>
            <div className='homeScreen__left'><img src='./images/knit4.png' alt='knit shirt'/> </div>
            <div className='homeScreen__right'></div>
        </div>
    )
}

export default HomeScreen
