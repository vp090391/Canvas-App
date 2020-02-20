document.addEventListener('DOMContentLoaded', () => {
    pencil();
    color();
    document.querySelector('.main-instruments-pencil').style.backgroundColor = '#ddf1ff';

});

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyB') {fillBucket()}
    if (e.code === 'KeyP') {pencil()}
    if (e.code === 'KeyC') {chooseColor()}
});

document.addEventListener('mousedown', () => {
    document.querySelector('canvas').style.filter = 'grayscale(0)';
});

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.height = 512;
canvas.width = 512;
let pencilOff = false;
let url;
let request;

function color() {
    ctx.fillStyle = '#7fcc7f';
    // Choose color
    let curentColor = document.getElementById('curentColor');

    //Set current color
    curentColor.addEventListener('change', () => {
        document.getElementById('prevColor').style.backgroundColor = ctx.fillStyle;
        ctx.fillStyle = curentColor.value;
    });

    //Set previus color
    document.getElementById('prevColor').addEventListener('click', () => {
        curentColor.value = rgbToHex(document.getElementById('prevColor').style.backgroundColor);
        if (curentColor.value === '#000000') {curentColor.value = '#7fcc7f'}
        ctx.fillStyle = curentColor.value;
        document.getElementById('prevColor').style.backgroundColor = curentColor.value;
    });

    //Set red color
    document.getElementById('red').addEventListener('click', () => {
        document.getElementById('prevColor').style.backgroundColor = ctx.fillStyle;
        curentColor.value = '#FF0000';
        ctx.fillStyle = curentColor.value;
    });

    //Set blue color
    document.getElementById('blue').addEventListener('click', () => {
        document.getElementById('prevColor').style.backgroundColor = ctx.fillStyle;
        curentColor.value = '#1E90FF';
        ctx.fillStyle = curentColor.value;
    });
}

function pencil() {
    document.querySelector('.main-instruments-fillBucket').style.backgroundColor = '';
    document.querySelector('.main-instruments-chooseColor').style.backgroundColor = '';
    document.querySelector('.main-instruments-pencil').style.backgroundColor = '#ddf1ff';
    document.querySelector('.main-instruments-pencil').addEventListener('mousedown', () => {
        pencilOff = false;
    });

    let isDrawing = false;
    function draw(e) {
        if (!isDrawing) return;
        if (pencilOff) return;
        let x = Math.floor(e.offsetX / 128);
        let y = Math.floor(e.offsetY / 128);
        ctx.fillStyle = document.getElementById('curentColor').value;
        ctx.fillRect(x * 128, y * 128, 128, 128);
    }
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(e);
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
}

function fillBucket() {
    document.querySelector('.main-instruments-fillBucket').style.backgroundColor = '#ddf1ff';
    document.querySelector('.main-instruments-chooseColor').style.backgroundColor = '';
    document.querySelector('.main-instruments-pencil').style.backgroundColor = '';
    pencilOff = true;

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            ctx.fillStyle = document.getElementById('curentColor').value;
            ctx.fillRect(128 * i, 128 * j, 128, 128);
        }
    }
}

function chooseColor() {
    pencilOff = true;
    let chooseColorOff = false;
    document.querySelector('.main-instruments-fillBucket').style.backgroundColor = '';
    document.querySelector('.main-instruments-chooseColor').style.backgroundColor = '#ddf1ff';
    document.querySelector('.main-instruments-pencil').style.backgroundColor = '';

    document.querySelector('.canvas-container').style.cursor = 'crosshair';

    canvas.addEventListener('mousedown', (e) => {
        if (chooseColorOff) return;
        document.getElementById('prevColor').style.backgroundColor =
            document.getElementById('curentColor').value;

        let pixel = ctx.getImageData(e.layerX, e.layerY, 1, 1);
        let data = pixel.data;
        let colorRGB = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';

        document.getElementById('curentColor').value = rgbToHex(colorRGB);
    });

    canvas.addEventListener('mouseup', (e) => {
        document.querySelector('.canvas-container').style.cursor = '';
        chooseColorOff = true;
    });
}

function rgbToHex(colorRGB) {
    if( colorRGB.charAt(0) === 'r') {
        colorRGB = colorRGB.replace('rgb(','').replace(')','').split(',');
        let r = parseInt(colorRGB[0],10).toString(16);
        let g = parseInt(colorRGB[1],10).toString(16);
        let b = parseInt(colorRGB[2],10).toString(16);
        r = r.length === 1 ? '0' + r : r;
        g = g.length === 1 ? '0' + g : g;
        b = b.length === 1 ? '0' + b : b;
        return '#' + r + g + b;
    }
}

function fourByFour(){
    let canvas = document.querySelector('canvas');
    canvas.height = 512;
    canvas.width = 512;
    let ctx = canvas.getContext('2d');
    fetch("https://raw.githubusercontent.com/vp090391/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json")
        .then(response => {
            return response.json()
        })
        .then(json => {
                for (let i = 0; i <= 3; i++) {
                    for (let j = 0; j <= 3; j++) {
                        ctx.fillStyle = '#' + json[j][i];
                        ctx.fillRect(128 * i, 128 * j, 128, 128);
                    }
                }
            }
        );
}

function thirtyByThirty() {
    let canvas = document.querySelector('canvas');
    canvas.height = 512;
    canvas.width = 512;
    let ctx = canvas.getContext('2d');

    fetch("https://raw.githubusercontent.com/vp090391/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json")
        .then(response => {
            return response.json()
        })
        .then(json => {
                for (let i = 0; i <= 31; i++) {
                    for (let j = 0; j <= 31; j++) {
                        let color = json[j][i];
                        color[3] = color[3] / 255;
                        ctx.fillStyle = 'rgba' + '(' + color + ')';
                        ctx.fillRect(16 * i, 16 * j, 16, 16);
                    }
                }
            }
        );
}

function image() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;
    let img = new Image();
    img.src = 'codejam-canvas/image.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height );
    };
}

function loadImage () {
    request = document.getElementById('searchField').value;
    const url = 'https://api.unsplash.com/photos/random?query=' + request + '&client_id=2357d4e96e9d684f22d0ab258f4227c31a07b42ecaeb7aee557f43748eda2cd4';
    fetch(url)
        .then(res => res.json())
        .then(data => data.urls.small )
        .then(link => {
            console.log(link);
            let img = new Image();
            img.src = link;
            img.onload = () => {
                ctx.drawImage(img, (canvas.width - img.width)/2, (canvas.height - img.height)/2, img.width, img.height );};
        });
}

function grayscale() {
    if (request === undefined){alert('Load Image, please')}
    document.querySelector('canvas').style.filter = 'grayscale(1)';
}

