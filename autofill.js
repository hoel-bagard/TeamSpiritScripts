function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var d = new Date()
var month = d.getMonth()
var year = d.getFullYear()
var options_day = {day: '2-digit'};
var options_month = {month: '2-digit'};


var date = new Date(year, month, 1);
var year_month = String(year) + "-" + String(d.toLocaleDateString("en-US", options_month)) + "-"

while (date.getMonth() === month) {
	day = String(date.toLocaleDateString("en-US", options_day))
 	try {
 		document.getElementById("ttvTimeSt" + year_month + day).click();
 		document.getElementById('startTime').value = "09:00";
		document.getElementById('endTime').value = "18:00";
		document.getElementById('dlgInpTimeOk').click();
		await sleep(2000);
	}
	catch(err) {
		do_nothing = 0;
	}
    date.setDate(date.getDate() + 1);
}

console.log("You need to request approval now. Check that the script worked properly before !")