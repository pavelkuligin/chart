var onRun = function(context){
	var chartName = "Stacked area chart";
	var nameOne = "Areas";
	var nameTwo = "Points";
	var stacked = true;
	@import 'common.js'
	@import 'parameters.js'

	// Insert first zero-array
	var zeroArray = new Array();
	for (var i = 0; i < xItems; i++){
		zeroArray[i] = 0;
	};
	rows.unshift(zeroArray);
	rowsLength = rows.length;

	// Set step by X between near points
	var xStep = chartCanvas.frame().width() / ( xItems - 1 );

	// Set first X-point of areas
	var x0 = chartCanvas.frame().x();

	// Set height of area
	var yHeight = new Array(xItems);
	for (var i = 0; i < xItems; i++){
		yHeight[i] = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[0][i] );
	};

	for (var i = 0; i < rowsLength - 1; i++){

		// Set first Y-point of area
		var y0 = yHeight[0];

		// Create stacked area chart
		var area = NSBezierPath.bezierPath();
		area.moveToPoint(NSMakePoint(x0,y0));

		if (curveType == 1){
			
			var xLast = x0;
			var yLast = y0;

			for (var j = 1; j < xItems; j++) {

				xNext = xLast + xStep;
				var y = yHeight[j];

				[area curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast + xStep / 2,yLast) controlPoint2:NSMakePoint(xNext - xStep / 2,y)];

				xLast = xNext;
				yLast = y;
			
			}; 
			
			var y = yHeight[xItems - 1] - (( heightCanvas / dataMax ) * rows[i + 1][xItems - 1] );
			area.lineToPoint(NSMakePoint(xLast,y));
			yHeight[xItems - 1] = y;

			for (var k = xItems - 2; k >= 0; k--){

				yLast = y;
				xNext = xLast - xStep;
				var y = yHeight[k] - (( heightCanvas / dataMax ) * rows[i + 1][k] );
				[area curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast - xStep / 2,yLast) controlPoint2:NSMakePoint(xNext + xStep / 2,y)];
				yHeight[k] = y;
				xLast = xNext;

			};

			area.closePath();


		} else {

			var x = x0;

			for (var j = 1; j < xItems; j++) {

				x = x + xStep;
				var y = yHeight[j];
				area.lineToPoint(NSMakePoint(x,y));

			};

			for (var k = xItems - 1; k >= 0; k--){

				var y = yHeight[k] - (( heightCanvas / dataMax ) * rows[i + 1][k] );
				area.lineToPoint(NSMakePoint(x,y));
				x = x - xStep;
				yHeight[k] = y;

			};

			area.closePath();

		};

		// Create areaShape from path
		var areaShape = MSShapeGroup.shapeWithBezierPath(area);
		var fill = areaShape.style().addStylePartOfType(0);
		fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
		areaShape.setName("stackedArea_" + ( i + 1 ));

		// Add areaShape on artboard
		doc.currentPage().currentArtboard().addLayers([areaShape]);
		[areaShape select:true byExpandingSelection:true];

		};

	@import 'groupFromSelection.js'

};






