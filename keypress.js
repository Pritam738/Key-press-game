var txt = '';
var set;
var count = 0;
var time = 5000;

document.getElementById('points').innerHTML = 0;

function start() {
    set = setInterval(check, time);
    txt = genrateKey();
    return;
}

function stop() {
    clearInterval(set);
    timer.start();

    reduction = count % 3;
    if (time - (reduction * 100) >= 1500) {
        time = time - (reduction * 100);
        set = setInterval(check, time);
    } else {
        time = 1500;
        set = setInterval(check, time);
    }
}



function terminate() {
    clearInterval(set);
}

function genrateKey() {
    var text = '';
    var possible = "abcdefghijklmnopqrstuvwxyz1234567890";
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    document.getElementById('show').innerHTML = text;
    document.getElementById('result').innerHTML = 'Enter a key';

    txt = text;
    return text;
}


// txt = genrateKey();

var event = function() {
    document.addEventListener("keydown", function(event) {
        validate(event.key);
    });
}
event();


function validate(val) {


    document.getElementById('result').innerHTML = val;
    if (txt === val) {
        count = count + 1;
        console.log(count);
        stop();
        swal({
            title: 'Bravo',
            type: 'success',
            showConfirmButton: false,
            timer: 1000
        });

        setTimeout(genrateKey, 1000);
    } else {
        count = count - 1;

        swal({
            title: 'Error!',
            text: 'Oops! wrong input',
            type: 'error',
            timer: 1000,
            confirmButtonText: 'Cool'
        });

    }
    score();
}

function score() {
    console.log(count);
    document.getElementById('points').innerHTML = count;
}

function check() {
    terminate();
    val = count;
    count = 0;
    swal({
        title: 'Your scour!',
        text: "score: " + val,
        imageUrl: 'a.png',
        background: "#1a1a1a",
        width: 800,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart'
    }).then(function() {
        show();
        start();
    });

    score();

}

// clock
function Timer(element) {
    var self = this;
    this.duration = time;
    this.element = element;
    this.running = false;

    this.els = {
        ticker: document.getElementById('ticker'),
        seconds: document.getElementById('seconds'),
    };



    var hammerHandler = new Hammer(this.element);
    hammerHandler.on('tap', function() {
        if (self.running) {
            self.reset();
        } else {
            self.start();
        }
    })
}

Timer.prototype.start = function() {
    var self = this;
    var start = null;
    this.running = true;
    var remainingSeconds = this.els.seconds.textContent = this.duration / 1000;

    function draw(now) {
        if (!start) start = now;
        var diff = now - start;
        var newSeconds = Math.ceil((self.duration - diff) / 1000);

        if (diff <= self.duration) {
            self.els.ticker.style.height = 100 - (diff / self.duration * 100) + '%';

            if (newSeconds != remainingSeconds) {
                self.els.seconds.textContent = newSeconds;
                remainingSeconds = newSeconds;
            }

            self.frameReq = window.requestAnimationFrame(draw);
        } else {
            //self.running = false;
            self.els.seconds.textContent = 0;
            self.els.ticker.style.height = '0%';
            self.element.classList.add('countdown--ended');
        }
    };

    self.frameReq = window.requestAnimationFrame(draw);
}

var timer = new Timer(document.getElementById('countdown'));
