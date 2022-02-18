// variable
const form = document.querySelector('form'),
      noteList = document.querySelector('#note-list')

// event listener
form.addEventListener('submit',addNote)
noteList.addEventListener('click',removeFun)


// function
loadFromLS()

function addNote(e){
    e.preventDefault()
    showNotif('نوشته با موفقیت ارسال شد','success')
    let note = document.querySelector('#textarea').value
    returnToHTML(note)
    addToLocalStorage(note)

    form.reset()
//
}
//
function showNotif(message,type){
    new Noty({
        type : type,
        text: message,
        layout: 'bottomRight',
        timeout: 2000,
        progressBar: true,
        closeWith: ['click'],
        theme: 'nest'
    }).show();
}
//
function returnToHTML(note){
    const noteList = document.querySelector('#note-list')
    const li = document.createElement('li')
          li.textContent = note
          li.classList.add('li')
          // create remove button 
    const rmButton = document.createElement('a')
          rmButton.textContent = 'X'
          rmButton.classList.add('rm-button')
          li.append(rmButton)
    noteList.append(li)
}

// add to local storage 

function addToLocalStorage(note){
    let list = getFromLocalStorage()
    list.push(note)
    localStorage.setItem('notes',JSON.stringify(list))

}

// get from localStorage
function getFromLocalStorage(){
    let notes,
        ls = localStorage.getItem('notes')
    if(ls === null){
        notes = []
    }else{
        notes = JSON.parse(ls)
    }
    return notes
}
function loadFromLS(){
    let list = getFromLocalStorage()
    list.forEach((item)=>{
        returnToHTML(item)
    })
}


// remove
function removeFun(event){
    if(event.target.classList.contains('rm-button')){
        showNotif('نوشته با موفقیت پاک شد','error')
        event.target.parentElement.remove()
        removeFromLS(event.target.parentElement.textContent)
    }
}
// remove from local storage 
function removeFromLS(item){
    item = item.slice(0,-1)
    let list = getFromLocalStorage()
    let index = list.findIndex(x => x === item)
    list.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(list))
}