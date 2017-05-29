var onRun = function(context){
	// Create variables for selected area and artboard
	var selection = context.selection;
	var doc = context.document;
	var circleCount = selection.length;

	var randomColor = new Array();
		for (var i = 0; i < 3; i++){
			randomColor[i] = Math.floor(Math.random() * 255);
		}
	var barColor = new Array();
		barColor = randomColor;

	// Set border thickness
	var borderThickness = selection[0].style().border().thickness();

	// Check selected layer
	if([selection count] == 0) {
		[doc showMessage:"Select at least one rectangle layer"];
	};

	// Define type of input data: numeric or undefined
	var pasteboard = NSPasteboard.generalPasteboard();
	var stringPasteboard = [pasteboard stringForType:NSPasteboardTypeString];
	var jsString = String(stringPasteboard);

	// Search letters
	var numberString = jsString.replace(/\u0020/g, "").replace(/\u0025/g, "").replace(/\u0009/g, "").replace(/\u000B/g, "").replace(/\u002C/g, "").replace(/\u002E/g, "").replace(/\u002D/g, "").replace(/\n/g, "");
	var letterReg = /\D/;
	var letters = letterReg.test(numberString);

	
	//Create popup UI for input required data
	if( letters == 0 ){ 

		// Create popup for select color of progress bar
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 30.0))

		var colorInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 200.0, 25.0))
		    colorInput.cell().setPlaceholderString("Enter R, G, B, A or random")
		    accessoryView.addSubview(colorInput)

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Select color of progress bar")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

		[[alert window] setInitialFirstResponder:colorInput]

		// Run popup
		var responseCode = alert.runModal();

		var color = colorInput.stringValue();

		if ( color == "random" ){

			barColor = randomColor;

		} else {

			color.replace(/\u0020/g, "");
			barColor = color.split("\u002C");

		};

	} else{
	
		var responseCode = 1000;

	};

	if (responseCode == NSAlertFirstButtonReturn) {

		if ( letters == 0 ){

				// Remove tabs and commas
				jsString = jsString.replace(/\u0025/g, "").replace(/\u0020/g, "").replace(/\u0009/g, "\u0020").replace(/\u000B/g, "\u0020").replace(/\u002C/g, "\u0020");

				// Set separator for numbers
				var separatorItems = "\u0020";

				// Separate data to array
				var row = jsString.split(separatorItems);

		} else {

				// Create random data array
				var row = new Array();

				for (var i = 0; i < circleCount; i++){

					row[i] = Math.floor( Math.random() * 100 );

				};

		};

		var progressBars = new Array();
		var pi = Math.PI;

		// Part of circle: I, II, III or IV
		var alfa = 0;

		for (var i = 0; i < circleCount; i++) {
		
			progressBars[i] = ( row[i] * 2 * pi ) / 100;

			// Create canvas for progress bar
			var circleCanvas = selection[i];
			var radiusCircleCanvas = ( circleCanvas.frame().height() - borderThickness ) / 2;

			var x0 = circleCanvas.frame().x() + radiusCircleCanvas + ( borderThickness / 2 );
			var y0 = circleCanvas.frame().y() + ( borderThickness / 2 );

			// Create progress bar
			var progressBar = NSBezierPath.bezierPath();
			progressBar.moveToPoint(NSMakePoint(x0,y0));

			// Define center of circle
			var xCenter = x0;
			var yCenter = y0 + radiusCircleCanvas;

			// Define length of control Bezier shoulder
			var controlLength = ( 4 / 3 ) * Math.tan( pi / 8 ) * radiusCircleCanvas;
			
			// Create arcs depending on the endPoint location
			if ( progressBars[i] > pi / 2 && progressBars[i] < pi ){

				alfa = pi / 2;

				[progressBar curveToPoint:NSMakePoint(xCenter + radiusCircleCanvas,yCenter) controlPoint1:NSMakePoint(x0 + controlLength,y0) controlPoint2:NSMakePoint(xCenter + radiusCircleCanvas,yCenter - controlLength)];

			} else if ( progressBars[i] > pi && progressBars[i] < 1.5 * pi ){

				alfa = pi;

				[progressBar curveToPoint:NSMakePoint(xCenter + radiusCircleCanvas,yCenter) controlPoint1:NSMakePoint(x0 + controlLength,y0) controlPoint2:NSMakePoint(xCenter + radiusCircleCanvas,yCenter - controlLength)];
				[progressBar curveToPoint:NSMakePoint(xCenter,yCenter + radiusCircleCanvas) controlPoint1:NSMakePoint(xCenter + radiusCircleCanvas,yCenter + controlLength) controlPoint2:NSMakePoint(xCenter + controlLength,yCenter + radiusCircleCanvas)];

			} else if ( progressBars[i] > pi * 1.5 && progressBars[i] <= 2 * pi ){

				alfa = pi * 1.5;

				[progressBar curveToPoint:NSMakePoint(xCenter + radiusCircleCanvas,yCenter) controlPoint1:NSMakePoint(x0 + controlLength,y0) controlPoint2:NSMakePoint(xCenter + radiusCircleCanvas,yCenter - controlLength)];
				[progressBar curveToPoint:NSMakePoint(xCenter,yCenter + radiusCircleCanvas) controlPoint1:NSMakePoint(xCenter + radiusCircleCanvas,yCenter + controlLength) controlPoint2:NSMakePoint(xCenter + controlLength,yCenter + radiusCircleCanvas)];
				[progressBar curveToPoint:NSMakePoint(xCenter - radiusCircleCanvas,yCenter) controlPoint1:NSMakePoint(xCenter - controlLength,yCenter + radiusCircleCanvas) controlPoint2:NSMakePoint(xCenter - radiusCircleCanvas,yCenter + controlLength)];

			} else {

				alfa = 0;

			};

			progressBars[i] = progressBars[i] - alfa;

			// Redefine the start point
			x0 = xCenter + radiusCircleCanvas * Math.sin( alfa );
			y0 = yCenter + radiusCircleCanvas * Math.cos( alfa );

			// Redefine length of control Bezier shoulder
			controlLength = ( 4 / 3 ) * Math.tan( progressBars[i] / 4 ) * radiusCircleCanvas;

			// Define end point on circle
			var xEnd = xCenter + radiusCircleCanvas * Math.sin( alfa + progressBars[i] );
			var yEnd = yCenter - radiusCircleCanvas * Math.cos( alfa + progressBars[i] );
			
			// Auxiliary calculations
			var radiusControl = Math.sqrt( ( Math.pow( controlLength, 2 ) ) + ( Math.pow( radiusCircleCanvas, 2 ) ) );
			var beta = Math.acos(radiusCircleCanvas / radiusControl);

			// Define location of end control points
			var controlLengthX = xCenter + radiusControl * Math.sin( alfa + progressBars[i] - beta );
			var controlLengthY = yCenter - radiusControl * Math.cos( alfa + progressBars[i] - beta );

			// Define location of start control points
			var controlLengthX0 = xCenter + radiusControl * Math.sin( alfa + beta );
			var controlLengthY0 = yCenter - radiusControl * Math.cos( alfa + beta );


			[progressBar curveToPoint:NSMakePoint(xEnd,yEnd) controlPoint1:NSMakePoint(controlLengthX0,controlLengthY0) controlPoint2:NSMakePoint(controlLengthX,controlLengthY)];

			var progressBarShape = MSShapeGroup.shapeWithBezierPath(progressBar);
			var border = progressBarShape.style().addStylePartOfType(1);
			border.color = MSColor.colorWithRed_green_blue_alpha(barColor[0]/255,barColor[1]/255,barColor[2]/255,1);
			border.thickness = borderThickness;
			progressBarShape.setName("Bar_" + ( i + 1 ));

			doc.currentPage().currentArtboard().addLayers([progressBarShape]);

			var progressGroup = new Array(selection[i], progressBarShape);

			// Group from selected layers
			var layersToAdd = MSLayerArray.arrayWithLayers(progressGroup)
			var newGroup = MSLayerGroup.groupFromLayers(layersToAdd)

		    newGroup.setName("Progress bar " + (i + 1));

		};

	} else {

		return

	};

};








