var onRun = function(context){
	// Create variables for selected area and artboard
	var selection = context.selection;
	var doc = context.document;

	// Set color for areas l
	var color = new Array();
		var red = [224, 102, 90];
		var green = [78, 161, 152];
		var blue = [78, 183, 243];
		var yellow = [250, 200, 65];
		var purple = [153, 68, 201];
		color = blue;

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

		// Create popup for select type of areas on chart
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

	    var areasInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 90.0, 120.0, 25.0))
		    areasInput.cell().setPlaceholderString("Number of areas")
		    accessoryView.addSubview(areasInput)

	    var pointsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 90.0, 120.0, 25.0))
		    pointsInput.cell().setPlaceholderString("Number of points")
		    accessoryView.addSubview(pointsInput)

	    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 60.0, 120.0, 25.0))
		    maxInput.cell().setPlaceholderString("Max value")
		    accessoryView.addSubview(maxInput)

		var dropDownLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 20.0, 120.0, 25.0))
		    dropDownLabel.cell().setStringValue("Select type of areas")
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

	    [[alert window] setInitialFirstResponder:areasInput]
	    [areasInput setNextKeyView:pointsInput]
	    [pointsInput setNextKeyView:maxInput]

	};

	// Run popup
	var responseCode = alert.runModal();
	var curveType = dropDown.indexOfSelectedItem();

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
				var rowLength = rows[0].length;

				// Define max value
				var yMax = new Array();
				for (var i = 0; i < rowLength; i++){
	                var yMaxColumn = 0;
					for (var j = 0; j < rowsLength; j++){
						yMaxColumn = yMaxColumn + Number(rows[j][i]);
					}
					yMax[i] = yMaxColumn; 
				};
				var dataMax = Math.max.apply(null, yMax);

		} else {

				// Create random data array
				var areasCount = areasInput.stringValue();
				var pointsCount = pointsInput.stringValue();
				var dataMax = maxInput.stringValue();
				var rowsLength = areasCount;

				var randomYHeight = new Array();
				for (var i = 0; i < pointsCount; i++){
					randomYHeight[i] = dataMax;
				};

				var rows = new Array();

				for (var i = 0; i < areasCount; i++){

					var row = new Array();
					rows[i] = row;

					for (var j = 0; j < pointsCount; j++){

						rows[i][j] = Math.floor( Math.random() * randomYHeight[j] );
						randomYHeight[j] = randomYHeight[j] - rows[i][j];

					};

				};

				var rowLength = rows[0].length;

		};

		// Insert first zero-array
		var zeroArray = new Array();
		for (var i = 0; i < rowLength; i++){
			zeroArray[i] = 0;
		};
		rows.unshift(zeroArray);
		rowsLength = rows.length;

		// Define max Y-height of areas + round it to near 10, 100 or 1000-number
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
		var areaCanvas = selection.firstObject();
		var points = rowLength;
		var heightCanvas = areaCanvas.frame().height();

		// Set step by X between near points
		var xStep = areaCanvas.frame().width() / ( points - 1 );

		// Set first X-point of areas
		var x0 = areaCanvas.frame().x();

		doc.currentPage().currentArtboard().deselectAllLayers();

		// Set height of area
		var yHeight = new Array(points);
		for (var i = 0; i < points; i++){
			yHeight[i] = ( areaCanvas.frame().y() + heightCanvas ) - (( heightCanvas / dataMax ) * rows[0][i] );
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

				for (var j = 1; j < points; j++) {

					xNext = xLast + xStep;
					var y = yHeight[j];

					[area curveToPoint:NSMakePoint(xNext,y) controlPoint1:NSMakePoint(xLast + xStep / 2,yLast) controlPoint2:NSMakePoint(xNext - xStep / 2,y)];

					xLast = xNext;
					yLast = y;
				
				}; 
				
				var y = yHeight[points - 1] - (( heightCanvas / dataMax ) * rows[i + 1][points - 1] );
				area.lineToPoint(NSMakePoint(xLast,y));
				yHeight[points - 1] = y;

				for (var k = points - 2; k >= 0; k--){

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

				for (var j = 1; j < points; j++) {

					x = x + xStep;
					var y = yHeight[j];
					area.lineToPoint(NSMakePoint(x,y));

				};

				for (var k = points - 1; k >= 0; k--){

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
			fill.color = MSColor.colorWithRed_green_blue_alpha(color[0]/255,color[1]/255,color[2]/255,0.8 - i * 0.15);
			areaShape.setName("stackedArea_" + ( i + 1 ));

			// Add area on artboard
			doc.currentPage().currentArtboard().addLayers([areaShape]);

			areaShape.setIsSelected(true);

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

	    newGroup.setName("Stacked area chart")

	} else {

		return

	};

};










