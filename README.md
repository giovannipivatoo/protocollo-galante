# Richiesta ufficiale di appuntamento

Un piccolo sito statico, in italiano e ottimizzato per smartphone, per invitare una
persona a un appuntamento con un livello di burocrazia completamente ingiustificato.

Il pulsante di rifiuto apre una pratica in cinque ricorsi: a ogni invio vengono
rimescolate quattro motivazioni estratte da un archivio di diciotto, seguite da una
sentenza animata. Al termine resta disponibile un rispettoso “magari un'altra volta”.

## Personalizzazione

Apri `script.js` e modifica i valori dentro `CONFIG`:

- `senderName`: il tuo nome;
- `dateTitle`: il tipo di appuntamento;
- `dateNote`: una nota breve;
- `whatsappNumber`: numero internazionale senza `+`, spazi o trattini;
- `whatsappMessage`: messaggio precompilato.

Il nome della destinataria si imposta direttamente nell'URL con il parametro `nome`:

```text
https://tuo-sito.example/?nome=Giulia
```

Per nomi composti, gli spazi possono essere scritti come `%20`:

```text
https://tuo-sito.example/?nome=Maria%20Giulia
```

È supportato anche il parametro equivalente `name`. Se il parametro non è presente,
è vuoto o contiene solo spazi, l'invito usa la formula neutra “una persona molto
speciale” e non mostra alcun nome salvato in precedenza.

La persona che accetta sceglie direttamente la data nella schermata finale. Il giorno
viene aggiunto automaticamente al messaggio WhatsApp; luogo, organizzazione e resto
dell'appuntamento restano volutamente a carico del mittente.

Il numero WhatsApp e tutti gli altri dati inseriti saranno visibili pubblicamente nel
repository e nel codice del sito.

## Anteprima locale

Da questa cartella esegui:

```sh
python3 -m http.server 8000
```

Poi visita `http://localhost:8000`.

## Pubblicazione gratuita su GitHub Pages

1. Crea su GitHub un repository pubblico chiamato `official-date-request`.
2. Collega questa cartella al repository e pubblica il branch `main`.
3. Apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona il branch `main`, la cartella `/(root)` e salva.

Il sito sarà disponibile all'indirizzo:

`https://NOME-UTENTE.github.io/official-date-request/`

Non sono necessari un sistema di build, dipendenze JavaScript o servizi a pagamento.
