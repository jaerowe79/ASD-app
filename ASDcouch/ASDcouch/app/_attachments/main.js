//  Week 4
// ASD 1204
// Janis Jae Hines


$(document).ready(function () {	
	
	$('#couchdatabtn').bind('click', function(){
	$.ajax({
		url: '/kidtracks/_all_docs?include_docs=true&start_key="event1"&end_key="eventz"',
		dataType: 'json',
		success: function(data){
			$.each(data.rows, function(index, event){
				var id = "event" + event.doc.ename;
				var ename = event.doc.ename;
				var edate = event.doc.edate;
				var etime = event.doc.etime;
				var information = event.doc.information;
				var location = event.doc.location;
				$(
				'<ul data-role="listview">' +
				'<h4><a> '+ ename + '</a></h4>' +
				'<p> Date of Event: <a> '+ edate + '</a></p>' +
				'<p> Time of Event: <a> '+ etime + '</a></p>' +
				'<p> Addiitonal Information: <a> '+ information + '</a></p>' +
				'<p> Location of Event: <a> '+ location + '</a></p>' +
				'<br>' +
				'<a href="#" class="edit" id ="'+id+'" >Edit Event</a>' +
				'<a href="#" class="delete" id ="'+id+'"> Delete Event</a>' +
				'</ul>' 
				).appendTo('#couchdatalist');
			});
			$('couchdatalist').listview('refresh');
		}
	});
	});
	


	$('#home2').bind("pageshow", function() {
		$("#homeItems").empty();
		$.couch.db("kidtracks").view("app/events", {
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
	
	$('#couchdata').bind("pageshow", function() {
		var info = urlVars()["event"];
		var doc = "event" + event;
		$("#couchdatalist").empty();
		$.couch.db("kidtracks").openDoc(doc, {
			success: function(data) {
				console.log(data);
				ename = data.ename;
				edate = data.edate;
				etime = data.etime;
				information = data.information;
				location = data.location;
				$('#couchdatalist').append(
						$('<li>').append(
								$('<img>').attr("src", "kidtracks.png"))
									.append($('<h4>').text(ename))
									.append($('<p>').html('Date of Event: ' + edate + '</p>'))
									.append($('<p>').html('Time of Event: ' + etime + '</p>'))
									.append($('<p>').html('Additional Information: ' + information + '</p>'))
									.append($('<p>').html('Location of Event: ' + location + '</p>')));
			
							$('#couchdatalist').listview("refresh");
						$('#cancel').bind('click', function(){
							document.location.href = 'index.html';
					});
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
	
	
	//edit event
	 $('#edit').bind("pageshow", function() {
		var events = urlVars()[event];
		var	key = "event" + ename;
		$.mobile.changePage("index.html#addevent");
		$.couch.db("kidtracks").openDoc(key, {
		  success: function(data) {
			  ename = data.ename;
			  edate = data.edate;
			  etime = data.etime;
			  information = data.information;
			  location = data.location;
			  		$('#ename').val(ename);
			  		$('#edate').val(edate);
			  		$('#etime').val(etime);
			  		$('#information').val(information);
			  		$('#location').val(location);
			  	
			  	//validation
			  	$('#edit-item').bind('click', function () {
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
			        };
			        var ename = $('#ename').val();
			        var edate = $('#edate').val();
			        var etime = $('#etime').val();
			        var information = $('#information').val();
			        var location = $('#location').val();
			        var key = {
			        		"_id": "event" + ename,
			        		"_rev": data._rev,
			        		"ename": ename,
			        		"edate": edate,
			        		"etime": etime,
			        		"information": information,
			        		"location": location
			        		};
			        console.log(key);
			        $.couch.db("kidtracks").saveDoc(key, {
			        	success: function(data) {
			        		console.log(data);
			        		alert('Event has been updated!');
			        		document.location.href = "index.html";
			        	},
			        	error: function(status) {
			        		console.log(status);
			        		alert("Event was not updated.");
			        	}
			    });
			return false;
		  });
	 }
});
	
});
	 
	 $('#delete').bind('click', function(){
		 var deleteThis = $("#event").text();
		 var ask = confirm("Are you sure you want to delete?");
		 if(ask){
		 $.couch.db("kidtracks").openDoc(deleteThis,{
			 success: function(doc){
				 $.couch.db("kidtracks").removeDoc(doc, {
		 success: function(){
			 alert('Deleted!');
		 },
		 	error: function(){
		 		alert('ERROR!');
		 }
		});
	 }
});
		 	alert("Entry was deleted");
		 } else {
			 alert("Entry was not deleted");
		 }

	 });
	 
	 $('#deletetoo').bind('click', function(){
			var ask = alert('Delete this event?');
			if (ask) {
			$.couch.db('kidtracks').removeDoc(data, {
				success: function(data) {
					alert("Event removed!");
					document.location.href = 'index.html';
				},
				error: function(response) {
					console.log(response);
				}
			});
			}else{
				alert("Event not removed.");
				document.location.href = 'index.html';
			}
		});
				  	
		
	//Add event
	 $('#submit').bind('click', function(){
	 //validation
		 var getEname = $('#ename').val();
		 var getEdate = $('#edate').val();
	 if(getEname === "" ){
		 $('#ename').css('border', '3px solid yellow');
	 return false;
	 }
	 if(getEdate === ""){
		 $('#edate').css('border', '3px solid yellow');
	 return false;
	 }
	 else
	 {
		 $('#ename').css('border', '1px solid #ccc');
		 $('#edate').css('border', '1px solid #ccc');
		 $('#etime').css('border', '1px solid #ccc');
	 
		 //Save event 
	 var ename = $('#ename').val();
	 var edate = $('#edate').val();
	 var etime = $('#etime').val();
	 var information = $('#information').val();
	 var location = $('#location').val();
	 var doc = {
			 "_id": "event" + ename,
			 "edate": edate,
			 "etime": etime,
			 "information": information,
			 "location": location
	 		};
	 console.log(doc);
	 	$.couch.db("kidtracks").saveDoc(doc, {
	 		success: function(data) {
	 console.log(data);
	 	alert("Event was created!");
	 document.location.href = 'index.html';
	 },
	 error: function(status) {
		 console.log(status);
	 alert("Event was not created.");
	 }
});
	 return false;
	}
});
	 
	 // Reset button
	 $('#reset').bind('click', function(){
	 document.location.reload();
	 });
    
       
    
     

});  
    
 








