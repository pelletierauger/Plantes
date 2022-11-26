function setup() {
    createCanvas(windowWidth * 1, windowHeight * 1);
    translate(width / 2, height / 2);
    background(0);
    var r = 2;
    var total = 50;
    shape = "circle";
    var increment = TWO_PI / total;
    for (var i = 0; i < TWO_PI * 4; i += increment) {
        var x = cos(i * 1) * r * 5;
        var y = sin(i * 1) * r * 5;
        var nextX = cos((i + (increment * 1)) * 1) * r * 5;
        var nextY = sin((i + (increment * 1)) * 1) * r * 5;
        // var vec1 = createVector(x, y);
        var vec1 = createPath(i);
        // var vec2 = createVector(nextX, nextY);
        var vec2 = createPath(i + (increment * 1));
        var angle = atan2(vec2.y - vec1.y, vec2.x - vec1.x);
        // var angle = Math.acos(vec1.dot(vec2) / (vec1.mag() * vec2.mag()));
        // var angle = myAngleBetween(vec1, vec2);
        // var angle = p5.Vector.angleBetween(vec1, vec2);
        // angle += PI;
        var endLineX = vec1.x + cos(angle) * 200;
        var endLineY = vec1.y + sin(angle) * 200;

        // var green = map(i, 0, TWO_PI, 0, 255);
        var green = map(abs(sin(i)), 0, 1, 50, 205);
        fill(255, green, 0);
        stroke(255, green, 0);
        seed(vec1.x, vec1.y, angle, 10, green);
        // line(x, y, endLineX, endLineY)
        // ellipse(x, y, 5, 5);
    }
}

function myAngleBetween(v1, v2) {
    var hypotenuse = dist(v1.x, v1.y, v2.x, v2.y);
    var adjacent = v2.x - v1.x;
    // var angle = acos(adjacent / hypotenuse
    var angle = atan2(v2.x - v1.x, v2.y - v1.y);
    return angle;
}

function seed(x, y, a, h, g) {
    var s = createVector(x, y);
    // g.push(s);
    // var angle = a + random(-0.17, 0.17);
    var angle = a + random(-0.17 + -h / 100, 0.17);
    // var angle = a + (noise(h / 1000) - 0.5 / 30);
    // var angle = a; // + random(-0.07, 0.07);
    var hyp = h * 0.97;
    var newX = s.x + cos(a) * h;
    var newY = s.y + sin(a) * h;
    var blue = map(h, 4, -1, 0, 255);
    var red = map(h, 4, -1, 250, 0);
    // stroke(blue, 255, g, 150);
    var alpha = map(h, 9, 0, 10, 150);
    stroke(red, g, blue, alpha);
    // stroke(g, red, lerp(g, blue, 0.5), alpha);
    // stroke(255);
    // stroke(min(blue, g), max(g, blue), max(blue, g), 150);
    strokeWeight(1);
    line(s.x, s.y, newX, newY);
    if (hyp > 0.2) {
        setTimeout(function() {
            seed(newX, newY, angle, hyp, g);
        }, 1);
    }
    if (hyp > 0.2 && random(0, 1) < 0.02) {
        // if (hyp > 0.2 && (round((hyp * 13)) % 20) == 0) {
        setTimeout(function() {
            seed(newX, newY, angle + random(-0.6, 0.6), hyp, g);
            // seed(newX, newY, angle + PI / 8, hyp, g);
            // seed(newX, newY, angle, hyp);

        }, 1);
    }
}