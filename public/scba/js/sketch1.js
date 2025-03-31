// save this file as sketch.js
// Sketch One
var s = function( p ) { // p could be any variable name
  var excite = ['#3dfaff', '#ff009a', '#7bff76', '#d63cff', '#ff0000'];
  var creamyBlues = ['#a7e0e3', '#92d6da', '#8ecdd0', '#84bfc2', '#7eafb1'];

  var pallette = creamyBlues;

  p.setup = function() {
    p.createCanvas(screen.width, screen.height);
    p.frameRate(15);
  };

  p.draw = function() {
    p.background('rgba(0,0,0, .01)');
    p.fill(p.random(pallette));
    p.noStroke();
    p.rect(p.random(screen.width),p.random(screen.height),70,70);
  };
};
