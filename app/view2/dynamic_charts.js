var dynamicApp = angular.module('studyApp.DynamicCharts', ['ngRoute']);

dynamicApp.controller('dynamicChartsCtrl', function($scope, $interval) {
    $(".nav a").on("click", function(){
       $(".nav").find(".active").removeClass("active");
       $(this).parent().addClass("active");
    });
    $scope.chartVisible = 'bar';
	$scope.salesData = [
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];

  $interval(function(){
  	var hour = $scope.salesData.length+1,
  	sales = Math.round(Math.random()*100);

  	$scope.salesData.push({
  		"hour": hour,
  		"sales": sales
  	});
  },1000,1000);
});

dynamicApp.directive('linearChart', function($parse, $window) {
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<svg width="850" height="200"></svg>',
        link: function(scope, iElm, iAttrs, controller) {
            var salesDataToPlot = scope[iAttrs.chartData],
                padding = 20,
                pathClass = 'path',
                xScale, yScale, xAxisGen, yAxisGen, lineRender,
                d3 = $window.d3,
                rawSvg = iElm.find("svg")[0],
                svg = d3.select(rawSvg);

            //Watching the array if any changes occur.
            scope.$watchCollection("salesData", function(newData, oldData){
                salesDataToPlot = newData;
             	reDrawLineChart();
            });

            function setlineChartParams() {
                //Plotting X-Hour and Y-Sales.
                xScale = d3.scale.linear()
                    .domain([0, d3.max(salesDataToPlot, function(d) {
                        return d.hour;
                    })])
                    .range([padding + 5, rawSvg.clientWidth - padding]);

                yScale = d3.scale.linear()
                    .domain([0, d3.max(salesDataToPlot, function(d) {
                        return d.sales;
                    })])
                    .range([rawSvg.clientHeight - padding,0]);

                xAxisGen = d3.svg.axis()
                			.scale(xScale)
                			.orient("bottom")
                			.ticks(10);

                yAxisGen = d3.svg.axis()
                			.scale(yScale)
                			.orient("left")
                			.ticks(5);

                lineRender = d3.svg.line()
                			.x(function(d){
                				return xScale(d.hour);
                			})
                			.y(function(d){
                				return yScale(d.sales);
                			})
                			.interpolate("basis");
            }

            function drawLineChart(){
            	setlineChartParams();

            	svg.attr("class","parentSvg");
            		
            	svg.append("svg:g")
            		.attr("class", "x axis")
            		.attr("transform", "translate(0,180)")
            		.call(xAxisGen);

            	svg.append("svg:g")	
            		.attr("class", "y axis")
            		.attr("transform", "translate(20,0)")
            		.call(yAxisGen);

				svg.append("svg:path")
				    .attr({
				        d: lineRender(salesDataToPlot),
				        "stroke": "blue",
				        "stroke-width": 2,
				        "fill": "none",
				        "class": pathClass
				    });
            }

			function reDrawLineChart() {
			  setlineChartParams();
			  svg.selectAll("g.y.axis").call(yAxisGen);
			  svg.selectAll("g.x.axis").call(xAxisGen);
			 
			  svg.selectAll("." + pathClass)
			     .attr({
			       d: lineRender(salesDataToPlot)
			     });
			}
            drawLineChart();
        }
    };
});

dynamicApp.directive('barChart', function( $parse, $window){
    return {
        restrict: "EA",
        template: '<svg width="850" height="250"></svg>',
        link: function(scope, iElm, iAttrs, controller) {
               var salesDataToPlot = scope[iAttrs.chartData],
                padding = 20,
                rectClass = 'rect',
                xScale, yScale, xAxisGen, yAxisGen, barRender,
                d3 = $window.d3,
                rawSvg = iElm.find("svg")[0],
                svg = d3.select(rawSvg),xDomain,
                numberOfXTicks = 10, xBarValues =[];

            //Watching the array if any changes occur.
            scope.$watchCollection("salesData", function(newData, oldData){
                salesDataToPlot = newData;
                reDrawbarChart();
            });

            function setbarChartParams() {
                //Plotting X-Hour and Y-Sales.
                xScale = d3.scale.ordinal()
                    .domain(salesDataToPlot.map(function(d) {
                        return d.hour;
                    }))
                    .rangeRoundBands([padding, rawSvg.clientWidth - padding],0.2);

                yScale = d3.scale.linear()
                    .domain([0, d3.max(salesDataToPlot, function(d) {
                        return d.sales;
                    })])
                    .range([rawSvg.clientHeight - padding,0]);

                //Limiting it to 10 xvalues.    
                xDomain = xScale.domain();
                xBarValues=[];
                var seperator = Math.floor((d3.max(xDomain)-d3.min(xDomain))/numberOfXTicks);
                for(var i=d3.min(xDomain);i<d3.max(xDomain);i++){ 
                  i = Math.floor(i+seperator); 
                  xBarValues.push(i);  
                }
                console.log(xBarValues);
                xAxisGen = d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom")
                            .ticks(10)
                            // .tickSubdivide(true)
                            .tickValues(xBarValues);

                yAxisGen = d3.svg.axis()
                            .scale(yScale)
                            .orient("left")
                            .ticks(5)
                            .tickSubdivide(true);
            }

            function drawBarChart(){
                setbarChartParams();

                svg.attr("class","parentSvg");
                    
                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,230)")
                    .call(xAxisGen);

                svg.append("svg:g") 
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxisGen);

                barRender = function(){
                    svg.selectAll('rect').remove();
                    svg.selectAll('rect')
                    .data(salesDataToPlot)
                    .enter()
                    .append('rect')
                    .attr("class",rectClass)
                    .attr('x', function(d) {
                      return xScale(d.hour);
                      })
                    .attr('y',function(d) {
                      return yScale(d.sales);
                      })
                    .attr('width', xScale.rangeBand())
                    .attr('height', function(d){
                        return (rawSvg.clientHeight - yScale(d.sales))
                    })
                    .attr("transform","translate(0,-20)")
                    .attr('fill', '#6B6B6B')
                    .on('mouseover', function(d) {
                      d3.select(this)
                        .attr('fill', 'red');
                    })
                    .on('mouseout', function(d) {
                      d3.select(this)
                        .attr('fill', '#6B6B6B');
                    });
                } 
                barRender();   
            }

            function reDrawbarChart() {
              setbarChartParams();
              svg.selectAll("g.y.axis").call(yAxisGen);
              svg.selectAll("g.x.axis").call(xAxisGen);
             
              barRender();
            }

            drawBarChart();
        }
    }
});