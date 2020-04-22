


// Do not use this script, there is a "Date Range" option in TeamSpirit.......




var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var options_day = {day: '2-digit'};
var options_month = {month: '2-digit'};
var date = new Date(year, month, 1);
var year_month = String(year) + "-" + String(d.toLocaleDateString("en-US", options_month)) + "-";


// This function asks for approval to telework for the days of the month one by one (recursively).
function autofill(date) {
    // If we're on the main page, i.e. if TeamSpirit has finished saving the previous modification
    if (document.getElementById("startTime") == null) {  // This might be broken
        day = String(date.toLocaleDateString("en-US", options_day));
        // If the day is a week-end or a holiday, then we just go to the next day. (Can't work on w.e. ==> Can't click them)
        try {
            var request = document.getElementById("ttvApply" + year_month + day);
            // If there has already been a request for that day, then we skip it
            if (request.title == "Attendance Related Request") {
                document.getElementById("ttvApply" + year_month + day).click();
                var change_req = document.getElementById("applyNew_patternS");
                // This skips week-ends and holydays  ((if date.getDay() != 0 && date.getDay() != 6) doesn't work for holidays)
                if (change_req.childNodes[0].className == "empApplyMenuOn") {
                    change_req.click();
                    document.getElementById("dlgApplyPatternList1").value = "a0V2u0000000VwSEAU";
                    document.getElementById("empApplyDone1").click();
                }
                else{
                    document.getElementById("dialogApplyClose").click();
                }
            }
        }
        catch (err) {}
        date.setDate(date.getDate() + 1);
        // Check what is the next day to fill. If it belongs to the current month then we continue, otherwise we stop.
        if (date.getMonth() === month){
            autofill(date);
        }
        else{
            console.log("Finished !");
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
