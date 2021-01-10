function getPlot(id) {
  d3.json("Data/samples.json").then(function(data){
    console.log(data);

function filterbyTop10(sample) {
  return parseInt(sample.id) == 941;
  }
  var filteredTop10 = data.samples.filter(filterbyTop10);
  //x values
  slicedData = filteredTop10[0].sample_values.slice(0, 10).reverse();
  slicedOTUids = filteredTop10[0].otu_ids.slice(0, 10).reverse();
  slicedOTUlabels = filteredTop10[0].otu_labels.slice(0, 10);
  var OTU_id = slicedOTUids.map(d => "OTU " + d)
  console.log(slicedData);
  console.log(slicedOTUids);
  console.log(slicedOTUlabels);

  var trace1 = {
    x: slicedData,
    y: OTU_id,
    text: slicedOTUlabels,
    type: "bar",
    orientation: "h"
  };
  
  // Create the data array for the plot
  var dataBAR = [trace1];
  
  // Define the plot layout
  var layoutBAR = {
    title: "Top 10 OTUs",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", dataBAR, layoutBAR);
})};
getPlot(940);
// Create the Trace


//   )};


function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("Data/samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
     // getPlot(data.names[0]);
      getInfo(data.names[0]);
  });
}

init();