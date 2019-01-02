function create_bar_chart_us(parent, width, height, data){
    let opacity = 0;
    let hidden = 'none'
    console.log(data);
    const margins = {top:50, bottom:20, left:50, right:10};
    const chart_width = width - margins.left - margins.right;
    const chart_height = height - margins.top - margins.bottom;

    // color scale for bars, consistent color per race across all charts
    const colorBars = function(Race) {
        if (Race == "Non-Hispanic Black") {
            return 'purple'
        }
        else if (Race == "Non-Hispanic White"){
            return 'lightpink'
        }
        else if (Race == "Hispanic") {
            return '#ff007f'
        }

        else {
            return '#984ea3'
        }
    }

    const chart = parent.append("g")
    .attr("id", "bar_chart")
    .attr("width", chart_width)
    .attr("height", chart_height)
    .attr("transform", `translate(${margins.left}, ${margins.top})`)
    .style("opacity", 0)
    .style("display", hidden);

    const y_scale = d3.scaleBand()
    .range([0,chart_height])
    .domain(data.map((d)=>d.Metric))
    .padding(0.1);

    const x_scale = d3.scaleLinear()
    .range([0,chart_width])
    .domain([0, d3.max(data, (d)=>+d.Rate)])

    var xAxis = d3.axisBottom()
    .scale(x_scale)
    .tickFormat((d3.format("d")));

    const x_axis = chart.append("g")
    .attr("transform", `translate(30, ${chart_height})`)
    .call(xAxis);


    // create the bars
    var bars = chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

    bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y_scale(d.Metric);
    })
    .attr("height", y_scale.bandwidth)
    .attr("x", 30)
    .attr("width", function (d) {
        return x_scale(d.Rate);
    })
    .style("fill", (d)=> colorBars(d.Metric));

    // add x-axis label
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${chart_width/2}, ${chart_height+2*margins.bottom})`)
    .text("Deaths per 100,000 live births");

    // add y-axis label
    chart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-250}, ${height-450 })`)
    .text("Per Race Maternal Mortality in United States 2013-2014");

    // add source
    chart.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "6px")
    .attr("transform", `translate(${width-160}, ${height-10 })`)
    .text("Source: Obstetrics & Gynecology, May 2017: Trends in Maternal Mortality by Sociodemographic Characteristics");


    // add bar labels
    chart.append("text")
    .attr("x",-47)
    .attr("y", 65)
    .attr("font-size", 10)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .text("Hispanic Women");

    chart.append("text")
    .attr("x",-35)
    .attr("y", 195)
    .attr("font-size", 10)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .text("Non-Hispanic");

    chart.append("text")
    .attr("x",-35)
    .attr("y", 205)
    .attr("font-size", 10)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .text("White Women");

    chart.append("text")
    .attr("x",-35)
    .attr("y", 320)
    .attr("font-size", 10)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .text("Non-Hispanic");

    chart.append("text")
    .attr("x",-35)
    .attr("y", 330)
    .attr("font-size", 10)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .text("Black Women");

    // add tooltip
    bars.on("mouseover", function(d){
        d3.select("#tooltip2").classed("hidden", false)
        d3.select("#race").text(d.Metric)
        d3.select("#mmr").text(d.Rate)
        const coordinates = [d3.event.pageX, d3.event.pageY]

        const tooltip = d3.select("#tooltip2")
        .style("left", (coordinates[0])+25 +"px")
        .style("top", (coordinates[1])+25+"px");
    });

    bars.on("mouseout", function(d){d3.select(this)
        d3.select("#tooltip2").classed("hidden",true)});


        // functionlity to update the chart's opacity and display status
        const update_chart =  function(){
            console.log("bar chart opacity", opacity);
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
