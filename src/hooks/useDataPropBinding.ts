import { useEffect, useRef } from 'react';

interface DataPropBindingOptions {
  props: Record<string, any>;
  containerRef?: React.RefObject<HTMLElement>;
}

export const useDataPropBinding = ({ props, containerRef }: DataPropBindingOptions) => {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = containerRef || localRef;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-prop]');

    elements.forEach((element) => {
      const propKey = element.getAttribute('data-prop');
      if (!propKey) return;

      const propValue = props[propKey];

      if (propValue === undefined || propValue === null) return;

      const bindType = element.getAttribute('data-bind-type') || 'text';

      switch (bindType) {
        case 'text':
          if (element instanceof HTMLElement) {
            element.textContent = String(propValue);
          }
          break;

        case 'html':
          if (element instanceof HTMLElement) {
            element.innerHTML = String(propValue);
          }
          break;

        case 'src':
          if (element instanceof HTMLImageElement || element instanceof HTMLIFrameElement) {
            element.src = String(propValue);
          }
          break;

        case 'href':
          if (element instanceof HTMLAnchorElement) {
            element.href = String(propValue);
          }
          break;

        case 'value':
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            element.value = String(propValue);
          }
          break;

        case 'attr':
          const attrName = element.getAttribute('data-attr-name');
          if (attrName && element instanceof HTMLElement) {
            element.setAttribute(attrName, String(propValue));
          }
          break;

        case 'style':
          const styleProp = element.getAttribute('data-style-prop');
          if (styleProp && element instanceof HTMLElement) {
            (element.style as any)[styleProp] = String(propValue);
          }
          break;

        case 'class':
          if (element instanceof HTMLElement && propValue) {
            element.classList.add(String(propValue));
          }
          break;

        case 'show':
          if (element instanceof HTMLElement) {
            element.style.display = propValue ? '' : 'none';
          }
          break;

        case 'hide':
          if (element instanceof HTMLElement) {
            element.style.display = propValue ? 'none' : '';
          }
          break;

        default:
          if (element instanceof HTMLElement) {
            element.textContent = String(propValue);
          }
      }
    });
  }, [props, ref]);

  return ref;
};
