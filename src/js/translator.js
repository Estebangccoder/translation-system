import i18next from 'i18next'
import Backend from "i18next-http-backend"

let Language

if(localStorage.getItem('favoriteLanguage')){
    Language= localStorage.getItem('favoriteLanguage')
}else{
    Language: 'es'
}



// Va al json por la traduccion
i18next.use(Backend).init({
  lng: Language, // if you're using a language detector, do not define the lng option
  debug: false,
  backend:{
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  ns:['translation'],
  defaultNS:'translation'
  
}).then(()=>updateContent())

//Recorre las traducciones
function updateContent() {
    const htmlElements=document.querySelectorAll('[data-i18n]')
    htmlElements.forEach(element=>{
        const value =element.getAttribute('data-i18n')
        element.innerHTML= i18next.t(value)
    })
}

//Llamamos a la funcion que cambia las traducciones

window.cambiarIdioma= function(lng){
    i18next.changeLanguage(lng).then(()=> updateContent())
    localStorage.setItem('favoriteLanguage',lng)
}