function drawLineGraph() {
  var date1 = [{
    'date': 2008,
    'value': 582
  }, {
    'date': 2009,
    'value': 592.5
  }, {
    'date': 2010,
    'value': 619.1
  }, {
    'date': 2011,
    'value': 624.8
  }, {
    'date': 2012,
    'value': 692.2
  }, {
    'date': 2013,
    'value': 670.1
  }, {
    'date': 2014,
    'value': 680.2
  }, {
    'date': 2015,
    'value': 700.5
  }, {
    'date': 2016,
    'value': 713.5
  }, {
    'date': 2017,
    'value': 800.3
  }];

  var width = 800,
    height = 400,
    margin = 30;

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width - 100], 1)
  .domain(date1.map(function (v, i) {
    return v.date;
  }));

  var y = d3.scale.linear()
  .range([height, 0])
  .domain([0, 900]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

  var color = d3.scale.category10();

  var line = d3.svg.line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.value);
  });

  // Chart Area
  var svg = d3.select('#line-graph')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + 3 * margin + ',' + margin + ')');

  var div = d3.select("body").append("div").attr("class", "tooltip")
  .style("opacity", 0);

  // The Axes
  var yAxisg = svg.append('g')
  .classed("yTick", true)
  .attr("transform", "translate(0,0)")
  .call(yAxis);

  var xAxisg = svg.append('g')
  .attr("transform", "translate(0," + (height - 2 * margin) + ")")
  .classed("xTick", true)
  .call(xAxis);

  svg.selectAll('.yTick text')
  .style('fill', '#555')
  .style('font-size', '12px');
  svg.selectAll('.xTick text')
  .style('fill', '#555')
  .style('font-size', '12px');
  svg.selectAll('.xTick line')
  .style('fill', 'none')
  .style('stroke', '#dedede')
  .style('stroke-width', .5)
  .style('stroke-dasharray', '2,2');
  svg.selectAll('.yTick line')
  .style('fill', 'none')
  .style('stroke', '#dedede')
  .style('stroke-width', .5)
  .style('stroke-dasharray', '2,2');
  svg.selectAll('.xTick path')
  .style('fill', 'none')
  .style('stroke', '#eee')
  .style('stroke-width', .5);
  svg.selectAll('.yTick path')
  .style('fill', 'none')
  .style('stroke', '#eee')
  .style('stroke-width', .5);

  svg.append("g")
  .attr("class", "y axis")
  .append("text")
  .attr("transform", "rotate(0)")
  .attr("x", -5)
  .attr("y", -25)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("(만톤)");

  var topics = [{
    values: date1.map(function (d) {
      return {
        date: d.date,
        value: d.value,
      };
    })
  }];

  var topic = svg.selectAll(".topic").data(topics);
  var topicEnter = topic
  .enter()
  .append("g")
  .attr("class", "topic");

  topicEnter.append("path")
  .attr("class", line)
  .attr("clip-path", "url(#clip)")
  .attr("d", function (d) {
    return line(d.values);
  })
  .style("stroke", "#e93a57")
  .style("stroke-width", "10");

  topicEnter.append("g").selectAll(".dot")
  .data(function (d) {
    return d.values
  }).enter()
  .append("circle")
  .attr("clip-path", "url(#clip)")
  .attr("stroke", '#e93a57')
  .attr("cx", function (d) {
    return x(d.date);
  })
  .attr("cy", function (d) {
    return y(d.value);
  })
  .attr("r", 3)
  .attr("stroke-width", 4)

  topicEnter.append("g").selectAll(".dot")
  .data(function (d) {
    return d.values
  }).enter()
  .append("circle")
  .attr("clip-path", "url(#clip)")
  .attr("stroke", 'white')
  .attr("cx", function (d) {
    return x(d.date);
  })
  .attr("cy", function (d) {
    return y(d.value);
  })
  .attr("r", 1)
  .attr("stroke-width", 4)
}