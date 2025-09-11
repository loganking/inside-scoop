class Tamagotchi {
    constructor() {
        this.hunger = 100;
        this.happiness = 100;
        this.health = 100;
        this.cleanliness = 100;
        this.age = 0; // in game days
        this.isSick = false;
        this.isSleeping = false;
        this.lastUpdated = Date.now();
        
        // Pet appearance
        this.petType = this.getRandomPetType();
        this.color = this.getRandomColor();
        
        // Animation
        this.animationFrame = 0;
        this.animationSpeed = 10;
        
        // Game loop
        this.gameInterval = null;
    }
    
    getRandomPetType() {
        const types = ['cat', 'dog', 'bird', 'dragon'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    init() {
        this.setupEventListeners();
        this.startGameLoop();
        this.draw();
    }
    
    setupEventListeners() {
        document.getElementById('feed-btn').addEventListener('click', () => this.feed());
        document.getElementById('play-btn').addEventListener('click', () => this.play());
        document.getElementById('clean-btn').addEventListener('click', () => this.clean());
        document.getElementById('heal-btn').addEventListener('click', () => this.heal());
    }
    
    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.update();
            this.draw();
        }, 1000);
    }
    
    update() {
        const now = Date.now();
        const elapsedSeconds = (now - this.lastUpdated) / 1000;
        this.lastUpdated = now;
        
        // Natural decay over time
        this.hunger = Math.max(0, this.hunger - 0.5 * elapsedSeconds);
        this.happiness = Math.max(0, this.happiness - 0.3 * elapsedSeconds);
        this.cleanliness = Math.max(0, this.cleanliness - 0.2 * elapsedSeconds);
        
        // Health deteriorates if other stats are low
        if (this.hunger < 20 || this.happiness < 20 || this.cleanliness < 20) {
            this.health = Math.max(0, this.health - 0.8 * elapsedSeconds);
            this.isSick = true;
        } else {
            this.health = Math.min(100, this.health + 0.1 * elapsedSeconds);
            this.isSick = false;
        }
        
        // Age increases slowly
        this.age += 0.01 * elapsedSeconds;
        
        // Update animation
        this.animationFrame = (this.animationFrame + 1) % (this.animationSpeed * 4);
        
        // Update UI
        this.updateUI();
    }
    
    updateUI() {
        document.getElementById('hunger-value').textContent = Math.floor(this.hunger);
        document.getElementById('happiness-value').textContent = Math.floor(this.happiness);
        document.getElementById('health-value').textContent = Math.floor(this.health);
    }
    
    feed() {
        this.hunger = Math.min(100, this.hunger + 20);
        this.happiness = Math.min(100, this.happiness + 5);
        this.cleanliness = Math.max(0, this.cleanliness - 5);
    }
    
    play() {
        if (this.isSleeping) {
            this.isSleeping = false;
            return;
        }
        
        this.happiness = Math.min(100, this.happiness + 15);
        this.hunger = Math.max(0, this.hunger - 10);
    }
    
    clean() {
        this.cleanliness = 100;
        this.happiness = Math.min(100, this.happiness + 10);
    }
    
    heal() {
        if (this.isSick) {
            this.health = Math.min(100, this.health + 30);
            this.isSick = false;
        }
    }
    
    draw() {
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw background elements
        this.drawBackground(ctx);
        
        // Draw pet
        this.drawPet(ctx);
        
        // Draw status indicators
        this.drawStatus(ctx);
    }
    
    drawBackground(ctx) {
        // Draw simple background elements
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(0, 250, 300, 50); // Ground
        
        // Draw some pixelated grass
        ctx.fillStyle = '#27ae60';
        for (let i = 0; i < 300; i += 10) {
            ctx.fillRect(i, 240, 5, 10);
        }
    }
    
    drawPet(ctx) {
        const x = 150;
        const y = 150 + Math.sin(this.animationFrame / this.animationSpeed) * 5;
        
        // Draw body
        ctx.fillStyle = this.color;
        
        if (this.petType === 'cat') {
            // Cat body
            ctx.fillRect(x - 20, y - 10, 40, 30); // Body
            ctx.fillRect(x - 25, y - 20, 15, 15); // Head
            ctx.fillRect(x - 30, y - 25, 5, 10);  // Ear left
            ctx.fillRect(x - 10, y - 25, 5, 10);  // Ear right
            ctx.fillRect(x + 10, y - 5, 20, 5);   // Tail
        } else if (this.petType === 'dog') {
            // Dog body
            ctx.fillRect(x - 25, y - 15, 50, 30); // Body
            ctx.fillRect(x - 30, y - 25, 20, 20); // Head
            ctx.fillRect(x - 35, y - 20, 5, 10);  // Ear left
            ctx.fillRect(x - 15, y - 20, 5, 10);  // Ear right
            ctx.fillRect(x + 20, y - 5, 25, 5);   // Tail
        } else if (this.petType === 'bird') {
            // Bird body
            ctx.fillRect(x - 15, y - 10, 30, 20); // Body
            ctx.fillRect(x - 20, y - 15, 15, 15); // Head
            ctx.fillRect(x - 25, y - 20, 10, 5);  // Beak
            ctx.fillRect(x - 10, y - 25, 5, 15);  // Wing
        } else {
            // Dragon body
            ctx.fillRect(x - 20, y - 15, 40, 30); // Body
            ctx.fillRect(x - 25, y - 20, 20, 20); // Head
            ctx.fillRect(x - 15, y - 30, 5, 15);  // Horn
            ctx.fillRect(x + 15, y - 20, 20, 5);  // Tail
            ctx.fillRect(x + 25, y - 25, 5, 10);  // Tail tip
        }
        
        // Draw eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(x - 15, y - 15, 5, 5);
        ctx.fillRect(x - 5, y - 15, 5, 5);
        
        // Draw mouth based on mood
        if (this.happiness > 70) {
            // Happy smile
            ctx.beginPath();
            ctx.arc(x - 10, y - 5, 5, 0, Math.PI);
            ctx.stroke();
        } else if (this.happiness > 30) {
            // Neutral
            ctx.fillRect(x - 15, y - 5, 15, 2);
        } else {
            // Sad
            ctx.beginPath();
            ctx.arc(x - 10, y, 5, Math.PI, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw sickness indicator
        if (this.isSick) {
            ctx.fillStyle = 'red';
            ctx.fillRect(x + 10, y - 25, 8, 8);
        }
    }
    
    drawStatus(ctx) {
        // Draw hunger bar
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(10, 10, 102, 12);
        ctx.fillStyle = this.hunger > 30 ? '#27ae60' : '#e74c3c';
        ctx.fillRect(11, 11, this.hunger, 10);
        
        // Draw happiness bar
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(10, 30, 102, 12);
        ctx.fillStyle = this.happiness > 30 ? '#f1c40f' : '#e74c3c';
        ctx.fillRect(11, 31, this.happiness, 10);
        
        // Draw health bar
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(10, 50, 102, 12);
        ctx.fillStyle = this.health > 30 ? '#3498db' : '#e74c3c';
        ctx.fillRect(11, 51, this.health, 10);
        
        // Draw age
        ctx.fillStyle = 'black';
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText(`AGE: ${Math.floor(this.age)}`, 180, 20);
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    const tamagotchi = new Tamagotchi();
    tamagotchi.init();
});
