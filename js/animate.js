const canvas = document.getElementById('smokeCanvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particlesArray = [];
        let hue = 0;

        const mouse = {
            x: undefined,
            y: undefined
        };

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            
            
            for (let i = 0; i < 3; i++) {
                particlesArray.push(new Particle());
            }
        });

        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                
                
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -0.4 - 0.1; 
                
                
                this.size = Math.random() * 25 + 15; 
                this.opacity = 0.15;
                this.hueColor = hue;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size += 0.8; 
                this.opacity -= 0.003; 
            }

            draw() {
                ctx.save();
                
                
                let gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,           
                    this.x, this.y, this.size    
                );
                
                
                gradient.addColorStop(0, `hsla(${this.hueColor}, 100%, 60%, ${this.opacity})`);
                
                gradient.addColorStop(0.3, `hsla(${this.hueColor}, 100%, 60%, ${this.opacity * 0.4})`);
                
                gradient.addColorStop(1, `hsla(${this.hueColor}, 100%, 60%, 0)`);
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                ctx.restore();
            }
        }

        function animate() {
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                if (particlesArray[i].opacity <= 0) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
            hue += 1.5;
            requestAnimationFrame(animate);
        }

        animate();