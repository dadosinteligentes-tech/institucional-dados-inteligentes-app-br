import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Hook para criar animações sofisticadas nas tecnologias usando GSAP
 */
export const useTechAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const techLogos = container.querySelectorAll('.tech-logo');
    if (!techLogos.length) return;

    // Observer para detectar quando a seção entra na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateTechLogos(techLogos);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
};

/**
 * Animação de entrada dos logos com efeitos sofisticados
 */
const animateTechLogos = (logos: NodeListOf<Element>) => {
  // Timeline principal
  const tl = gsap.timeline();

  // 1. Animação de entrada inicial (cascata com rotação e escala)
  tl.fromTo(
    logos,
    {
      opacity: 0,
      scale: 0,
      rotation: -180,
      y: 100,
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        from: 'center',
        grid: 'auto',
        ease: 'power2.out',
      },
      ease: 'back.out(1.7)',
    }
  );

  // 2. Animação de "respiração" suave após entrada
  tl.to(
    logos,
    {
      scale: 1.05,
      duration: 1.5,
      stagger: {
        amount: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      },
      ease: 'sine.inOut',
    },
    '+=0.5'
  );

  // Configurar hover effects individuais
  logos.forEach((logo) => {
    setupHoverEffect(logo as HTMLElement);
  });

  // Animação de parallax ao mover o mouse
  setupParallaxEffect(logos);
};

/**
 * Efeito hover sofisticado para cada logo
 */
const setupHoverEffect = (logo: HTMLElement) => {
  const img = logo.querySelector('img');

  logo.addEventListener('mouseenter', () => {
    // Kill animações anteriores para evitar conflito
    gsap.killTweensOf(logo);
    gsap.killTweensOf(img);

    // Criar timeline do hover
    const tl = gsap.timeline();

    // Logo container
    tl.to(logo, {
      scale: 1.3,
      y: -15,
      rotation: 5,
      duration: 0.4,
      ease: 'back.out(2)',
    });

    // Efeito de brilho na imagem
    if (img) {
      tl.to(
        img,
        {
          filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 10px 20px rgba(255, 27, 141, 0.6))',
          duration: 0.4,
          ease: 'power2.out',
        },
        '<'
      );
    }

    // Adicionar classe para efeitos CSS adicionais
    logo.classList.add('tech-logo-active');
  });

  logo.addEventListener('mouseleave', () => {
    gsap.killTweensOf(logo);
    gsap.killTweensOf(img);

    // Retornar ao estado normal
    const tl = gsap.timeline();

    tl.to(logo, {
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });

    if (img) {
      tl.to(
        img,
        {
          filter: 'brightness(1) contrast(1) drop-shadow(0 0 0 rgba(255, 27, 141, 0))',
          duration: 0.5,
          ease: 'power2.out',
        },
        '<'
      );
    }

    logo.classList.remove('tech-logo-active');
  });
};

/**
 * Efeito parallax baseado na posição do mouse
 */
const setupParallaxEffect = (logos: NodeListOf<Element>) => {
  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Animar parallax continuamente
  const animateParallax = () => {
    logos.forEach((logo) => {
      const rect = logo.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;

      // Calcular distância do mouse ao logo
      const deltaX = mouseX - logoX;
      const deltaY = mouseY - logoY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Quanto mais longe, menor o efeito
      const maxDistance = 500;
      const influence = Math.max(0, 1 - distance / maxDistance);

      // Movimento parallax proporcional à distância e posição
      const moveX = (deltaX / window.innerWidth) * 20 * influence;
      const moveY = (deltaY / window.innerHeight) * 20 * influence;

      // Aplicar transformação suave
      gsap.to(logo, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    requestAnimationFrame(animateParallax);
  };

  animateParallax();
};

/**
 * Hook para animar o título da seção de tecnologias
 */
export const useTechTitleAnimation = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateTitle(title);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    observer.observe(title);

    return () => {
      observer.disconnect();
    };
  }, []);

  return titleRef;
};

/**
 * Animação especial para o título
 */
const animateTitle = (title: HTMLElement) => {
  const text = title.textContent || '';
  const chars = text.split('');

  // Substituir texto por spans individuais
  title.innerHTML = '';
  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.whiteSpace = char === ' ' ? 'pre' : 'normal';
    title.appendChild(span);
  });

  const charElements = title.querySelectorAll('span');

  // Animação ondulante dos caracteres
  gsap.fromTo(
    charElements,
    {
      opacity: 0,
      y: 50,
      rotationX: -90,
      scale: 0.5,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 1,
        ease: 'power2.out',
      },
      ease: 'back.out(1.7)',
    }
  );

  // Efeito de brilho contínuo
  gsap.to(charElements, {
    textShadow: '0 0 20px rgba(255, 27, 141, 0.8), 0 0 40px rgba(196, 255, 0, 0.4)',
    duration: 2,
    stagger: {
      amount: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    },
    ease: 'sine.inOut',
  });
};
