function drawBarGraph() {
  var margin = {
      top: 25, right: 200, bottom: 35, left: 85
    },
    w = 800 - margin.left - margin.right,
    h = 340 - margin.top - margin.bottom;
  var padding = 10;

  var colors = {
    0: ["잼", "#e8e8e8"],
    1: ["과일", "#f4385b"]
  };

  var legends = ["잼", "과일"];

  var dataset = [
    { "keyword": "사과", "global": 10, "local": 1},
    { "keyword": "귤", "global": 10, "local": 3/4},
    { "keyword": "딸기", "global": 10, "local": 1/4 },
    { "keyword": "복숭아", "global": 10, "local": 2/4},
    { "keyword": "블루베리", "global": 10, "local": 2/4 },
    { "keyword": "감", "global": 10, "local": 2/4 },
    { "keyword": "살구", "global": 10, "local": 2/4 },
    { "keyword": "포도", "global": 10, "local": 10/30 },
    { "keyword": "청포도", "global": 10, "local": 14/30 }
  ];

  var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, w], 0.1)
  .domain(dataset.map(function(v, i) {
    return v.keyword;
  }));

  // ternary operator to determine if global or local has a larger scale
  var yScale = d3.scale.linear()
  .domain([0, 10])
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

  var div = d3.select("body").append("div").attr("class", "tooltip")
  .style("opacity", 0);

  // Graph Bars
  var sets = svg.selectAll(".set")
    .data(dataset)
    .enter()
    .append("g")
    .attr("class", "set")
    .attr("transform", function (d, i) {
      return "translate(" +57*i + ",0)";
    });

  sets.append("rect")
  .attr("class", "local")
  .attr("width", '8')
  .attr("y", function (d) {
    return yScale(d.local);
  })
  .attr("x", xScale.rangeBand() / 2 + 8)
  .attr("height", function (d) {
    return h - yScale(d.local);
  })
  .attr("fill", colors[1][1])
  .on("mouseover", function(d) {
    console.log('d : ', d);
    div.transition().duration(100).style("opacity", .9);
    div.html( d.local.toFixed(2) + '개월')
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
    .style("padding-top", "12px")
  }).on("mouseout", function(d) {
    div.transition().duration(100).style("opacity", 0);
  })
  .append("text")
  .text(function (d) {
    return d.local;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return i + xScale.rangeBand() / 2;
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
  .attr("x", xScale.rangeBand() / 2 - 8)
  .attr("y", function (d) {
    return yScale(d.global);
  })
  .attr("height", function (d) {
    return h - yScale(d.global);
  })
  .attr("fill", colors[0][1])
  .on("mouseover", function(d) {
    div.transition().duration(100).style("opacity", .9);
    div.html('24개월')
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
    .style("padding-top", "12px")
  }).on("mouseout", function(d) {
    div.transition().duration(100).style("opacity", 0);
  })
  .append("text")
  .text(function (d) {
    return d.global;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return i + xScale.rangeBand() / 2 + 100;
  })
  .attr("y", function (d) {
    return h - yScale(d.global) + 20;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")

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
  .attr("y", -8)
  .attr("x", -40)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size", "11px")
  .style("fill", "#8e8e8e")
  .text("(개월)");

  // add legend
  var legend = svg.append("g")
  .attr("class", "legend")
  //.attr("x", w - 65)
  //.attr("y", 50)
  .attr("height", 100)
  .attr("width", 100)
  .attr('transform', 'translate(-20,50)');

  legend.selectAll('rect')
  .data(legends)
  .enter()
  .append("rect")
  .attr("x", w + 40)
  .attr("y", function (d, i) {
    return i * 20;
  })
  .attr("width", 30)
  .attr("height", 8)
  .style("fill", function (d) {
    var color = colors[legends.indexOf(d)][1];
    return color;
  });

  legend.selectAll('text')
  .data(legends)
  .enter()
  .append("text")
  .attr("x", w + 80)
  .attr("y", function (d, i) {
    return i * 20 + 9;
  })
  .attr("font-size", "11px")
  .text(function (d) {
    var text = colors[legends.indexOf(d)][0];
    return text;
  });

  // y축 마지막 값을 설정
  $('#bar-graph > svg > g > g.y.axis > g:nth-child(6) > text').html(24);
}