function getPlot(id) {
  d3.json("Data/samples.json").then(function(data){
    console.log(data);

//Plots
function filterbyTop10(sample) {
  return parseInt(sample.id) == id;
  }
  var filteredTop10 = data.samples.filter(filterbyTop10);
  //x values
  slicedData = filteredTop10[0].sample_values.slice(0, 10).reverse();
  slicedOTUids = filteredTop10[0].otu_ids.slice(0, 10).reverse();
  slicedOTUlabels = filteredTop10[0].otu_labels.slice(0, 10);
  var OTU_id = slicedOTUids.map(d => "OTU " + d)
  // console.log(slicedData);
  // console.log(slicedOTUids);
  // console.log(slicedOTUlabels);

  //Bar Chart Trace
  var trace1 = {
    x: slicedData,
    y: OTU_id,
    text: slicedOTUlabels,
    type: "bar",
    orientation: "h"
  };
  
  // Create the data array for the plot
  var dataBAR = [trace1];
  
  // Define the bar plot layout
  var layoutBAR = {
    title: "Top 10 OTUs",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  //Bubble Chart Trace
  var trace2 = {
    x: filteredTop10[0].otu_ids,
    y: filteredTop10[0].sample_values,
    mode:'markers',
    text: slicedOTUlabels,
    marker: {
      size: filteredTop10[0].sample_values,
      color: filteredTop10[0].otu_ids
    }
  };

  var dataBUBBLE = [trace2];

  //Bubble Chart Layout
  var layoutBUBBLE = {
      title: 'All OTUs Found In Individual',
      height: 650,
      width: 1400
    };

  // Plot the chart to a div tag with id "bar" for Bar Chart & "bubble" for Bubble Chart
  Plotly.newPlot("bar", dataBAR, layoutBAR);
  Plotly.newPlot("bubble", dataBUBBLE, layoutBUBBLE);

})};

function getInfo(id) {
  d3.json("Data/samples.json").then(function(data){

    function getInfoInd(metaData) {
      return parseInt(metaData.id) == id;
      }
    var metaData = data.metadata.filter(getInfoInd);
    console.log(metaData[0].age)

    // for (const [key, value] of (metaData)) {
    //   console.log('${key}: ${value}');
    // }
   

    // for (var i = 0; i < metaData.length; i++) {
    //   document.getElementById("sample-metadata").innerHTML = metaData[0]};
  });
}
function optionChanged(id) {
  getPlot(id)
  getInfo(id);
};

//Calling The Code To Run

function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("Data/samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value")

      });

      // call the functions to display the data and the plots to the page for first individual
    getPlot(940);
    getInfo(940);
  });
}
init();
