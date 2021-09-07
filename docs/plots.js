function create_bars() {
    id_target = d3.select("#subjectSelect").property("value");
    target = data.samples.filter(sample => sample.id === id_target)[0];
    let trace = {
        x: target.sample_values.slice(0,10).reverse(),
        y: target.otu_ids.slice(0,10).reverse(),
        hovertext: target.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'
    };
    let layout = {
        title: `Top Ten OTU's In Subject ${id_target}`,
        yaxis: {
            type: 'category',

        }
    }
    traceData= [trace];
    Plotly.newPlot("plot1", traceData, layout);
}

const idBar = document.getElementById("subjectSelect");

for (i=0; i< data.samples.length; i++) {
    idBar.innerHTML += `<option value =  "${data.samples[i].id}">${data.samples[i].id}</option>`
};
d3.select('#subjectSelect').on('change', create_bars)

create_bars();