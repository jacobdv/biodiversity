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
        // Appends h5 with information for each entry in the individual demographics object.
        for (const [key, value] of Object.entries(selectedDemo)) {
            demoPanel.append('h5')
                .text(`${key}: ${value}`);
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

        // Creates trace for individual for plotting bar chart.
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

        // Creates trace for individual for plotting bubble chart.
        let bubbleTrace = {
            x: selectedSample[0].otu_ids,
            y: selectedSample[0].sample_values,
            text: selectedSample[0].otu_labels,
            mode: 'markers',
            marker: { 
                color: selectedSample[0].otu_ids,
                size: selectedSample[0].sample_values
            }
        };
        
        // Plots bubble chart for the sample values in the selected individual.
        let bubbleData = [bubbleTrace];
        let bubbleLayout = {
            title: `OTU ${selectedSample.id} Results`,
            yaxis: { title: 'Sample Value' },
            xaxis: { title: 'OTU ID' }
        };
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);




        // Creates trace for individual for plotting gauge.
        let gaugeTrace = {
            domain: {
                x: [0,1],
                y: [0,1]
            },
            value: selectedDemo.wfreq,
            title: 'Belly Button Washing Frequency',
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                bar: {
                    thickness: .5,
                    color: 'darkslategray',
                    line: {
                        color: 'black'
                    }
                },
                borderwidth: 1,
                axis: {
                    range: [0, 9],
                    tickmode: 'array',
                    ticks: '',
                    tickvals: [1,2,3,4,5,6,7,8],
                    ticktext: ['1','2','3','4','5','6','7','8']
                },
                steps: [
                    {range: [0,1], color: 'maroon'},
                    {range: [1,2], color: 'firebrick'},
                    {range: [2,3], color: 'indianred'},
                    {range: [3,4], color: 'burlywood'},
                    {range: [4,5], color: 'khaki'},
                    {range: [5,6], color: 'palegreen'},
                    {range: [6,7], color: 'springgreen'},
                    {range: [7,8], color: 'mediumseagreen'},
                    {range: [8,9], color: 'seagreen'},
                ]
            }
        };
        
        // Plots gauge chart for wfreq in the selected individual.
        let gaugeData = [gaugeTrace];
        let gaugeLayout = {
            margin: { t:0, b:0 }
        };
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    }
    updatePlotly();
});


  