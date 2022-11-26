var ct = 2;
var st = 2;
var m = 1.5;
var n = 2;
var a = 5;
var b = 3.5;

function createPath(tt) {
    var x, y;
    switch (shape) {
        case "circle":
            x = sin(tt) * 40;
            y = cos(tt) * 40;
            // var xx = pow(sin(tt), 11) * 100;
            // var yy = cos(tt) * 100;
            // var le = map(sin(tt / sc), -1, 1, -2, 2);
            // var lerpX = lerp(x, xx, le);
            // var lerpY = lerp(y, yy, le);
            // x = lerpX;
            // y = lerpY;
            break;
        case "top":
            x = pow(sin(tt), 11) * 400;
            y = cos(tt) * 200;
            break;
        case "superellipse":
            var ct = cos(tt);
            var st = sin(tt);
            x = a * Math.sign(ct) * pow(abs(ct), 2 / m) * 40;
            y = b * Math.sign(st) * pow(abs(st), 2 / n) * 25;
            break;
        case "lissajous":
            x = sin(tt * 2) * 100;
            y = cos(tt * 3) * 100;
            break;
        case "personnelle":
            var ct = cos(tt);
            var st = sin(tt);
            x = a * Math.sign(ct) * pow(abs(ct), 2 / m) * pow(sin(tt / 2), 7) * 100;
            y = b * Math.sign(st) * pow(abs(st), 2 / n) * sin(tt / 2) * 70;
            break;
        default:
            x = sin(tt) * 100;
            y = cos(tt) * 100;
    }
    var v = createVector(x, y);
    return v;
}