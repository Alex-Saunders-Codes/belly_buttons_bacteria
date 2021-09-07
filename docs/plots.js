
function init() {
    target = top_ten("940")[0];
    let trace = {
        x: target.sample_values.slice(0,10),
        y: target.otu_ids.slice(0,10),
        hovertext: target.otu_labels.slice(0,10),
        type: "bar",
        orientation: 'h'
    };

    let layout = {
        title: "Top Ten OTU's In Subject 940",
        yaxis: {
            type: 'category',

        }
    }
    traceData= [trace];
    Plotly.newPlot("plot1", traceData, layout);
}

init();

function top_ten(id_target) {
    let target_patient = data.samples.filter(sample => sample.id === id_target)
    return target_patient

}   

