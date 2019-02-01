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
    events: function (start, end, timezone, callback) {
      var events = [];
      $.get("/api/email", function (data) {
        data.forEach(element => {
          events.push({
            id: element.id,
            title: element.Subject,
            start: element.SendDate,
            end: moment().format(element.SendDate, "YYYY-MM-DD HH:mm")

          })
        })
        console.log(events);
      });
      callback(events);
    },
    color: "#33cccc",
    textColor: "white",
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

var userEmail = localStorage.getItem("userEmail");

$(".submit").on("click", function (event) {
  event.preventDefault();
  var timeSet = $("#timepicker").val();
  var time = timeSet.split(" ");
  var hourMin = time[0].split(":");

  if (time[1] === "PM" && hourMin[0] !== "12") {
    var tempTime = parseInt(hourMin[0]) + 12;
    hourMin[0] = tempTime.toString();
  };
  hourMin = hourMin.join(":");
  console.log("timeSet " + hourMin);
  dateVal = dateVal.toString().replace("19:00", hourMin);
  console.log("New Date " + dateVal)

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
