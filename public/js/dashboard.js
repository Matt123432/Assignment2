"use strict";

const $ = (selector) => document.querySelector(selector);

let timer;


const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const onReset = (evt) => {
  //TODO:: Reset the reset-able fields
  resetErrors();

  $("#notifications").checked = true;

  $("#eco").checked = true;
  $("#temperature").value = 21;
  $("#location").value = "L7W 4T8";

  evt.preventDefault();
};

const resetErrors = () => {
  $("#temperature_error").textContent = "";
  $("#location_error").textContent = "";
  console.error("Fields Reset");
};

const onSubmit = (evt) => {
  //TODO::Reset any errors before submitting
  resetErrors();

let hour =$("#hour").value;
let minutes =$("#minutes").value;
let second =$("#seconds").value;


  //TODO:: Set notifications since it doesn't need to be validated
  let notificationsOn = $("#notifications").checked;

  $("#setting_notifications").textContent = notificationsOn ? "On" : "Off";

  //TODO:: Set lighting mode with a for loop since it doesn't need to be validated
  //querySelectorAll returns an array of everything that matches the argument
  let lightingModeOptions = document.querySelectorAll("[name='lighting_mode']");

  for (let i = 0; i < lightingModeOptions.length; i++) {
    if (lightingModeOptions[i].checked) {
      //Set setting_lighting_mode to the value of the selected radio button
      $("#setting_lighting_mode").textContent = lightingModeOptions[i].value;
    }
  }

  //TODO:: Validate the postal code with the Regular Expression,
  //TODO:: Display an error if not valid
  let location = $("#location").value;

  if (postalRegEx.test(location)) {
    //if the postal code is valid this code will run
    $("#setting_location").textContent = location;
  } else {
    //Add your logic here if the postal code is not valid
    $("#location_error").textContent =
      "The postal code did not match the format required.";
  }

  //TODO:: Validate the temperature by checking the range and if it's a number
  //TODO:: Display an error if not valid
  let temperature = $("#temperature").value;
  let temperatureError = $("#temperature_error");

  if (isNaN(temperature) || temperature == "") {
    temperatureError.textContent = "This is not a valid temperature selection.";
  } else if (temperature > 25) {
    temperatureError.textContent =
      "Max temperature is 25C, setting temperature to Max";
    $("#setting_temperature").textContent = 25;
  } else if (temperature < 10) {
    temperatureError.textContent =
      "Min temperature is 10C, setting temperature to Min";
    $("#setting_temperature").textContent = 10;
  } else {
    $("#setting_temperature").textContent = temperature;
  }

  //reads if there is a timer value
  //if there is one it starts the interval timer and
  //sets the setting temperature to the one on the time limit
  //intervall timer calls timed temp
  if((hour>0)||(minutes>0)||(second>0)){
    timer = setInterval(Timed_Temp,1000);
    $("#setting_temperature").textContent = $("timed_temperature").value
  }

  evt.preventDefault();
};


//counts down and move hours into minutes into seconds
//updates remaning time every second
//when timer is done sets temp back to original setting
const Timed_Temp = (evt) =>{
  if((hour>0)&&(minutes==0)){
    hour = hour -1;
    minutes = 60;
  }

  if((minutes>0)&&(second==0)){
    minutes = minutes -1;
    second = 60;
  }

  if(!(hour>0)||(minutes>0)||(second>0)){
    clearInterval(timer);

  }

  second = second - 1;
  $("setting_time").textContent = hour,minute,second
  console.log(second);
  $("#setting_temperature").textContent = $("#temperature").value;
  evt.preventDefault();
}



document.addEventListener("DOMContentLoaded", () => {
  //TODO:: Add current date
  $("#date_display").textContent = new Date().toDateString();
  //TODO:: Add Reset Form listener
  $("#reset_form").addEventListener("reset", onReset);
  //TODO:: Add Submit Form listener
  $("#update_settings").addEventListener("click", onSubmit);

});
