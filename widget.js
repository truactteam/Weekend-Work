let dt = new Date();
let Year = dt.getFullYear();

let dataEscalation = [];
let filterDataEscalation = [];

let dataSME = [];
let filterDataSME = [];

let dataAdvocacy = [];
let filterDataAdvocacy = [];

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var toast = Toastify({
    text: "Data fetched",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      height: "40px",
      padding: "2px 12px"
    }
});

var errToast = Toastify({
    text: "No Record found for this filter",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #F54216, #ED7759)",
      height: "40px",
      padding: "2px 12px"
    }
});




ZOHO.CREATOR.init().then(function (data) {
     getData("1");
});

let testingSME = [];
let testingEscalation = [];
let testingAdvocacy = [];
async function getData(page_num){
    config = {
        appName : "content-escalation-app",
        reportName : "All_Master_Escalation_Tasks",
        page : page_num,
        pageSize : "200"
    }
    await ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
        console.log(response.data);
        testingEscalation = [...testingEscalation,...response.data];
        console.log("Testing data :", testingEscalation);
        response.data.map((obj)=>{
            if(obj.SME_Escalation == "Yes"){
                testingSME.push(obj);
            }
            else if(obj.Advocacy_Escalation == "Yes"){
                testingAdvocacy.push(obj);
            }
        });
        let num_of_records = response.data.length;
        if(num_of_records == 200){
            getData(parseInt(page_num)+1)
        }
        else{
            allData();
        }
    })
    .catch((err) =>{
        console.log("No Maching Records");
        console.log("error", err);
        allData();
    });
}


// ============== For Month filter Data ================== //
async function getDataMonth(page_num,month){
    config = {
        appName : "content-escalation-app",
        reportName : "All_Master_Escalation_Tasks",
        criteria: `(Month_field=="${month}" && Year_field == "${Year}")`,
        page : page_num,
        pageSize : "200"
    }
    await ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
        console.log(response.data);
        testingEscalation = [...testingEscalation,...response.data];
        console.log("Testing data :", testingEscalation);
        response.data.map((obj)=>{
            if(obj.SME_Escalation == "Yes"){
                testingSME.push(obj);
            }
            else if(obj.Advocacy_Escalation == "Yes"){
                testingAdvocacy.push(obj);
            }
        });
        let num_of_records = response.data.length;
        if(num_of_records == 200){
            getDataMonth(parseInt(page_num)+1,month);
        }
        else{
            let filterButton = document.getElementById("filterButton");
            filterButton.disabled = false;
            monthData();
        }
    })
    .catch((err) =>{
        console.log("No Maching Records");
        console.log("error", err);
        let filterButton = document.getElementById("filterButton");
        filterButton.disabled = false;
        monthData();
    });
}

// =================== for Year Filter Data ==================== //

async function getDataYear(page_num,year){
    config = {
        appName : "content-escalation-app",
        reportName : "All_Master_Escalation_Tasks",
        criteria: `(Year_field == "${year}")`,
        page : page_num,
        pageSize : "200"
    }
    await ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
        console.log(response.data);
        testingEscalation = [...testingEscalation,...response.data];
        console.log("Testing data :", testingEscalation);
        response.data.map((obj)=>{
            if(obj.SME_Escalation == "Yes"){
                testingSME.push(obj);
            }
            else if(obj.Advocacy_Escalation == "Yes"){
                testingAdvocacy.push(obj);
            }
        });
        let num_of_records = response.data.length;
        if(num_of_records == 200){
            getDataYear(parseInt(page_num)+1,year);
        }
        else{
            let filterButton = document.getElementById("filterButton");
            filterButton.disabled = false;
            yearData();
        }
    })
    .catch((err) =>{
        console.log("No Maching Records");
        console.log("error", err);
        let filterButton = document.getElementById("filterButton");
        filterButton.disabled = false;
        yearData();
    });
}


// ======================= for Week Filter Data ======================= //
async function getDataWeek(page_num,week){
    config = {
        appName : "content-escalation-app",
        reportName : "All_Master_Escalation_Tasks",
        criteria: `(Week_No==${week} && Year_field == "${Year}")`,
        page : page_num,
        pageSize : "200"
    }
    await ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
        console.log(response.data);
        testingEscalation = [...testingEscalation,...response.data];
        console.log("Testing data :", testingEscalation);
        response.data.map((obj)=>{
            if(obj.SME_Escalation == "Yes"){
                testingSME.push(obj);
            }
            else if(obj.Advocacy_Escalation == "Yes"){
                testingAdvocacy.push(obj);
            }
        });
        let num_of_records = response.data.length;
        if(num_of_records == 200){
            getDataWeek(parseInt(page_num)+1,week);
        }
        else{
            let filterButton = document.getElementById("filterButton");
            filterButton.disabled = false;
            weekData();
        }
    })
    .catch((err) =>{
        console.log("No Maching Records");
        console.log("error", err);
        let filterButton = document.getElementById("filterButton");
        filterButton.disabled = false;
        weekData();
    });
}

