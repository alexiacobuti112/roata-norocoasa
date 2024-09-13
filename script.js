const canvas = document.getElementById('roataCanvas');
const context = canvas.getContext('2d');
const butonRotire = document.getElementById('butonRotire');
const mesaj = document.getElementById('mesaj');

// Definim premiile și culorile pentru roată
const premii = ["1 leu", "5 lei", "10 lei", "100 lei", "Necâștigător"];
const culori = ["#FF6347", "#FFD700", "#ADFF2F", "#87CEEB", "#FF69B4"];
const probabilitati = [0.50, 0.30, 0.10, 0.01, 0.09];

// Setăm dimensiunile roții
const numarSectiuni = premii.length;
const unghiSectiune = 2 * Math.PI / numarSectiuni;
let unghiInitial = 0;
let rotireInCurs = false;

// Desenăm roata
function desenareRoata() {
    for (let i = 0; i < numarSectiuni; i++) {
        const unghiFinal = unghiInitial + unghiSectiune;
        context.beginPath();
        context.arc(200, 200, 200, unghiInitial, unghiFinal);
        context.lineTo(200, 200);
        context.fillStyle = culori[i];
        context.fill();
        context.stroke();
        context.save();

        // Adăugăm textul premiilor
        context.translate(200, 200);
        context.rotate(unghiInitial + unghiSectiune / 2);
        context.fillStyle = "#000";
        context.font = "bold 16px Arial";
        context.fillText(premii[i], 100, 10);
        context.restore();

        unghiInitial = unghiFinal;
    }
}

// Funcția de rotire a roții
function roteșteRoata() {
    if (rotireInCurs) return;
    rotireInCurs = true;
    mesaj.textContent = "";

    const rotireTotală = Math.random() * 10 + 10; // Rotire între 10 și 20 rotații complete
    let unghiActual = 0;

    const interval = setInterval(() => {
        unghiActual += 0.05;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(200, 200);
        context.rotate(unghiActual);
        context.translate(-200, -200);
        desenareRoata();
        context.restore();

        if (unghiActual >= rotireTotală) {
            clearInterval(interval);
            determinareCastigator(unghiActual % (2 * Math.PI));
            rotireInCurs = false;
        }
    }, 20);
}

// Determinarea câștigătorului
function determinareCastigator(unghiFinal) {
    const indice = Math.floor((unghiFinal / (2 * Math.PI)) * numarSectiuni);
    mesaj.textContent = `Ai câștigat: ${premii[indice]}`;
}

butonRotire.addEventListener('click', roteșteRoata);

// Desenăm roata inițială
desenareRoata();
