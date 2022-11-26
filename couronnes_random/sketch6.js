var currentBranch = 0;
var wreath = [];

var Branch = function(vec1, vec2, red, green, blue, alpha) {
    this.vec1 = vec1;
    this.vec2 = vec2;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(1);
    var hyp = 10;
    var total = 100;
    var increment = TWO_PI / total;
    var branch = 0;
    for (var i = 0; i < TWO_PI; i += increment) {
        var vec1 = path(i);
        var vec2 = path(i + (increment * 1));
        var angle = atan2(vec2.y - vec1.y, vec2.x - vec1.x);
        var green = map(abs(sin(i)), 0, 1, 50, 205);
        wreath[branch] = [];
        seed(vec1, angle, hyp, green, branch);
        branch++;
    }
}

function draw() {
    translate(width / 2, height / 2);
    if (currentBranch < wreath[0].length) {
        for (var i = 0; i < wreath.length; i++) {
            var b = wreath[i][currentBranch];
            stroke(b.red, b.green, b.blue, b.alpha);
            // var d = dist(b.vec1.x, b.vec1.y, b.vec2.x, b.vec2.y);
            // var dm = map(d, 0.5, 1, 0, 2);
            // strokeWeight(dm);
            line(b.vec1.x, b.vec1.y, b.vec2.x, b.vec2.y);
        }
        currentBranch++;
    }
}

function path(t) {
    var x = pow(sin(t), 1) * 40;
    var y = pow(cos(t), 1) * 40;
    var v = createVector(x, y);
    return v;
}

function seed(v, a, h, green, branch) {
    var angle = a + random(-0.17 - h * 0.01, 0.17);
    // var angle = a;
    var hyp = h * 0.97;
    var newX = v.x + cos(a) * h;
    var newY = v.y + sin(a) * h;
    var newV = createVector(newX, newY);
    var red = map(h, 4, -3, 250, 0);
    var blue = map(h, 4, -3, 0, 255);
    var alpha = map(h, 9.5, 0, 0, 255);
    var b = new Branch(v, newV, red, green, blue, alpha);
    wreath[branch].push(b);
    if (hyp > 0.3 && (round(hyp * 10) % 20) == 0) {
        // seed(newV, angle + random(-0.6, 0.6), hyp, green, branch);
        seed(newV, angle + 0.6, hyp, green, branch);
    }
    if (hyp > 0.3) {
        seed(newV, angle, hyp, green, branch);
    }
}