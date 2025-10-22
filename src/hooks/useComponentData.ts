import { ComponentData } from '../types';
import { usePageStore } from '../store/usePageStore';
import { getGlobalStyleValue } from '../utils/globalStylesHelper';

export const useComponentData = (component: ComponentData) => {
  const { pageData } = usePageStore();
  const { props, style } = component;

  const globalStyles = {
    mainColor: getGlobalStyleValue(pageData.globalStyles, 'mainColor'),
    mainColorSub: getGlobalStyleValue(pageData.globalStyles, 'mainColorSub'),
    baseColor: getGlobalStyleValue(pageData.globalStyles, 'baseColor'),
    baseColorSub: getGlobalStyleValue(pageData.globalStyles, 'baseColorSub'),
    base2Color: getGlobalStyleValue(pageData.globalStyles, 'base2Color'),
    base2ColorSub: getGlobalStyleValue(pageData.globalStyles, 'base2ColorSub'),
    accentColor: getGlobalStyleValue(pageData.globalStyles, 'accentColor'),
    accentColorSub: getGlobalStyleValue(pageData.globalStyles, 'accentColorSub'),
    commonColor: getGlobalStyleValue(pageData.globalStyles, 'commonColor'),
    commonColorBg: getGlobalStyleValue(pageData.globalStyles, 'commonColorBg'),
  };

  return {
    props,
    style,
    globalStyles,
    pageData,
  };
};
