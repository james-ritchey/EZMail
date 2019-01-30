var dateVal;

$(document).ready(function () {

  var jsonData;
  $.get("/api/email", function (data) {
    jsonData = data;
    console.log(jsonData);
    data.forEach(element => {
      $("#email-data").append(`
    <tr>
    <td>${element.From}</td>
    <td>${element.Subject}</td> 
    <td>${element.SendDate}</td>
  </tr>`
      );
    });
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

  $('#timepicker').timepicker({
    timeFormat: 'h:mm p',
    interval: 15,
    minTime: '10',
    maxTime: '6:00pm',
    defaultTime: '11',
    startTime: '10:00',
    dynamic: true,
    dropdown: true,
    scrollbar: true
  });
});



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
      $("#bcc").val("");
      $("#subject").val("");
      $("#message-body").val("");

    });
  // need to figure out why modal is not closing
  $("bootstrapModalFullCalendar").modal("close");
  return false;
});
// #schedule-email
// #update-email
// #delete-email
