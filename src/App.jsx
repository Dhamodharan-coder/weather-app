import React, { useEffect, useState } from 'react';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import rain from "./assets/raining.png"
import sun from "./assets/sun.png"
import cloud from "./assets/cloudy.png"
import snow from "./assets/snow.png"
import thunder from "./assets/thunderstorm.png"
import clock from "./assets/clock.png"

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


    //forecast usestates

    const [dates,setdates]=useState("");
    const [click,setclick]=useState(0);
    const [findday,setfindday] = useState();
    const [forecastdetails,setforecastdetails] = useState([]);
const [alldetails,setalldetails]=useState([]);

const [seconds,setseconds] = useState("00");
const [minutes,setminutes] = useState("00");
const [hours,sethours] = useState("00")

    const daysdetails=(id,uniqueday)=>{
        setclick(id)
        setfindday(uniqueday)
    }
    const weathericonmap={
       "Thunderstorm": thunder,
  "Drizzle": rain,
  "Rain": rain,
  "Snow": snow,
  "Mist": cloud,
  "Smoke": rain,
  "Haze": thunder,
  "Dust": cloud,
  "Fog": cloud,
  "Sand": cloud,
  "Ash": cloud,
  "Squall": cloud,
  "Tornado": thunder,
  "Clear": sun,
  "Clouds": cloud
        
    }
    
