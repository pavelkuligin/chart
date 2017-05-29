var onRun = function(context){
	// Create variables for selected recangles and artboard
	var selection = context.selection;
	var doc = context.document;

	// Set color for bars
	var color = new Array();
		var red = [224, 102, 90];
		var green = [78, 161, 152];
		var blue = [78, 183, 243];
		var yellow = [250, 200, 65];
		var purple = [153, 68, 201];
		color = [red, green, blue, yellow, purple];

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

		// Create popup for select type of bars on chart
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 30.0))

		var barTypes = ['Vertical', 'Horizontal']
		var dropDown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 120.0, 25.0));
	        [dropDown addItemsWithTitles:barTypes];
	        [dropDown selectItemAtIndex:0];
	        accessoryView.addSubview(dropDown);

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Select type of Bar chart")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	} else {

		// Create popup for chart with random data
		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 130.0))

	    var itemsInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 90.0, 120.0, 25.0))
		    itemsInput.cell().setPlaceholderString("Number of items")
		    accessoryView.addSubview(itemsInput)

	    var barsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 90.0, 120.0, 25.0))
		    barsInput.cell().setPlaceholderString("Number of bars")
		    accessoryView.addSubview(barsInput)

	    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 60.0, 120.0, 25.0))
		    maxInput.cell().setPlaceholderString("Max value")
		    accessoryView.addSubview(maxInput)

		var dropDownLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 20.0, 120.0, 25.0))
		    dropDownLabel.cell().setStringValue("Select type of Bar chart")
		    dropDownLabel.setBezeled(false)
		    dropDownLabel.setDrawsBackground(false)
		    dropDownLabel.setEditable(false)
		    dropDownLabel.setSelectable(false)
		    accessoryView.addSubview(dropDownLabel)

		var barTypes = ['Vertical', 'Horizontal']
		var dropDown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 120.0, 25.0));
	        [dropDown addItemsWithTitles:barTypes];
	        [dropDown selectItemAtIndex:0];
	        accessoryView.addSubview(dropDown);

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Create random data for chart")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	    [[alert window] setInitialFirstResponder:itemsInput]
	    [itemsInput setNextKeyView:barsInput]
	    [barsInput setNextKeyView:maxInput]

	};

	// Run popup
	var responseCode = alert.runModal();
	var barType = dropDown.indexOfSelectedItem();

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
				var itemsCount = itemsInput.stringValue();
				var barsCount = barsInput.stringValue();
				var dataMax = maxInput.stringValue();
				var rowsLength = itemsCount;

				var randomYHeight = new Array();
				for (var i = 0; i < barsCount; i++){
					randomYHeight[i] = dataMax;
				};

				var rows = new Array();

				for (var i = 0; i < itemsCount; i++){

					var row = new Array();
					rows[i] = row;

					for (var j = 0; j < barsCount; j++){

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

		// Define max Y-height of bars + round it to near 10, 100 or 1000-number
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
		var barsCanvas = selection.firstObject();
		var bars = rowLength;
		var heightCanvas = barsCanvas.frame().height();
		var widthCanvas = barsCanvas.frame().width();

		doc.currentPage().currentArtboard().deselectAllLayers();

		if (barType == 1){

			var firstPoint = barsCanvas.frame().x();
			var mainMetric = widthCanvas;

			// Set step between near bars
			var step = heightCanvas / bars;


		} else {

			var firstPoint = barsCanvas.frame().y() + heightCanvas;
			var mainMetric = heightCanvas;

			// Set step between near bars
			var step = widthCanvas / bars;

		};

		// Set size of bar
		var mainArray = new Array(bars);
		for (var z = 0; z < bars; z++){
			mainArray[z] = firstPoint + (( mainMetric / dataMax ) * rows[0][z]);
		};

		// Set margin between bars
		var margin = 0.1 * step;

		for (var i = 0; i < rowsLength - 1; i++){

			var n = 0;

			if (barType == 1){

				var y0 = barsCanvas.frame().y() + margin;

			} else {

				var x0 = barsCanvas.frame().x() + margin;

			};

			for (var j = 0; j < bars; j++) {

				if (barType == 1){

					y0 = y0 + step * n;
					y1 = y0 + step - 2 * margin;
					x0 = mainArray[j];
					x1 = mainArray[j] + (( widthCanvas / dataMax ) * rows[i + 1][j]);
					mainArray[j] = x1; 

				} else {

					x0 = x0 + step * n;
					x1 = x0 + step - 2 * margin;
					y0 = mainArray[j];
					y1 = mainArray[j] - (( heightCanvas / dataMax ) * rows[i + 1][j]);
					mainArray[j] = y1;

				}

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
				fill.color = MSColor.colorWithRed_green_blue_alpha(color[i][0]/255,color[i][1]/255,color[i][2]/255,1);
				barShape.setName("bar_" + ( i + 1 ) + ( j + 1));

				// Add bar on artboard
				doc.currentPage().currentArtboard().addLayers([barShape]);

				barShape.setIsSelected(true);

				n = 1;

			};

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

		};

		// Group from selected layers
		var layersToAdd = MSLayerArray.arrayWithLayers(selectedLayers)
		var newGroup = MSLayerGroup.groupFromLayers(layersToAdd)

	    newGroup.setName("Bar chart")

	} else {

		return

	};

};










