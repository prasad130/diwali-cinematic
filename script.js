// ===================================
// 1. CANVAS SETUP
// ===================================

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

let width;
let height;
let time = 0;

function resize() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resize();

window.addEventListener("resize", resize);


// ===================================
// 2. STARS
// ===================================

const stars = [];

for (let i = 0; i < 120; i++) {

    stars.push({

        x: Math.random(),
        y: Math.random() * 0.65,
        size: Math.random() * 2,
        phase: Math.random() * 10

    });

}


// ===================================
// 3. SKY AND MOON
// ===================================

function drawSky() {

    const gradient = ctx.createLinearGradient(
        0, 0, 0, height
    );

    gradient.addColorStop(0, "#050d29");
    gradient.addColorStop(0.55, "#17152d");
    gradient.addColorStop(1, "#68301c");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, width, height);


    // Moon

    ctx.beginPath();

    ctx.arc(
        width * 0.78,
        height * 0.15,
        35,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#fff2c6";

    ctx.shadowBlur = 35;
    ctx.shadowColor = "gold";

    ctx.fill();

    ctx.shadowBlur = 0;


    // Stars

    stars.forEach(star => {

        const opacity =
            0.4 + Math.sin(time * 2 + star.phase) * 0.4;

        ctx.globalAlpha = opacity;

        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(
            star.x * width,
            star.y * height,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}


// ===================================
// 4. INDIAN VILLAGE HOUSES
// ===================================

function drawHouse(x, y, w, h, color) {

    // Main building

    ctx.fillStyle = color;

    ctx.fillRect(x, y, w, h);


    // Roof

    ctx.fillStyle = "#74351d";

    ctx.beginPath();

    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + w / 2, y - h * 0.32);
    ctx.lineTo(x + w + 15, y);

    ctx.closePath();

    ctx.fill();


    // Roof decoration

    ctx.strokeStyle = "#ffb52e";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + w / 2, y - h * 0.32);
    ctx.lineTo(x + w + 15, y);

    ctx.stroke();


    // Door

    ctx.fillStyle = "#542313";

    ctx.fillRect(
        x + w * 0.38,
        y + h * 0.48,
        w * 0.24,
        h * 0.52
    );


    // Door knob

    ctx.fillStyle = "gold";

    ctx.beginPath();

    ctx.arc(
        x + w * 0.57,
        y + h * 0.75,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Windows

    for (let i = 0; i < 2; i++) {

        const wx = x + w * (0.12 + i * 0.67);
        const wy = y + h * 0.22;

        ctx.fillStyle = "#ffc94f";

        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";

        ctx.fillRect(wx, wy, w * 0.16, h * 0.18);

        ctx.shadowBlur = 0;

        ctx.strokeStyle = "#542313";
        ctx.lineWidth = 3;

        ctx.strokeRect(wx, wy, w * 0.16, h * 0.18);

    }

}


function drawVillage() {

    const groundY = height * 0.77;

    drawHouse(
        width * 0.04,
        groundY - 125,
        width * 0.21,
        125,
        "#9d4f2d"
    );

    drawHouse(
        width * 0.34,
        groundY - 160,
        width * 0.25,
        160,
        "#a85b34"
    );

    drawHouse(
        width * 0.75,
        groundY - 135,
        width * 0.21,
        135,
        "#98502b"
    );

}


// ===================================
// 5. TREES AND LEAVES
// ===================================

function drawTree(x, groundY, size) {

    // Tree trunk

    ctx.fillStyle = "#573019";

    ctx.fillRect(
        x - size * 0.07,
        groundY - size * 0.55,
        size * 0.14,
        size * 0.55
    );


    // Branches

    const sway = Math.sin(time * 2 + x) * 5;

    const leaves = [

        [x, groundY - size * 0.65, size * 0.27],
        [x - size * 0.2 + sway, groundY - size * 0.77, size * 0.22],
        [x + size * 0.2 + sway, groundY - size * 0.8, size * 0.24],
        [x + sway, groundY - size * 0.96, size * 0.2]

    ];

    leaves.forEach(leaf => {

        ctx.beginPath();

        ctx.arc(
            leaf[0],
            leaf[1],
            leaf[2],
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#18552c";

        ctx.fill();

    });

}


function drawNature() {

    drawTree(width * 0.02, height * 0.78, height * 0.32);

    drawTree(width * 0.96, height * 0.78, height * 0.35);

}


// ===================================
// 6. DIWALI DECORATIONS
// ===================================

function drawLights() {

    for (let i = 0; i < 25; i++) {

        const x = i * width / 25;

        const y =
            height * 0.38 +
            Math.sin(i * 0.5) * 12;

        ctx.beginPath();

        ctx.arc(x, y, 4, 0, Math.PI * 2);

        ctx.fillStyle =
            ["gold", "orange", "#ff4d4d"][i % 3];

        ctx.shadowBlur = 15;
        ctx.shadowColor = "gold";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


// ===================================
// 7. DIYAS
// ===================================

function drawDiyas() {

    for (let i = 0; i < 12; i++) {

        const x = width * (0.04 + i * 0.083);

        const y = height * 0.91;

        // Diya bowl

        ctx.fillStyle = "#c76b20";

        ctx.beginPath();

        ctx.ellipse(
            x, y, 14, 7,
            0, 0, Math.PI * 2
        );

        ctx.fill();


        // Flame

        const flameSize =
            10 + Math.sin(time * 12 + i) * 3;

        ctx.beginPath();

        ctx.ellipse(
            x,
            y - 12,
            5,
            flameSize,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffb52e";

        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


// ===================================
// 8. RANGOLI
// ===================================

function drawRangoli(x, y) {

    const colors = [
        "red",
        "orange",
        "yellow",
        "cyan",
        "pink"
    ];

    for (let i = 0; i < 12; i++) {

        const angle = i * Math.PI / 6;

        const px = x + Math.cos(angle) * 35;
        const py = y + Math.sin(angle) * 35;

        ctx.beginPath();

        ctx.arc(px, py, 9, 0, Math.PI * 2);

        ctx.fillStyle = colors[i % colors.length];

        ctx.fill();

    }

    ctx.beginPath();

    ctx.arc(x, y, 12, 0, Math.PI * 2);

    ctx.fillStyle = "gold";

    ctx.fill();

}


// ===================================
// 9. PEOPLE CELEBRATING
// ===================================

function drawPerson(x, y, scale, color) {

    ctx.save();

    ctx.translate(x, y);

    ctx.scale(scale, scale);


    // Head

    ctx.beginPath();

    ctx.arc(0, -48, 12, 0, Math.PI * 2);

    ctx.fillStyle = "#a66a45";

    ctx.fill();


    // Body / traditional clothing

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.moveTo(-12, -34);
    ctx.lineTo(12, -34);
    ctx.lineTo(20, 10);
    ctx.lineTo(-20, 10);

    ctx.closePath();

    ctx.fill();


    // Arms waving

    const movement = Math.sin(time * 4 + x) * 12;

    ctx.strokeStyle = "#a66a45";
    ctx.lineWidth = 7;

    ctx.beginPath();

    ctx.moveTo(-8, -25);

    ctx.lineTo(-25, -12 + movement);

    ctx.moveTo(8, -25);

    ctx.lineTo(25, -12 - movement);

    ctx.stroke();


    // Legs

    ctx.strokeStyle = "#21150e";

    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(-7, 10);
    ctx.lineTo(-12, 37);

    ctx.moveTo(7, 10);
    ctx.lineTo(12, 37);

    ctx.stroke();


    ctx.restore();

}


function drawFamily() {

    if (width <= 600) {

        // Mobile: show only two family members

        drawPerson(
            width * 0.38,
            height - 55,
            0.7,
            "#e7a02b"
        );

        drawPerson(
            width * 0.58,
            height - 55,
            0.65,
            "#d94b72"
        );

    } else {

        // Desktop: show four family members

        drawPerson(width * 0.32, height - 55, 1, "#e7a02b");

        drawPerson(width * 0.40, height - 55, 0.9, "#d94b72");

        drawPerson(width * 0.50, height - 55, 0.65, "#45a8c9");

        drawPerson(width * 0.58, height - 55, 0.7, "#62b65a");

    }

}


// CHILDREN CELEBRATING DIWALI

function drawChildren() {

    const children = [
        {
            x: width * 0.22,
            color: "#ff9f43",
            direction: -1
        },
        {
            x: width * 0.76,
            color: "#ff5e8a",
            direction: 1
        }
    ];

    children.forEach(child => {

        const x = child.x;
        const y = height * 0.89;

        const movement = Math.sin(time * 5 + x) * 8;

        // Body
        ctx.fillStyle = child.color;

        ctx.beginPath();

        ctx.ellipse(
            x,
            y - 25,
            13,
            24,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Head
        ctx.beginPath();

        ctx.arc(
            x,
            y - 60,
            12,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#b8754c";

        ctx.fill();

        // Legs
        ctx.strokeStyle = "#21150e";
        ctx.lineWidth = 6;

        ctx.beginPath();

        ctx.moveTo(x - 5, y - 5);
        ctx.lineTo(x - 12, y + 12);

        ctx.moveTo(x + 5, y - 5);
        ctx.lineTo(x + 12, y + 12);

        ctx.stroke();

        // Raised arm
        ctx.strokeStyle = "#b8754c";
        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(x, y - 38);

        ctx.lineTo(
            x + child.direction * 30,
            y - 65 + movement
        );

        ctx.stroke();

        // Sparkler
        drawSparkler(
            x + child.direction * 30,
            y - 65 + movement
        );

    });

}

function drawSparkler(x, y) {

    // Sparkler stick

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(x, y + 12);
    ctx.lineTo(x, y - 12);

    ctx.stroke();


    // Bright spark

    const glow = 12 + Math.sin(time * 15) * 5;

    ctx.beginPath();

    ctx.arc(x, y - 14, 5, 0, Math.PI * 2);

    ctx.fillStyle = "white";

    ctx.shadowBlur = glow * 2;
    ctx.shadowColor = "orange";

    ctx.fill();

    ctx.shadowBlur = 0;


    // Random sparks

    for (let i = 0; i < 4; i++) {

        const angle = Math.random() * Math.PI * 2;

        const distance = Math.random() * 18;

        ctx.beginPath();

        ctx.arc(
            x + Math.cos(angle) * distance,
            y - 14 + Math.sin(angle) * distance,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "gold";

        ctx.fill();

    }

}

// ===================================
// 10. FIREWORKS
// ===================================

let fireworks = [];
let rockets = [];

function launchRocket() {

    rockets.push({

        x: Math.random() * width,

        y: height,

        targetY: height * (0.1 + Math.random() * 0.35),

        speed: 7 + Math.random() * 4,

        color: [
            "gold",
            "red",
            "cyan",
            "orange",
            "pink"
        ][Math.floor(Math.random() * 5)]

    });

}





function explode(x, y, color) {

    // Main explosion particles

    const isMobile = window.innerWidth <= 600;

    const particleCount = isMobile ? 65 : 150;

    for (let i = 0; i < particleCount; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 7 + 2;

        fireworks.push({

            x: x,
            y: y,

            dx: Math.cos(angle) * speed,

            dy: Math.sin(angle) * speed,

            life: 100,

            maxLife: 100,

            size: Math.random() * 3 + 2,

            color: color

        });

    }

}


function drawFireworks() {

    // Rockets

    for (let i = rockets.length - 1; i >= 0; i--) {

        const rocket = rockets[i];

        rocket.y -= rocket.speed;

        // Rocket trail

        ctx.beginPath();

        ctx.moveTo(rocket.x, rocket.y + 25);

        ctx.lineTo(rocket.x, rocket.y);

        ctx.strokeStyle = rocket.color;

        ctx.lineWidth = 4;

        ctx.shadowBlur = 20;
        ctx.shadowColor = rocket.color;

        ctx.stroke();

        ctx.shadowBlur = 0;


        if (rocket.y <= rocket.targetY) {

            explode(
                rocket.x,
                rocket.y,
                rocket.color
            );

            rockets.splice(i, 1);

        }

    }


    // Explosion particles

    for (let i = fireworks.length - 1; i >= 0; i--) {

        const p = fireworks[i];

        ctx.globalAlpha = p.life / p.maxLife;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = p.color;

        ctx.shadowBlur = 18;

        ctx.shadowColor = p.color;

        ctx.fill();

        ctx.shadowBlur = 0;

        p.x += p.dx;

        p.y += p.dy;

        p.dx *= 0.985;

        p.dy *= 0.985;

        p.dy += 0.035;

        p.life--;

        if (p.life <= 0) {

            fireworks.splice(i, 1);

        }

    }

    ctx.globalAlpha = 1;

}


// ===================================
// 11. GROUND FOUNTAIN CRACKERS
// ===================================

let fountainParticles = [];

// CHICHUBUDDI FOUNTAIN CRACKERS


function createFountain() {

    const positions = [
        width * 0.34,
        width * 0.66
    ];

    positions.forEach(x => {

        const y = height * 0.87;

        for (let i = 0; i < 35; i++) {

            fountainParticles.push({

                x: x,

                y: y,

                dx: (Math.random() - 0.5) * 5,

                dy: -Math.random() * 9 - 3,

                gravity: 0.13,

                life: 50,

                size: Math.random() * 3 + 1,

                color: [
                    "gold",
                    "orange",
                    "yellow",
                    "white"
                ][Math.floor(Math.random() * 4)]

            });

        }

    });

}


function drawFountain() {

    // Draw chichubuddi cones

    [0.34, 0.66].forEach(position => {

        const x = width * position;
        const y = height * 0.88;

        ctx.fillStyle = "#a83d16";

        ctx.beginPath();

        ctx.moveTo(x - 12, y);
        ctx.lineTo(x + 12, y);
        ctx.lineTo(x, y - 28);

        ctx.closePath();

        ctx.fill();

        // Golden tip

        ctx.beginPath();

        ctx.arc(x, y - 27, 4, 0, Math.PI * 2);

        ctx.fillStyle = "gold";

        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";

        ctx.fill();

        ctx.shadowBlur = 0;

    });


    // Draw flying sparks

    for (let i = fountainParticles.length - 1; i >= 0; i--) {

        const p = fountainParticles[i];

        ctx.globalAlpha = p.life / 50;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = p.color;

        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;

        ctx.fill();

        ctx.shadowBlur = 0;

        p.x += p.dx;
        p.y += p.dy;

        p.dy += p.gravity;

        p.life--;

        if (p.life <= 0) {

            fountainParticles.splice(i, 1);

        }

    }

    ctx.globalAlpha = 1;

}


// ===================================
// 12. MAIN ANIMATION
// ===================================

function animate() {

    time += 0.016;

    ctx.clearRect(0, 0, width, height);

    drawSky();

    drawLights();

    drawNature();

    drawVillage();

    drawRangoli(width * 0.15, height * 0.88);

    drawRangoli(width * 0.85, height * 0.88);

    drawFamily();

    drawChildren()

    drawDiyas();

    drawFireworks();

    drawFountain();

    requestAnimationFrame(animate);

}

animate();


// ===================================
// 13. START CELEBRATION
// ===================================

let celebrationStarted = false;

document.getElementById("startBtn").addEventListener("click", function () {

    if (celebrationStarted) return;

    celebrationStarted = true;

    document.getElementById("intro").classList.add("hidden");

    document.getElementById("wishScreen").classList.remove("hidden");

    // Start aerial fireworks

    setInterval(
        launchRocket,
        window.innerWidth <= 600 ? 1100 : 700
    );

    // Increase fountain activity

    setInterval(createFountain, 900);

});

setInterval(createFountain, 1200);