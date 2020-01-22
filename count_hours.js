var inputs = document.getElementsByClassName("marker_div abs_div pp_base pp_inout_blue");
if (inputs.length % 2 != 0){
	console.log("Please input arrival and departure for every day");
}
else {
	var time_worked = 0;
	numbers_of_days = inputs.length / 2;
	for (var i = 0; i < inputs.length; i=i+2) {
		time_in_pixel = inputs[i+1].offsetLeft - inputs[i].offsetLeft;
		time_in_hours = time_in_pixel / 20.0;  // 20 pixels = 1 hour
		time_worked += time_in_hours;
	}
	time_worked = time_worked -  numbers_of_days;   // removes 1 hour per day for lunch
	diff = time_worked.toFixed(2) - 8 * numbers_of_days;
	console.log("You've worked " + time_worked.toFixed(2) + " hours so far this month.");
	console.log("You should have worked " + 8 * numbers_of_days + " hours.");
	if (diff > 0){
		console.log("You can compensate " + diff.toFixed(2) + " extra hours.");
	}
	else{
		console.log("You have to work " + diff.toFixed(2) + " extra hours to compensate.")
	}
}