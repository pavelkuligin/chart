// Create variables for selected area and artboard
var selection = context.selection;
var doc = context.document;
var page = [doc currentPage];

var nameOne = "Categories";
var nameTwo = "Points";

if([selection count] == 0) {
	[doc showMessage:"Select rectangle or oval layer"];
} else {

	// Define type of input data: numeric or undefined
	var pasteboard = NSPasteboard.generalPasteboard();
	var stringPasteboard = [pasteboard stringForType:NSPasteboardTypeString];
	var jsString = String(stringPasteboard);

	// Search letters
	var numberString = jsString.replace(/\u0020/g, "").replace(/\u0009/g, "").replace(/\u000B/g, "").replace(/\u002C/g, "").replace(/\u002E/g, "").replace(/\u002D/g, "").replace(/\u0025/g, "").replace(/\u003B/g, "").replace(/\n/g, "");
	var letterReg = /\D/;
	var letters = letterReg.test(numberString);

	if(letters != 0){ 

		var accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 40.0))

	    var typeSelect = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0.0, 10.0, 120.0, 25.0))
	    	typeSelect.addItemsWithTitles(['Scatters','Bubbles'])
	    	typeSelect.selectItemWithTitle('Scatters')
		    accessoryView.addSubview(typeSelect)

		
	    var itemsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 10.0, 120.0, 25.0))
		    itemsInput.cell().setPlaceholderString(nameTwo)
		    accessoryView.addSubview(itemsInput)
		

	    var alert = NSAlert.alloc().init()
		    alert.setMessageText("Create random data for chart")
		    alert.setAccessoryView(accessoryView)
		    alert.addButtonWithTitle("OK")
		    alert.addButtonWithTitle("Cancel")

	    [[alert window] setInitialFirstResponder:itemsInput]

		// Run popup
		var responseCode = alert.runModal();

		// Create random array
		var dataMax = 100;
		var typePlot = [typeSelect indexOfSelectedItem];

		if (typePlot == 0) {
			var linesCount = 2;
			var rowsLength = 2;
		} else {
			var linesCount = 3;
			var rowsLength = 3;
		}

		var rowLength = itemsInput.stringValue();
		var pointsCount = itemsInput.stringValue();
		var rows = new Array();

		for (var i = 0; i < linesCount; i++){

			var row = new Array();
			rows[i] = row;

			for (var j = 0; j < pointsCount; j++){
					rows[i][j] = dataMax * Math.random();
			}
		}

		for (var i = 0; i < linesCount; i++){

			for (var j = 0; j < pointsCount; j++){
					rows[i][j] = Math.round(rows[i][j]);
			}
		}

	} else {

		// Separate table data to array
	    var rows = jsString.replace(/\u0025/g, "").replace(/\u003B/g, "").replace(/\u0020/g, "").replace(/\u0009/g, "\u0020").replace(/\u000B/g, "\u0020").replace(/\u002C/g, "\u0020").split("\n")
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

	};

	// Create canvas for chart
	var chartCanvas = selection.firstObject();
	var heightCanvas = chartCanvas.frame().height();
	var widthCanvas = chartCanvas.frame().width();
	[page changeSelectionBySelectingLayers: nil];

};










