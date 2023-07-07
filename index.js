let step = "";
let tab = "";
let active = ['main', 0]
mapCoords = []
let allSteps = [
    {
        name: 'Introduction'
    },
    {
        name: 'Step 1 Main'
    },
    {
        name: 'Step 2 Main'
    },
    {
        name: 'Ending'
    }
];
let questTypes = {
    0: 'Main',
    1: 'Shrine',
    2: 'Side'
}
let quests = {
    main: [
        {
            name: 'Save the Princess',
            description: 'A special evening is planned for the princess, adventure awaits!',
            completed: false,
            mapcoords: []
        },
        {
            name: 'The Hero\'s Preparation',
            description: 'An old ghost has given you a task gain four mysterious powers, seek them out to enhance your power',
            completed: false,
        },
    ],
    shrine: [
        {
            name: 'A test of skill',
            description: 'Prove your might as a swordsman',
            completed: false,
        },
        {
            name: 'A test of patience',
            description: 'Solve the labarynth set before you',
            completed: false,
        },
        {
            name: 'A test of creativity',
            description: 'Decorate these items to appease the goddess',
            completed: false,
        },
        {
            name: 'A test of knowledge',
            description: 'Prove your knowledge about ages past',
            completed: false,
        },
    ],
    side: [
        {
            name: 'The royal recipies',
            description: 'You found an old cookbook, and now that you think about it, your health and stamina is pretty low, lets make some food!',
            completed: false,
        },
        {
            name: 'Mining Frenzy',
            description: 'The gorons have always said the rocks are tasty, why not try some for yourself?',
            completed: false,
        },
    ]
}
function intitalize() {
    let getStep = window.localStorage.getItem('slate_step') || '';
    let parsedStep = getStep ? JSON.parse(getStep) : 'Introduction';
    step = parsedStep;
    let allQuestsRaw = window.localStorage.getItem('slate_quests');
    quests = allQuestsRaw ? JSON.parse(allQuestsRaw) : quests;
    setTab('map');
}
function updateStep(name) {
    window.localStorage.setItem('slate_step', name);
    step = name;

}
function updateQuest(type, name, completed) {
    let questIndex = quests[type].findIndex(e => e.name === name);
    quests[type][questIndex].completed = Boolean(completed);
    window.localStorage.setItem('slate_step', JSON.stringify(quests));
    updateLogPage();
}
function setActiveQuest(type, ind) {
    active = [type, parseInt(ind)];
    mapCoords = quests[type][ind].mapcoords;
    updateLogPage();
}
function setTab(t) {
    let leftArrow = document.getElementById('arrow_left');
    let rightArrow = document.getElementById('arrow_right');
    tab = t;
    switch (t) {
        case 'map':
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'none';
            break;
        case 'log':
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'block';
            break;
    }
    updateView();
}
function updateView() {
    console.log('beeeees')
    let view = document.getElementById('view');
    var client = new XMLHttpRequest();
    if (tab === "map") {
        console.log('bees')
        client.open('GET', 'map.html');
        client.onreadystatechange = function () {
            view.innerHTML = client.responseText;
            updateMap();
        }
        client.send();
    } else if (tab === "log") {
        client.open('GET', 'log.html');
        client.onreadystatechange = function () {
            view.innerHTML = client.responseText;
            console.log(view)
            updateLogPage();
        }
        client.send();
    }

}
function updateLogPage() {
    let activeQuest = quests[active[0]][active[1]]
    let description = document.getElementById('description');
    description.innerHTML = activeQuest.description;
    description.innerHTML += `<div class="completebutton" onclick="updateQuest("${active[0]}",${active[1]},true)"><h1>Complete</h1></div>`
    let sidelist = document.getElementById('sideList');
    let mainlist = document.getElementById('mainList');
    let shrinelist = document.getElementById('shrineList');
    shrinetext = '';
    maintext = '';
    sidetext = '';
    quests.main.forEach((val, ind) => {
        if (val.completed) {
            maintext +=`<div class="quest completed" onclick="setActiveQuest('main',${ind})"><p>${val.name}<p></div>`
        } else {
            maintext +=`<div class="quest" onclick="setActiveQuest('main',${ind})"><p>${val.name}<p></div>`
        }
    })
    quests.shrine.forEach((val, ind) => {
        console.log('WHYYYYYY')
        if (val.completed) {
            shrinetext += `<div class="quest completed" onclick="setActiveQuest('shrine',${ind})"><p>${val.name}<p></div>`
        } else {
            shrinetext +=`<div class="quest" onclick="setActiveQuest('shrine',${ind})"><p>${val.name}<p></div>`
        }
    })
    quests.side.forEach((val, ind) => {
        if (val.completed) {
            sidetext += `<div class="quest completed" onclick="setActiveQuest('side',${ind})"><p>${val.name}<p></div>`
        } else {
            sidetext += `<div class="quest" onclick="setActiveQuest('side',${ind})"><p>${val.name}<p></div>`
        }
    })
    mainlist.innerHTML = maintext;
    shrinelist.innerHTML = shrinetext;
    sidelist.innerHTML = sidetext;
    console.log(sidetext,maintext,shrinetext)
}
function updateMap(){
    let view = document.getElementById('view');
    console.log(view)
    let marker = document.getElementById('marker');
    console.log(marker);
    if(mapCoords.length){
        marker.style.top = `${mapCoords[0]}%`;
        marker.style.left= `${mapCoords[1]}%`;
        marker.style.display=auto;
    }else{
        marker.style.display = 'none';
    }

}
intitalize();
