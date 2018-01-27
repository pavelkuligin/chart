// Type of line: straight — 0, curved — 1
var curveType = 1;

// Set of colors for lines
var colorPalette = new Array();
	var red = [244,67,54];
	var pink = [233,30,99];
	var purple = [156,39,176];
	var deepPurple = [103,58,183];
	var blue = [33,150,243];
	var cian = [0,188,212];
	var teal = [0,150,136];
	var green = [0,200,83];
	var yellow = [255,235,59];
	var amber = [255,193,7];
	var orange = [255,152,0];

	colorPalette = [red, green, blue, yellow, purple, pink, amber, cian, deepPurple, teal, orange];

// Parameters for Lines
var borderThickness = 2;
var endWidth = 8;
var dots = false;
var cuttedCenter = false; // false — color of dot the same as line color; true — you can choose color of dot below;
var dotFillR = 255;
var dotFillG = 255;
var dotFillB = 255;  
// Color for border of dot. Use: dotBorderR = colorPalette[i][0], dotBorderG = colorPalette[i][1], dotBorderB = colorPalette[i][2] to fill border with color of line;
var dotBorderR = 255;
var dotBorderG = 255;
var dotBorderB = 255; 

// Parameters for Areas
var areaOpacity = 0.8; 

// Parameters for Bars
var barWidthParam = 0.2; // The larger the parameter, the thinner the bar;

// Parameters for Donut
var donutBorder = 30;

// Parameters for Progress bar
var progressBarBorder = 12;
var progressBarColor = [244,67,54];

// Parameters for Gauge chart
var gaugeChartBorder = 30;
var gaugeChartColor = [156,39,176];
var gaugeChartBackcolor = [236,236,236];

// Parameters for Sparklines
var sparkColor = [52,52,52];
var borderThicknessSpark = 1;
var endWidthSpark = 4;
var sparkPointsCount = 20;