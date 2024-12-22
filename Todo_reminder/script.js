var log = console.log;
var addBtn = document.querySelector('#addBtn');
var inPanel = document.querySelector('.inPanel');
var taskPalet = document.querySelector('.taskPalet');
var detailBar = document.querySelector('.detailPart');
var timeSwitch = document.querySelector('#timeSwitch');
var physicalSwitch = document.querySelector('.switch');
var timePanel = document.querySelector('.taskTime');
var taskBar = document.querySelector('.taskBar');
var titleInput = document.querySelector('#taskTitle');
var textArea = document.querySelector('.textarea');
var inTime = document.querySelector('#inTime');
var delBtn, editBtn;
var timer = false;

addBtn.addEventListener('click', click1);
titleInput.addEventListener('input', showDetail);


function click1() {
    taskPalet.classList.add('taskPaletView');
    addBtn.addEventListener('click', click2);
}

function click2() {
    detailBar.classList.remove('detailView');
    taskPalet.classList.remove('taskPaletViewUp');
    taskPalet.classList.remove('taskPaletView');
    saveTask();
    addBtn.removeEventListener('click', click2);
}


function showDetail() {
    detailBar.classList.add('detailView');
    taskPalet.classList.add('taskPaletViewUp');
}


function fnTiming() {
    if (!(timeSwitch.checked)) {
        timePanel.style.height = "130px";
        timer = true;
    } else {
        timePanel.style.height = "43px";
        timer = false;
    }
}

function setTimer() {

    var d = inTime.value
    var e = d * 1000;

    var task = document.querySelectorAll('.task');

    setTimeout(() => {


        task.forEach(val => {
            var b = val.lastElementChild;
            var c = b.lastElementChild;
            var valValue = c.innerText;

            if (valValue.includes(d)) {
                var audio = new Audio('See You Again(PagalWorld.com.se).mp3');
                audio.play();
                val.classList.add('js');
                val.addEventListener('mouseenter', () => {
                    val.style.transition = 'all .5s';
                    val.style.opacity = 0
                    audio.pause();
                    setTimeout(() => {
                        taskBar.removeChild(val);
                    }, 500);
                })
            }
        });
    }, e);
}



function saveTask() {
    //var structure=task.cloneNode(true);

    if (timeSwitch.checked) {
        var a = (inTime.value.length > 0) ? inTime.value + ' sec' : inTime.value + '';

        var timer5 = true;/* timer check */

    } else {
        a = '';
        var timer5 = false;/* timer check */
    }



    var structure = "<div class='task' data=" + timer5 + "><h2 class='title'>" + titleInput.value + "</h2><p class='detail'>" + textArea.value + "</p><div class='btnPanel'><button class='edit'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path d='M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z'/></svg></button><button class='delete'>&Cross;</button><div class='time'>" + a + "</div></div></div></div>"

    taskBar.insertAdjacentHTML("afterbegin", structure);

    if (timeSwitch.checked) {
        setTimer();
    }


    delBtn = document.querySelectorAll('.delete');
    editBtn = document.querySelectorAll('.edit');


    delBtn.forEach((val) => {
        val.addEventListener('click',
            function () {
                deleteTask(val);
            });
    });


    editBtn.forEach(val => {

        editFunction(val);
    });
    window.scrollTo(0, 600);

}


function deleteTask(val) {
    var b1 = val.parentElement;
    var b2 = b1.parentElement;

    var father = val.parentElement;
    var gFather = father.parentElement;

    gFather.classList.add('delete');


    var delNo = 0;

    var delTask = document.querySelectorAll('.task');

    delTask.forEach(sal => {

        if (sal.classList.contains('delete')) {

            taskBar.removeChild(taskBar.children[delNo]);
        }
        delNo++
    });
    /* 
    setTimeout(() => {
       taskBar.removeChild(b2);
    }, 10); */
}

function editFunction(val) {
    val.addEventListener('click', () => {
        deleteTask(val);
        click1();
        showDetail();
        var b3 = val.parentElement;
        var b4 = b3.parentElement; /* task */
        var timer6 = b4.getAttribute('data');

        var title5 = b4.firstElementChild.innerHTML;
        var detail5 = b4.children[1].innerHTML;
        titleInput.value = title5;
        textArea.value = detail5;
        window.scrollTo(0, 100);
    });
}


