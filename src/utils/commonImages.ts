// 共通画像のパス管理
export const COMMON_IMAGE_BASE_PATH = '/program/st/promo/generator_common/img/';

// 共通画像のファイル名定義
export const COMMON_IMAGES = {
  // アプリ関連
  streamingAppLogo: 'streamingApp_logo.svg',
  appStoreButton: 'app_store_button.png',
  googlePlayButton: 'google_play_button.png',
  
  // チャンネル・番組関連
  channelList: 'channel_list.png',
  programThumbnail: 'program_thumbnail.jpg',
  
  // UI要素
  arrowRight: 'arrow_right.svg',
  checkIcon: 'check_icon.svg',
  
  // ロゴ・ブランド
  companyLogo: 'company_logo.svg',
  serviceLogo: 'service_logo.svg',
} as const;

// 共通画像のフルパスを取得する関数
export const getCommonImagePath = (imageName: keyof typeof COMMON_IMAGES): string => {
  return `${COMMON_IMAGE_BASE_PATH}${COMMON_IMAGES[imageName]}`;
};

// 共通画像の存在チェック（オプション）
export const isCommonImage = (imagePath: string): boolean => {
  return imagePath.startsWith(COMMON_IMAGE_BASE_PATH);
};

// 共通画像の一覧を取得
export const getCommonImagesList = (): Array<{name: string, path: string, key: keyof typeof COMMON_IMAGES}> => {
  return Object.entries(COMMON_IMAGES).map(([key, filename]) => ({
    name: filename,
    path: getCommonImagePath(key as keyof typeof COMMON_IMAGES),
    key: key as keyof typeof COMMON_IMAGES
  }));
};