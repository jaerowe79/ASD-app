function (doc) {
	if (doc._id.substr(0, 5) === "event") {
		emit(doc._id.substr(5), {
			"ename": doc.ename,
			"edate": doc.edate,
			"etime": doc.etime,
			"recurrencetype": doc.recurrencetype,
			"recurrence": doc.recurrence,
			"importance": doc.importance,
			"information": doc.information,
			"location": doc.location
		});
	}
};