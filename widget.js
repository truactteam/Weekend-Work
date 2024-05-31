let dt = new Date();
let Year = dt.getFullYear();

let statusEscalationStart = 0;
let statusComplete = 0;
let statusTaskAllocationPending = 0;
let statusSMEPending = 0;
let statusAdvocacyPending = 0;

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





// =================== For All Data =================== //

ZOHO.CREATOR.init().then(function (data) {
    getData("1");
});

let testingSME = [];
let testingEscalation = [];
let testingAdvocacy = [];

async function getData(page_num){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--"
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
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--"
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
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--"
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
           yearData(year);
       }
   })
   .catch((err) =>{
       console.log("No Maching Records");
       console.log("error", err);
       let filterButton = document.getElementById("filterButton");
       filterButton.disabled = false;
       yearData(year);
   });
}


// ======================= for Week Filter Data ======================= //
async function getDataWeek(page_num,week){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--"
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
            weekData(week);
       }
   })
   .catch((err) =>{
       console.log("No Maching Records");
       console.log("error", err);
       let filterButton = document.getElementById("filterButton");
       filterButton.disabled = false;
       weekData(week);
   });
}

// ======================= for Date range Filter Data ======================= //
async function getDataDateRange(page_num,firstDate,SecondDate){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--"
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
            dateRangeData(firstDate,SecondDate);
       }
   })
   .catch((err) =>{
       console.log("No Maching Records");
       console.log("error", err);
       let filterButton = document.getElementById("filterButton");
       filterButton.disabled = false;
       dateRangeData(firstDate,SecondDate);
   });
}






//================== on click Report ==================== //
function handleClick1(status) {
    const url = `https://creatorapp.zoho.com/sdutta4/content-escalation-app#Report:All_Master_Escalation_Tasks?Status=${status}`;
    window.open(url, '_blank');
}
function handleClick2(status,mon,ye) {
    const url = `https://creatorapp.zoho.com/sdutta4/content-escalation-app#Report:All_Master_Escalation_Tasks?Status=${status}&Month_field=${mon}&Year_field=${ye}`;
    window.open(url, '_blank');
}
function handleClick3(status,we,ye) {
    const url = `https://creatorapp.zoho.com/sdutta4/content-escalation-app#Report:All_Master_Escalation_Tasks?Status=${status}&Week_No=${we}&Year_field=${ye}`;
    window.open(url, '_blank');
}
function handleClick4(status,ye) {
    const url = `https://creatorapp.zoho.com/sdutta4/content-escalation-app#Report:All_Master_Escalation_Tasks?Status=${status}&Year_field=${ye}`;
    window.open(url, '_blank');
}
function handleClick5(status,from,to) {
    const url = `https://creatorapp.zoho.com/sdutta4/content-escalation-app#Report:All_Master_Escalation_Tasks?Status=${status}&Escalation_Start_Date_Time=${from};${to}&Escalation_Start_Date_Time_op=58`;
    window.open(url, '_blank');
}

