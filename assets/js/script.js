$(document).ready(function() {
    // Extend dayjs with the advanced format plugin
    dayjs.extend(window.dayjs_plugin_advancedFormat);

     // Define working day hours as an array of strings
     const workingDayHours = [
        "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
      ];
    
      // Display the current date
      const currentDateTime = dayjs();
      $("#currentDay").text(currentDateTime.format("[Today is:] dddd[,] MMMM Do"));
      