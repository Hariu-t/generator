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

        case 'color':
          if (element instanceof HTMLElement) {
            element.style.color = String(propValue);
          }
          break;

        case 'background-color':
          if (element instanceof HTMLElement) {
            element.style.backgroundColor = String(propValue);
          }
          break;

        case 'color-both':
          if (element instanceof HTMLElement && typeof propValue === 'object') {
            if (propValue.color) {
              element.style.color = propValue.color;
            }
            if (propValue.backgroundColor) {
              element.style.backgroundColor = propValue.backgroundColor;
            }
          }
          break;

        case 'link-full':
          if (element instanceof HTMLAnchorElement && typeof propValue === 'object') {
            if (propValue.url) {
              element.href = propValue.url;
            }
            if (propValue.text) {
              element.textContent = propValue.text;
            }
          }
          break;

        case 'image-full':
          if (element instanceof HTMLImageElement && typeof propValue === 'object') {
            if (propValue.src) {
              element.src = propValue.src;
            }
            if (propValue.alt !== undefined) {
              element.alt = propValue.alt;
            }
          }
          break;

        case 'visibility':
          if (element instanceof HTMLElement) {
            element.style.display = propValue ? '' : 'none';
          }
          break;

        case 'array':
          if (element instanceof HTMLElement && Array.isArray(propValue)) {
            const template = element.children[0];
            if (!template) break;

            element.innerHTML = '';

            propValue.forEach((item) => {
              const clone = template.cloneNode(true) as HTMLElement;

              if (typeof item === 'string') {
                clone.textContent = item;
              } else if (typeof item === 'object') {
                Object.keys(item).forEach((key) => {
                  const targetElements = clone.querySelectorAll(`[data-array-field="${key}"]`);
                  targetElements.forEach((targetEl) => {
                    if (targetEl instanceof HTMLElement) {
                      targetEl.textContent = String(item[key]);
                    }
                  });
                });
              }

              element.appendChild(clone);
            });
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
