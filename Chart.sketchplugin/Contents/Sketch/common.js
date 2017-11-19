// Create variables for selected area and artboard
var selection = context.selection;
var doc = context.document;
var page = [doc currentPage];
var canvasCount = selection.length;

if([selection count] == 0) {
	[doc showMessage:"Select at least one rectangle layer"];
} else {

	// Define type of input data: numeric or undefined
	var pasteboard = NSPasteboard.generalPasteboard();
	var stringPasteboard = [pasteboard stringForType:NSPasteboardTypeString];
	var jsString = String(stringPasteboard);

	// Search letters
	var numberString = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "").replace(/\u000B/g, "").replace(/\u002C/g, "").replace(/\u002E/g, "").replace(/\u002D/g, "").replace(/\n/g, "");
	var letterReg = /\D/;
	var letters = letterReg.test(numberString);

	if(letters != 0){ 

		if (chartName == "Sparkline"){

			var linesCount = canvasCount;
			var pointsCount = 30;

		} else{

			var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 40.0))

		    var categoriesInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 10.0, 120.0, 25.0))
			    categoriesInput.cell().setPlaceholderString(nameOne)
			    accessoryView.addSubview(categoriesInput)

		    var itemsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 10.0, 120.0, 25.0))
			    itemsInput.cell().setPlaceholderString(nameTwo)
			    accessoryView.addSubview(itemsInput)

		    var alert = NSAlert.alloc().init()
			    alert.setMessageText("Create random data for chart")
			    alert.setAccessoryView(accessoryView)
			    alert.addButtonWithTitle("OK")
			    alert.addButtonWithTitle("Cancel")

		    [[alert window] setInitialFirstResponder:categoriesInput]
		    [categoriesInput setNextKeyView:itemsInput]

			// Run popup
			var responseCode = alert.runModal();

			// Create random data array
			var linesCount = categoriesInput.stringValue();
			var pointsCount = itemsInput.stringValue();

		};

		if (stacked == true){
			var numItems = linesCount;
		} else { var numItems = 1; }

		var dataMax = 100;
		var rowsLength = linesCount;
		var hor = 80 * Math.random();
		var rows = new Array();
		for (var i = 0; i < linesCount; i++){
			var row = new Array();
			rows[i] = row;
			var funcOne = Math.round(Math.random() * 3);
			var funcTwo = Math.round(Math.random() * 3);

			for (var j = 0; j < pointsCount; j++){
				// Set of functions for random distribution
				var randomFunc = new Array();
					var logInc = 10 + 10 * Math.log(10 * j + 1) + 20 * Math.random();
					var logDec = 100 / Math.log(5 * j + 3.4)+ 20 * Math.random();
					var lineStr = hor + 10 * Math.random();
					var lineInc = j * (80 / pointsCount) + 20 * Math.random();
					var lineDec = 80 - j * (0.75 / pointsCount) + 20 * Math.random();
					randomFunc = [logInc, logDec, lineStr, lineInc, lineDec];

				if (j < pointsCount * 0.8 * Math.random()){

					rows[i][j] = randomFunc[funcOne] / numItems;

				} else {

					rows[i][j] = randomFunc[funcTwo] / numItems;

				}
			};
		};

	} else {

		// Separate table data to array
	    var rows = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "\u0020").replace(/\u000B/g, "\u0020").replace(/\u002C/g, "\u0020").split("\n")
		var rowsLength = rows.length;
		for (var i = 0; i < rowsLength; i++) {
			rows[i] = rows[i].split("\u0020");
		};
		var rowLength = rows[0].length;

		var rowMax = new Array();
		for (var j = 0; j < rowLength; j++){
				rowMax[j] = 0;
			}

		for (var i = 0; i < rowsLength; i++){

			for (var j = 0; j < rowLength; j++){
				rowMax[j] = rowMax[j] + Number(rows[i][j]);
			}
			
		};

		var dataMax = Math.max.apply(null, rowMax);

	};

	// Define max Y-point + round it to near 10, 100 or 1000-number
	var roundDataMax = Math.round(dataMax);
	var stringDataMax = roundDataMax.toFixed(0);

	if (stringDataMax.length <= 2){
		if (roundDataMax <= 5){
			dataMax = 5;
		} else if (10 < roundDataMax && roundDataMax <= 15){
			dataMax = 15;
		} else {
			dataMax = Math.ceil( dataMax / 10) * 10;
		};

	} else if (stringDataMax.length == 3){           
		dataMax = Math.ceil( dataMax / 100) * 100;

	} else {
		dataMax = Math.ceil( dataMax / 1000) * 1000;
		// If you have numbers more than 9 999, then add more else-if items

	};

	// Create canvas for chart
	var chartCanvas = selection.firstObject();
	var xItems = rows[0].length;
	var heightCanvas = chartCanvas.frame().height();
	var widthCanvas = chartCanvas.frame().width();

	if (chartName != "Sparkline"){

		[page changeSelectionBySelectingLayers: nil];

		};
};










