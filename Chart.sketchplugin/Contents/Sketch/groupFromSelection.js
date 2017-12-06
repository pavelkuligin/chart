// Push all selected layers to array
var allLayers = doc.currentPage().currentArtboard().layers();
var layersCount = allLayers.count();
var selectedLayers = new Array();
var sortedLayers = new Array();
var layersMeta = [];

for (l = 0; l < layersCount; l++){

	var selectedLayer = allLayers[l].isSelected();
	
	if ( selectedLayer == true){
		selectedLayers.push({
            "name": allLayers[l].name(),
            "layer": allLayers[l]
        });
	};

};


function compareObjects (a, b) {
  if (a.name < b.name) {return 1;}
  if (a.name > b.name) {return -1;}
  return 0;
};

selectedLayers.sort(compareObjects);

for (l = 0; l < selectedLayers.length; l++){
	sortedLayers.push(selectedLayers[l].layer);
};

// Group from selected layers
var layersToAdd = MSLayerArray.arrayWithLayers(sortedLayers);

var newGroup = MSLayerGroup.groupFromLayers(layersToAdd);
newGroup.setName(chartName);