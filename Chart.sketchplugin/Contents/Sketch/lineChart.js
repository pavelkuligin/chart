var onRun = function(context){
	var chartName = "Line chart";
	var nameOne = "Lines";
	var nameTwo = "Points";
	var circleShape = false;
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'

	// Set step by X between near points
	var xStep = chartCanvas.frame().width() / ( xItems - 1 );

	// Set first X-point of line
	var x0 = chartCanvas.frame().x();

	for (var i = 0; i < rowsLength; i++){

		// Set first Y-point of line
		var y0 = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][0] );

		// Create line chart
		var line = NSBezierPath.bezierPath();
		line.moveToPoint(NSMakePoint(x0,y0));

		if (curveType == 1){

			var xLast = x0;
			var yLast = y0;

			for (var j = 1; j < xItems; j++) {

				xNext = xLast + xStep;
				var y = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );

				[line curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast + xStep / 2,yLast) controlPoint2:NSMakePoint(xNext - xStep / 2,y)];

				if ( dots == true ){
					var lineCircle = MSOvalShape.alloc().init();
					lineCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidth / 2,yLast - endWidth / 2,endWidth,endWidth));
					var lineCircleShape = MSShapeGroup.shapeWithPath(lineCircle);
					var fillCircle = lineCircleShape.style().addStylePartOfType(0);
					fillCircle.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
					var borderCircle = lineCircleShape.style().addStylePartOfType(1);
					borderCircle.color = MSColor.colorWithRed_green_blue_alpha(255/255,255/255,255/255,1);
					borderCircle.thickness = borderThickness;
					borderCircle.position = 2;
					lineCircleShape.setName("a_linePoint_" + ( j ));

					if (doc.currentPage().currentArtboard() === null){
						doc.currentPage().addLayers([lineCircleShape]);
					} else{
						doc.currentPage().currentArtboard().addLayers([lineCircleShape]);	
					}
					[lineCircleShape select:true byExpandingSelection:true];
				}

				xLast = xNext;
				yLast = y;

			}; 
		} else {

			var x = x0;
			var xLast = x0;
			var yLast = y0;

			for (var j = 1; j < xItems; j++) {

				x = x + xStep;
				var y = ( chartCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );
				line.lineToPoint(NSMakePoint(x,y));

				if ( dots == true ){
					var lineCircle = MSOvalShape.alloc().init();
					lineCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidth / 2,yLast - endWidth / 2,endWidth,endWidth));
					var lineCircleShape = MSShapeGroup.shapeWithPath(lineCircle);
					var fillCircle = lineCircleShape.style().addStylePartOfType(0);
					fillCircle.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
					var borderCircle = lineCircleShape.style().addStylePartOfType(1);
					borderCircle.color = MSColor.colorWithRed_green_blue_alpha(255/255,255/255,255/255,1);
					borderCircle.thickness = borderThickness;
					borderCircle.position = 2;
					lineCircleShape.setName("a_linePoint_" + ( j ));

					if (doc.currentPage().currentArtboard() === null){
						doc.currentPage().addLayers([lineCircleShape]);
					} else{
						doc.currentPage().currentArtboard().addLayers([lineCircleShape]);
					}
					[lineCircleShape select:true byExpandingSelection:true];
				}

				xLast = x;
				yLast = y;

			};

		};

		// Create shape from path
		var lineShape = MSShapeGroup.shapeWithBezierPath(line);
		var border = lineShape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
		border.thickness = borderThickness;
		lineShape.setName("line_" + ( i + 1 ));

		// Create circle at the end of line
		var endCircle = MSOvalShape.alloc().init();
		endCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidth / 2,yLast - endWidth / 2,endWidth,endWidth));
		var circleShape = MSShapeGroup.shapeWithPath(endCircle);
		var fill = circleShape.style().addStylePartOfType(0);
		fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
		var borderEnd = circleShape.style().addStylePartOfType(1);
		borderEnd.color = MSColor.colorWithRed_green_blue_alpha(255/255,255/255,255/255,1);
		borderEnd.thickness = borderThickness;
		borderEnd.position = 2;
		circleShape.setName("endPoint_" + ( i + 1 ));

		// Add line and circle on artboard
		if (doc.currentPage().currentArtboard() === null){
			doc.currentPage().addLayers([lineShape]);
		} else{
			doc.currentPage().currentArtboard().addLayers([lineShape]);
		}
		if (doc.currentPage().currentArtboard() === null){
			doc.currentPage().addLayers([circleShape]);
		} else{
			doc.currentPage().currentArtboard().addLayers([circleShape]);
		}

		[lineShape select:true byExpandingSelection:true];
		[circleShape select:true byExpandingSelection:true];

	};

	@import 'groupFromSelection.js'

};