// ======================= for Date range Filter Data ======================= //
async function getDataDateRange(page_num,firstDate,SecondDate){
    config = {
        appName : "content-escalation-app",
        reportName : "All_Master_Escalation_Tasks",
        criteria: `(Escalation_Start_Date_Time >= "${firstDate}" && Escalation_Start_Date_Time <= "${SecondDate}")`,
        page : page_num,
        pageSize : "200"
    }
    await ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
        console.log(response.data);
        testingEscalation = [...testingEscalation,...response.data];
        console.log("Testing data :", testingEscalation);
        response.data.map((obj)=>{
            if(obj.SME_Escalation == "Yes"){
                testingSME.push(obj);
            }
            else if(obj.Advocacy_Escalation == "Yes"){
                testingAdvocacy.push(obj);
            }
        });
        let num_of_records = response.data.length;
        if(num_of_records == 200){
            getDataDateRange(parseInt(page_num)+1,firstDate,SecondDate);
        }
        else{
            let filterButton = document.getElementById("filterButton");
            filterButton.disabled = false;
            dateRangeData();
        }
    })
    .catch((err) =>{
        console.log("No Maching Records");
        console.log("error", err);
        let filterButton = document.getElementById("filterButton");
        filterButton.disabled = false;
        dateRangeData();
    });
}


// =========== All Data ================== //
function allData(){
    document.getElementById("moderation").textContent = "--";
    document.getElementById("SME").textContent = "--";
    document.getElementById("Advocacy").textContent = "--";  
                
                dataEscalation = [];
                dataAdvocacy = [];
                dataSME = [];
                
                dataEscalation = testingEscalation;
                console.log("data :", dataEscalation);
                dataEscalation.map((obj)=>{
                    if(obj.SME_Escalation == "Yes"){
                        dataSME.push(obj);
                    }
                    else if(obj.Advocacy_Escalation == "Yes"){
                        dataAdvocacy.push(obj);
                    }
                });
                let avgEsc = averageHoursEscalation();
                let avgSME = averageHoursSME();
                let avgADV = averageHoursAdvocacy();
                if(avgEsc == true || avgSME == true || avgADV == true){
                    toast.showToast();      
                }
                else{
                    errToast.showToast();
                }
}


// ============= Month Data ============ //
function monthData(){
    document.getElementById("moderation").textContent = "--";
    document.getElementById("SME").textContent = "--";
    document.getElementById("Advocacy").textContent = "--";
            
                dataEscalation = [];
                dataAdvocacy = [];
                dataSME = [];

                
                dataEscalation = testingEscalation;
                console.log("Month data :", dataEscalation);
                dataEscalation.map((obj)=>{
                    if(obj.SME_Escalation == "Yes"){
                        dataSME.push(obj);
                    }
                    else if(obj.Advocacy_Escalation == "Yes"){
                        dataAdvocacy.push(obj);
                    }
                });
                let avgEsc = averageHoursEscalation();
                let avgSME = averageHoursSME();
                let avgADV = averageHoursAdvocacy();
                if(avgEsc == true || avgSME == true || avgADV == true){
                    toast.showToast();      
                }
                else{
                    errToast.showToast();
                }
            
}

// ============= Week Data ================ //
function weekData(){
    document.getElementById("moderation").textContent = "--";
    document.getElementById("SME").textContent = "--";
    document.getElementById("Advocacy").textContent = "--";

                dataEscalation = [];
                dataAdvocacy = [];
                dataSME = [];

                
                dataEscalation = testingEscalation;

                console.log("Week data :", dataEscalation);
                dataEscalation.map((obj)=>{
                    if(obj.SME_Escalation == "Yes"){
                        dataSME.push(obj);
                    }
                    else if(obj.Advocacy_Escalation == "Yes"){
                        dataAdvocacy.push(obj);
                    }
                });
                let avgEsc = averageHoursEscalation();
                let avgSME = averageHoursSME();
                let avgADV = averageHoursAdvocacy();
                if(avgEsc == true || avgSME == true || avgADV == true){
                    toast.showToast();      
                }
                else{
                    errToast.showToast();
                }
}

