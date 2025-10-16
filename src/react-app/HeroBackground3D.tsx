import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
}

function HeroBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuração do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Criar grade de partículas 3D
    const createParticleGrid = () => {
      const particles: Particle[] = [];
      const gridSize = 35; // Tamanho da grade
      const spacing = 40; // Espaçamento entre partículas

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          const baseX = (x - gridSize / 2) * spacing;
          const baseY = (y - gridSize / 2) * spacing;
          const baseZ = Math.sin(x * 0.3) * 50 + Math.cos(y * 0.3) * 50;

          particles.push({
            x: baseX,
            y: baseY,
            z: baseZ,
            baseX,
            baseY,
            baseZ,
            vx: 0,
            vy: 0,
            vz: 0,
          });
        }
      }

      particlesRef.current = particles;
    };

    createParticleGrid();

    // Projeção 3D para 2D
    const project = (x: number, y: number, z: number) => {
      const perspective = 800;
      const scale = perspective / (perspective + z);

      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
        scale,
      };
    };

    // Calcular distância entre duas partículas
    const getDistance = (p1: Particle, p2: Particle) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dz = p1.z - p2.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    // Renderizar
    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.01;

      // Atualizar partículas
      particlesRef.current.forEach((particle) => {
        // Ondulação de base
        const wave = Math.sin(timeRef.current + particle.baseX * 0.01) * 30 +
                     Math.cos(timeRef.current + particle.baseY * 0.01) * 30;

        // Efeito de mouse
        if (mouseRef.current.isActive) {
          const projected = project(particle.x, particle.y, particle.z);
          const dx = mouseRef.current.x - projected.x;
          const dy = mouseRef.current.y - projected.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 100;

            // Empurrar partículas para longe do mouse
            particle.vx += (dx / distance) * force * -0.5;
            particle.vy += (dy / distance) * force * -0.5;
            particle.vz += force * 0.3;
          }
        }

        // Aplicar velocidade
        particle.vx *= 0.92;
        particle.vy *= 0.92;
        particle.vz *= 0.92;

        // Atualizar posição
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Retornar à posição base
        particle.x += (particle.baseX - particle.x) * 0.05;
        particle.y += (particle.baseY - particle.y) * 0.05;
        particle.z += (particle.baseZ + wave - particle.z) * 0.05;
      });

      // Desenhar conexões entre partículas próximas
      const maxConnectionDistance = 80;
      const gridSize = 35;

      particlesRef.current.forEach((particle, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        // Conectar com vizinhos (direita e baixo)
        const neighbors = [
          { row, col: col + 1 }, // Direita
          { row: row + 1, col }, // Baixo
          { row: row + 1, col: col + 1 }, // Diagonal direita-baixo
          { row: row + 1, col: col - 1 }, // Diagonal esquerda-baixo
        ];

        neighbors.forEach(({ row: nRow, col: nCol }) => {
          if (nRow >= gridSize || nCol >= gridSize || nCol < 0) return;

          const neighborIndex = nRow * gridSize + nCol;
          const neighbor = particlesRef.current[neighborIndex];

          if (!neighbor) return;

          const distance = getDistance(particle, neighbor);

          if (distance < maxConnectionDistance) {
            const p1 = project(particle.x, particle.y, particle.z);
            const p2 = project(neighbor.x, neighbor.y, neighbor.z);

            const opacity = (1 - distance / maxConnectionDistance) * 0.3;

            // Gradiente baseado na profundidade
            const avgZ = (particle.z + neighbor.z) / 2;
            const hue = 320 + (avgZ / 100) * 60; // De magenta (320) a rosa (20)

            ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Desenhar partículas
      particlesRef.current.forEach((particle) => {
        const projected = project(particle.x, particle.y, particle.z);

        // Tamanho baseado na profundidade
        const size = 2 * projected.scale;

        // Cor baseada na profundidade
        const hue = 320 + (particle.z / 100) * 60;
        const brightness = 50 + projected.scale * 30;

        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);

        // Glow effect
        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, size * 3
        );
        gradient.addColorStop(0, `hsla(${hue}, 100%, ${brightness}%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, ${brightness}%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, ${brightness}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Núcleo da partícula
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Interação com mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isActive = true;

      // Animação suave do efeito de mouse com GSAP
      gsap.to(mouseRef.current, {
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mouseRef.current, {
        isActive: false,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-background-3d" />;
}

export default HeroBackground3D;
