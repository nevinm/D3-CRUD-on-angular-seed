var dynamicApp = angular.module('studyApp.DynamicCharts', ['ngRoute']);

dynamicApp.controller('dynamicChartsCtrl', function($scope, $interval) {
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
  },1000,100);
});

dynamicApp.directive('linearChart', function($parse, $window) {
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<svg width="850" height="200"></svg>',
        link: function(scope, iElm, iAttrs, controller) {
        	var exp = $parse(iAttrs.chartData);
            	var salesDataToPlot =exp(scope),
                padding = 20,
                pathClass = 'path',
                xScale, yScale, xAxisGen, yAxisGen, lineRender,
                d3 = $window.d3,
                rawSvg = iElm.find("svg")[0],
                svg = d3.select(rawSvg);

            //Watching the array if any changes occur.
            scope.$watchCollection(exp, function(newData, oldData){
                salesDataToPlot = newData;
             	reDrawLineChart();
            });

            function setChartParams() {
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
            	setChartParams();

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
			  setChartParams();
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