// ============ Year Data ============== //
function yearData(){
    document.getElementById("moderation").textContent = "--";
    document.getElementById("SME").textContent = "--";
    document.getElementById("Advocacy").textContent = "--";

                //callback block
                dataEscalation = [];
                dataAdvocacy = [];
                dataSME = [];

                
                dataEscalation = testingEscalation;
                console.log("Year data :", dataEscalation);
                dataEscalation.map((obj)=>{
                    if(obj.SME_Escalation == "Yes"){
                        dataSME.push(obj);
                    }
                    else if(obj.Advocacy_Escalation == "Yes"){
                        dataAdvocacy.push(obj);
                    }
                });
                let avgEsc = averageHoursEscalation();
                let avgSME = averageHoursSME();
                let avgADV = averageHoursAdvocacy();
                if(avgEsc == true || avgSME == true || avgADV == true){
                    toast.showToast();      
                }
                else{
                    errToast.showToast();
                }
}

// ============ Date Range Data =================== //
function dateRangeData(){
    document.getElementById("moderation").textContent = "--";
    document.getElementById("SME").textContent = "--";
    document.getElementById("Advocacy").textContent = "--";

                dataEscalation = [];
                dataAdvocacy = [];
                dataSME = [];

                
                dataEscalation = testingEscalation;

                console.log("Date Range data :", dataEscalation);
                dataEscalation.map((obj)=>{
                    if(obj.SME_Escalation == "Yes"){
                        dataSME.push(obj);
                    }
                    else if(obj.Advocacy_Escalation == "Yes"){
                        dataAdvocacy.push(obj);
                    }
                });
                let avgEsc = averageHoursEscalation();
                let avgSME = averageHoursSME();
                let avgADV = averageHoursAdvocacy();
                if(avgEsc == true || avgSME == true || avgADV == true){
                    toast.showToast();      
                }
                else{
                    errToast.showToast();
                }
}



function averageHoursEscalation(){
    let hour = 0.00;
    let item = 0;
    let avg  = 0;
    let ct = 0;
    dataEscalation.map((obj)=>{
        ct = ct+1;
        if(obj.Escalation_Start_Date_Time !== "" && obj.Validation_Date_Time !== ""){
            let dataHour = calculateHoursDifference(obj.Escalation_Start_Date_Time,obj.Validation_Date_Time);
            hour = hour+dataHour;
            item = item+1;
            // console.log("Hour before avg :", hour);
        }
    });
    hour = Number.parseInt(hour);
    console.log("CT :",ct);
    console.log("Hour :", hour);
    console.log("Item :", item);
    if(item == 0){
        let moderation = document.getElementById("moderation");
        moderation.textContent = "--";
        return false
    }
    else{
        avg = hour/item;
        let roundOffAvg = roundToTwoDecimalPlaces(avg);
        console.log("Avg Escalation round-off :",roundToTwoDecimalPlaces(avg));
        console.log("Average Escalation :",avg);
        let moderation = document.getElementById("moderation");
        moderation.textContent = roundOffAvg;
        return true;
    }
}

function averageHoursSME(){
    let hour = 0;
    let item = 0;
    let avg  = 0;
    let ct = 0;
    console.log("before Average SME:",dataSME);
    if(dataSME.length == 0){
        let SME = document.getElementById("SME");
        SME.textContent = "--";
        return false;
    }
    else{
        dataSME.map((obj)=>{
            ct = ct+1;
            if(obj.SME_Pending_Date_Time !== "" && obj.Complete_Date_Time !== ""){
                let dataHour = calculateHoursDifference(obj.SME_Pending_Date_Time,obj.Complete_Date_Time);
                hour = hour+dataHour;
                item = item+1;
            }
        });
        hour = Number.parseInt(hour);
        console.log("CT :",ct);
        console.log("Hour :", hour);
        console.log("Item :", item);
        if(item == 0){
            let SME = document.getElementById("SME");
            SME.textContent = "--";
            return false;
        }
        else{
            avg = hour/item;
            let roundOffAvg = roundToTwoDecimalPlaces(avg);
            console.log("Avg SME round-off :",roundToTwoDecimalPlaces(avg));
            console.log("Average SME :",avg);
            let SME = document.getElementById("SME");
            SME.textContent = roundOffAvg;
            return true;
        }
    }
}

function averageHoursAdvocacy(data){
    let hour = 0;
    let item = 0;
    let avg  = 0;
    let ct = 0;
    console.log("before Average Advocacy:",dataAdvocacy);
    if(dataAdvocacy.length == 0){
        let advocacy = document.getElementById("Advocacy");
        advocacy.textContent = "--";
        return false;
    }
    else{
        dataAdvocacy.map((obj)=>{
            ct = ct + 1;
            if(obj.Validation_Date_Time !== "" && obj.Complete_Date_Time !== ""){
                let dataHour = calculateHoursDifference(obj.Validation_Date_Time,obj.Complete_Date_Time);
                hour = hour+dataHour;
                item = item+1;
            }
        });
        hour = Number.parseInt(hour);
        console.log("CT :",ct);
        console.log("Hour :", hour);
        console.log("Item :", item);
        if(item == 0){
            let advocacy = document.getElementById("Advocacy");
            advocacy.textContent = "--";
            return false;
        }
        else{
            avg = hour/item;
            let roundOffAvg = roundToTwoDecimalPlaces(avg);
            console.log("Avg Advocacy round-off :",roundToTwoDecimalPlaces(avg));
            console.log("Average Advocacy :",avg);
            let advocacy = document.getElementById("Advocacy");
            advocacy.textContent = roundOffAvg;
            return true;
        }
    }
}

