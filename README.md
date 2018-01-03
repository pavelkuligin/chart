# Chart

<img width="384" height="193" src="images/chart-2x.png" title="Chart promo">

Chart is a Sketch plugin for creation the most popular charts by real or random data. Chart supports copy-paste from any kind of text editor, for example: Notes, Word, Google Docs, etc. Also Chart supports copy-paste tabulated data from Google Sheets or Microsoft Excel.

[Read more on Medium](https://medium.com/@pavelkuligin/chart-the-most-powerful-data-visualization-plugin-for-sketch-6849155e09ab)


### Usage

<img width="800" height="500" src="images/usage.gif" title="How to use Chart">

**Steps**

1. Create Artboard in Sketch file.
2. Draw Rectangle on Artboard. 
3. Copy numeric or use random data. You can select a few strings of numbers 
to create a few lines, areas, bars or sparklines. Supported formats:
   - 10, 12, 14, 16;
   - 5.3, 7.9, 15.3, 20.1;
   - 25%, 30%, 10%, 35%;
   - row in Google Sheets or Excel.
4. Select Rectangle on Sketch Artboard.
5. Create Chart :-)


### Install

**Via Sketchpacks**

[![Install PLUGIN NAME with Sketchpacks](http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png "Install Chart with Sketchpacks")](https://sketchpacks.com/pavelkuligin/chart/install)

**Or manually**

1. Download and unzip: [chart-master.zip](https://github.com/pavelkuligin/chart/archive/master.zip).
2. Double click `Chart.sketchplugin`.


### Parameters

Open `Parameter.js` in Chart.sketchplugin/Contents/Sketch/ and change plugin's parameters as you want.

```javascript
// Type of line: straight — 0, curved — 1
var curveType = 1;

// Set of colors for lines
var colorPalette = new Array();
	var red = [244,67,54];
	var pink = [233,30,99];
	var purple = [156,39,176];
	var deepPurple = [103,58,183];
	var blue = [33,150,243];
	var cian = [0,188,212];
	var teal = [0,150,136];
	var green = [0,200,83];
	var yellow = [255,235,59];
	var amber = [255,193,7];
	var orange = [255,152,0];

	colorPalette = [red, green, blue, yellow, purple, pink, amber, cian, deepPurple, teal, orange];

var sparkColor = [52,52,52];

// Set parameters for lines
var borderThickness = 2;
var endWidth = 8;
var dots = false;

// Set parameters for donut
var donutBorder = 40;

// Set parameters for sparklines
var borderThicknessSpark = 1;
var endWidthSpark = 4;
var sparkPointsCount = 20;
```


### Roadmap

- [x] Line Chart
- [x] Bar Chart
- [x] Area Chart
- [x] Stacked Area Chart
- [x] Sparkline
- [x] New random data generation algorithm
- [x] Pie Chart
- [x] Donut Chart
- [ ] Candlestick Chart (Feb 2018)
- [ ] Stream Graph (Feb 2018)
- [ ] Solid Gauge Chart (Feb 2018)
- [ ] Bubble Chart

### Support Chart

If Chart saves your time and you want more new features, [support me via PayPal](https://www.paypal.me/pavelkuligin/5usd).



### Contact me

If you have any questions or ideas about Chart, please, feel free to contact me:
pavel.kuligin@behavox.com, www.pavelkuligin.ru or [facebook](https://www.facebook.com/kuligin.pavel)

