// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y + 58;
    this.speed = speed;
    this.step = 101;
    this.resetPoint = -this.step;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.step * 5) {
        this.x += this.speed * dt;
    } else {
        this.x = this.resetPoint;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Actor {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4    ) + 58;
        this.x = this.startX;
        this.y = this.startY;
        this.won = false;
        this.sprite = 'images/char-boy.png';
    }

    // render to the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // move
    handleInput(input) {
        if (input === 'left') {
            if (this.x > 0) {
                this.x -= this.step;
            }
        } else if (input === 'up') {
            if (this.y > 0) {
                this.y -= this.jump;
            }
        } else if (input === 'right') {
            if (this.x < 404) {
                this.x += this.step;
            }
        } else if(input === 'down') {
            if (this.y < 332) {
                this.y += this.jump;
            }
        }
    }

    update() {
        for (let bug of allEnemies) {
            if (this.y === bug.y && (bug.x + bug.step/2 > this.x && bug.x < this.x + this.step/2) ) {
                this.reset();
            }
        }

        if (this.y === 58) {
            this.won = true;
        }

    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 300);
const enemy3 = new Enemy((-101 * 2.5), 83, 300);

allEnemies.push(enemy1, enemy2, enemy3);

const player = new Actor;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
