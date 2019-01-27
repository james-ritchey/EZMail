$(document).ready(function () {
  var jsonData;
  $.get("/api/email", function (data) {
    jsonData = data;
    console.log(jsonData);
  });

  $('#bootstrapModalFullCalendar').fullCalendar({
    dayClick: function (date, jsEvent, view) {
      $(this).css('background-color', 'red');
      $("#fullCalModal").modal("show");
    },
    height: 'auto',
    header: {
      left: '',
      center: 'prev title next',
      right: ''
    },
    events: [

    ]
  });
});