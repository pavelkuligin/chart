var onRun = function(context){
	// Create variables for selected area and artboard
	var selection = context.selection;
	var doc = context.document;

	// Set color palette for lines
	var colorPalette = new Array();
		var red = [224, 102, 90];
		var green = [78, 161, 152];
		var blue = [78, 183, 243];
		var yellow = [250, 200, 65];
		var purple = [153, 68, 201];
		colorPalette = [red, green, blue, yellow, purple];

	// Set parameters for thickness of lines and width of end circle
	var borderThickness = 2;
	var endWidth = 8;

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

		// Create popup for select type of lines on chart
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 30.0))

		var curveTypes = ['Straight', 'Curved']
		var dropDown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 120.0, 25.0));
	        [dropDown addItemsWithTitles:curveTypes];
	        [dropDown selectItemAtIndex:0];
	        accessoryView.addSubview(dropDown);

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Select type of lines")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	} else {

		// Create popup for chart with random data
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 130.0))

	    var linesInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 90.0, 120.0, 25.0))
		    linesInput.cell().setPlaceholderString("Number of lines")
		    accessoryView.addSubview(linesInput)

	    var pointsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 90.0, 120.0, 25.0))
		    pointsInput.cell().setPlaceholderString("Number of points")
		    accessoryView.addSubview(pointsInput)

	    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 60.0, 120.0, 25.0))
		    maxInput.cell().setPlaceholderString("Max value")
		    accessoryView.addSubview(maxInput)

		var dropDownLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 20.0, 120.0, 25.0))
		    dropDownLabel.cell().setStringValue("Select type of lines")
		    dropDownLabel.setBezeled(false)
		    dropDownLabel.setDrawsBackground(false)
		    dropDownLabel.setEditable(false)
		    dropDownLabel.setSelectable(false)
		    accessoryView.addSubview(dropDownLabel)

		var curveTypes = ['Straight', 'Curved']
		var dropDown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 120.0, 25.0));
	        [dropDown addItemsWithTitles:curveTypes];
	        [dropDown selectItemAtIndex:0];
	        accessoryView.addSubview(dropDown);

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Create random data for chart")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	    [[alert window] setInitialFirstResponder:linesInput]
	    [linesInput setNextKeyView:pointsInput]
	    [pointsInput setNextKeyView:maxInput]

	};

	// Run popup
	var responseCode = alert.runModal();
	var curveType = dropDown.indexOfSelectedItem();

	if (responseCode == NSAlertFirstButtonReturn) {

		if ( letters == 0  ){

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

		} else {

				// Create random data array
				var linesCount = linesInput.stringValue();
				var pointsCount = pointsInput.stringValue();
				var dataMax = maxInput.stringValue();
				var rowsLength = linesCount;

				var rows = new Array();

				for (var i = 0; i < linesCount; i++){

					var row = new Array();
					rows[i] = row;

					for (var j = 0; j < pointsCount; j++){

						rows[i][j] = Math.floor( Math.random() * dataMax );

					};

				};

		};

		// Define max Y-point + round it to near 10, 100 or 1000-number
		var roundDataMax = Math.round( dataMax );
		var stringDataMax = roundDataMax.toFixed(0);

		if (stringDataMax.length <= 3){

			dataMax = Math.ceil( dataMax / 10) * 10;

		} else if (stringDataMax.length == 4){           

			dataMax = Math.ceil( dataMax / 100) * 100;

		} else {

			dataMax = Math.ceil( dataMax / 1000) * 1000;
			// If you have numbers more than 99 999, then add more else-if items

		}

		// Create canvas for chart
		var lineCanvas = selection.firstObject();
		var points = rows[0].length;
		var heightCanvas = lineCanvas.frame().height();

		// Set step by X between near points
		var xStep = lineCanvas.frame().width() / ( points - 1 );

		// Set first X-point of line
		var x0 = lineCanvas.frame().x();

		doc.currentPage().currentArtboard().deselectAllLayers();

		for (var i = 0; i < rowsLength; i++){

			// Set first Y-point of line
			var y0 = ( lineCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][0] );

			// Create line chart
			var line = NSBezierPath.bezierPath();
			line.moveToPoint(NSMakePoint(x0,y0));

			if (curveType == 1){
				var xLast = x0;
				var yLast = y0;

				for (var j = 1; j < points; j++) {

					xNext = xLast + xStep;
					var y = ( lineCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );

					[line curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast + xStep / 2,yLast) controlPoint2:NSMakePoint(xNext - xStep / 2,y)];

					xLast = xNext;
					yLast = y;

				}; 
			} else {

				var x = x0;

				for (var j = 1; j < points; j++) {

					x = x + xStep;
					var y = ( lineCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[i][j] );
					line.lineToPoint(NSMakePoint(x,y));

				};

				var xLast = x;
				var yLast = y;
			};

			// Create shape from path
			var lineShape = MSShapeGroup.shapeWithBezierPath(line);
			var border = lineShape.style().addStylePartOfType(1);
			border.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
			border.thickness = borderThickness;
			lineShape.setName("lineChart_Line_" + ( i + 1 ));

			// Create circle at the end of line
			var endCircle = MSOvalShape.alloc().init();
			endCircle.frame = MSRect.rectWithRect(NSMakeRect(xLast - endWidth / 2,yLast - endWidth / 2,endWidth,endWidth));
			var circleShape = MSShapeGroup.shapeWithPath(endCircle);
			var fill = circleShape.style().addStylePartOfType(0);
			fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,1);
			circleShape.setName("lineChart_EndPoint_" + ( i + 1 ));

			// Add line and circle on artboard
			doc.currentPage().currentArtboard().addLayers([lineShape]);
			doc.currentPage().currentArtboard().addLayers([circleShape]);

			lineShape.setIsSelected(true);
			circleShape.setIsSelected(true);

		};

		// Push all selected layers to array
		var allLayers = doc.currentPage().currentArtboard().layers();
		var layersCount = allLayers.count();
		var selectedLayers = new Array();
		for (l = 0; l < layersCount; l++){

			var selectedLayer = allLayers[l].isSelected();
			
			if ( selectedLayer == true){

				selectedLayers.push(allLayers[l]);

			}

		}

		// Group from selected layers
		var layersToAdd = MSLayerArray.arrayWithLayers(selectedLayers)
		var newGroup = MSLayerGroup.groupFromLayers(layersToAdd)

	    newGroup.setName("Line chart")
	} else {

		return

	};

};










