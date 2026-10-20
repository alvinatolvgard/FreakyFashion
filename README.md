# Freaky Fashion 👗
 
En fullstack-webbshop för en fiktiv klädbutik, byggd med **Angular** och **TypeScript** i Angular-kursen på Frontendutvecklarprogrammet vid EC Utbildning.
 
Projektet följer en given wireframe-struktur, men med eget tema och egen design. Produkterna lagras i en riktig databas och kan hanteras via ett admingränssnitt.
 
 
## Funktioner
 
### Butik
- **Startsida** med utvalda produkter
- **Sökfunktion** för produkter
- **Produktsida** med val av storlek (XS–XL)
- **Varukorg** där man lägger till och ser sina produkter
- **Kassa**
### Admin
- **Produktlista** med alla produkter i databasen
- **Formulär för nya produkter** med validering (t.ex. artikelnummer i formatet `AAA111`)
## Tekniker
 
| Del | Tekniker |
|-----|----------|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Node.js, Express, TypeScript |
| Databas | SQLite |
 
## Projektstruktur
 
```
freakyfashion/
├── client/   # Angular-frontend
└── server/   # Express- och TypeScript-backend med SQLite
```
 
## Kom igång
 
### Förutsättningar
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.dev/tools/cli)
### 1. Klona repot
```bash
git clone https://github.com/alvinatolvgard/freakyfashion.git
cd freakyfashion
```
 
### 2. Starta backend
```bash
cd server
npm install
npm run dev
```
 
### 3. Starta frontend
Öppna en ny terminal:
```bash
cd client
npm install
ng serve
```
 
Öppna sedan [http://localhost:4200](http://localhost:4200) i webbläsaren.
