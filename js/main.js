//Janis Jae Hines
// ASD Project 1
// Term 1204
// March 30, 2012

var parseEventForm = function(data){
    console.log(data);
};

$(document).ready(function() {
    
    var rbform = $('#addeventform');
        addeventerrorslink = $('#addeventerrorslink')
    ;
    
    rbform.validate({
        invalidHandler: function(form, validator){
            addeventerrorslink.click();
            for(var key in validator.submitted){
                var label = $('label[for^="'+ key +'"]').not('[generated]');
                label.closest('fieldset').find('ui-controlgroup-label')
            };
            },

        submitHandler: function(){
            var data = rbform.serializeArray();
            parseEventForm(data);
        }
    });
});



// Save form data to Local Storage
$('#submit').live('click', function saveLS(id) {
    var dt = new Date();
    var key = (dt.getTime());
    var toe = $("#toe").val();
    var name = $("#name").val();
    var date = $("#date").val();
    var time = $("#time").val();
    var loi = $("#loi").val();
    var notes = $("#notes").val();
    var event = [toe, name, date, time, loi, notes];
    localStorage.setItem(key, event);
    location.reload();
    alert("The event been saved.");
});

//Turns on/off the form so it can display the data from Local Storage
function toggleCtrl(t) {
    switch (t) {
    case "on":
        $('#addeventform').css('display', 'none');
        break;
    case "off":
        $('#addeventform').css('display', 'block');
        break;
    default:
        return false;
    }
}

// Data from Local Storage
$('#showData').live('click', function getData() {
toggleCtrl("on"); //turn off form to display data
    var getData = $('#data')[0];
    
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        value = value.split(',');
       
        $('<div>').attr({'class': 'eventDiv'}).appendTo('#data');
        $('<p>').html('Type of Event: ' + value[0]).appendTo('.eventDiv');
        $('<p>').html('Name of Event: ' + value[1]).appendTo('.eventDiv');
        $('<p>').html('Date of Event: ' + value[2]).appendTo('.eventDiv');
        $('<p>').html('Time of Event: ' + value[3]).appendTo('.eventDiv');
        $('<p>').html('Level of Importance: ' + value[4]).appendTo('.eventDiv');
        $('<p>').html('Notes: ' + value[5]).appendTo('.eventDiv');
        
        //edit or delete links
        $('<p>').html($('<a>').attr({'href': '#','onclick': 'deleteEvent(' + key + ');'}).html('Delete Event')).appendTo('.eventDiv');
        $('<p>').html($('<a>').attr({'href': '#','onclick': 'editEvent(' + key + ');'}).html('Edit Event')).appendTo('.eventDiv');
        $('<br>').html('').appendTo('.eventDiv');
    }
});

// Edit data from Local Storage
function editEvent(id) {
    var eventId = id;
var value = localStorage.getItem(eventId);
value = value.split(',');

toggleCtrl("off"); //turn off form

    var toe = value[0];
    var name = value[1];
    var date = value[2];
    var time = value[3];
    var loi = value[4];
    var notes = value[5];

    $('#toe').val(toe);
    $('#name').val(name);
    $('#date').val(date);
    $('#time').val(time);
    $('#loi').val(loi);
    $('#notes').val(notes);

    //edit/submit buttons
    var edit = $('#editButton').css('display', 'block');
    var submit = $('#addSubmit').css('display', 'none');
    var apptList = $('#data').css('display', 'none');

    // Changes made to Local Storage when you click the edit button.
    $('#editEvent').live('click', function editEvent() {
        var toe = $('#toe').val();
        var name = $('#name').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var loi = $('#loi').val();
        var notes = $('#notes').val();
        var event = [toe, name, date, time, loi, notes];
        //updates Local Storage
        localStorage.setItem(eventId, event);
		//reload after changes
        location.reload();
        alert("Your Event has been changed.");
        
    });
}
// Removes event from storage 
function deleteEvent(id) {
    var question = confirm("Your event will be removed from storage.");
    if (question) {
        localStorage.removeItem(id);
        window.location.reload();
    } else {
        alert("Your event will not be removed.");
    }
}

//Clears storage
function cls() {
    if (localStorage.length === 0) {
        alert("Sorry, no events stored.");
    } else {
        var question = confirm ("This will erase all events, are you sure?");
            if (question){
                localStorage.clear();
                alert("All events have been erased from memory.");
                window.location.reload();
                return false;
            } else {
               alert("Events are still saved.");
            }
    }
}