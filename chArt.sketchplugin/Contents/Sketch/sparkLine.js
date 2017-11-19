var onRun = function(context){
	var chartName = "Sparkline";
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'

	// Set step by X between near points
	var xStep = chartCanvas.frame().width() / ( xItems - 1 );

	for (var i = 0; i < canvasCount; i++){

		// Set first X-point of line
		var x0 = selection[i].frame().x();

		// Set first Y-point of line
		var y0 = ( selection[i].frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][0] );

		// Create line chart
		var line = NSBezierPath.bezierPath();
		line.moveToPoint(NSMakePoint(x0,y0));

		var x = x0;

			for (var j = 1; j < xItems; j++) {

				x = x + xStep;
				var y = ( selection[i].frame().y() + heightCanvas ) - (( heightCanvas / ( dataMax ) ) * ( rows[i][j] ) );
				line.lineToPoint(NSMakePoint(x,y));

			};

			var xLast = x;
			var yLast = y;


		// Create shape from path
		var lineShape = MSShapeGroup.shapeWithBezierPath(line);
		var border = lineShape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRed_green_blue_alpha(sparkColor[0]/255,sparkColor[1]/255,sparkColor[2]/255,1);
		border.thickness = borderThicknessSpark;
		lineShape.setName("Sparkline " + ( i + 1 ));

		// Create circle at the end of line
		var endCircle = MSOvalShape.alloc().init();
		endCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidthSpark / 2,yLast - endWidthSpark / 2,endWidthSpark,endWidthSpark));
		var circleShape = MSShapeGroup.shapeWithPath(endCircle);
		var fill = circleShape.style().addStylePartOfType(0);
		fill.color = MSColor.colorWithRed_green_blue_alpha(sparkColor[0]/255,sparkColor[1]/255,sparkColor[2]/255,1);
		circleShape.setName("EndPoint_" + ( i + 1 ));

		// Add line and circle on artboard
		doc.currentPage().currentArtboard().addLayers([lineShape]);
		doc.currentPage().currentArtboard().addLayers([circleShape]);

		var sparkLinesGroup = new Array(selection[i], lineShape, circleShape);

		// Group from selected layers
		var layersToAdd = MSLayerArray.arrayWithLayers(sparkLinesGroup)
		var newGroup = MSLayerGroup.groupFromLayers(layersToAdd)

	    newGroup.setName("Sparkline " + (i + 1));

	};
};







