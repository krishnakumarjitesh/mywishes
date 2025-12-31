document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let fireworks = [];
  let crackers = [];

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.speed = Math.random() * 3 + 2;
      this.color = `hsl(${Math.random()*360},100%,50%)`;
    }
    update() { this.y -= this.speed; }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  class Cracker {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height / 2;
      this.particles = [];
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: this.x,
          y: this.y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 4 + 1,
          life: 60
        });
      }
    }
    update() {
      this.particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
      });
    }
    draw() {
      this.particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
        ctx.fill();
      });
    }
  }

  setInterval(() => fireworks.push(new Firework()), 120);
  setInterval(() => crackers.push(new Cracker()), 1300);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((f, i) => {
      f.update();
      f.draw();
      if (f.y < 0) fireworks.splice(i, 1);
    });

    crackers.forEach((c, i) => {
      c.update();
      c.draw();
      if (c.particles[0].life <= 0) crackers.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }
  animate();

  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    confetti.style.animationDuration = Math.random() * 5 + 3 + "s";
    document.body.appendChild(confetti);
  }

});