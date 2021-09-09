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
        height: 600,
        width: 1000
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
        height: 600,
        width: 1000
    };
    traceData= [trace];
    Plotly.newPlot("bubbleChart", traceData, layout);
};

function populate_demographics(id_target) {
    console.log(id_target);
    metadata = data.metadata.filter(subject => subject.id === parseInt(id_target))[0];
    console.log(metadata)
    document.getElementById("id").innerHTML = metadata.id;
    document.getElementById("ethnicity").innerHTML = metadata.ethnicity;
    document.getElementById("gender").innerHTML = metadata.gender;
    document.getElementById("age").innerHTML = metadata.age;
    document.getElementById("location").innerHTML = metadata.location;
    document.getElementById("bbtype").innerHTML = metadata.bbtype;
    document.getElementById("wfreq").innerHTML = metadata.wfreq;
}

function make_plots() {
    id_target = d3.select("#subjectSelect").property("value");
    target = data.samples.filter(sample => sample.id === id_target)[0];
    create_bars(target);
    create_bubbles(target);
    populate_demographics(id_target);
}

const idBar = document.getElementById("subjectSelect");

for (i=0; i< data.samples.length; i++) {
    idBar.innerHTML += `<option value =  "${data.samples[i].id}">${data.samples[i].id}</option>`
};
d3.select('#subjectSelect').on('change', make_plots)

make_plots();