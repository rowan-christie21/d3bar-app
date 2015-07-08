/*
/ Main script that acts as the entry point for the application
*/

requirejs.config({
    baseUrl:'',
    paths: {
        backbone: 'lib/backbone/backbone-min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        d3: 'lib/d3/d3.min',
        jquery: 'lib/jquery/jquery.min',
        jqueryui: 'lib/jquery-ui/jquery-ui.min',
        underscore: 'lib/underscore/underscore-min'
    }
})

// Main application single entry point
requirejs([
    'jquery',
    'd3',
    'bootstrap',
    'js/modal'
],function($, d3, bootstrap, Modal) {

this.chart = $("<svg>").addClass("chart");

var data = [
  {name: "A",	       value: .08167},
  {name: "B",	       value: .01492},
  {name: "C",      	 value: .02782},
  {name: "D",	       value: .04253},
  {name: "E",	       value: .12702},
  {name: "F",      	 value: .02288},
  {name: "G",	       value: .02015},
  {name: "H",	       value: .06094},
  {name: "I",    	   value: .06966},
  {name: "J",	       value: .00153},
  {name: "K",    	   value: .00772},
  {name: "L",  	     value: .04025},
  {name: "M",      	 value: .02406},
  {name: "N",    	   value: .06749},
  {name: "O",	       value: .07507},
  {name: "P",	       value: .01929},
  {name: "Q",	       value: .00095},
  {name: "R",      	 value: .05987},
  {name: "S",	       value: .06327},
  {name: "T",	       value: .09056},
  {name: "U",      	 value: .02758},
  {name: "V",	       value: .00978},
  {name: "W",	       value: .02360},
  {name: "X",	       value: .00150},
  {name: "Y",      	 value: .01974},
  {name: "Z",	       value: .00074}
];

var data2 = [
  {name: "A",	       value: .13167},
  {name: "B",	       value: .00992},
  {name: "C",      	 value: .04782},
  {name: "D",	       value: .02253},
  {name: "E",	       value: .08702},
  {name: "F",      	 value: .07288},
  {name: "G",	       value: .05015},
  {name: "H",	       value: .02094},
  {name: "I",    	   value: .09866},
  {name: "J",	       value: .02353},
  {name: "K",    	   value: .01772},
  {name: "L",  	     value: .02025},
  {name: "M",      	 value: .08406},
  {name: "N",    	   value: .03749},
  {name: "O",	       value: .03507},
  {name: "P",	       value: .08929},
  {name: "Q",	       value: .00395},
  {name: "R",      	 value: .03487},
  {name: "S",	       value: .09127},
  {name: "T",	       value: .06756},
  {name: "U",      	 value: .02358},
  {name: "V",	       value: .01178},
  {name: "W",	       value: .07860},
  {name: "X",	       value: .01550},
  {name: "Y",      	 value: .02674},
  {name: "Z",	       value: .00274}
];

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

  var barWidth = width / data.length;
  //var barWidth = width / data2.length;

  var bar = chart.selectAll("g")
      .data(data)
      //.data(data2)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand());


  bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

var my_modal = new Modal("Button","length","Settings","Change the length.","Close","Length");
my_modal.add_modal($("body"));

$('.chart rect').hover(function() {
d3.select(this).transition()
    .each("start", function() { d3.selectAll('.chart rect').style("fill", "steelblue"); })
    .style("fill", "red");
});

$('div button:nth-child(2)').click(function() {

  var barUpdate = bar.data(data2)
    .transition()
    .duration(3000)
    .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  barUpdate.select("rect")
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr("width", x.rangeBand());

  barUpdate.select("text")
    .attr("x", x.rangeBand() / 2)
    .attr("y", function(d) { return y(d.value) + 3; })
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });

});

});
