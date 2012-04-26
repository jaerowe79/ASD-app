//  Week 2
// ASD 1204
// Janis Jae Hines
// April 3, 2012
// lost all my code when I pushed to github and had to re copy


$(document).ready(function () {




 // JSON
$('#json').bind('click', function () {
    $('#saveddata').empty();
    $.ajax({
        url: 'xhr/data.json',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            for (var i = 0, j = result.events.length; i < j; i++) {
                var e = result.events[i];
                $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +
                '<p>Event Name: ' + e.ename + '</p>' +
                '<p>Date of Event: ' + e.edate + '</p>' +
                '<p>Time of Event: ' + e.etime + '</p>' +
                '<p>Additional Information: ' + e.information + '</p>' +
                '<p>Location of Event: ' + e.location + '</p>' +
                '</li>' + '<br>' '</ul>' +'</div>').appendTo('#saveddata');
        console.log(result);
       };
       }
    });
    return false;
   }); 
   
   
 // XML
$('#xml').bind('click', function () {
    $('#saveddata').empty();
    $.ajax({
        url: 'xhr/data.xml',
        type: 'GET',
        dataType: 'xml',
        success: function (xml) {
            $(xml).find("item").each(function () {
                var ename = $(this).find('ename').text();
                var edate = $(this).find('edate').text();
                var etime = $(this).find('etime').text();
                var information = $(this).find('information').text();
                var location = $(this).find('location').text();
                $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +
                '<p>Event Name: ' + ename + '</p>' +
                '<p>Date of Event: ' + edate + '</p>' +
                '<p>Time of Event: ' + etime + '</p>' +
                '<p>Additional Information: ' + information + '</p>' +
                '<p>Location of Event: ' + location + '</p>' +
                '</li>' + '<br>' + '</ul>' + '</div>').appendTo('#saveddata');
                 })
 }
    })
 });
 
 // Csv
