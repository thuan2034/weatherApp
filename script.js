const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "DDJABBRFKYGHPK2MR2UKXYXYG";
const cityname= document.querySelector("#city-name");
const temperature= document.querySelector("#temperature");
const humidity= document.querySelector("#humidity");
const wind= document.querySelector("#wind-speed");
const description= document.querySelector("#description");
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const searchname = document.querySelector("#city-input").value; // Get the value of the input field
  console.log(searchname); // Log the city name to the console (for debugging)
  // You can add code here to handle the form submission, such as sending the city name to a server or updating the UI
  fetch(
    `${apiUrl}${searchname}?unitGroup=metric&key=${apiKey}`, // Construct the API URL with the city name and API key
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      // Check if the response was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON data and return the promise
    })
    .then((data) => {
      console.log(data); // Work with the parsed JSON data
      // Update the UI with the weather data
      cityname.innerHTML = `Location: ${data.resolvedAddress}`;
      temperature.innerHTML = `Temperature: ${data.currentConditions.temp}°C`;
      humidity.innerHTML = `Humidity: ${data.currentConditions.humidity}%`;
      wind.innerHTML = `Wind: ${data.currentConditions.windspeed} km/h`;
      description.innerHTML = `Description: ${data.description}`;
    })
    .catch((err) => {
      console.error(err);
      cityname.innerHTML = "Error: City not found. Please try again.";
    });
};
const searchButton = document.querySelector("#search-button"); // Select the submit button
searchButton.addEventListener("click", handleSubmit); // Add an event listener to the button to call handleSubmit when clicked
