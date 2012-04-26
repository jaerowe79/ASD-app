//  Week 4
// ASD 1204
// Janis Jae Hines

 $(document).ready(function () {
	 
	 $db = $.couch.db('kidtracks');
	 
	 $.ajaxSetup ({
		 cache : false
		 });

	$('#home2').live("pageshow", function() {
		$("#homeItems").empty()
		$db.view("app/events", {
			success: function(data) {
				$('#homeItems').empty();
				$.each(data.rows, function(index, event) {
					var item = (event.value || event.doc);
				$('#homeItems').append(
						$('<li>').append(
								$('<a>')
									.attr("href", "events.html?events=" + item.ename)
									.text(item.ename)
						)
					);
				});
		$('#homeItems').listview('refresh');
	  }
	});
	});
	
	var urlVars = function(urlData) {
		var urlData = $($.mobile.activePage).data("url");
		var urlParts = urlData.split('?');
		var urlPairs = urlParts[1].split('&');
		var urlValues = {};
		for (var pair in urlPairs) {
			var keyValue = urlPairs[pair].split('=');
			var key = decodeURIComponent(keyValue[0]);
			var value = decodeURIComponent(keyValue[1]);
			urlValues[key] = value;
		}
		return urlValues;	
	};
	
	$('#events').live("pageshow", function() {
		var events = urlVars()["events"];
			key: "ename" + events
			function handleDocumentReady()
	      {
	          refreshEvents();
	      }
	 
	      function refreshEvents()
	      {
	          $("#eventdetails").empty();
	          $db.view("app/events", {
	             success: function( data ) {
	                    var i;
	                    var ename;
	                    var edate;
	                    var etime;
	                    var information;
	                    var location;
	                    for( i in data.rows )
	                    {
	                        event = data.rows[i].value;
	                        ename = event.ename;
	                        edate = event.edate;
	                        etime = event.etime;
	                        information = event.information;
	                        location = event.location;
	                        listItem = $("<li>", {
	                        				class: "event"
	                        });
	                        
	                        header = "<h4>" + ename + "</h4>";
	                        eventLink = $('<a>', {
	                                    href: 'eventview',
	                                    "data-identity": event._id,
	                                    click: function() {
	                                    	eventId = $(this).data("identity");
	                                    	}
	                                    });
                        	eventLink.append(header);
                        	listItem.append(eventLink);
                        	// listItem.append('<p> Date of Event: ' + edate + '</p>');
                        	// listItem.append('<p> Time of Event: ' + etime + '</p>');
                        	// listItem.append('<p> Additional Information: ' + information + '</p>');
                        	// listItem.append('<p> Location of Event: ' + location + '</p>' + '<br>');
	                        $("#eventdetails").append( listItem );
	                    }
	                    $("#eventdetails").listview( "refresh" );
	                }
	            });
	      }
	 
	      $(document).ready( handleDocumentReady );
	 
		});
	
	//couch data import works perfectly
	$('#couchdatabtn').bind('click', function(){
	$.ajax({
		url: '/kidtracks/_all_docs?include_docs=true&start_key="event1"&end_key="eventz"',
		dataType: 'json',
		success: function(data){
			$.each(data.rows, function(index, event){
				var ename = event.doc.ename;
				var edate = event.doc.edate;
				var etime = event.doc.etime;
				var information = event.doc.information;
				var location = event.doc.location;
				$(
				'<ul data-role="listview">' +
				'<h3>' + ename +'</h3>' +
				'<p> Date of Event: <a> '+ edate + '</a></p>' +
				'<p> Time of Event: <a> '+ etime + '</a></p>' +
				'<p> Additional Information: <a> '+ information + '</a></p>' +
				'<p> Location of Event: <a> '+ location + '</a></p>' +
				'</ul>' + '<br>'
				)
				.appendTo('#couchdatalist');
			});
			$('couchdatalist').listview('refresh');
		}
	});
	});
	

       
 // Clear index button event
    $('#index-clear').bind('click', function () {
        location.reload();
    });
    
 // Reset button
    $('#reset').bind('click', function(){
    document.location.reload();
    });
       
    
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
            location.reload();
        }
    });


 //   // JSON
 //   $('#json').bind('click', function () {
 //       $('#saveddata').empty();
 //       $.ajax({
 //          url: 'data.json',
 //           type: 'GET',
  //          dataType: 'json',
  //          success: function (result) {
  //              for (var i = 0, j = result.events.length; i < j; i++) {
  //                 var e = result.events[i];
  //                  $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +
  //                  '<p>Event Name: ' + e.ename + '</p>' +
  //                  '<p>Date of Event: ' + e.edate + '</p>' +
   //                 '<p>Time of Event: ' + e.etime + '</p>' +
   //                 '<p>Additional Information: ' + e.information + '</p>' +
   //                 '<p>Location of Event: ' + e.location + '</p>' +
   //                 '</li>' + '<br>' + '</ul>' +'</div>').appendTo('#saveddata');           };
   //        }
   //     });
   //    return false;
   //    }); 

  
    // XML
//    $('#xml').bind('click', function () {
//        $('#saveddata').empty();
//        $.ajax({
//            url: 'data.xml',
//            type: 'GET',
//            dataType: 'xml',
//            success: function (xml) {
 //               $(xml).find("event").each(function () {
 //                   var ename = $(this).find('ename').text();
 //                   var edate = $(this).find('edate').text();
 //                   var etime = $(this).find('etime').text();
 //                   var information = $(this).find('information').text();
 //                   var location = $(this).find('location').text();
 //                   $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +
 //                   '<p>Event Name: ' + ename + '</p>' +
 //                   '<p>Date of Event: ' + edate + '</p>' +
 //                   '<p>Time of Event: ' + etime + '</p>' +
 //                   '<p>Additional Information: ' + information + '</p>' +
 //                   '<p>Location of Event: ' + location + '</p>' +
 //                   '</li>' + '<br>' + '</ul>' + '</div>').appendTo('saveddata');
 //                    })
 //    }
 //       })
 //    });
    
    
    // Csv
 //   $('#csv').bind('click', function () {
 //       $('#saveddata').empty();
 //       $.ajax({
 //           type: "GET",
 //           url: "data.csv",
 //           dataType: "text",
 //           success: function (results) {
 //               var allTextLines = results.split(/[\r\n]+/);
 //               var headers = allTextLines[0].split(',');
 //               var lines = [];
 //               for (var i = 1; i < allTextLines.length; i++) {
 //                   var response = allTextLines[i].split(',');
 //                   if (response.length == headers.length) {
  //                      var events = [];
  //                      for (var j = 0; j < headers.length; j++) {
  //                          events.push(response[j]);
  //                      }
  //                      lines.push(events);
  //                  }
  //              }
  //              for (var m = 0; m < lines.length; m++) {
  //                  var e = lines[m];
  //                  $('<div data-role="content">' + '<ul data-role="listview">' + '<li>' +               			   '<p>Event Name: ' + e[0] + '</p>');
  //                  '<p>Event Name: ' + e[0] + '</p>' +
  //                  '<p>Date of Event: ' + e[1] + '</p>' +
  //                  '<p>Time of Event: ' + e[2] + '</p>' +
  //                  '<p>Additional Information: ' + e[3] + '</p>' +
  //                  '<p>Location of Event: ' + e[4] + '</p>' +
  //             	    '</li>' + '<br>' + '</ul>' + '</div>').appendTo('#saveddata');
  //          };
  //          };
   //     });
   //   });
 
 });









