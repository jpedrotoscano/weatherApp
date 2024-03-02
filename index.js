const getDate = () => {

    const date = Date().split(' ')

    switch(date[0]) {
        case "Mon":
            weekDay.innerHTML = "Monday"
            nextDay1.innerHTML = "Tue"
            nextDay2.innerHTML = "Wed"
            nextDay3.innerHTML = "Thu"
            break
        case "Tue":
            weekDay.innerHTML = "Tuesday"
            nextDay1.innerHTML = "Wed"
            nextDay2.innerHTML = "Thu"
            nextDay3.innerHTML = "Fri"
            break
        case "Wed":
            weekDay.innerHTML = "Wednesday"
            nextDay1.innerHTML = "Thu"
            nextDay2.innerHTML = "Fri"
            nextDay3.innerHTML = "Sat"
            break
        case "Thu":
            weekDay.innerHTML = "Thursday"
            nextDay1.innerHTML = "Fri"
            nextDay2.innerHTML = "Sat"
            nextDay3.innerHTML = "Sun"
            break
        case "Fri":
            weekDay.innerHTML = "Friday"
            nextDay1.innerHTML = "Sat"
            nextDay2.innerHTML = "Sun"
            nextDay3.innerHTML = "Mon"
            break
        case "Sat":
            weekDay.innerHTML = "Saturday"
            nextDay1.innerHTML = "Sun"
            nextDay2.innerHTML = "Mon"
            nextDay3.innerHTML = "Tue"
            break
        case "Sun":
            weekDay.innerHTML = "Sunday"
            nextDay1.innerHTML = "Mon"
            nextDay2.innerHTML = "Tue"
            nextDay3.innerHTML = "Wed"
            break
    }
    
    currentDate.innerHTML = date[1] + " " + date[2] + " " + date[3]
}    

function getInfo() {
	navigator.geolocation.getCurrentPosition(position => {
		const { latitude, longitude } = position.coords
		const locationURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        const currentWeatherURL = `http://api.weatherapi.com/v1/current.json?&q=${latitude},${longitude}&key=e590b027b83e40359a911520240203`
        const weatherForecastURL = `http://api.weatherapi.com/v1/forecast.json?days=4&q=${latitude},${longitude}&key=e590b027b83e40359a911520240203`

		fetch(locationURL).then(res => res.json()).then(data => {
            currentLocation.innerHTML = data.address.city + ", " + data.address.country
		}).catch(() => {
            console.log("Error fetching data from geolocation api")
		})
        fetch(currentWeatherURL).then(res => res.json()).then(data => {
            currentTemp.innerHTML = data.current.temp_c + "°"
            currentCondition.innerHTML = data.current.condition.text
            currentPrecipitation.innerHTML = data.current.precip_in + " %"
            currentHumidity.innerHTML = data.current.humidity + " %"
            currentWindSpeed.innerHTML = data.current.wind_kph + " km/h"
        }).catch(() => {
            console.log("Error fetching data from weather api")
        })
        fetch(weatherForecastURL).then(res => res.json()).then(data => {
            tempNextDay1.innerHTML = Math.round((data.forecast.forecastday[1].day.maxtemp_c + data.forecast.forecastday[1].day.mintemp_c) / 2) + "°"
            tempNextDay2.innerHTML = Math.round((data.forecast.forecastday[2].day.maxtemp_c + data.forecast.forecastday[2].day.mintemp_c) / 2) + "°"
            tempNextDay3.innerHTML = Math.round((data.forecast.forecastday[3].day.maxtemp_c + data.forecast.forecastday[3].day.mintemp_c) / 2) + "°"
        }).catch(() => {
            console.log("Error fetching forecast data from weather api")
        })
	})
}

getLocation.addEventListener("click", () => {
	getInfo()
})

getDate()