const api_key= "6c9f5ed8678f9de0d5a512d9b1544c78";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    const urlforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`;

   useEffect(()=>{
    fetch(urlforecast)
    .then(response => response.json())
    .then(data => assembleForecast(data))
    .catch(error => console.error("Error fetching weather data:", error));
 
    function assembleForecast(data) {
      // Initialize an object to group the forecast by date
      setalldetails(data)
  
      const forecastByDay = [];
      setdates(data.list)
   
      data.list.forEach((forecast,index) => {
          const date = new Date(forecast.dt_txt).toLocaleDateString("en-US");
  
          // If the date doesn't exist in the object, initialize it
          // Add forecast entry to the respective date
          forecastByDay.push({
             
              time: forecast.dt_txt,
              temperature: forecast.main.temp,
              weather: forecast.weather[0].main
          });
      });
  
  
      setforecastdetails(forecastByDay.filter(e => new Date(e.time).toLocaleDateString("en-US", { weekday: 'long' }) === findday))
  }
  
   },[forecastdetails])


   const climat = async ()=>{
    setloading(true)
    try{
        let result = await fetch(url);
    let data = await result.json();
    setdismsg(false)
 
if(data.cod==="404"){
    console.error("City not found");
    setdismsg(true)
    setloading(false);
    return;
}
sethumidity(data.main.humidity)
setWindspeed(data.wind.speed)
setlongitude(data.coord.lon)
setcity(text)
setlatitude(data.coord.lat)
setcelsius(Math.floor(data.main.temp))
setcountry(data.sys.country)
const weathericoncode =data.weather[0].main;
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

function formatTime(dateStr) {
    // Convert the string to a valid Date format
    const date = new Date(dateStr.replace(' ', 'T'));
    
    // Format the time
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return time;
}

function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}


useEffect(()=>{
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
setseconds(seconds);
setminutes(minutes)
sethours(hours)
})

useEffect(()=>{
climat();
},[])
    return (
      
//         <div className="container-fluid">
           
//             <div className="row">
//                 <div className="col col-lg-4 col-md-4">
            
//                 <h1 className='text-center p-4 fw-bold'>Weather App</h1>
// <div className="input">
// <input type="text" className='input-1' value={text} onChange={entertext} onKeyDown={handlekeydown}/>
// <img src={search} alt='search-icon' onClick={climat}/>
// </div>
// <div className="row">

// <div className="col col-lg-12 col-md-12 col-sm-12">
// <section className='text-center'>
// <img src={icon} alt='' />
// </section>
// </div>
// <div className="col col-lg-12 col-md-12 col-sm-12">
// <aside className='text-center'>
//     <b>{celsius}°C</b>
//    {dismsg ? <h1>City Not Found!</h1> : <h1>{city}</h1>}
//     <span>{country}</span>
//     <div className='d-flex'>
//     <div className='m-4'>
//     <b>Latitude</b><br />
//     <span>{latitude}</span>
//     </div>
//     <div className='m-4'>
//     <b>Longitude</b><br />
//     <span>{longitude}</span>
//     </div>
//     </div>

//     <div className='d-flex'>
//         <div className='m-4'>
//         <img src={weather}/><br />
//         <span>{Humidity}%</span><br />
//         <b>Humidity</b>
//         </div>
//         <div className='m-4'>
//         <img src={wind}/><br />
//         <span>{Windspeed}km/h</span><br />
//         <b>Windspeed</b>
//         </div>
//     </div>
// </aside>


// </div>
// <div className='text-center my-4'>
// {loading && <b>Loading...</b>}
// </div>
// <div className='text-center my-4'>
// <span>Designed By </span><b>Dhamodharan</b>
// </div>
//             </div>
// </div>

// <div className="col col-lg-8 col-md-8 bg-white">

//     </div>     
//             </div>
//             </div>

<div className='container-fluid'>
<div className='row d-flex justify-content-center'>

<div className='col col-lg-3 col-md-12 col-sm-12 col-sm-12 my-5 mx-4 text-white back box'>
    <h1 className='text-center p-4 fw-bold text-white'>Weather App</h1>
 <div className="input p-2">
 <input type="text" className='input-1 text-white' value={text} onChange={entertext} onKeyDown={handlekeydown}/>
 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
 </div>
 <div className="row">

<div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12 icon">
<img src={icon} alt='' className='img-fluid'/>
</div>
<div className="col-lg-12 col-md-12 col-sm-12">
<aside className='text-center'>
    <b>{dismsg?"-" :celsius}°C</b>
   {dismsg ? <h1>City Not Found!</h1> : <h1>{city[0].toUpperCase()+city.slice(1,20)}</h1>}
    <span>{dismsg?"-" :country}</span>
    <div className='d-flex'>
    <div className='m-4'>
    <img src='https://img.icons8.com/3d-fluency/94/globe.png' />
    <b>Latitude</b><br />
    <span>{dismsg?"-" :latitude}</span>
    </div>
    <div className='m-4'>
        <img src='https://img.icons8.com/3d-fluency/94/compass.png' />
    <b>Longitude</b><br />
    <span>{dismsg?"-" :longitude}</span>
    </div>
    </div>

    <div className='d-flex'>
        <div className='m-4'>
        <img src="https://img.icons8.com/3d-fluency/94/water-element.png" /><br />
        <b>Humidity</b><br />
        <span>{dismsg?"-" :Humidity}%</span>
        </div>
        <div className='m-4'>
        <img src="https://img.icons8.com/3d-fluency/94/air-element.png" /><br />
        <b>Windspeed</b><br />
        <span>{dismsg?"-" :Windspeed}km/h</span>
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


<div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 my-5 mx-4 aside'>
    <div className=' d-flex justify-content-center'>
    <img src={clock} className='image' />
    </div>

    <div  className='text-white d-flex gap-2 justify-content-center align-items-center no-wrap mt-5'>
  
        <p className='black p-4'>{(hours-12) < 10 ? '0'+(hours-12) : hours-12}</p>
        <p className='black p-4'>{minutes < 10 ? '0'+minutes:minutes}</p>
        <p className='black p-4'>{seconds < 10 ? '0'+seconds:seconds}</p>
        <p className='black p-4'>{hours>12?"PM":"AM"}</p>
        {console.log(hours-12)}
    </div>
    <h4 className='text-center mt-4 text-white'>Forecast</h4>
<div className='days text-white d-flex flex-wrap justify-content-center gap-4 my-5'>
{
    dates && [...new Set(dates.map(e => new Date(e.dt_txt).toLocaleDateString("en-US", { weekday: 'long' })))]
        .map((uniqueDay, index) => (
            <div className={`black text-center ${click === index ?"dark":""}`} key={index} onClick={()=>{daysdetails(index,uniqueDay)}}>
                <h6>{uniqueDay.slice(0,3)}</h6>
              <div>{<div><img src={weathericonmap[dates[index].weather[0].main]} /><br /></div>}</div>
                <span>{Math.floor(dates[index].main.temp)} °C</span>
            </div>
        ))
}


</div>
<div >
{
<div  className='forecast_content d-flex gap-4 justify-content-center flex-wrap'>
    {
        findday ? (forecastdetails.map((e)=>(
            <div className='dark1'>
              <div>{Math.floor(e.temperature)}°C</div>
             <div>{formatTime(e.time)}</div>
             <div><img src={weathericonmap[e.weather]} /></div>
            </div>
         ))):(
         <div className='dark1'>
            <div>18°C</div>
           <div>01:12</div>
           <div><img src={sun} /></div>
          </div>)
    }
</div>
}
</div>
<div className='text-white m-5  d-flex justify-content-around flex-wrap'>
 <div className='p-4 black2 text-center m-2'>
 <img src='https://img.icons8.com/fluency/48/conference-call.png' /><br />
 Population<br /> {alldetails?.city?.population}
 </div>
 <div className='p-4 black2 text-center m-2'>
    <img src='https://img.icons8.com/arcade/64/sunrise.png' /><br />
 Sunrise<br />
  {convertUnixTimestampToTime(alldetails?.city?.sunrise)}
 </div>
 <div className='p-4 black2 text-center m-2'>
 <img src='https://img.icons8.com/arcade/64/sunset.png' /><br />
 Sunset<br /> {convertUnixTimestampToTime(alldetails?.city?.sunset)}
 </div>
</div>
</div>


</div>
</div>
       
    );
}

export default App;
