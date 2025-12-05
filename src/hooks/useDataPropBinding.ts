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
            if ('url' in propValue) {
              element.href = propValue.url || '';
            }
            if ('text' in propValue) {
              const textValue = (propValue.text ?? '').toString();
              element.innerHTML = textValue.split('\n').map((line, idx, arr) => (
                idx === arr.length - 1 ? line : `${line}<br>`
              )).join('');
            }
            if ('target' in propValue) {
              const targetValue = propValue.target || '_self';
              if (targetValue) {
                element.target = targetValue;
              } else {
                element.removeAttribute('target');
              }
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
                // 文字列の場合：改行を<br>タグに変換して設定
                const textWithBreaks = item.split('\n').map((line, idx, arr) => {
                  if (idx === arr.length - 1) return line;
                  return line + '<br>';
                }).join('');
                clone.innerHTML = textWithBreaks;
              } else if (typeof item === 'object' && item !== null) {
                // オブジェクトの場合
                // <a>タグが含まれているかチェック
                const linkElement = clone.querySelector('a');
                
                if (linkElement && (item.url !== undefined || item.href !== undefined)) {
                  // リンク項目の場合：<a>タグの属性を設定
                  const url = item.url || item.href || '';
                  linkElement.href = url;
                  if (item.target !== undefined) {
                    linkElement.target = item.target;
                  }
                  // リンクテキストを設定（改行も含む）
                  if (item.text !== undefined) {
                    const textWithBreaks = String(item.text).split('\n').map((line, idx, arr) => {
                      if (idx === arr.length - 1) return line;
                      return line + '<br>';
                    }).join('');
                    linkElement.innerHTML = textWithBreaks;
                  }
                } else {
                  // その他のオブジェクト：data-array-field属性を使用
                  Object.keys(item).forEach((key) => {
                    const fieldValue = item[key];
                    const targetElements = clone.querySelectorAll(`[data-array-field="${key}"]`);
                    
                    targetElements.forEach((targetEl) => {
                      if (targetEl instanceof HTMLElement) {
                        // 値の型に応じて処理
                        if (typeof fieldValue === 'string') {
                          // 文字列の場合：改行を<br>タグに変換
                          const textWithBreaks = fieldValue.split('\n').map((line, idx, arr) => {
                            if (idx === arr.length - 1) return line;
                            return line + '<br>';
                          }).join('');
                          targetEl.innerHTML = textWithBreaks;
                        } else if (typeof fieldValue === 'object' && fieldValue !== null) {
                          // オブジェクトの場合（colorBoth等）
                          if (fieldValue.color !== undefined) {
                            targetEl.style.color = fieldValue.color;
                          }
                          if (fieldValue.backgroundColor !== undefined) {
                            targetEl.style.backgroundColor = fieldValue.backgroundColor;
                          }
                        } else {
                          // その他の型
                          targetEl.textContent = String(fieldValue);
                        }
                      }
                    });
                    
                    // data-array-field属性がない場合、直接要素に適用を試みる
                    if (targetElements.length === 0) {
                      // カラー系の値の場合、親要素にスタイルを適用
                      if (typeof fieldValue === 'string' && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(fieldValue)) {
                        // フィールド名から型を推測
                        if (key.includes('color') && !key.includes('background')) {
                          clone.style.color = fieldValue;
                        } else if (key.includes('background') || key.includes('bg')) {
                          clone.style.backgroundColor = fieldValue;
                        }
                      } else if (typeof fieldValue === 'object' && fieldValue !== null) {
                        if (fieldValue.color !== undefined) {
                          clone.style.color = fieldValue.color;
                        }
                        if (fieldValue.backgroundColor !== undefined) {
                          clone.style.backgroundColor = fieldValue.backgroundColor;
                        }
                      } else if (typeof fieldValue === 'string') {
                        // テキストの場合、直接設定
                        const textWithBreaks = fieldValue.split('\n').map((line, idx, arr) => {
                          if (idx === arr.length - 1) return line;
                          return line + '<br>';
                        }).join('');
                        clone.innerHTML = textWithBreaks;
                      }
                    }
                  });
                }
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
