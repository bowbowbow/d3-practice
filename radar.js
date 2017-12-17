var wMaior = 280;
var wMenor = 280;

var colorscale = function (i) {
    var colors = [
    '#e3346f', '#7129e5', '#2a70e9', '#22b6ff', 
    '#78faf0', '#26fe5f', '#87ec2c', '#eff459',
    '#ecc92d', '#ff9527', '#e09820', '#ff5a1a'];
    return colors[i];
};

var legendOptions = ['단감', '단감잼'];
var json = [
    [
        {"axis":"탄수화물","value":42},
        {"axis":"단백질","value":9},
        {"axis":"칼슘","value":10},
        {"axis":"인","value":20},
        {"axis":"철", "value":33},
        {"axis":"칼륨","value":53},
        {"axis":"A","value":44},
        {"axis":"B1","value":58},
        {"axis":"B2","value":29},
        {"axis":"나이아신","value":20},
        {"axis":"C","value":100},
    ],
    [
        {"axis":"탄수화물","value":100},
        {"axis":"단백질","value":5},
        {"axis":"칼슘","value":7},
        {"axis":"인","value":9},
        {"axis":"철", "value":58},
        {"axis":"칼륨","value":35},
        {"axis":"A","value":0},
        {"axis":"B1","value":33},
        {"axis":"B2","value":100},
        {"axis":"나이아신","value":100},
        {"axis":"C","value":100},
    ],
];

function drawRadarCharts() {
    drawRadarChart('#chart-radar', wMaior, wMaior);
};

