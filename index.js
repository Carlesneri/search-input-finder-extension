const COOKIE_NAME = 'searchInputFinder'

window.addEventListener('keydown', function(e){
  if (e.shiftKey && e.ctrlKey && e.key === '?') {
    const searchInputCookie = getCookie(COOKIE_NAME)
    if(!searchInputCookie) {
      alert('domHandlerInput: Click in search input for set the cookie\nType Ctrl + Shift + ! for erase the cookie')
      document.addEventListener('click', handleClickFindSearchInput)
    } else {
      moveToSearchInput()
    }
  }
  
  if (e.shiftKey && e.ctrlKey && e.key === '!') {
    eraseCookie(COOKIE_NAME)
    alert('The domHandlerInput cookie has been erased!\nType Ctrl + Shift + ? for set a new one')
  }
}, false)


function moveToSearchInput() {
  const attributes = getCookie(COOKIE_NAME)
  const inputs = [...document.querySelectorAll('input')]
  const searchInput = inputs.find(input => {
    return encodedElementAttributes(input) === attributes
  })
  searchInput.focus()
}

function handleClickFindSearchInput(e) {  
  if(e.target.tagName === 'INPUT') {
    const attributes = encodedElementAttributes(e.target)
    setCookie(COOKIE_NAME, attributes)
    alert('The domHandlerInput cookie has been setted!\nType Ctrl + Shift + ! for erase the cookie')
    document.removeEventListener('click', handleClickFindSearchInput)
  }
}

function encodedElementAttributes(element) {
  let attributes = [...element.attributes]
  attributes = attributes
  .filter(el => el.name !== 'value')
  .slice(0, 9)
  .map(el => {
    return {[el.name]: el.value}
  })
  return JSON.stringify(btoa(attributes))
}
