d3.json('samples.json').then((sampleData) => {

    // Object of only IDs and values.
    const allSamples = sampleData.samples;
    // Object of demographics.
    const allDemographics = sampleData.metadata;

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

        // Updates demographic information.
        let selectedDemo = (allDemographics.filter(info => String(info.id) === idNumber)[0]);
        let demoPanel = d3.select('#sample-metadata').html('');
        for (const [key, value] of Object.entries(selectedDemo)) {
            demoPanel.append('h5')
                .text(`${key}: ${value}`)
            console.log(key, value)
        }

        // Pulls ID number's corresponding data.
        let selectedSample = allSamples.filter(sample => String(sample.id) === idNumber);
        // Trims data to ten points.
        ids = selectedSample[0].otu_ids.slice(0,10);

        // Adds 'OTU' to each id for graphing.
        ids.forEach((id,i) => {
            ids[i] = 'OTU ' + id;
            i ++;
        });
        
        // Data trimming for labels and values.
        labels = selectedSample[0].otu_labels.slice(0,10);
        values = selectedSample[0].sample_values.slice(0,10);

        // Creates trace for individual for plotting.
        let barTrace = {
            y: ids,
            x: values,
            type: 'bar',
            orientation: 'h',
            text: labels,
            marker: { 
                color: 'lightblue',
                line: {
                    color: 'lightblue', 
                    width: 1 
                } 
            }
        };
        
        // Plots bar chart for top ten sample values in the selected individual.
        let barData = [barTrace];
        let barLayout = {
            title: `OTU ${selectedSample.id} Results`,
            xaxis: { title: 'Sample Value' },
            yaxis: { title: 'OTU ID', dtick: 0 }
        };
        Plotly.newPlot('bar', barData, barLayout);

    }
});
  