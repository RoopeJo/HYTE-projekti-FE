*** Settings ***
Library    Browser

*** Variables ***
${BASE_URL}    http://localhost:5173
${DATE}        01.04.2026
${MOOD}        4
${WEIGHT}      72
${SLEEP}       7
${STEPS}       8000
${EATEN}       2200
${BURNED}      600
${NOTE}        Automaatio testimerkintä päiväkirjaan.

*** Test Cases ***
Create New Journal Entry
    New Browser    chromium    headless=False
    New Page       ${BASE_URL}

    # Valitsee navbarista Päiväkirja sivun
    Wait For Elements State    text=Päiväkirja  visible  timeout=3s
    Click    text=Päiväkirja

    # Odottaa että painike tulee näkyviin
    Wait For Elements State    text=Luo uusi merkintä    visible    timeout=5s

    # Siirtyy lomakkeeseen
    Click    text=Luo uusi merkintä

    # Odototaa että lomake latautuu
    Wait For Elements State    text=Päivämäärä    visible    timeout=5s

    # Täytetään kentätä
    Fill Text    input[name="entry_date"]        2026-04-01
    Fill Text    input[name="mood"]        ${MOOD}
    Fill Text    input[name="weight"]         ${WEIGHT}
    Fill Text    input[name="sleep_hours"]            ${SLEEP}
    Fill Text    input[name="steps"]           ${STEPS}
    Fill Text    input[name="caloriesConsumed"]     ${EATEN}
    Fill Text    input[name="caloriesBurned"]  ${BURNED}
    Fill Text    textarea[name="notes"]  ${NOTE}

    # Tallennetaan
    Click    text=Tallenna

