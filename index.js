let step = "";
let tab = "";
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
let questTypes={
    0:'Main',
    1: 'Shrine',
    2: 'Side'
}
let quests = {
    main:[
        {
            name: 'Save the Princess',
            description:'A special evening is planned for the princess, adventure awaits!',
            completed: false,
        },
        {
            name: 'The Hero\'s Preparation',
            description:'An old ghost has given you a task gain four mysterious powers, seek them out to enhance your power',
            completed: false,
        },
        {
            name: 'A test of skill',
            description:'A special evening is planned for the princess, adventure awaits!',
            completed: false,
        },
    ],
    side:[

    ]
}
function intitalize(){
    let getStep = window.localStorage.getItem('slate_step') || '';
    let parsedStep = getStep? JSON.parse(getStep):'Introduction';
    step = parsedStep;
    let allQuestsRaw = window.localStorage.getItem('slate_quests');
    quests = allQuestsRaw ? JSON.parse(allQuestsRaw):quests;
    setTab('map');
}
function updateStep(name){
    window.localStorage.setItem('slate_step',name);
    step = name;
}
function updateQuest(type, name, completed){
    let questIndex = quests[type].findIndex(e=>e.name === name);
    quests[type][questIndex].completed = completed;
    window.localStorage.setItem('slate_step',JSON.stringify(quests));
}
function setTab(t){
    let leftArrow = document.getElementById('arrow_left');
    let rightArrow = document.getElementById('arrow_right');
    tab = t;
    switch(t){
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
function updateView(){
    console.log('beeeees')
    let view = document.getElementById('view');
    var client = new XMLHttpRequest();
    if (tab === "map"){
        console.log('bees')
        client.open('GET', 'map.html');
        client.onreadystatechange = function() {
            view.innerHTML = client.responseText;
          }
        client.send();
    }else if (tab === "log"){
        client.open('GET', 'log.html');
        client.onreadystatechange = function() {
            view.innerHTML = client.responseText;
          }
        client.send();
    }
    
}
intitalize();