$(document).ready(function() {
	$.ajax({
		"url": '/kidtracks/_all_docs?include_docs=true&start_key="event"&end_key="event100",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, events){
				var ename = events.doc.ename;
				var edate = events.doc.edate;
				var etime = events.doc.etime;
				var recurrencetype = events.doc.recurrencetype;
				var recurrence = events.doc.recurrence;
				var importance = events.doc.importance;
				var information = events.doc.information;
				var location = events.doc.location;
				$('#eventlist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")	
							.text(ename)
					)	
				);
			});
			$('#eventlist').listview('refresh');
		}
	});
});
