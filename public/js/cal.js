$(document).ready(function () {
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
      {
        "title": "CSS Meetup",
        "allday": "false",
        "description": "<p>This is just a fake description for the CSS Meetup.</p><p>Nothing to see!</p>",
        "start": moment().add('days', 27),
        "end": moment().add('days', 27),
        "url": "http://www.mikesmithdev.com/blog/migrating-from-asp-net-to-ghost-node-js/"
      }
    ]
  });
});