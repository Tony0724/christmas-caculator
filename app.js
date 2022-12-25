// 이 코드는 크리스마스까지 얼마나 남았는지 알려주는 코드 입니다.
const p = document.getElementById("D-day_text")
const h2 = document.querySelector("h2.D-day")
const today = new Date()
const christmas = new Date(today.getFullYear(), 11, 25)

if(today.getMonth == 11 && today.getDate() > 25) {
    christmas.setFullYear(christmas.getFullYear + 1)
}

function diffOFclock() {
    const one_day = 24*60*60*1000
    const Daydiff = Math.ceil((christmas.getTime() - today.getTime()) / (one_day))
    const hoursdiff = 23 - new Date().getHours()
    const minutediff = 59 - new Date().getMinutes()
    const seconddiff = 59 - new Date().getSeconds()
    const hoursLayout = String(hoursdiff).padStart(2, "0")
    const minuteLayout = String(minutediff).padStart(2, "0")
    const secondLayout = String(seconddiff).padStart(2, "0")
    if(Daydiff == 0) {
        h2.innerText = `D-day`
        p.innerText = "메리 크리스마스!!"
    } else {
        h2.innerText = `D-${Daydiff}일 ${hoursLayout}시간:${minuteLayout}분:${secondLayout}초`
    }
}

diffOFclock()
setInterval(diffOFclock, 1000)   

// 이 코드는 todo-list를 구현하는 코드 입니다.
const toDoForm = document.getElementById("todo-form")
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.getElementById("todo_list")

const TODOS_KEY = "todos"

let Todos = []

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(Todos))
}

function deleteTodo(event) {
    const li = event.target.parentElement
    li.remove();
    Todos = Todos.filter(toDo => toDo.id !== parseInt(li.id))
    saveToDos()
}

function paintToDo(newTodo) {
    const li = document.createElement("li")
    li.id = newTodo.id
    const span = document.createElement("span")
    const button = document.createElement("button")
    button.innerText = "❌"
    button.addEventListener("click", deleteTodo)
    li.appendChild(span)
    li.appendChild(button)
    span.innerText = newTodo.text
    toDoList.appendChild(li)
}

function handleToDoSubmit(event) {
    event.preventDefault()
    const newToDo = toDoInput.value
    toDoInput.value = ""
    const newToDoobj = {
        text:newToDo,
        id: Date.now()
    }
    Todos.push(newToDoobj)
    paintToDo(newToDoobj)
    saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit)

function sayHello(item) {
    console.log("this is the turn of", item)
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    Todos = parsedToDos
    parsedToDos.forEach(paintToDo);
}

// 이 코드는 로그인을 위한 코드 입니다. (로컬 스토리즈를 이용하여 한 번만 로그인하게 설정)
const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector("#login-form input")
const greeting = document.querySelector("#greeting")

const HIDDEN_CLASSNAME = "hidden"

function onLoginSubmit(event) {
    event.preventDefault()
    const userName = loginInput.value;
    localStorage.setItem("username", userName)
    loginForm.classList.add(HIDDEN_CLASSNAME)
    paintgreeting(userName)
}

function paintgreeting(userName) {
    greeting.classList.remove(HIDDEN_CLASSNAME)
    greeting.innerText = `Hello ${userName}`;
}

const savedUsername = localStorage.getItem("username");

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", onLoginSubmit)
} else{
    paintgreeting(savedUsername)
}

// 이 코드는 랜덤으로 배경을 보여 주는 코드입니다.
const images = ["0.jpeg","1.jpeg","2.jpeg"]

const chosenImage = images[Math.floor(Math.random() * images.length)]

const bgImage = document.createElement("img")

bgImage.src = `./img/${chosenImage}`

document.body.appendChild(bgImage)

// 이 코드는 weather API를 불러와서 현재 내가 있는 위치의 날씨를 구해오는 코드입니다.
const API_KEY = "26c67ed58f6cd8d8670df2b48a80a200"

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child")
        const city = document.querySelector("#weather span:last-child")
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`
    })
}

function onGeoError() {
    alert("Can't find you! NO weather for you. Sorry")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

// 이 코드는 랜덤한 속담을 불러와서 사용자에게 보여주는 코드입니다.
const quotes = [
    {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
    },
    {
        quote: "War is much too serious a matter to be entrusted to the military.",
        author: "Georges Clemenceau"
    },
    {
        quote: "Look in the mirror. The face that pins you with its double gaze reveals a chastening secret.",
        author: "Diane Frolov"
    },
    {
        quote: "When anger rises, think of the consequences.",
        author: "Confucius"
    },
    {
        quote: "The more alternatives, the more difficult the choice.",
        author: "Abbe' D'Allanival"
    },
    {
        quote: "True life is lived when tiny changes occur.",
        author: "Leo Tolstoy",
    },
    {
        quote: "Some relationships start with fights... But, usually only in romantic comedies. Life's not the movies.",
        author: "Takayuki Ikkaku"
    },
    {
        quote: "The aging process has you firmly in its grasp if you never get the urge to throw a snowball.",
        author: "Doug Larson"
    },
    {
        quote: "The vitality of thought is in adventure. Ideas won't keep. Something must be done about them.",
        author: "Alfred North Whitehead",
    },
    {
        quote: "Anger is a signal, and one worth listening to.",
        author: "Harriet Lerner"
    }
]

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = "- " + todaysQuote.author + " -";
