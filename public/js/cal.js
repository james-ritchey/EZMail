var dateVal;
$(document).ready(function () {
  var jsonData;
  $.get("/api/email", function (data) {
    jsonData = data;
    console.log(jsonData);
  });


  $('#bootstrapModalFullCalendar').fullCalendar({
    dayClick: function (date, jsEvent, view) {
      dateVal = date._d;
      $(this).css('background-color', 'red');
      $("#fullCalModal").modal("show");
    },
    aspectRatio: 3,
    height: 'auto',
    header: {
      left: 'prev next',
      center: 'title',
      right: 'listDay listWeek month'
    },
    views: {
      listDay: { buttonText: 'list day' },
      listWeek: { buttonText: 'list week' }
    },
    navLinks: true,
    editable: true,
    events: jsonData,
  });

  $("#time").timePicker();
});


// buttons to call routes
var userEmail;

$(".submit").on("click", function (event) {
  event.preventDefault();
  console.log(dateVal);
  var email = {
    To: $("#email-to").val().trim(),
    From: userEmail,
    Subject: $("#subject").val().trim(),
    Body: $("#message-body").val().trim(),
    SendDate: dateVal
  };

  console.log(email);

  $.post("/api/email", email,
    function (data) {
      alert("Your email has been scheduled!")
      // Clear the form when submitting
      $("#email-to").val("");
      $("#subject").val("");
      $("#message-body").val("");

    });

});
// #schedule-email
// #update-email
// #delete-email
