const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

// Passe die Canvas-Größe an das Browserfenster an
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Definiere eine Klasse für die Blasen
class Bubble {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  // Zeichnet die Blase
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // Weiße Farbe mit etwas Transparenz, damit ein Schaumeffekt entsteht
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();
  }

  // Aktualisiert die Position und sorgt für "Hin-und-Her"-Bewegung (Bounce-Effekt)
  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Horizontales "Bouncen" an den Seiten des Canvas
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    // Vertikales "Bouncen" am oberen und unteren Rand
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.draw();
  }
}

// Erstelle 5 Blasen mit unterschiedlichen Größen
const bubbles = [];
// Hier legen wir z. B. 5 verschiedene Radien fest (du kannst hier auch andere Werte oder Zufallszahlen nutzen)
const radii = [50, 70, 90, 110, 130];
for (let i = 0; i < 5; i++) {
  const radius = radii[i];
  // Positioniere die Blase zufällig, so dass sie komplett innerhalb des Canvas startet
  const x = Math.random() * (canvas.width - 2 * radius) + radius;
  const y = Math.random() * (canvas.height - 2 * radius) + radius;
  // Wähle langsame Geschwindigkeiten (zwischen -0.5 und 0.5 Pixel pro Frame)
  let dx = (Math.random() - 0.5) * 1;
  let dy = (Math.random() - 0.5) * 1;
  // Falls zufällig 0 herauskommt, setze einen kleinen Wert
  if (dx === 0) dx = 0.5;
  if (dy === 0) dy = 0.5;
  bubbles.push(new Bubble(x, y, radius, dx, dy));
}

// Animationsschleife
function animate() {
  // Löscht den Canvas, damit der nächste Frame sauber gezeichnet wird
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Aktualisiere und zeichne jede Blase
  bubbles.forEach(bubble => bubble.update());
  requestAnimationFrame(animate);
}
animate();