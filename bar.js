function drawBarGraph() {
  var margin = {
      top: 25, right: 40, bottom: 35, left: 85
    },
    w = 500 - margin.left - margin.right,
    h = 350 - margin.top - margin.bottom;
  var padding = 10;

  var colors = {
    0: ["잼", "#e8e8e8"],
    1: ["과일", "#f4385b"]
  };

  var legend = ['잼', '과일'];

  var dataset = [
    { "keyword": "사과", "global": 6, "local": 1},
    { "keyword": "귤", "global": 6, "local": 1},
    { "keyword": "딸기", "global": 6, "local": 1 },
    { "keyword": "복숭아", "global": 6, "local": 1},
    { "keyword": "블루베리", "global": 6, "local": 1 },
    { "keyword": "감", "global": 6, "local": 1 },
    { "keyword": "살구", "global": 6, "local": 1 },
    { "keyword": "포도", "global": 6, "local": 1 },
    { "keyword": "청포도", "global": 6, "local": 1 }
  ];

  var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

  // ternary operator to determine if global or local has a larger scale
  var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) {
    return (d.local > d.global) ? d.local : d.global;
  })])
  .range([h, 0]);

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5);

  var global = function (d) {
    return d.global;
  };
  var commaFormat = d3.format(',');

  //SVG element
  var svg = d3.select("#bar-graph")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Graph Bars
  var sets = svg.selectAll(".set")
    .data(dataset)
    .enter()
    .append("g")
    .attr("class", "set")
    .attr("transform", function (d, i) {
      return "translate(" + xScale(i) + ",0)";
    })
  ;

  sets.append("rect")
  .attr("class", "local")
  .attr("width", '8')
  .attr("y", function (d) {
    return yScale(d.local);
  })
  .attr("x", xScale.rangeBand() / 2)
  .attr("height", function (d) {
    return h - yScale(d.local);
  })
  .attr("fill", colors[0][1])
  .append("text")
  .text(function (d) {
    return d.local;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.local) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black");

  sets.append("rect")
  .attr("class", "global")
  .attr("width", "8")
  .attr("y", function (d) {
    return yScale(d.global);
  })
  .attr("height", function (d) {
    return h - yScale(d.global);
  })
  .attr("fill", colors[1][1])
  .append("text")
  .text(function (d) {
    return d.global;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.global) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");

  // xAxis
  svg.append("g") // Add the X Axis
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (h) + ")")
  .call(xAxis);

  // yAxis
  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0 ,0)")
  .call(yAxis);

  // yAxis label
  svg.append("text")
  .attr("transform", "rotate(0)")
  .attr("y", 0)
  .attr("x", -25)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("개월");

  // add legend
  var legend = svg.append("g")
  .attr("class", "legend")
  //.attr("x", w - 65)
  //.attr("y", 50)
  .attr("height", 100)
  .attr("width", 100)
  .attr('transform', 'translate(-20,50)');

  legend.selectAll('rect')
  .data(legend)
  .enter()
  .append("rect")
  .attr("x", w - 65)
  .attr("y", function (d, i) {
    return i * 20;
  })
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function (d) {
    var color = colors[legend.indexOf(d)][1];
    return color;
  });

  legend.selectAll('text')
  .data(legend)
  .enter()
  .append("text")
  .attr("x", w - 52)
  .attr("y", function (d, i) {
    return i * 20 + 9;
  })
  .text(function (d) {
    var text = colors[legend.indexOf(d)][0];
    return text;
  });
}