// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y + 58;
    this.speed = speed;
    this.step = 101;
    this.resetPoint = -this.step;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
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

// player class
class Actor {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4    ) + 58;
        this.x = this.startX;
        this.y = this.startY;
        this.won = false;
        this.end = 0;
        this.sprite = 'images/char-boy.png';
    }

    // render player to the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // move player
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
    //Update player position
    update() {
        // loop through all enemies, if they collide reset player position
        for (let bug of allEnemies) {
            if (this.y === bug.y && (bug.x + bug.step/2 > this.x && bug.x < this.x + this.step/2) ) {
                this.reset();
            }
        }
        // if player crosses successfully
        if (this.y < this.end) {
            this.won = true;
            console.log(this.y);
            
        }
    }
    // resets the player's position
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}

//  Create empty array to hold all enemies
const allEnemies = [];

// Instantiate enemies
const bug1 = new Enemy(-101, 0, 500);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101 * 4.5), 83, 300);
const bug4 = new Enemy(-101, 166, 250);
// const bug5 = new Enemy((-101 * 3.5), 166, 250);

//Add all enemies to the allEnemies array
allEnemies.push(bug1, bug2, bug3, bug4);

// Instantiate player
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
