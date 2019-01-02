function create_map(parent, width, height, json, mmr){
    const margins = {top:50, bottom:20, left:50, right:10};
    const chart_width = width - margins.left - margins.right;
    const chart_height = height - margins.top - margins.bottom;

    let opacity = 0;
    let metric = "Hispanic"
    let hidden = 'none'

    let nestedData = d3.nest()
    .key(function(mmr) { return mmr["State"]; })
    .map(mmr)

    const projection = d3.geoAlbersUsa()

    const path = d3.geoPath().projection(projection);

    projection.fitExtent([[-40, 10], [width, height]], json);

    const color = d3.scaleSequential(d3.interpolateBuPu)
    color.domain(d3.extent(mmr, (d) => +d[metric]));

    const mmr_map = d3.map();
    mmr.forEach((d) => {mmr_map.set(d["State"], d)})

    const chart = parent.append("g")
    .attr("id", "map")
    .attr("width", chart_width)
    .attr("height", chart_height)
    .attr("transform", `translate(${margins.left}, ${margins.top})`)
    .style("opacity",0)
    .style("display", hidden);

    // add chart title
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-250}, ${height-450 })`)
    .text("Per Race Infant Mortality in United States 2016");


    // create the color legend
    var legend = chart.selectAll("#key1")
    .data(color.ticks(6).slice(1).reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + (360) + "," + (15 + i * 20) + ")"; });

    legend.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", color);

    // add legend labels
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${415}, ${30})`)
    .attr("font-size", "12")
    .text("Higher rate")

    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${415}, ${90})`)
    .attr("font-size", "12")
    .text("Lower rate")

    // add source
    chart.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "6px")
    .attr("transform", `translate(${width-80}, ${height-10 })`)
    .text("Source: Henry J Faiser Foundation Family Foundation");


    // loop through all of the path data, attaching the appropriate
    // record to each one based on the name
    for (let i = 0; i < json.features.length; i++){
        let name = json.features[i].properties.name;
        json.features[i].properties.value = mmr_map.get(name);
    }


    // create the map from json data
    const map = chart.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class","hsa")
    .style("stroke", "black")
    .style("stroke-width", "1px")

    // change the currently selected race
    function setMetric(metric){
        color.domain(d3.extent(mmr, (d) => +d[metric]));
        map.transition()
        .duration(1500)
        .style("fill", function(d){
            if (d.properties.value){
                if (d.properties.value[metric] != ""){
                    return color(+d.properties.value[metric]);
                }
                else{
                    return "lightgray";
                }
            }

        });

    }

    // add appropriate tooltip (depends on currently selected race)
    map.on("mouseover", function(d){
        if (metric == "Hispanic") {
            d3.select("#tooltip3").classed("hidden", false)
            d3.select("#state").text(d.properties.value.State)
            if (d.properties.value.Hispanic == ""){
                d3.select("#rate").text("Data unavailable")
            }
            else {
                d3.select("#rate").text(d.properties.value.Hispanic)
            }
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip3")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        }
        else if (metric == "Non-Hispanic White")
        {
            d3.select("#tooltip4").classed("hidden", false)
            d3.select("#state1").text(d.properties.value.State)
            if (d.properties.value[metric] == ""){
                d3.select("#rate1").text("Data unavailable")
            }
            else {
                d3.select("#rate1").text(+d.properties.value[metric])
            }
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip4")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        }

        else if (metric == "Non-Hispanic Black")
        {
            d3.select("#tooltip5").classed("hidden", false)
            d3.select("#state2").text(d.properties.value.State)
            if (d.properties.value[metric] == ""){
                d3.select("#rate1").text("Data unavailable")
            }
            else {
                d3.select("#rate2").text(+d.properties.value[metric])
            }
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip5")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        }
        else {
            d3.select("#tooltip6").classed("hidden", false)
            d3.select("#state3").text(d.properties.value.State)
            if (d.properties.value[metric] == ""){
                d3.select("#rate3").text("Data unavailable")
            }
            else {
                d3.select("#rate3").text(+d.properties.value[metric])
            }
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip6")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        }
    });


    map.on("mouseout", function(d){d3.select(this)
        if  (metric == "Hispanic") {
            d3.select("#tooltip3").classed("hidden",true)
        }
        else if  (metric == "Non-Hispanic White") {
            d3.select("#tooltip4").classed("hidden",true)
        }
        else if  (metric == "Non-Hispanic Black") {
            d3.select("#tooltip5").classed("hidden",true)
        }
        else if  (metric == "Other") {
            d3.select("#tooltip6").classed("hidden",true)
        }
        else {
            d3.select("#tooltip6").classed("hidden",true)
        }
    });


    // functionlity to update the chart's opacity and display status
    const update_chart =  function(){
        chart.transition()
        .duration(500)
        .style("opacity", opacity);
        setMetric(metric);
        if (hidden == null){
            chart.style("display", hidden);
        }
        else {
            chart.transition().delay(1000).style("display", hidden);
        }

    }

    // update opacity
    update_chart.opacity = (new_opacity)=>{
        if (new_opacity !==undefined){
            opacity = new_opacity;
            return update_chart;
        } else{
            return opacity;
        }

    }

    // update display status
    update_chart.hidden = (new_hidden)=>{
        if (new_hidden !==undefined){
            hidden = new_hidden;
            return update_chart;
        } else{
            return hidden;
        }

    }

    // update race for color scale and tooltip
    update_chart.metric = (new_metric)=>{

        if (new_metric !==undefined){
            metric = new_metric;
            return update_chart;
        } else{
            return metric;
        }

    }

    return update_chart;

}
