# Työvuorolistat

Ohjelma, jolla pomo voi luoda työntekijöille työvuorolistoja ja laskea tietyltä ajalta tehdyt työtunnit.  
Kellokortti, jolla työntekijät voivat kirjata itsensä sisään ja ulos töistä.  
Työntekijät voivat avata ovia tiloihin, joihin heillä oikeus mennä, näyttää vain ovet joihin oikeudet.  
Kulunseuranta, josta näkee missä työntekijä on liikkunut.  
Viestien lähettäminen pomon ja työntekijän välillä.  
  

# node commands
node version used: 16.19  
  
Asentaa node paketit  
npm install  
  
Käynnistää vite dev-serverin osoitteessa http://localhost:5173/  
npm run dev  
  
Tekee src-hakemiston sisällöstä production buildin dist-hakemistoon  
npm run build  
  
Production buildin tekemisen jälkeen käynnistää express serverin production moodissa dist-hakemiston sisällöllä osoitteessa http://localhost:5000/  
npm run start-prod  

## Mongodb models

user:  
id: id  
role: admin - boss - employee  
companyId: int  
name: string  
securityLevel: int  
  
company:  
id: id  
companyName: string  
ownerId: userId  
  
shift:  
id: id  
company: companyId  
date: Date.toJSON().split('T')[0]  
start: int  
end: int  
employeeId: userId  
  
door:  
id: id  
doorName: string  
securityLevel: int  
  
doorEvents:  
id: id  
timeStamp: Date  
doorId: id  
userId: id  
  
logins:  
id: id  
userId: id  
timeStamp: Date  
  
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
