// Note:
// There is a "Date Range" option in TeamSpirit, if you have worked remotely for an extended
// period of time, then consider using it to avoid spamming you manager.

// Also, don't forget to put the "Office" remark before running this script.
// If you put a "Stop" remark on a day, then the script will stop on that day (before filling it)



var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var options_day = {day: '2-digit'};
var options_month = {month: '2-digit'};
var date = new Date(year, month, 1);
var year_month = String(year) + "-" + String(d.toLocaleDateString("en-US", options_month)) + "-";
var DEBUG = true;  // Don't put it to false since the sleeps are necessary for now

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Takes care of filling the pop-up
async function fill_remote(){
    // Wait for pop-up to appear and then fill it
    var change_req = document.getElementById("applyNew_patternS");
    if (change_req) {
        console.log("Pop-up loaded");
        if (DEBUG) await sleep(1000);
        // This skips week-ends and holydays  ((if date.getDay() != 0 && date.getDay() != 6) doesn't work for holidays)
        if (change_req.childNodes[0].className == "empApplyMenuOn") {
            if (DEBUG) await sleep(2000);
            change_req.click();
            document.getElementById("dlgApplyPatternList1").value = "a0V2u0000000VwSEAU";
            document.getElementById("empApplyDone1").click();
            if (DEBUG) console.log("Sent request");
            if (DEBUG) await sleep(2000);
        }
        else{
            if (DEBUG) console.log("Was a week-end / holyday");
            document.getElementById("dialogApplyClose").click();
            if (DEBUG) console.log("Closed window");
            if (DEBUG) await sleep(2000);
        }
        return;
    }
    else setTimeout(function() { fill_remote(); }, 100);  // check every 100ms
}


function go_to_next_day(date){
    console.log("Going to the next day");
    date.setDate(date.getDate() + 1);
    // Check what is the next day to fill. If it belongs to the current month then we continue, otherwise we stop.
    if (date.getMonth() === month) autofill(date);
    else console.log("Finished !");
}


// This function asks for approval to telework for the days of the month one by one (recursively).
async function autofill(date) {
    // If we're on the main page, i.e. if TeamSpirit has finished saving the previous modification
    if (document.getElementById("startTime") == null) { // && document.getElementById("dateColumn") != null) {
        day = String(date.toLocaleDateString("en-US", options_day));
        if (DEBUG) console.log("Day: " + date);

        // Early stop option
        var stop = false;
        var remark = document.getElementById("dailyNote" + year_month + day);
        if (remark.childNodes[0].childNodes[0].textContent.toUpperCase().trim() == "STOP") {
            console.log("Early stopping");
        }

        else {
            // Do not apply for telework if there is an "Office" remark for that day
            if (remark.childNodes[0].childNodes[0].textContent.toUpperCase().trim() != "OFFICE") {
                var request = document.getElementById("ttvApply" + year_month + day);
                // If there has already been a request for that day, then we skip it
                if (request.title == "Attendance Related Request") {
                    document.getElementById("ttvApply" + year_month + day).click();
                    await fill_remote(date);
                    if (DEBUG) console.log("Pop-up processed");
                    if (DEBUG) await sleep(2000);
                    go_to_next_day(date);
                }
                else { go_to_next_day(date); }
            }
            else {
                go_to_next_day(date);
            }
        }
    }
    // If TeamSpirit is still saving the modification (the "Please wait" pop-up), then we just wait 0.1s and try again
    else setTimeout(function() { autofill(date); }, 100);  // check every 100ms
}


autofill(date);
