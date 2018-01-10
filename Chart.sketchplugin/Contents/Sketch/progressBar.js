var onRun = function(context){
	var chartName = "Progress Bar";
	var circleShape = false;
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'


	if (heightCanvas === widthCanvas){

	    for (var i = 0; i < canvasCount; i++) {

	    	var radius = selection[i].frame().width() / 2 - progressBarBorder / 2;
			var x0 = selection[i].frame().x() + chartCanvas.frame().width() / 2;
			var y0 = selection[i].frame().y();
			var yCenter = y0 + selection[i].frame().width() / 2;
			var startAngle = -90;
	        var endAngle = rows[i] * 3.6 - 90;

			var arc = NSBezierPath.bezierPath();
			[arc appendBezierPathWithArcWithCenter:NSMakePoint(x0,yCenter) radius:radius startAngle:startAngle endAngle:endAngle];

			// Create shape from path
			var arcShape = MSShapeGroup.shapeWithBezierPath(arc);
			var border = arcShape.style().addStylePartOfType(1);
			border.color = MSColor.colorWithRed_green_blue_alpha(progressBarColor[0]/255,progressBarColor[1]/255,progressBarColor[2]/255,1);
			border.thickness = progressBarBorder;
			arcShape.setName("progress_" + ( i + 1 ));


			// Add arc on artboard
			if (doc.currentPage().currentArtboard() === null){
				doc.currentPage().addLayers([arcShape]);
			} else{
				doc.currentPage().currentArtboard().addLayers([arcShape]);
			}

			[arcShape select:true byExpandingSelection:true];

		}; 


	} else{

		for (var i = 0; i < canvasCount; i++) {

			var progressHeight = selection[i].frame().height();
			var progressWidth = selection[i].frame().width();
			var x0 = selection[i].frame().x() + progressHeight / 2;
			var y0 = selection[i].frame().y() + progressHeight / 2;
			var progressBar = rows[i] * (progressWidth / 100);

			var barShape = NSBezierPath.bezierPath();
			barShape.moveToPoint(NSMakePoint(x0,y0));
			barShape.lineToPoint(NSMakePoint(x0 + progressBar - progressHeight,y0));

			// Create shape from path
			var barShape = MSShapeGroup.shapeWithBezierPath(barShape);
			var border = barShape.style().addStylePartOfType(1);
			barShape.style().borderOptions().lineCapStyle = 2;
			border.color = MSColor.colorWithRed_green_blue_alpha(progressBarColor[0]/255,progressBarColor[1]/255,progressBarColor[2]/255,1);
			border.thickness = progressHeight;
			barShape.setName("progress_" + ( i + 1 ));


			// Add arc on artboard
			if (doc.currentPage().currentArtboard() === null){
				doc.currentPage().addLayers([barShape]);
			} else{
				doc.currentPage().currentArtboard().addLayers([barShape]);
			}

			[barShape select:true byExpandingSelection:true];

		}

	}


	@import 'groupFromSelection.js'

};










