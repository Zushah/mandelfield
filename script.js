const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cb = Chalkboard;

function F(p) {
    let z = cb.vec2.toComplex(p);
    for(let i = 0; i < 16; i++) {
        z = cb.comp.add(cb.comp.sq(z), cb.vec2.toComplex(p));
    }
    let mask = cb.comp.mag(z) < 2 ? 0 : 1;
    return cb.vec2.new((-p.y / cb.vec2.mag(p)) * (1/2 - mask), (p.x / cb.vec2.mag(p)) * (1/2 - mask));
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
        this.vel = cb.vec2.normalize(F(cb.vec2.scl(this.pos, 1/250)));
        this.pos = cb.vec2.add(this.pos, this.vel);
        this.dist = cb.vec2.sub(cb.vec2.absolute(this.pos), cb.vec2.absolute(this.opos));
    }
    draw() {
        ctx.strokeStyle = Math.atan2(this.vel.y, this.vel.x) ? "hsl(" + cb.trig.toDeg(Math.atan2(this.vel.y, this.vel.x) + Math.PI) + ", 100%, 50%)" : "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
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
    for(let i = 0; i < particles.length; i++) {
        particles[i].draw();
        if(cb.vec2.mag(particles[i].dist) > 50) {
            particles.splice(i, 1, new Particle(particles[i].opos));
        }
    }
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);