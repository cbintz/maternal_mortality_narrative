
function create_world_chart(parent, width, height, data){
    const margins = {top:50, bottom:20, left:50, right:10};
    const chart_width = width - margins.left - margins.right;
    const chart_height = height - margins.top - margins.bottom;

    topCountries = [
        "Australia", "Austria","Belgium",
        "Canada", "Cyprus", "Czech Republic",
        "Denmark", "Estonia", "Finland",
        "France", "Germany", "Greece",
        "Iceland", "Ireland","Israel",
        "Italy", "Japan", "Luxembourg", "Netherlands", "New Zealand",
        "Norway", "Portugal", "Slovenia",
        "Spain", "Sweden", "Singapore",
        "Switzerland", "United Kingdom", "United States"
    ];


    var nestedData = d3.nest()
    .key(function(d) { return d.Country; })
    .map(data);

    d3.select("tooltip1").classed("hidden", false)

    const nestedDataLength = Object.keys(nestedData).length;

    myArray =[]

    // create country nested data array
    for (let i  = 1; i<topCountries.length; i++) {
        let entry= nestedData.get(topCountries[i])
        myArray.push(entry)
    }

    let opacity = 1;
    let hidden = "none";

    const chart = parent.append("g")
    .attr("id", "world_chart")
    .attr("width", chart_width)
    .attr("height", chart_height)
    .attr("transform", `translate(${margins.left}, ${margins.top})`)
    .style("opacity",0)
    .style("display", hidden);


    // find max MMR rate for y-scale
    const maxCount = function(){
        let biggest = 0;
        for (let i=0; i < myArray.length; i++){
            if(d3.max(myArray[i], (d)=>+d.Rate) > biggest){
                biggest = d3.max(myArray[i], (d)=>+d.Rate)
            }
        }
        return biggest
    }

    const x_scale = d3.scaleLinear()
    .range([0,chart_width])
    .domain([1990, 2015]);

    var xAxis = d3.axisBottom()
    .scale(x_scale)
    .tickFormat((d3.format("d")));

    const x_axis = chart.append("g")
    .attr("transform", `translate(0, ${chart_height})`)
    .call(xAxis);

    const y_scale = d3.scaleLinear()
    .range([chart_height, 0])
    .domain([0, maxCount()]);

    const y_axis = chart.append("g")
    .call(d3.axisLeft(y_scale));

    // add chart title
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-250}, ${height-450 })`)
    .text("Maternal Mortality in Developed Countries");

    // add x-axis label
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-250}, ${height-20 })`)
    .text("Year");

    // add source
    chart.append("text")
    .style("font-size", "6px")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-196}, ${height-3})`)
    .text("Source: Global, regional, and national levels of maternal mortality, 1990–2015: a systematic analysis for the Global Burden of Disease Study 2015");

    // add text to emphasize U.S. line
    chart.append("text")
    .style("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-60}, ${height-330 })`)
    .text("United States");

    // add y-axis label
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform",`translate(${4*-margins.left/6}, ${height/2})rotate(-90)`)
    .text("# of Maternal Deaths per 100,000 Live Births");

    let line = d3.line()
    .x((d) => x_scale(+d.Year))
    .y((d) => y_scale(+d.Rate));

    // color scale for countries
    const color = d3.scaleOrdinal()
    .domain((d)=>d.Country)
    .range(["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407",
    "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe",
    "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9"])

    // create lines
    const lines = chart.selectAll(".lines")
    .data(myArray)
    .enter()
    .append("path")
    .attr("class", "lines")
    .attr("d", line)
    .style("stroke", (d)=> color(d[0].Country))
    .style("stroke-width", "2px")
    .style("fill", "none")

    // add tooltip
    lines.on("mouseover", function(d){
        d3.select("#tooltip1").classed("hidden", false)
        d3.select("#country").text(d[0].Country)
        d3.select("#mmr90").text(d[0].Rate)
        d3.select("#mmr00").text(d[1].Rate)
        d3.select("#mmr15").text(d[2].Rate)
        const coordinates = [d3.event.pageX, d3.event.pageY]

        const tooltip = d3.select("#tooltip1")
        .style("left", (coordinates[0])+25 +"px")
        .style("top", (coordinates[1])+25+"px");
    });

    lines.on("mouseout", function(d){d3.select(this)
        d3.select("#tooltip1").classed("hidden",true)});

        // functionlity to update the chart's opacity and display status
        const update_chart =  function(){
            chart.transition()
            .duration(500)
            .style("opacity", opacity)
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

        return update_chart;

    }
