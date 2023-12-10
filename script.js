const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cb = Chalkboard;

const F = cb.vec2.field("-y / Math.sqrt(x*x + y*y)", "x / Math.sqrt(x*x + y*y)");
const Mandelfield = "function Mandelfield(x, y) { let a = x, b = y; for(let i = 0; i < 16; i++) { let aa = a*a - b*b, bb = 2*a*b; a = aa + x, b = bb + y; } return a*a + b*b < 4 ? 1 : -1; }";
cb.vec2.fromField = function(vec2field, vec2) {
    let p = Function('"use strict"; ' + Mandelfield + ' return (x, y) => ((' + vec2field.p + ') * Mandelfield(x, y));')(),
        q = Function('"use strict"; ' + Mandelfield + ' return (x, y) => ((' + vec2field.q + ') * Mandelfield(x, y));')();
    return cb.vec2.new(p(vec2.x, vec2.y), q(vec2.x, vec2.y));
}
class Particle {
    constructor(p) {
        this.pos = p;
        this.vel = cb.vec2.new(0);
        this.dist = cb.vec2.new(0);
        this.ppos = this.pos;
        this.opos = this.pos;
    }
    update() {
        this.vel = cb.vec2.normalize(cb.vec2.fromField(F, cb.vec2.scl(this.pos, 1/250)));
        this.pos = cb.vec2.add(this.pos, this.vel);
        this.dist = cb.vec2.sub(cb.vec2.absolute(this.pos), cb.vec2.absolute(this.opos));
    }
    draw() {
        ctx.strokeStyle = Math.atan2(this.vel.y, this.vel.x) ? "hsl(" + cb.trig.toDeg(Math.atan2(this.vel.y, this.vel.x) + Math.PI) + ", 100%, 50%)" : "rgb(0, 0, 0)";
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
        particles.push(new Particle(cb.vec2.new(i, j)));
    }
}

ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
function main() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++) {
        particles[i].draw();
        if(cb.vec2.mag(particles[i].dist) > cb.numb.random(10, 100)) {
            particles.splice(i, 1, new Particle(particles[i].opos));
        }
    }
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);