function allData(){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--";

                statusEscalationStart = 0;
                statusComplete = 0;
                statusTaskAllocationPending = 0;
                statusSMEPending = 0;
                statusAdvocacyPending = 0;
                
                testingEscalation.map((obj)=>{
                    if(obj.Status == "Advocacy Pending"){
                        statusAdvocacyPending = statusAdvocacyPending + 1;
                    }
                    else if(obj.Status == "Complete"){
                        statusComplete = statusComplete + 1;
                    }
                    else if(obj.Status == "SME Pending"){
                        statusSMEPending = statusSMEPending + 1;
                    }
                    else if(obj.Status == "Escalation Start"){
                        statusEscalationStart = statusEscalationStart + 1;
                    }
                    else if(obj.Status == "Task Allocation Pending"){
                        statusTaskAllocationPending = statusTaskAllocationPending + 1;
                    }
                });
                let ES_strt = document.getElementById("Escalation_start");
                let complete = document.getElementById("Complete");
                let TAP = document.getElementById("Task_Allocation_Pending");
                let SME_PEN = document.getElementById("SME_Pending");
                let AD_PEN = document.getElementById("Advocacy_Pending");

                ES_strt.textContent = statusEscalationStart;
                complete.textContent = statusComplete;
                TAP.textContent = statusTaskAllocationPending;
                SME_PEN.textContent = statusSMEPending;
                AD_PEN.textContent = statusAdvocacyPending;

                ES_strt.removeAttribute("onclick");
                complete.removeAttribute("onclick");
                TAP.removeAttribute("onclick");
                SME_PEN.removeAttribute("onclick");
                AD_PEN.removeAttribute("onclick");

                if(statusEscalationStart !== 0 || statusComplete !== 0 || statusTaskAllocationPending !== 0 || statusSMEPending !== 0 || statusAdvocacyPending !== 0){
                    toast.showToast();
                }
                else{
                    errToast.showToast();
                }

                ES_strt.setAttribute('onclick', "handleClick1('Escalation Start')");
                complete.setAttribute('onclick', "handleClick1('Complete')");
                TAP.setAttribute('onclick', "handleClick1('Task Allocation Pending')");
                SME_PEN.setAttribute('onclick', "handleClick1('SME Pending')");
                AD_PEN.setAttribute('onclick', "handleClick1('Advocacy Pending')");
}

function monthData(month){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--";
            
                statusEscalationStart = 0;
                statusComplete = 0;
                statusTaskAllocationPending = 0;
                statusSMEPending = 0;
                statusAdvocacyPending = 0;
                
                testingEscalation.map((obj)=>{
                    if(obj.Status == "Advocacy Pending"){
                        statusAdvocacyPending = statusAdvocacyPending + 1;
                    }
                    else if(obj.Status == "Complete"){
                        statusComplete = statusComplete + 1;
                    }
                    else if(obj.Status == "SME Pending"){
                        statusSMEPending = statusSMEPending + 1;
                    }
                    else if(obj.Status == "Escalation Start"){
                        statusEscalationStart = statusEscalationStart + 1;
                    }
                    else if(obj.Status == "Task Allocation Pending"){
                        statusTaskAllocationPending = statusTaskAllocationPending + 1;
                    }
                });

                let ES_strt = document.getElementById("Escalation_start");
                let complete = document.getElementById("Complete");
                let TAP = document.getElementById("Task_Allocation_Pending");
                let SME_PEN = document.getElementById("SME_Pending");
                let AD_PEN = document.getElementById("Advocacy_Pending");

                ES_strt.textContent = statusEscalationStart;
                complete.textContent = statusComplete;
                TAP.textContent = statusTaskAllocationPending;
                SME_PEN.textContent = statusSMEPending;
                AD_PEN.textContent = statusAdvocacyPending;

                ES_strt.removeAttribute("onclick");
                complete.removeAttribute("onclick");
                TAP.removeAttribute("onclick");
                SME_PEN.removeAttribute("onclick");
                AD_PEN.removeAttribute("onclick");

                if(statusEscalationStart !== 0 || statusComplete !== 0 || statusTaskAllocationPending !== 0 || statusSMEPending !== 0 || statusAdvocacyPending !== 0){
                    toast.showToast();
                }
                else{
                    errToast.showToast();
                }

                ES_strt.setAttribute('onclick', `handleClick2('Escalation Start','${month}','${Year}')`);
                complete.setAttribute('onclick', `handleClick2('Complete','${month}','${Year}')`);
                TAP.setAttribute('onclick', `handleClick2('Task Allocation Pending','${month}','${Year}')`);
                SME_PEN.setAttribute('onclick', `handleClick2('SME Pending','${month}','${Year}')`);
                AD_PEN.setAttribute('onclick', `handleClick2('Advocacy Pending','${month}','${Year}')`);
}

