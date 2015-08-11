var dynamicApp = angular.module('studyApp.DynamicCharts', ['ngRoute']);

dynamicApp.controller('dynamicChartsCtrl', function($scope) {
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
});

dynamicApp.directive('linearChart', function($window) {
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<svg width="850" height="200"></svg>',
        link: function(scope, iElm, iAttrs, controller) {
            var salesDatatoPlot = scope[iAttrs.chartData],
                padding = 20,
                pathClass = 'path',
                xScale, yScale, xAxisGen, yAxisGen, lineFun,
                d3 = $window.d3,
                rawSvg = iElm.find("svg")[0],
                svg = d3.select(rawSvg);

            function setChartParams() {
                //Plotting X-Hour and Y-Sales.
                xScale = d3.scale.linear()
                    .domain([0, d3.max(salesDatatoPlot, function(d) {
                        return d.hour;
                    })])
                    .range([padding + 5, rawSvg.clientWidth - padding]);

                yScale = d3.scale.linear()
                    .domain([0, d3.max(salesDatatoPlot, function(d) {
                        return d.sales;
                    })])
                    .range([rawSvg.clientHeight - padding,0]);

                xAxisGen = d3.svg.axis()
                			.scale(xScale)
                			.orient("bottom")
                			.ticks(salesDatatoPlot.length -1);

                yAxisGen = d3.svg.axis()
                			.scale(xScale)
                			.orient("left")
                			.ticks(5);

                lineFun = d3.svg.line()
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
				        d: lineFun(salesDataToPlot),
				        "stroke": "blue",
				        "stroke-width": 2,
				        "fill": "none",
				        "class": pathClass
				    });
            }
            drawLineChart();
        }
    };
});
