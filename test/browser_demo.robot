*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    Select Options By    [name="my-select"]    label    Two
    Type Text   [name="my-datalist"]    New York
    Click   css=input[type="checkbox"]
    Click   css=input[type="radio"][value="2"]
    Click   text=Submit
    Click With Options    button    delay=2 s
    Get Text       id=message    ==    Received!