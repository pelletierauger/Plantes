function setup() {
    createCanvas(windowWidth, windowHeight);
    translate(width / 2, height / 2);
    background(0);
    strokeWeight(1);
    var hyp = 10;
    var total = 50;
    var increment = TWO_PI / total;
    for (var i = 0; i < TWO_PI * 4; i += increment) {
        var vec1 = path(i);
        var vec2 = path(i + increment);
        var angle = atan2(vec2.y - vec1.y, vec2.x - vec1.x);
        var green = map(abs(sin(i)), 0, 1, 50, 205);
        seed(vec1.x, vec1.y, angle, hyp, green);
    }
}

function path(t) {
    var x = sin(t) * 40;
    var y = cos(t) * 40;
    var v = createVector(x, y);
    return v;
}

function seed(x, y, a, h, green) {
    var s = createVector(x, y);
    var angle = a + random(-0.17 - h * 0.01, 0.17);
    var hyp = h * 0.97;
    var newX = s.x + cos(a) * h;
    var newY = s.y + sin(a) * h;
    var red = map(h, 4, -3, 250, 0);
    var blue = map(h, 4, -3, 0, 255);
    var alpha = map(h, 9.5, 0, 0, 255);
    stroke(red, green, blue, alpha);
    line(s.x, s.y, newX, newY);
    if (hyp > 0.3) {
        setTimeout(function() {
            seed(newX, newY, angle, hyp, green);
        }, 1);
    }
    // if (hyp > 0.2 && random(0, 1) < 0.02) {
    if (hyp > 0.3 && (round((hyp * 10)) % 30) == 0) {
        setTimeout(function() {
            seed(newX, newY, angle + random(-0.6, 0.6), hyp, green);
        }, 1);
    }
}