const cityName =  document.getElementById('cityName');
 const submitBtn = document.getElementById('submitBtn');
 const city_name = document.getElementById('city_name');
 const temp = document.getElementById('temp');
 const temp_status = document.getElementById('temp_status');


 const dataHide = document.querySelector('.middle_layer');

 const getInfo =async(event) => {
     event.preventDefault();
     let cityVal = cityName.value; 

     if(cityVal==="") {
         city_name.innerText = `Enter a city name...`;
         dataHide.classList.add('data_hide');
     }
     else {
         try{
          let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=44ff640e056ac33cd524bd360d0e2767`;
          const response = await fetch(url);
          const data =  await response.json();
          const arrData = [data];
          console.log(`${arrData[0].weather[0].id}`);

          city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}` ;
          temp.innerText = arrData[0].main.temp;
          const tempMood = arrData[0].weather[0].main ;
        //   Condition to check Sunny
        if(tempMood=== "Clear") {
            temp_status.innerHTML = "<i class='fas fa-sun' style = 'color: #eccc68 ; '></i>";
        } else if(tempMood==="Clouds") {
            temp_status.innerHTML = "<i class = 'fas fa-cloud' style='color:#f1f2f6;'></i>";
        } else if(tempMood==="Rain") {
            temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
        }  else {
            temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>"
        }
            dataHide.classList.remove('data_hide')
         } catch {
             city_name.innerText = `Enter a Valid City Name ?`
             dataHide.classList.add('data_hide');
         }
     }

    }
 submitBtn.addEventListener('click' , getInfo);
//  End of getting Temp from API

// change day dynamically
const  day = document.getElementById('day');
const getCurrentDay = ()=>{
    let weekday = new Array(7);
    weekday = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday"];
    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];
     day.innerText= days ; 
}
getCurrentDay();

// Change Time and month 


const getCurrentTime=()=>{
    let months = ["Jan","Feb","March","April","May","June","July","August","Sep","Oct","Nov","Dec"];
    var now=new Date();
    var month =months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear(); 

    let hours=now.getHours();
    let mins =now.getMinutes();
    let periods = "AM";
    if(hours>12){
        periods="PM"
        hours-=12;
    }
    if(mins<10){
        mins=`0${mins}`;
    }
    return    `${date} ${month} , ${hours}: ${mins}${periods}`
};
today_data.innerHTML=getCurrentTime()
// End of time and month js
