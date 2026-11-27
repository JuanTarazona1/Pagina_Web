const SERVICE_ID = "service_j74hh5b";
const TEMPLATE_ID = "template_ozmoyg7";
const PUBLIC_KEY = "vWJG86ADBL4h0kUGQ";

const form = document.getElementById("contact-form");

if (form) {
    const statusMessage = form.querySelector(".final-message");
    const submitButton = form.querySelector('button[type="submit"]');

    if (typeof emailjs === "undefined") {
        console.error("EmailJS no se pudo cargar; el formulario no puede enviar mensajes.");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            if (statusMessage) {
                statusMessage.textContent = "No se pudo conectar con el servicio de envío. Inténtalo más tarde.";
            }
        });
    } else {
        emailjs.init(PUBLIC_KEY);

        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            submitButton.disabled = true;
            if (statusMessage) {
                statusMessage.textContent = "Enviando tu solicitud...";
            }

            try {
                await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
                form.reset();
                if (statusMessage) {
                    statusMessage.textContent = "Mensaje enviado con éxito.";
                }
                const counter = document.getElementById("char-counter");
                if (counter) {
                    counter.textContent = "0/1000 caracteres";
                }
            } catch (error) {
                console.error("No se pudo enviar el formulario:", error);
                if (statusMessage) {
                    statusMessage.textContent = "No se pudo enviar tu solicitud. Inténtalo de nuevo más tarde.";
                }
            } finally {
                submitButton.disabled = false;
            }
        });
    }

    const phoneInput = form.querySelector('input[name="telefono"]');
    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, "");
        });
    }

    const textarea = form.querySelector("#mensaje-textarea");
    const counter = form.querySelector("#char-counter");

    if (textarea && counter) {
        textarea.addEventListener("input", function() {
            counter.textContent = `${this.value.length}/${textarea.maxLength} caracteres`;
        });
    }
}

function initMap() {
    const ubicacion = { lat: 4.60971, lng: -74.08365 };
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ubicacion,
    });
    new google.maps.Marker({
    position: ubicacion,
    map: map,
    title: "Avisos Publicitarios"
    });
}