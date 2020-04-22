var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var options_day = {day: '2-digit'};
var options_month = {month: '2-digit'};
var date = new Date(year, month, 1);
var year_month = String(year) + "-" + String(d.toLocaleDateString("en-US", options_month)) + "-";


// This function fills all the days of the month one by one (recursively).
function autofill(date) {
    // If we're on the main page, i.e. if TeamSpirit has finished saving the previous modification
    if (document.getElementById("startTime") == null) {
        day = String(date.toLocaleDateString("en-US", options_day));
        // If the day is a week-end or a holiday, then we just go to the next day. (Can't work on w.e. ==> Can't click them)
        try {
            document.getElementById("ttvTimeSt" + year_month + day).click();
            document.getElementById("startTime").value = "09:00";
            document.getElementById("endTime").value = "18:00";
            document.getElementById("dlgInpTimeOk").click();
        }
        catch (err) {}
        date.setDate(date.getDate() + 1);
        // Check what is the next day to fill. If it belongs to the current month then we continue, otherwise we stop.
        if (date.getMonth() === month){
            autofill(date);
        }
        else{
            console.log("You need to request approval now. Check that the script worked properly before !");
        }
    }
    // If TeamSpirit is still saving the modification (the "Please wait" pop-up), then we just wait 0.1s and try again
    else {
        setTimeout(function() {
            autofill(date);
        }, 100);  // check every 100ms
    }
}


autofill(date);
