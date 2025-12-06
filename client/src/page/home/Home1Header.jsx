import React, { useEffect, useRef } from "react";
import Home from "./Home";

const Home1Header = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 800;

    let dots = [];
    const colors = ["#FF6B6B", '#fff', "#FFD93D", "#6BCB77", "#4D96FF", "#B983FF"];

    class Dot {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 10 + 3; // varied size
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dx = (Math.random() - 0.5) * 1.2;
        this.dy = (Math.random() - 0.5) * 1.2;
      }

      move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      dots = [];
      for (let i = 0; i < 30; i++) {
        dots.push(new Dot());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.move();
        dot.draw();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 800;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header style={{ position: "relative", width: "100%", background: 'black', height: "800px", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }}></canvas>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "2rem", fontWeight: "bold" }}>
        Header Animation
        Lorem ipsum doloic nemo eveniet atque alias delectus perferendis deleniti dolorem fuga sapiente tenetur quaerat laboriosam modi velit rem non quisquam illum error nulla, rerum praesentium minima, qui unde? Exercitationem d
      </div>
    </header>
  );
};

export default Home1Header;