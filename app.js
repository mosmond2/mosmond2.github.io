// Fetch the CSV data and create the bar chart
d3.csv("MinumumWageData.csv").then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
        d.Year = +d.Year;
        d['Federal Minimum Wage'] = +d['Federal Minimum Wage'];
    });

    // Define the dimensions and margins for the chart
    const margin = { top: 30, right: 30, bottom: 70, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create the SVG container for the chart
    const svg = d3.select("#chartContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create the x and y scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Year))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['Federal Minimum Wage'])])
        .range([height, 0]);

    // Create the x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add the x-axis to the chart
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the y-axis to the chart
    svg.append("g")
        .call(yAxis);

    // Create the bars for the chart
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Year))
        .attr("y", d => yScale(d['Federal Minimum Wage']))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d['Federal Minimum Wage']));

    // Add a title to the chart
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("Federal Minimum Wage by Year");

    // Add axis labels
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Federal Minimum Wage");

}).catch(function(error) {
    console.log(error);
});
