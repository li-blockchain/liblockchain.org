// save this file as sketch.js
// Sketch One
var s3 = function( p ) { // p could be any variable name

    var particleSystem;
  
    var creamyBlues = ['#a7e0e3', '#92d6da', '#8ecdd0', '#84bfc2', '#7eafb1'];
    var richReds = ['#AA1E33','#BC2532','#AF2121','#C1284C','#D11F3F','#AA1E33','#BC2532','#AF2121'];
  
    var pallette = creamyBlues;
  
    // Our core p5.js function.
    p.setup = function() {
      p.createCanvas(screen.width, screen.height);
  
      //setup our particle system.
      particleSystem = new ParticleSystem();
  
      p.frameRate(24);
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
      this.velocity = p.createVector(p.random(-.5,.5), p.random(-.5,.5));
      this.position = position;
  
      this.lifeSpan = 155;
  
      this.size = p.random(20);
      this.color = p.random(pallette);
    };
  
    Particle.prototype.draw = function(plist) {

      //p.fill(133,3,175,this.lifeSpan);
      //rgba(133,3,175,1)
      for(var i=0; i < plist.length; i++) {
        if(Math.abs(plist[i].position.x - this.position.x) <= 100 && Math.abs(plist[i].position.y - this.position.y) <= 100) {
            p.stroke('rgba(255,255,255,0.25)');
            p.line(this.position.x, this.position.y, plist[i].position.x, plist[i].position.y);
        }
      }

      p.noStroke();
      p.fill(colorAlpha(this.color, this.lifeSpan/50));
      p.ellipse(this.position.x, this.position.y, this.size,this.size);
    }
  
    Particle.prototype.update = function() {
      //this.velocity = p.createVector(p.random(-1,1), p.random(-1,1)); 
      
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
      this.particles.push(new Particle(p.createVector(p.random(screen.width), p.random(screen.width))));
    }
  
  
    ParticleSystem.prototype.draw = function() {
      for(var i=0; i < this.particles.length; i++) {
        this.particles[i].update();
        this.particles[i].draw(this.particles);
  
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
  