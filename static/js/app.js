d3.json('samples.json').then((sampleData) => {

    // Object of only IDs and values.
    const allSamples = sampleData.samples;

    // Adds options to dropdown list.
    let selectionMenu = d3.select('#selDataset');
    d3.select('#selDataset').on('change', updatePlotly);
        
    // Pull top ten OTU values.
    allSamples.forEach(item => {
        selectionMenu.append('option')
            .text(item.id)
            .attr('value',item.id);
        item.sample_values.slice(0,10);
        console.log(item);
    });

    function updatePlotly() {
        let dataset = selectionMenu.property('value');
        console.log(dataset)
    }

});