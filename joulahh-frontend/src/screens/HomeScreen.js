import React, { useEffect } from 'react'

const HomeScreen = () => {

    useEffect(()=>{
        document.title = "جولاه : صفحه اصلی";
    })
    return (
        <div className='homeScreen'>
            <div className='homeScreen__left'><img src='./images/blueknit.jpg' alt='knit shirt'/> </div>
        </div>
    )
}

export default HomeScreen
