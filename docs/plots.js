function create_bars(target) {
    let trace = {
        x: target.sample_values.slice(0,10).reverse(),
        y: target.otu_ids.slice(0,10).reverse(),
        hovertext: target.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'
    };
    let layout = {
        title: `Top Microbial Taxonomic Units In Subject ${target.id}`,
        yaxis: {
            type: 'category'
        },
        height: 400,
        width: 600
    }
    traceData= [trace];
    Plotly.newPlot("barChart", traceData, layout);
};

function create_bubbles(target) {
    let trace = {
        x: target.otu_ids.slice(0,10).reverse(),
        y: target.sample_values.slice(0,10).reverse(),
        mode: "markers",
        marker: {
            color: target.otu_ids.slice(0,10).reverse(),
            size: target.sample_values.slice(0,10).reverse(),
        },
        text: target.otu_labels.slice(0,10).reverse(),
    };
    let layout = {
        title: `Top Microbial Taxonomic Units In Subject ${target.id}`,
        yaxis: {
            type: 'category'
        },
        height: 400,
        width: 600
    };
    traceData= [trace];
    Plotly.newPlot("bubbleChart", traceData, layout);
};

function populate_demographics(id_target) {
    metadata = data.metadata.filter(subject => subject.id === parseInt(id_target))[0];
    document.getElementById("demographics").style.visibility = "visible";
    document.getElementById("id").innerHTML = metadata.id;
    document.getElementById("ethnicity").innerHTML = metadata.ethnicity;
    document.getElementById("gender").innerHTML = metadata.gender;
    document.getElementById("age").innerHTML = metadata.age;
    document.getElementById("location").innerHTML = metadata.location;
    document.getElementById("bbtype").innerHTML = metadata.bbtype;
    document.getElementById("wfreq").innerHTML = metadata.wfreq;
}

function create_gauge(id_target) {
    metadata = data.metadata.filter(subject => subject.id === parseInt(id_target))[0];
    wfreq = metadata.wfreq;
    let trace = [
        {
          type: "indicator",
          mode: "gauge",
          value: wfreq,
          title: { text: "Belly Button Washing Frequency", font: { size: 24 }},
          gauge: {
            axis: { range: [0, 9], dtick: 1, tickcolor: "black"},
            bar: { color: "black", thickness:0.3 },
            bgcolor: "white",
            borderwidth: 1,
            bordercolor: "black",
            steps: [
              { range: [0, 1], color: "#CD5C5C", line: {color:"black", width:1} },
              { range: [1, 2], color: "#C6595E", line: {color:"black", width:1} },
              { range: [2, 3], color: "#BF5661", line: {color:"black", width:1} },
              { range: [3, 4], color: "#B85363", line: {color:"black", width:1} },
              { range: [4, 5], color: "#B15065", line: {color:"black", width:1} },
              { range: [5, 6], color: "#AA4D67", line: {color:"black", width:1} },
              { range: [6, 7], color: "#A34A6A", line: {color:"black", width:1} },
              { range: [7, 8], color: "#9C476C", line: {color:"black", width:1} },
              { range: [8, 9], color: "#95446E", line: {color:"black", width:1} }
            ],
          }
        }
      ];
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "black", family: "Arial" }
      };
      
      Plotly.newPlot('gaugeChart', trace, layout);
};

function make_plots() {
    document.getElementById("greeting").style.display="none";
    id_target = d3.select("#subjectSelect").property("value");
    target = data.samples.filter(sample => sample.id === id_target)[0];
    create_bars(target);
    create_bubbles(target);
    populate_demographics(id_target);
    create_gauge(id_target)
}

const idBar = document.getElementById("subjectSelect");

for (i=0; i< data.samples.length; i++) {
    idBar.innerHTML += `<option value =  "${data.samples[i].id}" class="dropdown-item">${data.samples[i].id}</option>`
};
d3.select('#subjectSelect').on('change', make_plots)