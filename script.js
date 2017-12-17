var dataBasic = [95, 3, 2];
var domain = ["Data1", "Data2", "Data3"];

var dataBasic2 = [40, 30, 20, 5, 5];
var domain2 = ["A", "B", "C", "D", "E"]

drawPieGraph("#pie-graph-basic", dataBasic, 60, 160, domain, "<첫 번째 파이 그래프>");
drawPieGraph("#pie-graph-sec", dataBasic2, 80, 120, domain2, "<두 번째 파이 그래프>");

function drawPieGraph(svgId, data , ir, or, dm, title) {
    var pie = d3.pie();
    var arc = d3.arc().innerRadius(ir).outerRadius(or);
    
    var pieElements = d3.select(svgId)
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("class", "pieGraph")
        .attr("d", arc)
        .attr("transform", "translate(200, 200)")
        .style("fill", function(d,i){
            return ["#A3ACAC","#C6D0D2","#F9F9F9","#FF0000","#0000FF"][i];
        })
        .on("mouseover", function(d,i){
            svgText.append("text")
                .attr("dy", "0.5em")
                .style("text-anchor", "middle")
                .style("font-size", 18)
                .style("font-weight", 400)
                .attr("class", "label")
                .style("fill", "#FF0000")
                .text(dm[i]+": "+data[i]+"%")
            
            d3.select(this).style("fill", "#00FF00")
        })
        .on("mouseout", function(d,i){
            svgText.select(".label").remove();
            
            d3.select(this).style("fill", function(){
                return ["#A3ACAC","#C6D0D2","#F9F9F9","#FF0000","#0000FF"][i];
            })
        })
    
    var svgText = d3.select(svgId)
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(200, 200)")
    
    var pieTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle")
        .attr("class", "pietitle")
        .attr("transform", "translate(200, 385)")
        .text(title)
}

var barData = [13, 11, 2, 8, 8, 5];

drawBarGraph("#first-bar-graph-svg", barData);

function drawBarGraph(svgId, data) {
    var barElements = d3.select(svgId)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 60)
        .attr("y", function(d, i) {
            return i * 25;
        })
        .attr("width", function(d, i) {
            return d * 40;
        })
        .attr("height", "18px")
        .style("fill", "#0000FF")
        .on("mouseover", function(d, i){
            barValue.append("text")
                .attr("x", 70)
                .attr("y", i * 25 + 14)
                .attr("class", "label")
                .style("font-size", 13)
                .style("font-weight", 400)
                .style("fill", "#FFFFFF")
                .text(data[i])
            
            d3.select(this).style("fill", "#FF0000")
        })
        .on("mouseout", function(d, i) {
            barValue.select(".label").remove();
            
            d3.select(this).style("fill", "#0000FF")
        })
    
    barElements.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", 0)
        .attr("y", function(d,i){
            return i * 25;
        })
        .text(function(d, i){
            return ["A", "B", "C", "D", "E", "F"][i];
        })
    
    var barValue = d3.select(svgId)
        .append("svg")
        .attr("width", 320)
        .attr("height", 240)
        .attr("class", "barValue")
        .append("g")
    
    var barTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle")
        .attr("class", "bartitle")
        .attr("transform", "translate(300, 200)")
        .text("막대 그래프")
}







