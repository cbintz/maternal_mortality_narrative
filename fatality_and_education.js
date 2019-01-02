
function create_edu_chart(){

    var svg = d3.select("svg"),
    margin = {
        top: 60,
        right: 20,
        bottom: 50,
        left: 50
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;


    let hidden = "none"

    var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)

    var y = d3.scaleLinear()
    .rangeRound([height, 0]);

    var chart = svg.append("g")
    .attr("height",height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("opacity", 0)
    .style("display", hidden);

    var data = [{
        "race": "Black",
        "count": 9.5,
        "edu": "8th grade or less",
        "color":"purple"
    }, {
        "race": "White",
        "count": 5.9,
        "edu": "8th grade or less",
        "color":"lightpink"
    }, {
        "race": "Black",
        "count": 11.6,
        "edu": "High school deploma or GED",
        "color":"purple"
    }, {
        "race": "White",
        "count": 5.8,
        "edu": "High school deploma or GED",
        "color":"pink"
    }, {
        "race": "Black",
        "count": 7.4,
        "edu": "Bachelor's degree",
        "color":"purple"
    }, {
        "race": "White",
        "count": 3.6,
        "edu": "Bachelor's degree",
        "color":"pink"
    }, {
        "race": "Black",
        "count": 6.1,
        "edu": "Advanced/ professional degree",
        "color":"purple"
    }, {
        "race": "White",
        "count": 2.8,
        "edu": "Advanced/ professional degree",
        "color":"pink"
    }];

    var ydomain = d3.max(data, function(d) {
        return d.count;
    });

    x.domain(data.map(function(d) {
        return d.edu
    }))

    y.domain([0, ydomain]);

    var x1 = d3.scaleBand()
    .rangeRound([0, x.bandwidth()])
    .padding(0.05)
    .domain(data.map(function(d) {
        return d.race;
    }));

    // add x-axis label
    var degrees = chart.selectAll(null)
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d) {
        return "translate(" + x(d.edu) + ",0)";
    })

    // create bars
    var bars = degrees.selectAll(null)
    .data(function(d) {
        return [d]
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return x1(d.race)
    })
    .attr("y", function(d) {
        return y(d.count);
    })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) {
        return height - y(d.count);
    })
    .attr("fill", function(d) {
        return d.color
    })

    chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll(".tick text")
    .call(wrap, x.bandwidth())

    chart.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")

    // wrap cut off labels
    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
            while (word = words.pop()) {
                line.push(word)
                tspan.text(line.join(" "))
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop()
                    tspan.text(line.join(" "))
                    line = [word]
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
                }
            }
        })
    }

    // create color legend
    const legend_arr =["Black", "White"]
    var legend = svg.selectAll(".legend")
    .data(legend_arr)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
    .attr("opacity",0)


    legend.append("rect")
    .attr("x", width +5)
    .attr("y", 38)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d) {
        if(d==="Black"){
            return "purple"
        } else {
            return "lightpink"
        }
    });

    // add legend text
    legend.append("text")
    .attr("x", width - 1)
    .attr("y", 47)
    .style("font-size", "10px")
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) {return d; });

    // add chart title
    chart.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "12.5px")
    .attr("transform", `translate(${width-230}, ${height-425 })`)
    .text("Infant Mortality by Maternal Educational Attainment");

    // add source
    chart.append("text")
    .style("font-size", "6px")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width-130}, ${height+45})`)
    .text("Source: Center for Disease Control and Prevention (Wonder), Linked Birth and Death Records, 2007-2013");

    // add y-axis label
    chart.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "11px")
    .attr("transform",`translate(${4*-margin.left/6}, ${height/2})rotate(-90)`)
    .text("# of infant deaths per 1,000 live births");

    // add tooltip
    bars.on("mouseover", function(d){
        d3.select("#tooltip8").classed("hidden", false)
        d3.select("#race2").text(d.race)
        d3.select("#rate5").text(d.count)
        const coordinates = [d3.event.pageX, d3.event.pageY]

        const tooltip = d3.select("#tooltip8")
        .style("left", (coordinates[0])+25 +"px")
        .style("top", (coordinates[1])+25+"px");
    });

    bars.on("mouseout", function(d){d3.select(this)
        d3.select("#tooltip8").classed("hidden",true)});

        // functionlity to update the chart's opacity and display status
        const update_chart =  function(){
            chart.transition()
            .duration(500)
            .style("opacity", opacity);
            legend.transition()
            .duration(500)
            .style("opacity", opacity);
            if (hidden == null){
                chart.style("display", hidden);
            }
            else {
                chart.transition().delay(1000).style("display", hidden);
            }
            legend.transition().delay(500).style("display", hidden);
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

        // update chart display status
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
