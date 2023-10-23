// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Display the current day at the top of the calendar
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Generate timeblocks for standard business hours
  var startHour = 9;
  var endHour = 17;
  var currentTime = dayjs().hour();

  for (var hour = startHour; hour <= endHour; hour++) {
    if (hour >= startHour && hour <= endHour) {
      var timeBlockEl = $("<div>").addClass("row time-block");
      var hourEl = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs().hour(hour).format("hA"));
      var descriptionEl = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("id", "hour-" + hour);
      var saveBtnEl = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);

      // Set the color coding for each timeblock
      if (hour < currentTime) {
        timeBlockEl.addClass("past");
      } else if (hour === currentTime) {
        timeBlockEl.addClass("present");
      } else {
        timeBlockEl.addClass("future");
      }

      // Retrieve saved event from local storage and set the value of the textarea
      var savedEvent = localStorage.getItem("hour-" + hour);
      if (savedEvent) {
        descriptionEl.val(savedEvent);
      }

      // Add event listener to save button
      saveBtnEl.on("click", function () {
        var timeBlockId = $(this).siblings(".description").attr("id");
        var eventText = $(this).siblings(".description").val();
        localStorage.setItem(timeBlockId, eventText);
        console.log("Event saved:", timeBlockId, eventText);
      });

      $(".container-lg").append(timeBlockEl);
    }
  }
});
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
