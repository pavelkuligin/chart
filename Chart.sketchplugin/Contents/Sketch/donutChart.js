var onRun = function(context){
	var chartName = "Donut chart";
	var circleShape = true;
	var nameOne = "Pieces";
	var nameTwo = false;
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'


	var radius = chartCanvas.frame().width() / 2 - donutBorder / 2;
	var x0 = chartCanvas.frame().x() + chartCanvas.frame().width() / 2;
	var y0 = chartCanvas.frame().y();
	var yCenter = y0 + chartCanvas.frame().width() / 2;
	var startAngle = -90;
	var endAngle = 0;
    var addAngle = 0;

    var sortedItems = new Array();
    sortedItems = rows[0];

	function compareNumeric(a, b) {
	  return b - a;
	}

	sortedItems.sort(compareNumeric);


	for (var j = 0; j < xItems; j++) {

        endAngle = sortedItems[j] * 3.6 - 90 + addAngle;

		var arc = NSBezierPath.bezierPath();
		[arc appendBezierPathWithArcWithCenter:NSMakePoint(x0,yCenter) radius:radius startAngle:startAngle endAngle:endAngle];

		addAngle = endAngle + 90;
		startAngle = endAngle;

		// Create shape from path
		var arcShape = MSShapeGroup.shapeWithBezierPath(arc);
		var border = arcShape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[j][0]/255,colorPalette[j][1]/255,colorPalette[j][2]/255,1);
		border.thickness = donutBorder;
		arcShape.setName("donut_" + ( j + 1 ));


		// Add arc on artboard
		doc.currentPage().currentArtboard().addLayers([arcShape]);

		[arcShape select:true byExpandingSelection:true];

	}; 




	@import 'groupFromSelection.js'

};