function weekData(week){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--";

                statusEscalationStart = 0;
                statusComplete = 0;
                statusTaskAllocationPending = 0;
                statusSMEPending = 0;
                statusAdvocacyPending = 0;
                
                testingEscalation.map((obj)=>{
                    if(obj.Status == "Advocacy Pending"){
                        statusAdvocacyPending = statusAdvocacyPending + 1;
                    }
                    else if(obj.Status == "Complete"){
                        statusComplete = statusComplete + 1;
                    }
                    else if(obj.Status == "SME Pending"){
                        statusSMEPending = statusSMEPending + 1;
                    }
                    else if(obj.Status == "Escalation Start"){
                        statusEscalationStart = statusEscalationStart + 1;
                    }
                    else if(obj.Status == "Task Allocation Pending"){
                        statusTaskAllocationPending = statusTaskAllocationPending + 1;
                    }
                });
                let ES_strt = document.getElementById("Escalation_start");
                let complete = document.getElementById("Complete");
                let TAP = document.getElementById("Task_Allocation_Pending");
                let SME_PEN = document.getElementById("SME_Pending");
                let AD_PEN = document.getElementById("Advocacy_Pending");

                ES_strt.textContent = statusEscalationStart;
                complete.textContent = statusComplete;
                TAP.textContent = statusTaskAllocationPending;
                SME_PEN.textContent = statusSMEPending;
                AD_PEN.textContent = statusAdvocacyPending;

                ES_strt.removeAttribute("onclick");
                complete.removeAttribute("onclick");
                TAP.removeAttribute("onclick");
                SME_PEN.removeAttribute("onclick");
                AD_PEN.removeAttribute("onclick");

                if(statusEscalationStart !== 0 || statusComplete !== 0 || statusTaskAllocationPending !== 0 || statusSMEPending !== 0 || statusAdvocacyPending !== 0){
                    toast.showToast();
                }
                else{
                    errToast.showToast();
                }

                ES_strt.setAttribute('onclick', `handleClick3('Escalation Start','${week}','${Year}')`);
                complete.setAttribute('onclick', `handleClick3('Complete','${week}','${Year}')`);
                TAP.setAttribute('onclick', `handleClick3('Task Allocation Pending','${week}','${Year}')`);
                SME_PEN.setAttribute('onclick', `handleClick3('SME Pending','${week}','${Year}')`);
                AD_PEN.setAttribute('onclick', `handleClick3('Advocacy Pending','${week}','${Year}')`);
}

function yearData(year){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--";

                statusEscalationStart = 0;
                statusComplete = 0;
                statusTaskAllocationPending = 0;
                statusSMEPending = 0;
                statusAdvocacyPending = 0;
                
                testingEscalation.map((obj)=>{
                    if(obj.Status == "Advocacy Pending"){
                        statusAdvocacyPending = statusAdvocacyPending + 1;
                    }
                    else if(obj.Status == "Complete"){
                        statusComplete = statusComplete + 1;
                    }
                    else if(obj.Status == "SME Pending"){
                        statusSMEPending = statusSMEPending + 1;
                    }
                    else if(obj.Status == "Escalation Start"){
                        statusEscalationStart = statusEscalationStart + 1;
                    }
                    else if(obj.Status == "Task Allocation Pending"){
                        statusTaskAllocationPending = statusTaskAllocationPending + 1;
                    }
                });
                let ES_strt = document.getElementById("Escalation_start");
                let complete = document.getElementById("Complete");
                let TAP = document.getElementById("Task_Allocation_Pending");
                let SME_PEN = document.getElementById("SME_Pending");
                let AD_PEN = document.getElementById("Advocacy_Pending");

                ES_strt.textContent = statusEscalationStart;
                complete.textContent = statusComplete;
                TAP.textContent = statusTaskAllocationPending;
                SME_PEN.textContent = statusSMEPending;
                AD_PEN.textContent = statusAdvocacyPending;

                ES_strt.removeAttribute("onclick");
                complete.removeAttribute("onclick");
                TAP.removeAttribute("onclick");
                SME_PEN.removeAttribute("onclick");
                AD_PEN.removeAttribute("onclick");

                if(statusEscalationStart !== 0 || statusComplete !== 0 || statusTaskAllocationPending !== 0 || statusSMEPending !== 0 || statusAdvocacyPending !== 0){
                    toast.showToast();
                }
                else{
                    errToast.showToast();
                }

                ES_strt.setAttribute('onclick', `handleClick4('Escalation Start','${year}')`);
                complete.setAttribute('onclick', `handleClick4('Complete','${year}')`);
                TAP.setAttribute('onclick', `handleClick4('Task Allocation Pending','${year}')`);
                SME_PEN.setAttribute('onclick', `handleClick4('SME Pending','${year}')`);
                AD_PEN.setAttribute('onclick', `handleClick4('Advocacy Pending','${year}')`);
}

