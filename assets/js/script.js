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

       
      // Loop through the working hours and create time blocks
      hours.forEach((hour, index) => {
        const timeblockRow = $("<div>").addClass("row");
        const hourSlot = $("<div>").addClass("hour col-1").text(hour);
        const userTask = $("<textarea>")
          .addClass("description col")
          .attr("data-index", index + 9)
          .text(tasksList[index]?.taskText || ""); // Populate with existing task text
        const saveTask = $("<button><i>")
          .addClass("saveBtn col-1 fas fa-save fa-2x")
          .css("color", "#ffffff");
  
        // Append the elements to the timeblock row and to the container
        timeblockRow.append(hourSlot, userTask, saveTask);
        $(".container").append(timeblockRow);
      });
    }
  
    // Call the function to create time blocks
    createHourBlocks(workingDayHours);

    
    // Highlight past, present, and future hours
    function highlightHours() {
        const currentHourInt = parseInt(currentDateTime.format("HH"));
    
        // Loop through all descriptions and apply appropriate CSS classes
        $(".description").each(function() {
          const hourInt = parseInt($(this).attr("data-index"));
          if (hourInt < currentHourInt) $(this).addClass("past");
          else if (hourInt === currentHourInt) $(this).addClass("present");
          else $(this).addClass("future");
        });
      }
    
      // Call the function to highlight hours
      highlightHours();
    
      // Save user task entries when save button is clicked
      $(".saveBtn").click(function() {
        const textarea = $(this).closest(".row").find("textarea");
        const taskTime = parseInt(textarea.attr("data-index"));
        const taskText = textarea.val().trim();
    
        if (taskText !== "") {
            // Retrieve existing user tasks or initialize an empty array
            const tasksList = JSON.parse(localStorage.getItem("userTasks")) || [];
            
            // Find the index of the task with the same time and remove it if it exists
            const taskIndex = tasksList.findIndex(task => task.taskTime === taskTime);
            if (taskIndex !== -1) tasksList.splice(taskIndex, 1);
      
            // Add the new task to the list and sort tasks by time
            tasksList.push({ taskTime, taskText });
            tasksList.sort((a, b) => a.taskTime - b.taskTime);
      
            // Store the updated task list in local storage
            localStorage.setItem("userTasks", JSON.stringify(tasksList));
          } else {
            alert("This task is empty, please enter a task and try again!");
          }
        });
      });
      