// save this file as sketch.js
// Sketch One
var s2 = function( p ) { // p could be any variable name

  var particleSystem;

  var creamyBlues = ['#a7e0e3', '#92d6da', '#8ecdd0', '#84bfc2', '#7eafb1'];
  var richReds = ['#AA1E33','#BC2532','#AF2121','#C1284C','#D11F3F','#AA1E33','#BC2532','#AF2121'];
  var vapeFlavors = ['#a56a21', '#4f8aa1', '#1a3b45', '#eac290', '#7e4f4f'];

  var pallette = vapeFlavors;

  // Our core p5.js function.
  p.setup = function() {
    p.createCanvas(screen.width, screen.height);

    //setup our particle system.
    particleSystem = new ParticleSystem();

    p.frameRate(25);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);

    particleSystem.draw();

    particleSystem.addParticle();
  };


  //lets make a Particle.
  var Particle = function(position) {
    this.acceleration = p.createVector(0, -0.2);
    this.velocity = p.createVector(p.random(-1,1), p.random(-1,1));
    this.position = position;

    this.lifeSpan = 155;

    this.size = p.random(100);
    this.color = p.random(pallette);
  };

  Particle.prototype.draw = function() {
    p.noStroke();
    p.fill(colorAlpha(this.color, this.lifeSpan/50));
    //p.fill(133,3,175,this.lifeSpan);
    //rgba(133,3,175,1)
    p.ellipse(this.position.x, this.position.y, this.size,this.size);
  }

  Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.lifeSpan -= 2;
  }

  Particle.prototype.isDead = function() {
    if(this.lifeSpan <= 1) {
      return true;
    }
    else {
      return false;
    }
  }

  var ParticleSystem = function() {
    this.particles = [];
  }

  ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(p.createVector(p.random(screen.width), screen.height)));
  }


  ParticleSystem.prototype.draw = function() {
    for(var i=0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();

      if(this.particles[i].isDead()) {
        //remove from the list.
        this.particles.splice(i, 1);
      }

    }
  }

  function colorAlpha(aColor, alpha) {
    var c = p.color(aColor);
    return p.color('rgba(' +  [p.red(c), p.green(c), p.blue(c), alpha].join(',') + ')');
  }
};
