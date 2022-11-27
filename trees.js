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

setupTree = function() {
    currentBranch = 0;
    wreath = [];
    var hyp = 10;
    var total = 100;
    var increment = TWO_PI / total;
    var branch = 0;
    for (var i = 0; i < TWO_PI; i += increment) {
        var vec1 = path(i);
        var vec2 = path(i + (increment * 1));
        var angle = Math.atan2(vec2.y - vec1.y, vec2.x - vec1.x);
        var green = map(Math.abs(Math.sin(i)), 0, 1, 50, 205);
        wreath[branch] = [];
        seed(vec1, angle, hyp, green, branch);
        branch++;
    }
};

drawTree = function(sc = 0.5) {
    // translate(width / 2, height / 2);
    let ratio = 3/5;
    // let brush = random([smallQuillForward, smallQuillBackward]);
    let brush = smallQuillForward;
    if (currentBranch < wreath[0].length) {
        for (var i = 0; i < wreath.length; i++) {
            var b = wreath[i][currentBranch];
            // stroke(b.red, b.green, b.blue, b.alpha);
            // var d = dist(b.vec1.x, b.vec1.y, b.vec2.x, b.vec2.y);
            // var dm = map(d, 0.5, 1, 0, 2);
            // strokeWeight(dm);
            // line(b.vec1.x, b.vec1.y, b.vec2.x, b.vec2.y);
            // let sc = 0.5;
            let x = Math.floor(b.vec1.x*sc + (109*7*0.5));
            let y = Math.floor((b.vec1.y*ratio*sc + (25*9*0.5)));
            paintStatic(ge.t.name, x, y, thickQuillForward, empty);
            paintStatic(ge.t.name, x, y, bigQuillForward, polka15);
            // paintStatic(ge.t.name, x + 1, y, dot, empty);
            // paintStatic(ge.t.name, x, y + 1, dot, empty);
            // paintStatic(ge.t.name, x + 1, y + 1, dot, empty);
            paintStatic(ge.t.name, x, y, smallQuillForward, full);
        }
        currentBranch++;
    }
};

function path(t) {
    var x = Math.pow(Math.sin(t), 1) * 40;
    var y = Math.pow(Math.cos(t), 1) * 40;
    var v = createVector(x, y);
    return v;
}

seed = function(v, a, h, green, branch) {
    var angle = a + random(-0.17 - h * 0.01, 0.17);
    // var angle = a + openSimplex.noise2D(a, drawCount * 0.01) * 0.7;    // var angle = a;
    var hyp = h * 0.97;
    var newX = v.x + Math.cos(a) * h;
    var newY = v.y + Math.sin(a) * h;
    var newV = createVector(newX, newY);
    var red = map(h, 4, -3, 250, 0);
    var blue = map(h, 4, -3, 0, 255);
    var alpha = map(h, 9.5, 0, 0, 255);
    var b = new Branch(v, newV, red, green, blue, alpha);
    wreath[branch].push(b);
    if (hyp > 0.3 && (Math.round(hyp * 10) % 20) == 0) {
        // seed(newV, angle + random(-0.6, 0.6), hyp, green, branch);
        seed(newV, angle + 0.6, hyp, green, branch);
    }
    if (hyp > 0.3) {
        seed(newV, angle, hyp, green, branch);
    }
};


// "let s = Math.random();setupTree();ge.clearCanvas();for(let i=0;i<300;i++){setTimeout(()=>{drawTree(s);},i*10)}"