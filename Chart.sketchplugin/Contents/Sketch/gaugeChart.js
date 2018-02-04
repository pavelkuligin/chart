var onRun = function(context){
	var chartName = "Gauge Chart";
	var circleShape = false;
	var stacked = false;
	@import 'common.js'
	@import 'parameters.js'


    for (var i = 0; i < canvasCount; i++) {

    	var radius = selection[i].frame().width() / 2 - gaugeChartBorder / 2;
		var x0 = selection[i].frame().x() + chartCanvas.frame().width() / 2;
		var y0 = selection[i].frame().y();
		var yCenter = y0 + selection[i].frame().width() / 2;
		var startAngle = -180;
        var endAngle = rows[i] * 1.8 - 180;

		var arc = NSBezierPath.bezierPath();
		[arc appendBezierPathWithArcWithCenter:NSMakePoint(x0,yCenter) radius:radius startAngle:startAngle endAngle:endAngle];

		// Create shape from path
		var arcShape = MSShapeGroup.shapeWithBezierPath(arc);
		var border = arcShape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRed_green_blue_alpha(gaugeChartColor[0]/255,gaugeChartColor[1]/255,gaugeChartColor[2]/255,1);
		border.thickness = gaugeChartBorder;
		arcShape.setName("a_gauge_" + ( i + 1 ));

		var arcBack = NSBezierPath.bezierPath();
		[arcBack appendBezierPathWithArcWithCenter:NSMakePoint(x0,yCenter) radius:radius startAngle:startAngle endAngle:0];

		// Create shape from path
		var arcBackShape = MSShapeGroup.shapeWithBezierPath(arcBack);
		var border = arcBackShape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRed_green_blue_alpha(gaugeChartBackcolor[0]/255,gaugeChartBackcolor[1]/255,gaugeChartBackcolor[2]/255,1);
		border.thickness = gaugeChartBorder;
		arcBackShape.setName("gaugeBack_" + ( i + 1 ));


		// Add arc on artboard
		if (doc.currentPage().currentArtboard() === null){
			doc.currentPage().addLayers([arcShape]);
			doc.currentPage().addLayers([arcBackShape]);
		} else{
			doc.currentPage().currentArtboard().addLayers([arcShape]);
			doc.currentPage().currentArtboard().addLayers([arcBackShape]);
		}

		[arcShape select:true byExpandingSelection:true];
		[arcBackShape select:true byExpandingSelection:true];

	}; 



	@import 'groupFromSelection.js'

};










