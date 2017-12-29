var onRun = function(context){
	var chartName = "Area chart";
	var nameOne = "Areas";
	var nameTwo = "Points";
	var circleShape = false;
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'

	// Set step by X between near points
	var xStep = chartCanvas.frame().width() / ( xItems - 1 );

	// Set first X-point of areas
	var x0 = chartCanvas.frame().x();

	for (var i = 0; i < rowsLength; i++){

		// Set first Y-point of area
		var y0 = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][0] );

		// Create area chart
		var area = NSBezierPath.bezierPath();
		area.moveToPoint(NSMakePoint(x0,y0));

		if (curveType == 1){
			
			var xLast = x0;
			var yLast = y0;

			for (var j = 1; j < xItems; j++) {

				xNext = xLast + xStep;
				var y = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );

				[area curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast + xStep / 2,yLast) controlPoint2:NSMakePoint(xNext - xStep / 2,y)];

				xLast = xNext;
				yLast = y;
			
			}; 

		} else {

			var x = x0;

			for (var j = 1; j < xItems; j++) {

				x = x + xStep;
				var y = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );
				area.lineToPoint(NSMakePoint(x,y));

			};

		};

		area.lineToPoint(NSMakePoint(x0 + widthCanvas, chartCanvas.frame().y() + heightCanvas));
		area.lineToPoint(NSMakePoint(x0, chartCanvas.frame().y() + heightCanvas));
		area.closePath();


		// Create areaShape from path
		var areaShape = MSShapeGroup.shapeWithBezierPath(area);
		var fill = areaShape.style().addStylePartOfType(0);
		fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,0.8);
		areaShape.setName("area_" + ( i + 1 ));

		// Add areaShape on artboard
		doc.currentPage().currentArtboard().addLayers([areaShape]);
		[areaShape select:true byExpandingSelection:true];

		};

	@import 'groupFromSelection.js'

};






