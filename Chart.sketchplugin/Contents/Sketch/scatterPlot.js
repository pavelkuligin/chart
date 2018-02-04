var onRun = function(context){
	var chartName = "Scatter plot";
	var nameOne = "Categories";
	var nameTwo = "Points";
	@import 'common-mv.js'
	@import 'parameters.js'


	var bubble = false;
	if (Number.isInteger(rowsLength/3) == 1){
		var bubble = true;
	}

	var maxXArray = new Array();
	var maxYArray = new Array();
	var maxVArray = new Array();

	if (bubble == false) {

		var scatterCategories = rowsLength/2;
		var catCount = 2;
		var scatterPlotDConst = scatterPlotD;

		for( var i = 0; i < scatterCategories; i++ ){
			maxXArray[i] = Math.max.apply(null, rows[i * catCount]);
		}
		var dataXMax = Math.max.apply(null, maxXArray);

		for( var j = 0; j < scatterCategories; j++ ){
			maxYArray[j] = Math.max.apply(null, rows[j * catCount + 1]);
		}
		var dataYMax = Math.max.apply(null, maxYArray);

	} else {
		var scatterCategories = rowsLength/3;
		var catCount = 3;

		for( var k = 0; k < scatterCategories; k++ ){
			maxVArray[k] = Math.max.apply(null, rows[k * catCount + 2]);
		}
		var scatterPlotDMax = Math.max.apply(null, maxVArray);
		var scatterPlotDConst = 0.1 * widthCanvas;

		for( var i = 0; i < scatterCategories; i++ ){
			maxXArray[i] = Math.max.apply(null, rows[i * catCount]);
		}
		var dataXMax = Math.max.apply(null, maxXArray);

		for( var j = 0; j < scatterCategories; j++ ){
			maxYArray[j] = Math.max.apply(null, rows[j * catCount + 1]);
		}
		var dataYMax = Math.max.apply(null, maxYArray);
	};

	var xMaxRound = Math.round(dataXMax).toFixed(0);
	var yMaxRound = Math.round(dataYMax).toFixed(0);

	if (xMaxRound.length == 1){
		if (xMaxRound <= 5){
			dataXMax = 5;
		} else {
			dataXMax = 10;
		};

	} else {
		var N = Math.pow(10, xMaxRound.length - 1);          
		if (N == 10) {
			dataXMax = (Math.floor(xMaxRound / N) + 1) * N;
		} else {
			dataXMax = (Math.floor(xMaxRound / 20) + 1) * 20;
		};

	};

	if (yMaxRound.length == 1){
		if (yMaxRound <= 5){
			dataYMax = 5;
		} else {
			dataYMax = 10;
		};

	} else {
		var N = Math.pow(10, yMaxRound.length - 1);          
		if (N == 10) {
			dataYMax = (Math.floor(yMaxRound / N) + 1) * N;
		} else {
			dataYMax = (Math.floor(yMaxRound / 20) + 1) * 20;
		};

	};


	for (var i = 0; i < scatterCategories; i++){

		for (var j = 0; j < rowLength; j++){

			var pointX = (widthCanvas / dataXMax) * rows[i * catCount][j] + chartCanvas.frame().x();
			var pointY = chartCanvas.frame().y() + heightCanvas - (heightCanvas / dataYMax) * rows[i * catCount + 1][j];

			if ( bubble == true){ scatterPlotD = (scatterPlotDConst * rows[i * catCount + 2][j]) / scatterPlotDMax }

			var scatterCircle = NSBezierPath.bezierPath();
			[scatterCircle appendBezierPathWithArcWithCenter:NSMakePoint(pointX,pointY) radius:scatterPlotD/2 startAngle:0 endAngle:360];
			var scatterShape = MSShapeGroup.shapeWithBezierPath(scatterCircle);
			var fill = scatterShape.style().addStylePartOfType(0);
			fill.color = MSColor.colorWithRed_green_blue_alpha(colorPalette[i][0]/255,colorPalette[i][1]/255,colorPalette[i][2]/255,0.8);

			scatterShape.setName("scatterPoint_" + ( i + 1 ) + "_" + ( j + 1 ));

			if (doc.currentPage().currentArtboard() === null){
				doc.currentPage().addLayers([scatterShape]);
			} else{
				doc.currentPage().currentArtboard().addLayers([scatterShape]);
			}

			[scatterShape select:true byExpandingSelection:true];

		};
		
	};

	@import 'groupFromSelection.js'

};










