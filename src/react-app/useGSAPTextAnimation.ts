import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type TextAnimationType =
  | 'fadeUp'      // Fade in com movimento para cima
  | 'slideIn'     // Desliza da esquerda
  | 'reveal'      // Revela com máscara
  | 'split'       // Anima cada palavra separadamente
  | 'chars';      // Anima cada caractere separadamente

interface UseGSAPTextAnimationOptions {
  type?: TextAnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean; // Anima apenas uma vez
}

/**
 * Hook para criar animações de texto usando GSAP
 *
 * @example
 * const titleRef = useGSAPTextAnimation({ type: 'split', duration: 1 });
 * <h1 ref={titleRef}>Meu título animado</h1>
 */
export const useGSAPTextAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseGSAPTextAnimationOptions = {}
) => {
  const {
    type = 'fadeUp',
    duration = 1,
    delay = 0,
    stagger = 0.03,
    once = true
  } = options;

  const elementRef = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Se já animou e once é true, não anima novamente
    if (hasAnimated.current && once) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasAnimated.current || !once)) {
            hasAnimated.current = true;
            animateText(element, type, duration, delay, stagger);

            if (once) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [type, duration, delay, stagger, once]);

  return elementRef;
};

/**
 * Função auxiliar para split de texto em palavras
 */
const splitTextIntoWords = (element: HTMLElement): HTMLSpanElement[] => {
  const text = element.textContent || '';
  const words = text.split(' ');

  element.innerHTML = '';

  return words.map((word, index) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre';
    span.textContent = word + (index < words.length - 1 ? ' ' : '');
    element.appendChild(span);
    return span;
  });
};

/**
 * Função auxiliar para split de texto em caracteres
 */
const splitTextIntoChars = (element: HTMLElement): HTMLSpanElement[] => {
  const text = element.textContent || '';
  const chars = text.split('');

  element.innerHTML = '';

  return chars.map((char) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre';
    span.textContent = char;
    element.appendChild(span);
    return span;
  });
};

/**
 * Aplica a animação de acordo com o tipo
 */
const animateText = (
  element: HTMLElement,
  type: TextAnimationType,
  duration: number,
  delay: number,
  stagger: number
) => {
  switch (type) {
    case 'fadeUp':
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out'
        }
      );
      break;

    case 'slideIn':
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -60
        },
        {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out'
        }
      );
      break;

    case 'reveal':
      // Cria um efeito de revelar com clip-path
      gsap.fromTo(
        element,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 1
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: duration * 1.2,
          delay,
          ease: 'power4.inOut'
        }
      );
      break;

    case 'split':
      const words = splitTextIntoWords(element);
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 20,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: 'back.out(1.7)'
        }
      );
      break;

    case 'chars':
      const chars = splitTextIntoChars(element);
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 30,
          scale: 0.5
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: duration * 0.8,
          delay,
          stagger,
          ease: 'elastic.out(1, 0.5)'
        }
      );
      break;

    default:
      break;
  }
};
