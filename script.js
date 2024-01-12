const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cb = Chalkboard;

cb.PARSEPREFIX = "function Mandelfield(x, y) { let a = x, b = y; for(let i = 0; i < 16; i++) { let aa = a*a - b*b, bb = 2*a*b; a = aa + x, b = bb + y; } return a*a + b*b < 4 ? 1 : -1; }";
const F = cb.vect.field("-y / Math.sqrt(x*x + y*y) * Mandelfield(x, y)", "x / Math.sqrt(x*x + y*y) * Mandelfield(x, y)");
class Particle {
    constructor(p) {
        this.pos = p;
        this.vel = cb.vect.init(0, 0);
        this.dist = cb.vect.init(0, 0);
        this.ppos = this.pos;
        this.opos = this.pos;
    }
    update() {
        this.vel = cb.vect.normalize(cb.vect.fromField(F, cb.vect.scl(this.pos, 1/250)));
        this.pos = cb.vect.add(this.pos, this.vel);
        this.dist = cb.vect.sub(cb.vect.absolute(this.pos), cb.vect.absolute(this.opos));
    }
    draw() {
        ctx.strokeStyle = cb.vect.ang(this.vel) ? "hsl(" + cb.trig.toDeg(cb.vect.ang(this.vel) + cb.PI()) + ", 100%, 50%)" : "rgb(0, 0, 0)";
        ctx.lineWidth = 3;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.ppos.x, this.ppos.y);
        ctx.stroke();
        ctx.restore();
        this.ppos = this.pos;
        this.update();
    }
}
let particles = [];
for(let i = -canvas.width / 2 - 100; i < canvas.width / 2 + 100; i += 10) {
    for(let j = -canvas.height / 2 - 100; j < canvas.height / 2 + 100; j += 10) {
        particles.push(new Particle(cb.vect.init(i, j)));
    }
}

ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
function main() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++) {
        particles[i].draw();
        if(cb.vect.magsq(particles[i].dist) > cb.numb.random(100, 10000)) {
            particles.splice(i, 1, new Particle(particles[i].opos));
        }
    }
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);