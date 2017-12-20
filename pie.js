function drawPieGraph() {
  var dataset = [
    { label: '유럽', count: 29.6 },
    { label: '북미', count: 27.3 },
    { label: '러시아', count: 11 },
    { label: '중국', count: 20 },
    { label: '일본', count: 8 },
    { label: '기타', count: 28.5 }
  ];

  var total = d3.sum(dataset, function(d) {
    return d.count;
  });

  var width = 300;
  var height = 300;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;

  var color = function (i) {
    var colors = [
      '#f13857', '#f6607b', '#f8899a', '#fbafbc', '#fcd7de', '#feeff2'];
    return colors[i];
  };


  var svg = d3.select('#pie-graph')
  .append('svg')
  .attr('width', width+150)
  .attr('height', height+150)
  .append('g')
  .attr('transform', 'translate(' + (width / 2 +50)+ ',' + (height / 2 )+ ')');

  var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

  var labelArc = d3.svg.arc()
  .outerRadius(radius + donutWidth)
  .innerRadius(radius);

  var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

  var pieValues = svg.selectAll('.arc')
  .data(pie(dataset))
  .enter()
  .append("g")
  .attr("class", function(d,i) {
    return 'arc'
  });

  pieValues.append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) {
    return color(i);
  })
  .on("mouseover", function(d) {
    d3.select('.legend text')
    .text(function () {
      return d.value+'%';
    });

    d3.select(this)
    .attr("stroke","white")
    .transition()
    .duration(500)
    .attr("d", arc)
    .attr("stroke-width",6);
  })
  .on("mouseout", function(d) {
    d3.select(this).transition()
    .attr("d", arc)
    .attr("stroke","none");
  });

  pieValues.append("text")
  .attr('dy', '0.71em')
  .attr("text-anchor", "middle")
  .attr('fill', '#7b7b7b')
  .attr('font-size', '15px')
  .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
  .text(function(d) {
    return d.data.label;
  });

  var legend = svg.selectAll('.legend')
  .data(["hi mom"])
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr("width", 200)
  .attr("height", 200)
  .append("text")
  .text('29.6%')
  .attr('fill', '#7b7b7b')
  .attr('font-size', '23px')
  .attr('text-anchor',"middle")
  .attr('transform', 'translate(' + (0) + ',' + (10) + ')');
}