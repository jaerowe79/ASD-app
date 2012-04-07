// Week 2 
// ASD 1204 
// Janis Jae Hines 
// April 3, 2012 



$('#page').live('pageinit', function(){



// Get items

function getEvents(){
	for(var i=0, n = localStorage.length; i < n; i++){
		var key = localStorage.key(i);
		var value = localStorage.getEvent(key);
		value = value.split(',');
		var ename = value[0];
		var edate = value[1];
		var etime = value[2];
		var recurrencetype = value[3];
		var recurrence = value[4];
		var importance = value[5];
		var information = value[6];
		var location = value[7];
	}
};
	
getEvents();


$('#list'){
	.append($('<p>').text(value[0]))
	.append($('<p>').text(value[1]))
	.append($('<p>').text(value[3]))
	.append($('<p>').text(value[2]))
	.append($('<p>').text(value[4]))
	.append($('<p>').text(value[5]))
	.append($('<p>').text(value[6]))
	.append($('<p>').text(value[7]))
	.append($('<p>').text(" "))
	.append($("<a>").attr( "href", "#").attr("onclick", "deleteEvent(" + key + ");").attr("data-role", "button").attr("data-icon", "delete").text("Delete").attr("data-theme", "c").attr("data-inline", "true"))
	.append($("<a>").attr( "href", "#").attr("onclick", "editEvent(" + key + ");").attr("data-role", "button").attr("data-icon", "gear").text("Edit Event").attr("data-theme", "b").attr("data-inline", "true")
	);
	}
if(localStorage.getEvent('apptitle')){
	var clearLink = $('#clear').css('display', 'block');
	}else{
	var ename = "";
	var edate = "";
	var etime = "";
	var ename = $('#ename').val(ename);
	var edate = $('#edate').val(edate);
	var etime = $('#etime').val(etime);
	var recurrencetype = $('#recurrencetype').val(recurrencetype);
	var recurrence = $('#recurrence').val(recurrence);
	var importance = $('#importance').val(importance);
	var information = $('#information').val(information);
	var location = $('#location').val(location);

	}
}
	
	
// Save items
	function saveItems(id){
	    var ename = $('#ename').val();
	    var edate = $('#edate').val();
	    var etime = $('#etime').val();
	    var recurrencetype = $('#recurrencetype').val();
	    var recurrence = $('#recurrence').val();
	    var importance = $('importance').val();	
	    var information = $('#information').val();
		var location = $('#location').val();
		var allItems = [
			ename,
			edate,
			etime,
			recurrencetype,
			recurrence,
			importance,
			information,
			location,
		];
	localStorage.setItem(key, allItems);
	location.reload();
	}


// Edit items function
	function editItem(id){
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



// Show edit, hide submit
	var editButton = $('#edit-item-button').css('display', 'block');
	var subresButtons = $('#submit-reset-buttons').css('display', 'none');
	var itemList = $('#list').css('display', 'none');


//When click edit button
	function clickEdit(){
	var ename = $('#ename').val();
	var edate = $('#edate').val();
	var etime = $('#etime').val();
	var recurrencetype = $('#recurrencetype').val();
	var recurrence = $('#recurrence').val();
	var importance = $('#importance').val();
	var information = $('#information').val();
	var location = $('#location').val();
	var allItems = [
		ename,
		edate,
		etime,
		recurrencetype,
		recurrence,
		importance,
		information,
		location,
	];
	if(ename != "" && ename != "Event Name" && edate != ""){
	localStorage.setItem(itemId, allItems);
	location.reload();
	}else{
	alert("Event Name and Event Date fields are required.");
	}
	};
$('#edit-item').bind('click', clickEdit);
}


// Delete item function	
	function deleteItem(id){
	var ask = confirm("Are you sure?");
	if(ask){
	localStorage.removeItem(id);
	window.location.reload();
	}else{
	alert("Track not removed.");
	}
	}

// Clear local storage
	$('#clear').bind('click', function(){
	localStorage.clear();
	location.reload();
	return false;
	});


// Clear index button event
	$('#index-clear').bind('click', function(){
	location.reload();
	return false;
	});

// Hide edit button
	$('#edit-item-button').css('display', 'none');

// Validate form
	$('#submit').bind('click', function(){
	var getEname = $('#ename').val();
	var getEdate = $('#edate').val();
	var getEtime = $('#etime').val();
	if(getEname == ""){
	$('#ename').css('border', '3px solid yellow');
	return false;
	}
	if(getEdate == ""){
	$('#edate').css('border', '3px solid yellow');
	return false;
	}
	if(getEtime == ""){
	$('#etime').css('border', '3px solid yellow');
	return false;
	}else{
	$('#ename').css('border', '1px solid #ccc');
	$('#edate').css('border', '1px solid #ccc');
	$('#etime').css('border', '1px solid #ccc');
	alert("Kid Track has been stored.");
	saveItems();
	}
	});
	
});




