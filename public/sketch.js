const fetchData = async(apiUrl) =>								/// function to request data from backend
{
  const response = await fetch(apiUrl);
  const json = await response.json();
  //console.log(json);
  return json;
}

function itemsAdd(brand,brandDataKpis){						/// function to add populated row in table
  console.log("Added row for brand " + brand.brandname);

  $("#brandsTable tbody").append(
    "<tr>" +
      "<td>" + brand.brandname +"</td>" +
      "<td>" + brand.profiles.length+"</td>" +
      "<td>" + brandDataKpis.total_fans.current_period.abbr_string_3f +"</td>" +
      "<td>" + brandDataKpis.total_engagement.current_period.abbr_string_3f +"</td>" +
    "</tr>"
  );
};

async function addBrands(timestamps = {"startDate": -1,"stopDate":-1}) {			// function to poplate table
  const brands = await fetchData(`/brands`);
  let numberOfBrands = brands.result.length;
  console.log("Received brands");

  $("#brandsTable").append("<tbody id='brandsTable'></tbody>");
  let fetchLocation = "/brandData/";
  fetchLocation += timestamps.startDate.toString() + "/" + timestamps.stopDate.toString() + "/";
  for(i=0;i<numberOfBrands;i++)
  {
    console.log("Fetching data for " + brands.result[i].brandname);
    brandData = await fetchData(fetchLocation  +  brands.result[i].brandname);
    console.log("Done.");
    itemsAdd(brands.result[i],brandData.result.kpis);
  };
  console.log("Done populating table.");
  console.log("========================");
};
///////////////////////////////////////////

addBrands();			// populate table for the first time

//////////////////////////////////////////

$(function() {			//bind date-range-picker functionality to "daterange"-named button (id="btn-datetime")
  $('input[name="daterange"]').daterangepicker({
    "startDate": getDate(false),
    "endDate": getDate(true),
  //  "applyButtonClasses": "btn-applyTime",
   // "cancelClass": "btn-cancelTime"
}, function(start, end, label) {
  console.log("Selected period between " + start._d + " and " + end._d);
  updateTable({"startDate":start._d.getTime(),"stopDate":end._d.getTime()});
  });
});

function getDate(today)			// get today Date and 30 days ago Date (for default api call)
{
  if(today == true){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return (curr_month + "-" + curr_date + "-" + curr_year);
  }

    var d = new Date();
    var ago30Days = d - 30*1000 * 60 * 60 * 24;
    d = new Date(ago30Days);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return (curr_month + "-" + curr_date + "-" + curr_year);
}
function updateTable(timedates) {	// updating table after buton click for new datetime range
  deleteTable();
  addBrands(timedates);
}

function deleteTable() {		// delete body of table
  var tbl = document.getElementById("brandsTable"); // Get the table
  tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);
}

function parseDate(input)		// parse input data to Date() format
{
  let parts = input.split('-');
  return new Date(parts[0],parts[1]-1,parts[2]);
}
