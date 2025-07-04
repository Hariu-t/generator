// 画像処理ユーティリティ
export interface ImageUploadResult {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
}

export interface ImageStorage {
  [filename: string]: {
    data: string; // base64データ
    originalName: string;
    size: number;
    type: string;
    uploadedAt: string;
  };
}

// 共有画像ストレージのキー
const SHARED_IMAGES_STORAGE_KEY = 'lp-builder-shared-images';

// 画像ストレージの管理
export const getSharedImages = (): ImageStorage => {
  try {
    const stored = localStorage.getItem(SHARED_IMAGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load shared images:', error);
    return {};
  }
};

export const saveSharedImages = (images: ImageStorage): void => {
  try {
    localStorage.setItem(SHARED_IMAGES_STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Failed to save shared images:', error);
  }
};

// ファイル名の生成（重複を避ける）
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 9);
  const extension = originalName.split('.').pop() || 'jpg';
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
  return `${baseName}_${timestamp}_${randomId}.${extension}`;
};

// 画像ファイルの検証
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // ファイルタイプの検証
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'サポートされていないファイル形式です。JPEG、PNG、GIF、WebPファイルのみアップロード可能です。'
    };
  }

  // ファイルサイズの検証（10MB制限）
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'ファイルサイズが大きすぎます。10MB以下のファイルをアップロードしてください。'
    };
  }

  return { isValid: true };
};

// 画像ファイルをBase64に変換
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// 画像のアップロード処理
export const uploadImage = async (file: File): Promise<ImageUploadResult> => {
  // ファイル検証
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    // Base64に変換
    const base64Data = await fileToBase64(file);
    
    // ユニークなファイル名を生成
    const filename = generateUniqueFilename(file.name);
    
    // 既存の画像ストレージを取得
    const existingImages = getSharedImages();
    
    // 新しい画像データを追加
    const newImageData = {
      data: base64Data,
      originalName: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
    
    const updatedImages = {
      ...existingImages,
      [filename]: newImageData
    };
    
    // ストレージに保存
    saveSharedImages(updatedImages);
    
    // 結果を返す（URLはBase64データを直接使用）
    return {
      url: base64Data,
      filename,
      originalName: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('画像のアップロードに失敗しました。');
  }
};

// 画像の削除
export const deleteImage = (filename: string): void => {
  try {
    const existingImages = getSharedImages();
    delete existingImages[filename];
    saveSharedImages(existingImages);
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};

// 全画像の取得
export const getAllImages = (): ImageStorage => {
  return getSharedImages();
};

// 画像URLからファイル名を取得
export const getFilenameFromUrl = (url: string): string | null => {
  if (url.startsWith('data:')) {
    // Base64 URLの場合、ストレージから対応するファイル名を検索
    const images = getSharedImages();
    for (const [filename, imageData] of Object.entries(images)) {
      if (imageData.data === url) {
        return filename;
      }
    }
  }
  return null;
};

// HTML出力用の画像処理
export const prepareImagesForExport = (): { [filename: string]: string } => {
  const images = getSharedImages();
  const exportImages: { [filename: string]: string } = {};
  
  for (const [filename, imageData] of Object.entries(images)) {
    // Base64データからバイナリデータを抽出
    const base64Data = imageData.data.split(',')[1];
    exportImages[filename] = base64Data;
  }
  
  return exportImages;
};