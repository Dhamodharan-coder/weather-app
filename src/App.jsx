import React, { useEffect, useState } from 'react';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import search from "./assets/search.png"
import rain from "./assets/raining.png"
import weather from "./assets/weather.png"
import wind from "./assets/wind.png"
import sun from "./assets/sun.png"
import cloud from "./assets/cloudy.png"
import snow from "./assets/snow.png"

function App() {
    const [text,settext]=useState("Chennai");
    const [city,setcity]=useState("Chennai")
    const [icon,seticon]=useState(sun);
    const [celsius,setcelsius]=useState("32");
    const [country,setcountry]=useState("IN");
    const [latitude,setlatitude]=useState("9.44")
    const [longitude,setlongitude]=useState("9.44")
    const [Humidity,sethumidity] = useState("55")
    const [Windspeed,setWindspeed] = useState("55");
    const [loading,setloading]=useState(false);
    const [dismsg,setdismsg]=useState(false);

    const weathericonmap={
        "01d":sun,
        "01n":sun,
        "02d":sun,
        "02n":sun,
        "03d":cloud,
        "03n":cloud,
        "04d":cloud,
        "04n":cloud,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
    }
    
const api_key= "6c9f5ed8678f9de0d5a512d9b1544c78";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
   const climat = async ()=>{
    setloading(true)
    try{
        let result = await fetch(url);
    let data = await result.json();
if(data.cod==="404"){
    console.error("City not found");
    setdismsg(true)
    setloading(false);
    return;
}
        setdismsg(false);
sethumidity(data.main.humidity)
setWindspeed(data.wind.speed)
setlongitude(data.coord.lon)
setcity(text)
setlatitude(data.coord.lat)
setcelsius(Math.floor(data.main.temp))
setcountry(data.sys.country)
const weathericoncode =data.weather[0].icon;
seticon(weathericonmap[weathericoncode])
    }
    catch(error){
        console.error("error", error.message);
    }
    finally{
        setloading(false)
    }
   }
   const entertext=(e)=>{
    settext(e.target.value)
}
const handlekeydown=(e)=>{
    if(e.key==="Enter"){
        climat();
    }
}
useEffect(()=>{
climat();
},[])
    return (
      
        <div className="container-fluid">
            <div className="box">
            <div className="row">
                <div className="col col-lg-12 col-md-12">
            
                <h1 className='text-center p-4'>Weather App</h1>
<div className="input">
<input type="text" className='input-1' value={text} onChange={entertext} onKeyDown={handlekeydown}/>
<img src={search} alt='search-icon' onClick={climat}/>
</div>
</div>
</div>
<div className="row">

<div className="col col-lg-6 col-md-6 col-sm-12">
<section className='text-center'>
<img src={icon} alt='' />
</section>
</div>
<div className="col col-lg-6 col-md-6 col-sm-12">
<aside className='text-center'>
    <b>{celsius}°C</b>
   {dismsg ? <h1>City Not Found!</h1> : <h1>{city}</h1>}
    <span>{country}</span>
    <div className='d-flex'>
    <div className='m-4'>
    <b>Latitude</b><br />
    <span>{latitude}</span>
    </div>
    <div className='m-4'>
    <b>Longitude</b><br />
    <span>{longitude}</span>
    </div>
    </div>

    <div className='d-flex'>
        <div className='m-4'>
        <img src={weather}/><br />
        <span>{Humidity}%</span><br />
        <b>Humidity</b>
        </div>
        <div className='m-4'>
        <img src={wind}/><br />
        <span>{Windspeed}km/h</span><br />
        <b>Windspeed</b>
        </div>
    </div>
</aside>


</div>
<div className='text-center my-4'>
{loading && <b>Loading...</b>}
</div>
<div className='text-center my-4'>
<span>Designed By </span><b>Dhamodharan</b>
</div>
            </div>
            </div>
            </div>
       
    );
}

export default App;