// JSON 
	$('#json').live('click', function(){
	$('#static').empty();
	$.ajax({
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
		         for (var i=0, j=response.neweventform.length; i<j; i++){
					var e = response.neweventform[i];
					$("#static").append('<li data-role="list-divider">JSON DATA</li>');
					$("#static li:last-child").append('<p>' + e.ename + '</p>');
					$("#static li:last-child").append('<p>' + e.edate + '</p>');
					$("#static li:last-child").append('<p>' + e.etime + '</p>');
					$("#static li:last-child").append('<p>' + e.recurrencetype + '</p>');
					$("#static li:last-child").append('<p>' + e.recurrences + '</p>');
					$("#static li:last-child").append('<p>' + e.importance + '</p>');
					$("#static li:last-child").append('<p>' + e.information + '</p>');
					$("#static li:last-child").append('<p>' + e.location + '</p>');
					$("#static").listview("refresh");
				}
			}
		});
	  return false;
	});
	
	
// XML 

$('#xml').live('click', function(){
$('#static').empty();
$.ajax({
	url: 'xhr/data.xml',
	type: 'GET',
	dataType: 'xml',
	success: function(xml){
		$(xml).find("item").each(function(){
		    var ename = $(this).find('ename').text();
		    var edate = $(this).find('edate').text();
		    var etime = $(this).find('etime').text();
		    var recrrencetype = $(this).find('recurrencetype').text();
		    var recurrences = $(this).find('recurrences').text();
		    var importance = $(this).find('importance').text();
		    var information = $(this).find('information').text();
		    var location = $(this).find('location').text();
		    $("#static").append('<li data-role="list-divider">XML DATA</li>')
		     $("#static").append('<li data-theme=c></li>');
		     $("#static li:last-child").append('<p>' + ename + '</p>');
		     $("#static li:last-child").append('<p>' + edate + '</p>');
		     $("#static li:last-child").append('<p>' + etime + '</p>');
		     $("#static li:last-child").append('<p>' + recurrencetype + '</p>');
		     $("#static li:last-child").append('<p>' + recurrences + '</p>');
		     $("#static li:last-child").append('<p>' + information + '</p>');
		     $("#static li:last-child").append('<p>' + location + '</p>');
		     $("#static").listview("refresh");
		});
		}
		});
		return false;
		});
		
		
//Csv

$('#csv').live('click', function(){
$('#static').empty();
$.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data) {
     var allTextLines = data.split(/\r\n|\n/);
     var headers = allTextLines[0].split(',');
     var lines = [];
		for (var i=1; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		if (data.length == headers.length) {
		var event = [];
		for (var j=0; j<headers.length; j++) {
		event.push(data[j]);
		}
	lines.push(event);
	}
	}
	for (var m=0; m<lines.length; m++){
	var e = lines[m];
		$("#static").append('<li data-role="list-divider">CSV DATA</li>')
		$("#static").append('<li data-theme=c></li>');
		$("#static li:last-child").append('<p>' + e[0] + '</p>');
		$("#static li:last-child").append('<p>' + e[1] + '</p>');
		$("#static li:last-child").append('<p>' + e[2] + '</p>');
		$("#static li:last-child").append('<p>' + e[3] + '</p>');
		$("#static li:last-child").append('<p>' + e[4] + '</p>');
		$("#static li:last-child").append('<p>' + e[5] + '</p>');
		$("#static li:last-child").append('<p>' + e[6] + '</p>');
		$("#static li:last-child").append('<p>' + e[7] + '</p>');
		$("#static").listview("refresh");
		}
		}
		});
return false;
});