function calculateHoursDifference(timestamp1, timestamp2) {
    let date1 = new Date(timestamp1);
    let date2 = new Date(timestamp2);

    let differenceMs = Math.abs(date2 - date1);

    let differenceHours = differenceMs / (1000 * 60 * 60);

    return differenceHours;
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}

// let time1 = "24-Apr-2024 19:27:10";
// let time2 = "24-Apr-2024 20:08:31";
// console.log(time1);
// console.log(time2);

// let hDiff = calculateHoursDifference(time1, time2);
// console.log("Own testing time difference",Number.parseInt(hDiff));



const radioButtons = document.querySelectorAll('input[name="timeframe"]');
const weekInput = document.getElementById("weekInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dateRangeInput = document.getElementById('dateRangeInput');
const filterButton = document.getElementById('filterButton');

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    if (this.value === "week") {
        weekInput.style.display = "block";
        filterButton.style.display = "block";
        monthInput.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === "month") {
        monthInput.style.display = "block";
        filterButton.style.display = "block";
        weekInput.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === "year") {
        yearInput.style.display = "block";
        filterButton.style.display = "block";
        weekInput.style.display = "none";
        monthInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === 'dateRange') {
        dateRangeInput.style.display = 'block';
        filterButton.style.display = "block";
        weekInput.style.display = 'none';
        monthInput.style.display = 'none';
        yearInput.style.display = 'none';
    } else {
        weekInput.style.display = "none";
        monthInput.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
        filterButton.style.display = "none";
        testingSME = [];
        testingEscalation = [];
        testingAdvocacy = [];
        getData(1);
    }
  });
});


filterButton.addEventListener('click', function(event) {
    let selectedValue;
    event.preventDefault();
    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            switch (radioButton.value) {
                case 'week':
                    filterButton.disabled = true;
                    selectedValue = document.getElementById('weekNumber').value;
                    if(selectedValue >52 || selectedValue<1){
                        alert("Plese enter the week in range 1 to 52");
                        document.getElementById('weekNumber').value = "";
                    }
                    else{
                        testingEscalation = [];
                        getDataWeek("1",selectedValue);
                    }
                    break;
                case 'month':
                    filterButton.disabled = true;
                    selectedValue = document.getElementById('monthNumber').value;
                    testingEscalation = [];
                    getDataMonth("1",selectedValue);
                    break;
                case 'year':
                    filterButton.disabled = true;
                    selectedValue = document.getElementById('yearNumber').value;
                    testingEscalation = [];
                    getDataYear("1",selectedValue);
                    break;
                case 'dateRange':
                    filterButton.disabled = true;
                    selectedValue = {
                        startDate: document.getElementById('startDate').value,
                        endDate: document.getElementById('endDate').value
                    };
                    
                    var endDate = new Date(selectedValue.endDate);

                    endDate.setDate(endDate.getDate() + 1);

                    selectedValue.endDate = endDate.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD

                    console.log(selectedValue);


                    let stDt = selectedValue.startDate.split("/");
                    let enDt = selectedValue.endDate.split("/");

                    let firstDate = `${stDt[0]}-${month[Number.parseInt(stDt[1])-1]}-${stDt[2]}`;
                    let secondDate = `${enDt[0]}-${month[Number.parseInt(enDt[1])-1]}-${enDt[2]}`;

                    testingEscalation = [];
                    getDataDateRange("1",firstDate,secondDate);
                    break;
                default:
                    selectedValue = radioButton.value;
            }
        }
    });
    
    console.log('Selected Value:', selectedValue);
});







function weekDates(weekNumber){
    const firstDayOfYear = new Date(Year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const dayOffset = (dayOfWeek === 0) ? 0 : 7 - dayOfWeek;
    
    const startDate = new Date(Year, 0, 1 + dayOffset + (weekNumber - 1) * 7);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const startDateFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endDateFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById("wkStartDate").textContent = startDateFormatted;
    document.getElementById("wkEndDate").textContent = endDateFormatted;
    return {
      startDate: startDate,
      endDate: endDate
    };
}