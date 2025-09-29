    (function(){
        emailjs.init("vWJG86ADBL4h0kUGQ"); // Reemplazar con tu Public Key
    })();

    const SERVICE_ID = "service_oygh7uw";
    const TEMPLATE_ID = "template_ozmoyg7";

    document.getElementById("contact-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const form = e.target;

        // Enviar datos con EmailJS
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
            .then(() => {
                alert("✅ Mensaje enviado con éxito");
                form.reset();
            }, (err) => {
                alert("❌ Error al enviar: " + JSON.stringify(err));
        });
});

document.querySelector('input[name="telefono"]').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

const textarea = document.getElementById('mensaje-textarea');
const counter = document.getElementById('char-counter');

if (textarea && counter) {
    const maxLength = parseInt(textarea.getAttribute('maxlength'), 10);
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length}/${maxLength} caracteres`;
    });
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