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
	var step = heightCanvas / xItems;	

	// Set margin between bars
	var margin = 0.2 * step;

	// Set size of bar
	var mainArray = new Array(xItems);
	for (var z = 0; z < xItems; z++){
		mainArray[z] = chartCanvas.frame().x() + (( widthCanvas / dataMax ) * rows[0][z]);
	};

	for (var i = 0; i < rowsLength - 1; i++){

		var n = 0;

		var y0 = chartCanvas.frame().y() + margin;

		for (var j = 0; j < xItems; j++) {

			y0 = y0 + step * n;
			y1 = y0 + step - 2 * margin;
			x0 = mainArray[j];
			x1 = mainArray[j] + (( widthCanvas / dataMax ) * rows[i + 1][j]);
			mainArray[j] = x1; 

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
			doc.currentPage().currentArtboard().addLayers([barShape]);
			[barShape select:true byExpandingSelection:true];

			n = 1;

		};

	};

	@import 'groupFromSelection.js'

};








