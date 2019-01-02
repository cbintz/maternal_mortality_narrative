
function create_why_chart(chart_index){

    var data_names = [
        "Ages 25-44 with an Allostatic Load (AL) Score > 4 by Race",
        "Reported Poor Treatment by Hospital Staff due to Race, Ethnicity, Culture, or Language",
        "Preeclampsia/Eclampsia Diagnoses"
    ];

    var data_citations = [
        "Source: American Journal of Public Health 2006, PubMed Central",
        "Source: Listening to Mothers Survey III, Childbirth Connection",
        "Source: Healthcare Cost Utilization Project Statistical Brief #222"
    ];

    // data for chart
    var data = [
        [{
            "name": "Black women",
            "value": 32.22,
            "color":"purple"
        },
        {
            "name": "White women",
            "value": 19.7,
            "color":"lightpink"
        },
        {
            "name": "Women overall",
            "value": 20.86,
            "color":"lightgray"
        }],
        [{
            "name": "Black women",
            "value": 21,
            "color":"purple"
        },
        {
            "name": "White women",
            "value": 8,
            "color":"lightpink"
        },
        {
            "name": "Hispanic women",
            "value": 19,
            "color":"deeppink"
        }],
        [{
            "name": "Black women",
            "value": 70,
            "color":"purple"
        },
        {
            "name": "White women",
            "value": 38,
            "color":"lightpink"
        },
        {
            "name": "Hispanic women",
            "value": 67,
            "color":"deeppink"
        }]
    ];

    let hidden = "none";
    var svg = d3.select("svg"),
    marginX = {top: 50, right: 20, bottom: 100, left: 80},
    widthX = +svg.attr("width") - marginX.left - marginX.right,
    heightX = +svg.attr("height") - marginX.top - marginX.bottom;

    var x = d3.scaleLinear()
    .range([0, widthX])
    .domain([0, d3.max(data[chart_index], (d)=>+d.value)]);

    var y = d3.scaleBand()
    .range([heightX, 0])
    .domain(data[chart_index].map(function(d) { return d.name; }))
    .padding(0.1);

    var chart = svg.append("g")
    .attr("transform", "translate(" + (marginX.left +3)+ "," + marginX.top + ")")
    .style("opacity", 0)
    .style("display", hidden);

    var xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat((d3.format("d")));

    const x_axis = chart.append("g")
    .attr("transform", "translate(3," + heightX + ")")
    .call(xAxis);

    // add appropriate x-axis label
    if (chart_index == 2) {
        chart.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("transform", `translate(${widthX-230}, ${heightX+30 })`)
        .text("diagnoses per 1,000 deliveries");
    } else {
        chart.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("transform", `translate(${widthX-230}, ${heightX+30 })`)
        .text("% of women");
    }

    // add the bars
    var bars = chart.selectAll(".bar")
    .data(data[chart_index])
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 3)
    .attr("height", y.bandwidth()*.8)
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.value); })
    .style("fill",(d)=> d.color)

    // add chart title
    chart.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "12.5px")
    .attr("transform", `translate(${widthX-230}, ${heightX-355})`)
    .text(data_names[chart_index]);

    // add source
    chart.append("text")
    .style("font-size", "6px")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${widthX-70}, ${heightX+35})`)
    .text(data_citations[chart_index]);

    // add y-axis
    chart.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y))
    .attr("transform", `translate(${3})`)
    .attr("class", "myAxis");

    // add appropriate tooltip
    if (chart_index == 2) {
        bars.on("mouseover", function(d){
            d3.select("#tooltip7").classed("hidden", false)
            d3.select("#race1").text(d.name)
            d3.select("#rate4").text(d.value)
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip7")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        });
    } else {
        bars.on("mouseover", function(d){
            d3.select("#tooltip7").classed("hidden", false)
            d3.select("#race1").text(d.name)
            d3.select("#rate4").text(d.value + "%")
            const coordinates = [d3.event.pageX, d3.event.pageY]

            const tooltip = d3.select("#tooltip7")
            .style("left", (coordinates[0])+25 +"px")
            .style("top", (coordinates[1])+25+"px");
        });
    }

    bars.on("mouseout", function(d){d3.select(this)
        d3.select("#tooltip7").classed("hidden",true)});

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
