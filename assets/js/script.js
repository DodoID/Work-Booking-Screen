$(document).ready(function() {
    // Extended dayjs with the advanced format plugin
    dayjs.extend(window.dayjs_plugin_advancedFormat);

     // Defined working day hours as an array of strings
     const workingDayHours = [
        "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
      ];
    
      // To display the current date
      const currentDateTime = dayjs();
      $("#currentDay").text(currentDateTime.format("[Today is:] dddd[,] MMMM Do"));
      // To display the current hour
    const currentHour = currentDateTime.format("[Current hour:] HH:mm");
    $("header").append("<p class='currentHour'>" + currentHour + "</p>");
    
  
    // Created time blocks for each working hour
    function createHourBlocks(hours) {
    
    // For retrieving user tasks from local storage or initialize an empty array
      const tasksList = JSON.parse(localStorage.getItem("userTasks")) || [];