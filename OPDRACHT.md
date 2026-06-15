# Opdracht: werk de WK 2026-uitslagen bij

Je houdt het scorito-klassement actueel. Werk het bestand `results.js` in deze map bij met
de **definitieve** uitslagen van afgelopen WK 2026-wedstrijden, en push de wijziging naar GitHub.

**Aanpak (werk snel, blijf ruim onder 9 minuten):**
1. Lees eerst `results.js`: noteer welke wedstrijd-ID's al een uitslag hebben.
2. Zoek een **compleet, actueel overzicht** van alle tot nu toe gespeelde WK 2026-wedstrijden
   met eindstanden. Gebruik WebSearch om een betrouwbare overzichtspagina te vinden
   (bijv. Wikipedia "2026 FIFA World Cup", of een uitslagensite). Je mag WebFetch gebruiken,
   maar haal **hooguit 1–2 pagina's** op zodat je snel blijft.
3. Voeg **élke inmiddels gespeelde wedstrijd** toe die nog niet in `results.js` staat —
   dus niet alleen de allernieuwste. Loop alle poules A t/m L na.
4. Werk `results.js` bij en stop. Zijn er geen nieuwe gespeelde wedstrijden? Niets wijzigen, klaar.

## Stappen

1. Lees `results.js` en kijk welke wedstrijd-ID's al een uitslag hebben. Die sla je over.
2. Zoek op het web naar de **afgelopen, volledig gespeelde** WK 2026-wedstrijden (eindstand, dus
   na de reguliere speeltijd; bij groepswedstrijden is er geen verlenging). Negeer wedstrijden die
   nog bezig zijn of nog niet begonnen.
3. Koppel elke afgelopen wedstrijd aan het juiste **wedstrijd-ID** uit de tabel onderaan.
   Let op de volgorde thuis–uit: het eerste getal is de thuisploeg uit de tabel.
4. Voeg per nieuwe wedstrijd een regel toe aan `matches`, bv. `"F-0": [2, 1],`.
   - Bestaande uitslagen niet aanpassen, tenzij er een aantoonbare correctie nodig is.
5. Zet `updated` op het huidige tijdstip in Nederlandse tijd, bv. `"14 jun 2026, 23:45"`.
6. Als de **finale** is gespeeld: zet `champion` op de landnaam van de winnaar (exact zoals in de tabel).
7. Sla je wijzigingen op in `results.js`. **Het committen en pushen wordt automatisch buiten deze
   opdracht geregeld** (door de GitHub Actions-workflow) — dat hoef je zelf niet te doen.
8. Als er **geen** nieuwe afgelopen wedstrijd is: laat `results.js` ongewijzigd. Klaar.

## Belangrijke regels
- Gebruik exact de landnamen uit de tabel (Nederlandse spelling), anders klopt de koppeling niet.
- Alleen eindstanden. Geen tussenstanden, geen voorspellingen.
- `results.js` moet geldige JavaScript blijven (let op komma's en aanhalingstekens).
- Knock-outwedstrijden hebben (nog) geen ID in deze tabel — die voegen we later toe; sla ze nu over.

## Wedstrijd-ID-tabel (groepsfase)

```
A-0: Mexico - Zuid-Afrika
A-1: Zuid-Korea - Tsjechië
A-2: Mexico - Zuid-Korea
A-3: Zuid-Afrika - Tsjechië
A-4: Mexico - Tsjechië
A-5: Zuid-Afrika - Zuid-Korea
B-0: Canada - Bosnië-Herz.
B-1: Qatar - Zwitserland
B-2: Canada - Qatar
B-3: Bosnië-Herz. - Zwitserland
B-4: Canada - Zwitserland
B-5: Bosnië-Herz. - Qatar
C-0: Brazilië - Marokko
C-1: Haïti - Schotland
C-2: Brazilië - Haïti
C-3: Marokko - Schotland
C-4: Brazilië - Schotland
C-5: Marokko - Haïti
D-0: Verenigde Staten - Paraguay
D-1: Australië - Turkije
D-2: Verenigde Staten - Australië
D-3: Paraguay - Turkije
D-4: Verenigde Staten - Turkije
D-5: Paraguay - Australië
E-0: Duitsland - Curaçao
E-1: Ivoorkust - Ecuador
E-2: Duitsland - Ivoorkust
E-3: Curaçao - Ecuador
E-4: Duitsland - Ecuador
E-5: Curaçao - Ivoorkust
F-0: Nederland - Japan
F-1: Zweden - Tunesië
F-2: Nederland - Zweden
F-3: Japan - Tunesië
F-4: Nederland - Tunesië
F-5: Japan - Zweden
G-0: België - Egypte
G-1: Iran - Nieuw-Zeeland
G-2: België - Iran
G-3: Egypte - Nieuw-Zeeland
G-4: België - Nieuw-Zeeland
G-5: Egypte - Iran
H-0: Spanje - Kaapverdië
H-1: Saoedi-Arabië - Uruguay
H-2: Spanje - Saoedi-Arabië
H-3: Kaapverdië - Uruguay
H-4: Spanje - Uruguay
H-5: Kaapverdië - Saoedi-Arabië
I-0: Frankrijk - Senegal
I-1: Irak - Noorwegen
I-2: Frankrijk - Irak
I-3: Senegal - Noorwegen
I-4: Frankrijk - Noorwegen
I-5: Senegal - Irak
J-0: Argentinië - Algerije
J-1: Oostenrijk - Jordanië
J-2: Argentinië - Oostenrijk
J-3: Algerije - Jordanië
J-4: Argentinië - Jordanië
J-5: Algerije - Oostenrijk
K-0: Portugal - Congo
K-1: Oezbekistan - Colombia
K-2: Portugal - Oezbekistan
K-3: Congo - Colombia
K-4: Portugal - Colombia
K-5: Congo - Oezbekistan
L-0: Engeland - Kroatië
L-1: Ghana - Panama
L-2: Engeland - Ghana
L-3: Kroatië - Panama
L-4: Engeland - Panama
L-5: Kroatië - Ghana
```
