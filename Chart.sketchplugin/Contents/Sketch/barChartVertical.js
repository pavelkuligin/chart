var onRun = function(context){
	var chartName = "Bar chart";
	var nameOne = "Categories";
	var nameTwo = "Bars";
	var circleShape = false;
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

	// Width of bar area
	var step = widthCanvas / xItems;	

	// Set margin between bars
	var margin = barWidthParam * step;

	// Set size of bar
	var mainArray = new Array(xItems);
	for (var z = 0; z < xItems; z++){
		
		if (negativeFlip == false) {
			mainArray[z] = chartCanvas.frame().y() + heightCanvas + (( heightCanvas / dataMax ) * rows[0][z]);
		} else {
			mainArray[z] = chartCanvas.frame().y() + (( heightCanvas / dataMax ) * rows[0][z]);
		}
	};

	for (var i = 0; i < rowsLength - 1; i++){

		var n = 0;

		var x0 = chartCanvas.frame().x() + margin;

		for (var j = 0; j < xItems; j++) {

			x0 = x0 + step * n;
			x1 = x0 + step - 2 * margin;
			y0 = mainArray[j];
			y1 = mainArray[j] - (( heightCanvas / dataMax ) * rows[i + 1][j]);
			mainArray[j] = y1;

			// Create bar
			var bar = NSBezierPath.bezierPath();
			bar.moveToPoint(NSMakePoint(x0,y0));
			bar.lineToPoint(NSMakePoint(x1,y0));
			bar.lineToPoint(NSMakePoint(x1,y1));
			bar.lineToPoint(NSMakePoint(x0,y1));
			bar.closePath();

			// Create barShape from path
			var barShape = MSShapeGroup.shapeWithBezierPath(bar);
			var fill = barShape.style().addStylePartOfType(0);
			fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
			barShape.setName("bar_" + ( i + 1 ) + ( j + 1));

			// Add bar on artboard
			if (doc.currentPage().currentArtboard() === null){
				doc.currentPage().addLayers([barShape]);
			} else{
				doc.currentPage().currentArtboard().addLayers([barShape]);
			}
			[barShape select:true byExpandingSelection:true];

			n = 1;

		};

	};

	@import 'groupFromSelection.js'

};