function dateRangeData(firstDate,SecondDate){
    document.getElementById("Escalation_start").textContent = "--";
    document.getElementById("Complete").textContent = "--";
    document.getElementById("Task_Allocation_Pending").textContent = "--";
    document.getElementById("SME_Pending").textContent = "--";
    document.getElementById("Advocacy_Pending").textContent = "--";
                
                statusEscalationStart = 0;
                statusComplete = 0;
                statusTaskAllocationPending = 0;
                statusSMEPending = 0;
                statusAdvocacyPending = 0;
               
                testingEscalation.map((obj)=>{
                    if(obj.Status == "Advocacy Pending"){
                        statusAdvocacyPending = statusAdvocacyPending + 1;
                    }
                    else if(obj.Status == "Complete"){
                        statusComplete = statusComplete + 1;
                    }
                    else if(obj.Status == "SME Pending"){
                        statusSMEPending = statusSMEPending + 1;
                    }
                    else if(obj.Status == "Escalation Start"){
                        statusEscalationStart = statusEscalationStart + 1;
                    }
                    else if(obj.Status == "Task Allocation Pending"){
                        statusTaskAllocationPending = statusTaskAllocationPending + 1;
                    }
                });

                let sp_ftDT = firstDate.split("-");
                let sp_scDT = SecondDate.split("-");

                let st_DT = `${sp_ftDT[2]}-${month[Number.parseInt(sp_ftDT[1]-1)]}-${sp_ftDT[0]}`;
                let en_DT = `${sp_scDT[2]}-${month[Number.parseInt(sp_scDT[1]-1)]}-${sp_scDT[0]}`;
                console.log("st_DT :",st_DT);
                console.log("en_DT :",en_DT);


                let ES_strt = document.getElementById("Escalation_start");
                let complete = document.getElementById("Complete");
                let TAP = document.getElementById("Task_Allocation_Pending");
                let SME_PEN = document.getElementById("SME_Pending");
                let AD_PEN = document.getElementById("Advocacy_Pending");

                ES_strt.textContent = statusEscalationStart;
                complete.textContent = statusComplete;
                TAP.textContent = statusTaskAllocationPending;
                SME_PEN.textContent = statusSMEPending;
                AD_PEN.textContent = statusAdvocacyPending;

                ES_strt.removeAttribute("onclick");
                complete.removeAttribute("onclick");
                TAP.removeAttribute("onclick");
                SME_PEN.removeAttribute("onclick");
                AD_PEN.removeAttribute("onclick");

                if(statusEscalationStart !== 0 || statusComplete !== 0 || statusTaskAllocationPending !== 0 || statusSMEPending !== 0 || statusAdvocacyPending !== 0){
                    toast.showToast();
                }
                else{
                    errToast.showToast();
                }

                ES_strt.setAttribute('onclick', `handleClick5('Escalation Start','${st_DT}','${en_DT}')`);
                complete.setAttribute('onclick', `handleClick5('Complete','${st_DT}','${en_DT}')`);
                TAP.setAttribute('onclick', `handleClick5('Task Allocation Pending','${st_DT}','${en_DT}')`);
                SME_PEN.setAttribute('onclick', `handleClick5('SME Pending','${st_DT}','${en_DT}')`);
                AD_PEN.setAttribute('onclick', `handleClick5('Advocacy Pending','${st_DT}','${en_DT}')`);

}



