document.getElementById('decisionButton').addEventListener('click', function() {
    const choices = ["sì", "no", "è un'idea di merda", "secondo me ci sta", "è una cazzata", "senti a me lascia stare", "ma si la vita è una", "ci puoi prova secondo me", ];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];

    // Mostra il risultato con animazione
    const resultElement = document.getElementById('decisionResult');
    resultElement.innerText = randomChoice;
    
    // Aggiungi la classe per mostrare il risultato
    resultElement.classList.add('show');

    // Rimuovi la classe dopo un po' per nasconderlo
    setTimeout(() => {
        resultElement.classList.remove('show');
    }, 6000);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrato con successo:', registration);
            })
            .catch((error) => {
                console.log('Registrazione Service Worker fallita:', error);
            });
    });
}