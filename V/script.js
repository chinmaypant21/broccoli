const dbBtn = document.getElementById('dbshoot')

const shootElement = document.getElementById('shoot')
const debounceElement = document.getElementById('debounce')
const throttleElement = document.getElementById('throttle')

const shootValues = {
    normal: 0,
    debounced: 0,
    throttled: 0
}

function shoot(){
    console.log('shotted')
}

const obj = {
    isWaiting: false,
    timeoutId: null,
    debounce: function(){
        this.timeoutId && clearTimeout(this.timeoutId);
        isWaiting = true;
        
        this.timeoutId = setTimeout(() => {
            if(!isWaiting) return;
            console.log('debounce shoot')
            this.isWaiting = false;
        },1000)
    }
}

function debounce(){
    let isWaiting = false;
    let count = 0;
    var timeoutId;

    return function(){
        count++;
        isWaiting = true;
        timeoutId && clearTimeout(timeoutId);      
        timeoutId = setTimeout(() => {
            if(!isWaiting) return;
            console.log('debounce shoot', count)
            shootValues.debounced += count
            debounceElement.textContent = shootValues.debounced;
            isWaiting = false;
            count = 0;
        },1000)
    }
}

function throttle(){
    let isWaiting = false;
    let count = 0;

    return function(){
        count++;
        if(isWaiting) return;

        isWaiting = true;
        setTimeout(() => {
            if(!isWaiting) return;
            console.log('throttle shoot', count)
            count = 0;
            isWaiting = false;
        }, 1000)
    }
}

const debounceShoot = debounce();

const throttleShoot = throttle();