$('#csv').bind('click', function () {
    $('#saveddata').empty();
    $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function (results) {
            var allTextLines = results.split(/[\r\n]+/);
            var headers = allTextLines[0].split(',');
            var lines = [];
            for (var i = 1; i < allTextLines.length; i++) {
                var response = allTextLines[i].split(',');
                if (response.length == headers.length) {
                    var events = [];
                    for (var j = 0; j < headers.length; j++) {
                        events.push(response[j]);
                    }
                    lines.push(events);
                }
            }
            for (var m = 0; m < lines.length; m++) {
                var e = lines[m];
                $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +               			   '<p>Event Name: ' + e[0] + '</p>');
               '<p>Date of Event: ' + e[1] + '</p>');
               '<p>Time of Event: ' + e[2] + '</p>');
               '<p>Additional Information: ' + e[3] + '</p>');
               '<p>Location of Event: ' + e[4] + '</p>');
           		'</li>' + '<br>' + '</ul>' + '</div>').appendTo('#saveddata');
        };
        },
    });
  });



    // Get events    
    function getEvents() {
        for (var i = 0, n = localStorage.length; i < n; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getEvents(key);
            value = value.split(',');
            var ename = value[0];
            var edate = value[1];
            var etime = value[2];
            var recurrencetype = value[3];
            var recurrence = value[4];
            var importance = value[5];
            var information = value[6];
            var location = value[7];
        };
     	getEvents();
     	// if I comment this section out, the form seems to work, otherwise it doesn't
	  //  $('#list')
	 // 	 .append($('<p>').text(value[0]));
	//	     .append($('<p>').text(value[1]));
	//	     .append($('<p>').text(value[2]));
	//	     .append($('<p>').text(value[3]));
	//	     .append($('<p>').text(value[4]));
	//	     .append($('<p>').text(value[5]));
	//	     .append($('<p>').text(value[6]));
	//	     .append($('<p>').text(value[7]));
	//	     .append($('<p>').text(" "));
	
     if (localStorage.getEvents()) {
         var clearLink = $('#clear').css('display', 'block');
     } else {
         var ename = $('#ename').val(ename);
         var edate = $('#edate').val(edate);
         var etime = $('#etime').val(etime);
         var recurrencetype = $('#recurrencetype').val(recurrencetype);
         var recurrence = $('#recurrence').val(recurrence);
         var importance = $('#importance').val(importance);
         var information = $('#information').val(information);
         var location = $('#location').val(location);
     }
     };
     // Save items
    function saveItems(id) {
        var ename = $('#ename').val();
        var edate = $('#edate').val();
        var etime = $('#etime').val();
        var recurrencetype = $('#recurrencetype').val();
        var recurrence = $('#recurrence').val();
        var importance = $('#importance').val();
        var information = $('#information').val();
        var location = $('#location').val();
        var allItems = [
        ename, edate, etime, recurrencetype, recurrence, importance, information, location ];
            localStorage.setItem(key, allItems);
           console.log(id);
           // location.reload();
    }    
    
    
     // Edit items function
     function editItem(id) {
         var itemId = id;
         var value = localStorage.getItem(itemId);
         value = value.split(',');
         var ename = value[0];
         var edate = value[1];
         var etime = value[2];
         var recurrencetype = value[3];
         var recurrence = value[4];
         var importance = value[5];
         var information = value[6];
         var location = value[7];
         console.log(itemId);
         $('#ename').val(ename);
         $('#edate').val(edate);
         $('#etime').val(etime);
         $('#recurrencetype').val(recurrencetype);
         $('#recurrence').val(recurrence);
         $('#importance').val(importance);
         $('#information').val(information);
         $('#location').val(location);
     }
     // Show edit, hide submit
    var editButton = $('#edit-event-button').css('display', 'block');
    var subresButtons = $('#submit-reset-buttons').css('display', 'none');
    var itemList = $('#list').css('display', 'none');
    // When click edit button
     function clickEdit() {
         var ename = $('#ename').val();
         var edate = $('#edate').val();
         var etime = $('#etime').val();
         var recurrencetype = $('#recurrencetype').val();
         var recurrence = $('#recurrence').val();
         var importance = $('#importance').val();
         var information = $('#information').val();
         var location = $('#location').val();
         var allItems = [
         ename, edate, etime, recurrencetype, recurrence, importance, information, location];
         if (ename !== "" && ename !== "Event Name" && edate !== "") {
             localStorage.setItem(id, allItems);
             location.reload();
         } else {
             alert("Event Name and Event Date fields are required.");
         }
     };
      $('#editevent').bind('click', (clickEdit));
      
     // Delete item function
     function deleteItem(id) {
         var ask = confirm("Are you sure?");
         if (ask) {
             localStorage.removeItem(itemId);
             window.location.reload();
         } else {
             alert("Track not removed.");
         }
     }
    //  Clear local storage
    $('#clear').bind('click', function () {
        localStorage.clear();
        location.reload();
        alert("Local storage cleared.");
    });
       
         // Clear index button event
    $('#index-clear').bind('click', function () {
        location.reload();
    });
    
     // Hide edit button
      $('#editevent').css('display', 'none');
    
    
     // Validate form  works
    $('#submit').bind('click', function () {
        var getEname = $('#ename').val();
        var getEdate = $('#edate').val();
        var getEtime = $('#etime').val();
        if (getEname === "") {
            $('#ename').css('border', '3px solid yellow');
            return false;
        }
        if (getEdate === "") {
            $('#edate').css('border', '3px solid yellow');
            return false;
        }
        if (getEtime === "") {
            $('#etime').css('border', '3px solid yellow');
            return false;
        } else {
            $('#ename').css('border', '1px solid #ccc');
            $('#edate').css('border', '1px solid #ccc');
            $('#etime').css('border', '1px solid #ccc');
            alert("Kid Track has been stored.");
            saveItems();
        }
    });

 
 });