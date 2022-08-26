// Elements
const searchField = document.querySelector('input')
const searchBtn = document.querySelector('button')
const message = document.querySelector('.message')

// Getting Data
searchBtn.addEventListener('click', () => {
    const searchTerm = searchField.value

    // Getting Forecast
    fetch(`/forecast?address=${searchTerm}`)
    .then((response) => {
        response.json()
        .then((data) => {
            // Handling Error
            if (data.error) {
                message.textContent = data.error
                return
            }

            // Handling Data
            message.textContent = `Forecast for ${data.location} is Temperature: ${data.temperature}, Humidity: ${data.humidity}, Pressure: ${data.pressure}`
        })
        .catch((error) => {
            // Handling Error
            message.textContent = 'Unkown Error Occured'
        })
    })
    .catch((error) => {
        // Handling Error
        message.textContent = 'Unkown Error Occured'
    })
})