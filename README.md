# Moment 2 dt208g

Syftet med laborationen är att ge praktisk erfarenhet av att skapa en "att göra"-applikation med TypeScript och använda principer för objektorienterad programmering. 
Målet är att bekanta sig med användningen av interfaces, olika typer och lokal lagring (LocalStorage), och sedan tillämpa dessa kunskaper i egna projekt.

HTML-sidan
HTML-sidan innehåller ett formulär för att lägga till nya todos, 
en lista för att visa befintliga todos och knappar för att markera todos som
klara och ta bort dem. Eventlyssnare hanterar interaktionen med användaren och 
anropar lämpliga metoder från TodoList-klassen för att utföra önskade åtgärder.

Övriga Funktioner
buildList(): Funktion för att bygga upp todo-inlägg på sidan från den sparade listan.
addTodoList(): Funktion för att hämta formulärdata och lägga till nya todos.
removeTodo(): Funktion för att ta bort todos eller markera dem som klara.
Eventlisteners: Lyssnar på händelser som klick på knappar eller formulärsubmit för att anropa lämpliga funktioner.

Tekniker och Verktyg
TypeScript: Används för att skriva och kompilera koden till JavaScript för bättre typsäkerhet och funktionalitet.
HTML/CSS: Används för att strukturera och styla webbplatsen och dess komponenter.
Parcel: Ett snabb byggverktyg för webbutveckling som används för att bygga och paketera projektet.
LocalStorage: Används för att lagra användarens uppgifter lokalt i webbläsaren för att möjliggöra återbesök och bibehålla tillstånd mellan sessioner.