function drawRadarChart(divId, w, h) {
    var textSizeLevels = "11";
    var textSizeTooltip = "11";
    var textSizeLegend = "12";
    var circleSize = 5;
    var strokeWidthPolygon = "1px";
    var lineColor = '#fd364b';
    
    var RadarChart = {
        draw: function(id, data, options) {
            var cfg = {
                radius: circleSize,
                w: w,
                h: h,
                factor: 1,
                factorLegend: .85,
                levels: 1,
                maxValue: 0,
                radians: 2 * Math.PI,
                opacityArea: 0.001,
                ToRight: 5,
                TranslateX: 80,
                TranslateY: 60,
                ExtraWidthX: 10,
                ExtraWidthY: 100,
                color: d3.scale.category10()
            };
            
            if ('undefined' !== typeof options) {
                for (var i in options) {
                    if ('undefined' !== typeof options[i]) {
                        cfg[i] = options[i];
                    }
                }
            }
            
            cfg.maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}));}));
            var allAxis = (data[0].map(function(i, j){return i.axis;}));
            var total = allAxis.length;
            var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
            d3.select(id)
                .select("svg").remove();
            
            var g = d3.select(id)
                .append("svg")
                .attr("width", cfg.w+cfg.ExtraWidthX)
                .attr("height", cfg.h+cfg.ExtraWidthY)
                .attr("class", "graph-svg-component")
                .append("g")
                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
            
            var tooltip;
            
            // 원형 세그먼트
            for (var j=0; j<cfg.levels; j++) {
                var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
                g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
            }
            
            // 레벨 별 비율 수치
            // for (var j=0; j<cfg.levels; j++) {
            //     var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            //     g.selectAll(".levels")
            //     .data([1]) //dummy data
            //     .enter()
            //     .append("svg:text")
            //     .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
            //     .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
            //     .attr("class", "legend")
            //     .style("font-family", "sans-serif")
            //     .style("font-size", textSizeLevels)
            //     .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
            //     .attr("fill", "#737373")
            //     .text((j+1)*cfg.maxValue/cfg.levels);
            // }
            
            series = 0;
            
            var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", axis);
            
            // 중심에서 펴저나가는 선
            axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke-opacity", "0.75")
            .style("stroke-width", "0.3px")
            .style("stroke", "grey")
            
            // 포인트 별 과일 이름
            axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d;})
            .style("font-size", textSizeLegend)
            .style("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(0, -10)";})
            .attr("x", function(d, i){
                return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-50*Math.sin(i*cfg.radians/total);
            })
            .attr("y", function(d, i){
                return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);
            });

            // 포인트 별 과일 이름 옆에 동그라미
            axis.append("circle")
            .attr("class", "cicle")
            .attr("r", 3)
            .style("fill", function(d, i) {
                return colorscale(i);
            })
            .attr("transform", function(d, i){return "translate(0, -10)";})
            .attr("cx", function(d, i){
                return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-50*Math.sin(i*cfg.radians/total);
            })
            .attr("cy", function(d, i){
                return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);
            });
            
            // 선분 그리기
            data.forEach(function(y, x) {
                if(series % 2 == 0) {
                    dataValues = [];
                    g.selectAll(".nodes")
                    .data(y, function(j, i) {
                        dataValues.push([
                            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                        ]);
                    });
                    dataValues.push(dataValues[0]);
                    g.selectAll(".area")
                    .data([dataValues])
                    .enter()
                    .append("polygon")
                    .attr("class", "radar-chart-series_"+series)
                    .style("stroke-width", strokeWidthPolygon)
                    .style("stroke", lineColor)
                    .attr("points",function(d) {
                        var str="";
                        for (var pti=0;pti<d.length;pti++) {
                            str=str+d[pti][0]+","+d[pti][1]+" ";
                        }
                        return str;
                    })
                    .style("fill", lineColor)
                    .style("fill-opacity", cfg.opacityArea)
                    .on('mouseover', function (d) {
                        z = "polygon."+d3.select(this).attr("class");
                        g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                        g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", 0.7);
                    })
                    .on('mouseout', function() {
                        g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                    });
                } else {
                    dataValues = [];
                    g.selectAll(".nodes")
                    .data(y, function(j, i) {
                        dataValues.push([
                            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                        ]);
                    });
                    dataValues.push(dataValues[0]);
                    g.selectAll(".area")
                    .data([dataValues])
                    .enter()
                    .append("polygon")
                    .attr("class", "radar-chart-series_"+series)
                    .attr("points",function(d) {
                        var str="";
                        for (var pti=0;pti<d.length;pti++) {
                            str=str+d[pti][0]+","+d[pti][1]+" ";
                        }
                        return str;
                    })
                    .style("fill", lineColor)
                    .style("fill-opacity", 0.1);
                }
                series++;
            });
            
            series=0;
            
            // 선분의 꼭지점에 원 그리기
            // data.forEach(function(y, x) {
            //     g.selectAll(".nodes")
            //     .data(y).enter()
            //     .append("svg:circle")
            //     .attr("class", "radar-chart-series_"+series)
            //     .attr('r', cfg.radius)
            //     .attr("alt", function(j){return Math.max(j.value, 0);})
            //     .attr("cx", function(j, i){
            //         dataValues.push([
            //             cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
            //             cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
            //         ]);
            //         return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
            //     })
            //     .attr("cy", function(j, i){
            //         return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
            //     })
            //     .attr("data-id", function(j){
            //         return j.axis;
            //     })
            //     .style("fill", cfg.color(series)).style("fill-opacity", .9)
            //     .on('mouseover', function (d){
            //         newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            //         newY =  parseFloat(d3.select(this).attr('cy')) - 5;
                    
            //         tooltip.attr('x', newX)
            //         .attr('y', newY)
            //         .text(d.value)
            //         .transition(200)
            //         .style('opacity', 1);
                    
            //         z = "polygon." + d3.select(this).attr("class");
            //         g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", 0.1); 
            //         g.selectAll(z)
            //         .transition(200)
            //         .style("fill-opacity", 0.7);
            //     })
            //     .on('mouseout', function(){
            //         tooltip.transition(200)
            //         .style('opacity', 0);
            //         g.selectAll("polygon")
            //         .transition(200)
            //         .style("fill-opacity", cfg.opacityArea);
            //     })
            //     .append("svg:title")
            //     .text(function(j){
            //         return Math.max(j.value, 0);
            //     });
                
            //     series++;
            // });
            
            // 툴팁
            tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', textSizeTooltip);
        }
    };
    
    var myOptions = {
        w: w,
        h: h,
        ExtraWidthX: 180,
        labelScale: 0.5,
        levels: 5,
        levelScale: 0.85,
        facetPaddingScale: 1.9,
        maxValue: 0.6,
        showAxes: true,
        showAxesLabels: true,
        showLegend: true,
        showLevels: true,
        showLevelsLabels: false,
        showPolygons: true,
        showVertices: true
    };
    
    RadarChart.draw(divId, json, myOptions);
    
    /*

    /////////////////////////////////////////////
    ////////////  레전드 초기화  ///////////////////
    ////////////////////////////////////////////
    
    var svg = d3.select('#chart-radar')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h)
    .style("font-size", textSizeLegend);
    
    // 레전드 초기화
    var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)');
    ``
    // 레전드 컬러 사각형
    legend.selectAll('rect')
    .data(legendOptions)
    .enter()
    .append("rect")
    .attr("x", w - 8)
    .attr("y", function(d, i) {
        return i * 20;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d, i) {
        return colorscale(i);
    });
    
    // 레전드 텍스트
    legend.selectAll('text')
    .data(legendOptions)
    .enter()
    .append("text")
    .attr("x", w + 10)
    .attr("y", function(d, i) {
        return i * 20 + 10;
    })
    .attr("font-size", textSizeLegend)
    .attr("fill", "#000")
    .text(function(d) {
        return d;
    });
    */
};

drawRadarCharts();