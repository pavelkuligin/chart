// Create variables for selected area and artboard
var selection = context.selection;
var doc = context.document;
var page = [doc currentPage];
var canvasCount = selection.length;

if([selection count] == 0) {
	[doc showMessage:"Select rectangle or oval layer"];
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
			var pointsCount = sparkPointsCount;

		} else if (chartName == "Progress Bar"){

			var linesCount = canvasCount;
			var pointsCount = 1;

		} else if (chartName == "Gauge Chart"){

			var linesCount = canvasCount;
			var pointsCount = 1;

		} else{

			var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 40.0))

		    var categoriesInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 10.0, 120.0, 25.0))
			    categoriesInput.cell().setPlaceholderString(nameOne)
			    accessoryView.addSubview(categoriesInput)

			if ( nameTwo != false){
			    var itemsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 10.0, 120.0, 25.0))
				    itemsInput.cell().setPlaceholderString(nameTwo)
				    accessoryView.addSubview(itemsInput)
			}

		    var alert = NSAlert.alloc().init()
			    alert.setMessageText("Create random data for chart")
			    alert.setAccessoryView(accessoryView)
			    alert.addButtonWithTitle("OK")
			    alert.addButtonWithTitle("Cancel")

		    [[alert window] setInitialFirstResponder:categoriesInput]

		    if (nameTwo != false){
		    	[categoriesInput setNextKeyView:itemsInput]
			}

			// Run popup
			var responseCode = alert.runModal();

			if (nameTwo != false){
				var linesCount = categoriesInput.stringValue();
				var pointsCount = itemsInput.stringValue();
			} else {
				var pointsCount = categoriesInput.stringValue();
				var linesCount = canvasCount;
			}

		};

		if (stacked == true){
			var numItems = linesCount;
		} else { var numItems = 1; }

		// Create random array
		var dataMax = 100;
		var rowsLength = linesCount;
		var hor = 100 * Math.random();
		var rows = new Array();

		if( circleShape == true ){

				var row = new Array();
				rows[0] = row;
				var startRandNumber = 40;
				var counterNumber = 0; 

				for (var j = 0; j < pointsCount - 1; j++){
					rows[0][j] = Math.round(Math.random() * (dataMax - startRandNumber));
					counterNumber = counterNumber + rows[0][j];
					startRandNumber = counterNumber;
				}

				rows[0][pointsCount - 1] = dataMax - counterNumber;
			
		} else {
			
			for (var i = 0; i < linesCount; i++){
				var row = new Array();
				rows[i] = row;
				var funcOne = Math.round(Math.random() * 4);
				var funcTwo = Math.round(Math.random() * 4);

				for (var j = 0; j < pointsCount; j++){
					// Set of functions for random distribution
					var randomFunc = new Array();
						var logInc = 10 + 10 * Math.log(10 * j + 1) + 20 * Math.random();
						var logDec = 100 / Math.log(5 * j + 3.4)+ 20 * Math.random();
						var lineStr = hor + 10 * Math.random();
						var lineInc = j * (80 / pointsCount) + 20 * Math.random();
						var lineDec = 80 - j * (0.75 / pointsCount) + 20 * Math.random();
						randomFunc = [logInc, logDec, lineStr, lineInc, lineDec];

					if (j < pointsCount * Math.random()){

						rows[i][j] = randomFunc[funcOne] / numItems;

					} else {

							rows[i][j] = randomFunc[funcTwo] / numItems;

						}
				};
			}
		}

	} else {

		// Separate table data to array
	    var rows = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "\u0020").replace(/\u000B/g, "\u0020").replace(/\u002C/g, "\u0020").split("\n")
		var rowsLength = rows.length;
		for (var i = 0; i < rowsLength; i++) {
			rows[i] = rows[i].split("\u0020");
		};
		var rowLength = rows[0].length;

		var rowMax = new Array();
		var rowsMax = new Array();
		for (var j = 0; j < rowLength; j++){
				rowMax[j] = 0;
			}

		for (var i = 0; i < rowsLength; i++){

			for (var j = 0; j < rowLength; j++){
				rowMax[j] = rowMax[j] + Math.abs(Number(rows[i][j]));
				rows[i][j] = Number(rows[i][j]);
			}

			rowsMax[i] = Math.max.apply(null, rows[i]);
			
		};

		if (stacked === true){

			var dataMax = Math.max.apply(null, rowMax);

		} else {

			var dataMax = Math.max.apply(null, rowsMax);

		}

		

	};

	var negativeArray = new Array();
	var maxNegativeNum = 0;
	var negCounter = 0;
	var negativeFlip = false;

	for (var i = 0; i < rowsLength; i++){
		for (var j = 0; j < rowLength; j++){
			if (rows[i][j] < 0) {
				negativeArray.push(rows[i][j]);
				negCounter = negCounter + 1;
			}
		}
	}

	if (negativeArray.length > 0) {
		maxNegativeNum = (Math.min.apply(null, negativeArray) * -1);
	}

	if (negCounter == rowLength * rowsLength) {
		if (stacked === true){
            var roundDataMax = Math.round(dataMax);
        } else {
		    var roundDataMax = Math.round(maxNegativeNum);
        }
		negativeFlip = true;
	} else {
		var roundDataMax = Math.round(dataMax) + maxNegativeNum;
	}

	// Define max Y-point + round it to near 10, 100 or 1000-number
	var stringDataMax = roundDataMax.toFixed(0);

	if (stringDataMax.length == 1){
		if (roundDataMax <= 5){
			dataMax = 5;
		} else {
			dataMax = 10;
		};

	} else {
		var N = Math.pow(10, stringDataMax.length - 1);          
		if (roundDataMax / N <= Math.floor(roundDataMax / N) + 0.5) {
			dataMax = (Math.floor(roundDataMax / N) + 0.5) * N;
		} else {
			dataMax = (Math.floor(roundDataMax / N) + 1) * N;
		};

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










