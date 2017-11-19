// Push all selected layers to array
var allLayers = doc.currentPage().currentArtboard().layers();
var layersCount = allLayers.count();
var selectedLayers = new Array();

for (l = 0; l < layersCount; l++){

	var selectedLayer = allLayers[l].isSelected();
	
	if ( selectedLayer == true){
		selectedLayers.push(allLayers[l]);
	};

};

// Group from selected layers
var layersToAdd = MSLayerArray.arrayWithLayers(selectedLayers);
var newGroup = MSLayerGroup.groupFromLayers(layersToAdd);
newGroup.setName(chartName);