d3.json('samples.json').then((sampleData) => {

    // Object of only IDs and values.
    const allSamples = sampleData.samples;

    // Adds options to dropdown list.
    let selectionMenu = d3.select('#selDataset');
    d3.select('#selDataset').on('change', updatePlotly);
    allSamples.forEach(item => {
        selectionMenu.append('option')
            .text(item.id)
            .attr('value',item.id);
    });

    // Updates graphs to match new ID number.
    function updatePlotly() {
        // Grabs selected ID number.
        let idNumber = selectionMenu.property('value');
        // Pulls ID number's corresponding data.
        let selectedSample = allSamples.filter(sample => sample.id === idNumber);
        // Trims data to ten points.
        selectedSample[0].otu_ids = selectedSample[0].otu_ids.slice(0,10);
        selectedSample[0].otu_labels = selectedSample[0].otu_labels.slice(0,10);
        selectedSample[0].sample_values = selectedSample[0].sample_values.slice(0,10);
        // Moves into array.
        selectedSample = selectedSample[0];
        // Logs selected sample data.
        console.log(selectedSample);

    }
});
  