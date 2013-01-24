function BarGraph(ctx)
{
// Private mtds
alert(this);
var that = this; // used to access the object
var startArray; // used to store the values of the array during animation
var endArray;// used to store the values of the array during animation

var looping = false;// To check if the graph is currently animated or not

// Loop - is used to adjust the height of bar
// This is used in animation process. 
var loop = function(){

  var delta;
  var animationComplete = true;

  // Boolean to prevent update function from looping if already looping
  looping = true;
  
    // For each bar
  for (var i = 0; i < endArray.length; i += 1) {
    // Change the current bar height toward its target height
    delta = (endArray[i] - startArray[i]) / that.animationSteps;
    that.curArray[i] += delta;
    // If any change is made then flip a switch
    if (delta) {
      animationComplete = false;
    }
  }
  
  			
  // If no change was made to any bars then we are done
  if (animationComplete) {
    looping = false;
  } else {
    // Draw and call loop again
    draw(that.curArray);
    setTimeout(loop, that.animationInterval / that.animationSteps);
  }
};

//Draw - Used to update the canvas with the current display
// This is used to redraw the graph
var draw = function(arr){
var numOfBars = arr.length;
var barWidth;
var barHeight;
var border = 2;
var ratio;
var maxBarHeight;
var gradient;
var largestValue;
var graphAreaX = 0;
var graphAreaY = 0;
var graphAreaWidth = that.width;
var graphAreaHeight = that.height;
var i;

  if (ctx.canvas.width !== that.width || ctx.canvas.height !== that.height) {
    ctx.canvas.width = that.width;
    ctx.canvas.height = that.height;
  }
			
  // Draw the background color
  alert(ctx.fillStyle);
  alert(that);
  ctx.fillStyle = that.backgroundColor;
  ctx.fillRect(0, 0, that.width, that.height);
				
  // If x axis labels exist then make room	
  if (that.xAxisLabelArr.length) {
    graphAreaHeight -= 40;
  }

barWidth = graphAreaWidth / numOfBars - that.margin * 2;
maxBarHeight = graphAreaHeight - 25;

 var largestValue = 0;
 for(i = 0; i< arr.length; i+=1)
 {
 if(arr[i] > largestValue)
 {
 largestValue = arr[i];
 }
 }
 
 for(i=0;i<arr.length;i +=1)
 {
 if(that.maxValue)
 {
 ratio = arr[i] / that.maxValue;
 }
 else
 {
 ratio = arr[i] / largestValue;
 }
 barHeight = ratio * maxBarHeight;
 }
 
  // Turn on shadow
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#999";
				alert(ctx);	
    // Draw bar background
    ctx.fillStyle = "#333";			
    ctx.fillRect(that.margin + i * that.width / numOfBars,
      graphAreaHeight - barHeight,
      barWidth,
      barHeight);
		
    // Turn off shadow
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
        // Create gradient
    gradient = ctx.createLinearGradient(0, 0, 0, graphAreaHeight);
    gradient.addColorStop(1-ratio, that.colors[i % that.colors.length]);
    gradient.addColorStop(1, "#ffffff");
    
    ctx.fillStyle = gradient;
    // Fill rectangle with gradient
    ctx.fillRect(that.margin + i * that.width / numOfBars + border,
      graphAreaHeight - barHeight + border,
      barWidth - border * 2,
      barHeight - border * 2);
          // Write bar value
    ctx.fillStyle = "#333";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    // Use try / catch to stop IE 8 from going to error town
    try {
      ctx.fillText(parseInt(arr[i],10),
        i * that.width / numOfBars + (that.width / numOfBars) / 2,
        graphAreaHeight - barHeight - 10);
    } catch (ex) {}

    // Draw bar label if it exists
    if (that.xAxisLabelArr[i]) {				
      // Use try / catch to stop IE 8 from going to error town				
      ctx.fillStyle = "#333";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      try {
        ctx.fillText(that.xAxisLabelArr[i],
          i * that.width / numOfBars + (that.width / numOfBars) / 2,
          that.height - 10);
        } catch (ex) {}
      }
    };
 // End draw method


// Declaring Public properties and methods

this.width = 300;
this.height = 150;
this.maxValue;
this.margin  = 5;
this.colors = ["red","green","purple","yellow"];
this.curArray = [];
this.background = "#fff";
this.xAxisLabelArr = [];
this.yAxisLabelArr = [];

//Update - sets the end bar array and starts the animation

this.update = function(newArray)
{
  // If length of target and current array is different 
  if (that.curArray.length !== newArray.ength) {
    that.curArray = newArray;
    draw(newArray);
  } else {
    // Set the starting array to the current array
    startArray = that.curArray;
    // Set the target array to the new array
    endArray = newArray;
    // Animate from the start array to the end array
    if (!looping) {	
      loop();
    }
  }
};

}












