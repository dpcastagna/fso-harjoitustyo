# Työvuorolistat

Ohjelma, jolla pomo voi luoda työntekijöille työvuorolistoja ja laskea tietyltä ajalta tehdyt työtunnit.  
Kellokortti, jolla työntekijät voivat kirjata itsensä sisään ja ulos töistä.  
Työntekijät voivat avata ovia tiloihin, joihin heillä oikeus mennä, näyttää vain ovet joihin oikeudet.  
Kulunseuranta, josta näkee missä työntekijä on liikkunut.  
  
## Mongodb models

user:  
userId: int  
role: admin - boss - employee  
company: string  
name: string  
securityLevel: int
  
shift:  
date: Date  
start: int  
end: int  
employeeName: string  
  
door:  
doorId: int  
doorName: string  
securityLevel: int  
  
doorEvents:
timeStamp: Date  
doorId: int  
userId: int  

  
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
