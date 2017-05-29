var onRun = function(context){
	// Create variables for selected area and artboard
	var selection = context.selection;
	var doc = context.document;
	var canvasCount = selection.length;

	// Set colors for sparklines
	var red = [224, 102, 90];
	var black = [0, 0, 0];

	// Set parameters for thickness of lines and width of end circle
	var borderThickness = 0.5;
	var endWidth = 3;

	// Check selected layer
	if([selection count] == 0) {
		[doc showMessage:"Select at least one rectangle layer"];
	};

	// Define type of input data: numeric or undefined
	var pasteboard = NSPasteboard.generalPasteboard();
	var stringPasteboard = [pasteboard stringForType:NSPasteboardTypeString];
	var jsString = String(stringPasteboard);

	// Search letters
	var numberString = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "").replace(/\u000B/g, "").replace(/\u002C/g, "").replace(/\u002E/g, "").replace(/\u002D/g, "").replace(/\n/g, "");
	var letterReg = /\D/;
	var letters = letterReg.test(numberString);
	
	//Create popup UI for input required data
	if( letters == 0 ){ 

		var responseCode = 1000;

	} else {

		// Create popup for chart with random data
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 30.0))

	    var pointsInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 120.0, 25.0))
		    pointsInput.cell().setPlaceholderString("Number of points")
		    accessoryView.addSubview(pointsInput)

	    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 0.0, 120.0, 25.0))
		    maxInput.cell().setPlaceholderString("Max value")
		    accessoryView.addSubview(maxInput)

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Create random data for chart")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	    [[alert window] setInitialFirstResponder:pointsInput]
	    [pointsInput setNextKeyView:maxInput]


		// Run popup
		var responseCode = alert.runModal();

	};


	if (responseCode == NSAlertFirstButtonReturn) {
		
		if ( letters == 0 ){

				// Remove tabs and commas
				jsString = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "\u0020").replace(/\u000B/g, "\u0020").replace(/\u002C/g, "\u0020");

				// Set separator for rows
				var separatorRows = "\n";
				var separatorItems = "\u0020";

				// Separate table data to array
				var rows = jsString.split(separatorRows);
				var rowsLength = rows.length;
				for (var i = 0; i < rowsLength; i++) {
					rows[i] = rows[i].split(separatorItems);
				};

				var rowMax = new Array();

				for (var i = 0; i < rowsLength; i++){

					rowMax[i] = Math.max.apply(null, rows[i]);

				};

				var dataMax = Math.max.apply(null, rowMax);

				var rowMin = new Array();

				for (var i = 0; i < rowsLength; i++){

					rowMin[i] = Math.min.apply(null, rows[i]);

				};

				var dataMin = Math.min.apply(null, rowMin);

		} else {

				// Create random data array
				var pointsCount = pointsInput.stringValue();
				var dataMax = maxInput.stringValue();
				var dataMin = 0;

				var rows = new Array();

				for (var i = 0; i < canvasCount; i++){

					var row = new Array();
					rows[i] = row;

					for (var j = 0; j < pointsCount; j++){

						rows[i][j] = Math.floor( Math.random() * dataMax );

					};

				};

		};

		// Create canvas for chart
		var lineCanvas = selection.firstObject();
		var points = rows[0].length;
		var heightCanvas = lineCanvas.frame().height();

		// Set step by X between near points
		var xStep = lineCanvas.frame().width() / ( points - 1 );

		for (var i = 0; i < canvasCount; i++){

			// Set first X-point of line
			var x0 = selection[i].frame().x();

			// Set first Y-point of line
			var y0 = ( selection[i].frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][0] );

			// Create line chart
			var line = NSBezierPath.bezierPath();
			line.moveToPoint(NSMakePoint(x0,y0));

			var x = x0;

				for (var j = 1; j < points; j++) {

					x = x + xStep;
					var y = ( selection[i].frame().y() + heightCanvas ) - (( heightCanvas / ( dataMax - dataMin ) ) * ( rows[i][j] - dataMin ) );
					line.lineToPoint(NSMakePoint(x,y));

				};

				var xLast = x;
				var yLast = y;


			// Create shape from path
			var lineShape = MSShapeGroup.shapeWithBezierPath(line);
			var border = lineShape.style().addStylePartOfType(1);
			border.color = MSColor.colorWithRed_green_blue_alpha(black[0]/255,black[1]/255,black[2]/255,1);
			border.thickness = borderThickness;
			lineShape.setName("Sparkline " + ( i + 1 ));

			// Create circle at the end of line
			var endCircle = MSOvalShape.alloc().init();
			endCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidth / 2,yLast - endWidth / 2,endWidth,endWidth));
			var circleShape = MSShapeGroup.shapeWithPath(endCircle);
			var fill = circleShape.style().addStylePartOfType(0);
			fill.color = MSColor.colorWithRed_green_blue_alpha(red[0]/255,red[1]/255,red[2]/255,1);
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
	} else {

		return

	};

};