const radioButtons = document.querySelectorAll('input[name="timeframe"]');
const weekInput = document.getElementById("weekInput");
const stDTContainer = document.getElementById("stDT&enDT");
const stDTContainer2 = document.getElementById("stDT&enDT2");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dateRangeInput = document.getElementById('dateRangeInput');
const filterButton = document.getElementById('filterButton');

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    if (this.value === "week") {
        weekInput.style.display = "block";
        stDTContainer.style.display = "block";
        stDTContainer2.style.display = "block";
        filterButton.style.display = "block";
        monthInput.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === "month") {
        monthInput.style.display = "block";
        filterButton.style.display = "block";
        weekInput.style.display = "none";
        stDTContainer.style.display = "none";
        stDTContainer2.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === "year") {
        yearInput.style.display = "block";
        filterButton.style.display = "block";
        weekInput.style.display = "none";
        stDTContainer.style.display = "none";
        stDTContainer2.style.display = "none";
        monthInput.style.display = "none";
        dateRangeInput.style.display = 'none';
    } else if (this.value === 'dateRange') {
        dateRangeInput.style.display = 'block';
        filterButton.style.display = "block";
        weekInput.style.display = 'none';
        stDTContainer.style.display = "none";
        stDTContainer2.style.display = "none";
        monthInput.style.display = 'none';
        yearInput.style.display = 'none';
    } else {
        weekInput.style.display = "none";
        stDTContainer.style.display = "none";
        stDTContainer2.style.display = "none";
        monthInput.style.display = "none";
        yearInput.style.display = "none";
        dateRangeInput.style.display = 'none';
        filterButton.style.display = "none";
        testingSME = [];
        testingEscalation = [];
        testingAdvocacy = [];
        getData("1");
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
                        weekDates(selectedValue);
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

                    endDate.setDate(endDate.getDate());

                    selectedValue.endDate = endDate.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD

                    console.log(selectedValue);
                    testingEscalation = [];






                    // let stDt = selectedValue.startDate.split("/");
                    // let enDt = selectedValue.endDate.split("/");

                    // let firstDate = `${stDt[0]}-${month[Number.parseInt(stDt[1])-1]}-${stDt[2]}`;
                    // console.log("created firstDate",firstDate);
                    // let secondDate = `${enDt[0]}-${month[Number.parseInt(enDt[1])-1]}-${enDt[2]}`;
                    // console.log("created secondDate",secondDate);
                    let stDt = selectedValue.startDate.split("/");
                    let enDt = selectedValue.endDate.split("/");

                    let firstDate = `${stDt[0]}-${month[Number.parseInt(stDt[1])-1]}-${stDt[2]}`;
                    let secondDate = `${enDt[0]}-${month[Number.parseInt(enDt[1])-1]}-${enDt[2]}`;

                    // testingEscalation = [];
                    getDataDateRange("1",firstDate,secondDate);
                    break;
                default:
                    selectedValue = radioButton.value;
            }
        }
    });
    
    console.log('Selected Value:', selectedValue);
});


// Satrting here
function getWeekDates(weekNumber, year) {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const dayOffset = (dayOfWeek === 0) ? 1 : 8 - dayOfWeek;
    const startDate = new Date(year, 0, dayOffset + (weekNumber - 1) * 7);
  
    // Calculate the end date of the given week number (6 days after the start date)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  
    // Return the start and end dates
    return {
      startDate: startDate,
      endDate: endDate
    };
  }





  function getWeekDates(year, weekNumber) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const datesOfWeek = [];

    // Find the first day of the year
    const firstDayOfYear = new Date(year, 0, 1);
    // Find the first Sunday of or before the first day of the year
    const firstSundayOfYear = new Date(firstDayOfYear);
    firstSundayOfYear.setDate(firstDayOfYear.getDate() - firstDayOfYear.getDay());

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const weekDay = new Date(firstSundayOfYear);
        weekDay.setDate(firstSundayOfYear.getDate() + (weekNumber - 1) * 7 + dayOfWeek);

        // Formatting the date
        const formattedDate = `${('0' + weekDay.getDate()).slice(-2)}-${months[weekDay.getMonth()]}-${weekDay.getFullYear()}`;
        
        datesOfWeek.push({
            date: formattedDate,
            day: daysOfWeek[weekDay.getDay()]
        });
    }

    return datesOfWeek;
}  




function weekDates(weekNumber){
    const firstDayOfYear = new Date(Year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const dayOffset = (dayOfWeek === 0) ? 1 : 8 - dayOfWeek;
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