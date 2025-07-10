import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Users, Pause, Volume2, VolumeX } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import { getGlobalStyleValue } from '../../utils/globalStylesHelper';

interface KVComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const KVComponent: React.FC<KVComponentProps> = ({ component }) => {
  const { pageData } = usePageStore();
  const { 
    headline, 
    description,
    ctaText, 
    ctaUrl, 
    backgroundImage, 
    pattern = 'default', 
    carouselItems = [], 
    cardItems = [], 
    mediaItems = [], 
    title, 
    cast, 
    broadcastInfo, 
    ctaButtons, 
    additionalInfo,
    expandedDescription,
    showMoreText = 'もっと見る',
    showLessText = '閉じる'
  } = component.props;
  
  const { 
    backgroundColor, 
    textColor, 
    headlineColor, 
    descriptionColor, 
    buttonBackgroundColor, 
    buttonTextColor 
  } = component.style || {};

  // 共通スタイルの取得
  const mainColor = getGlobalStyleValue(pageData.globalStyles, 'mainColor');
  const baseColor = getGlobalStyleValue(pageData.globalStyles, 'baseColor');
  const base2Color = getGlobalStyleValue(pageData.globalStyles, 'base2Color');
  const accentColor = getGlobalStyleValue(pageData.globalStyles, 'accentColor');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // デフォルトのカルーセルアイテム
  const defaultCarouselItems = [
    {
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: headline || 'メインタイトル',
      description: description || '説明文がここに入ります',
      category: 'ドラマ',
      status: '最新話配信中',
      tags: ['#感動', '#ヒューマンドラマ']
    },
    {
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'サブタイトル 2',
      description: '2番目のコンテンツの説明',
      category: 'バラエティ',
      status: '毎週更新',
      tags: ['#エンタメ', '#笑い']
    },
    {
      image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'サブタイトル 3',
      description: '3番目のコンテンツの説明',
      category: 'ドキュメンタリー',
      status: '独占配信',
      tags: ['#真実', '#社会派']
    }
  ];

  // デフォルトのカードアイテム
  const defaultCardItems = [
    {
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'コンテンツタイトル 1',
      schedule: '毎週火曜 21:00-22:00',
      genre: 'ドラマ',
      rating: 4,
      reviewCount: 1234,
      cast: '田中太郎、山田花子 他',
      description: '現代社会を舞台にした感動的なヒューマンドラマ。家族の絆と愛をテーマに描かれた心温まる物語です...',
      isNew: true
    },
    {
      image: 'https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'コンテンツタイトル 2',
      schedule: '毎週水曜 22:00-23:00',
      genre: 'バラエティ',
      rating: 5,
      reviewCount: 2567,
      cast: '佐藤次郎、鈴木花子 他',
      description: '笑いあり涙ありの感動バラエティ番組。毎回ゲストを迎えて楽しいトークを繰り広げます...',
      isNew: false
    },
    {
      image: 'https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'コンテンツタイトル 3',
      schedule: '毎週木曜 20:00-21:00',
      genre: 'ドキュメンタリー',
      rating: 4,
      reviewCount: 890,
      cast: '高橋太郎、渡辺花子 他',
      description: '社会問題に鋭く切り込むドキュメンタリー番組。真実を追求する姿勢が評価されています...',
      isNew: true
    }
  ];

  // デフォルトのメディアアイテム（番組ヒーロー用）
  const defaultMediaItems = [
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'メインビジュアル'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/XVVXQsv7o8I',
      alt: '予告編'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'シーン画像'
    }
  ];

  const activeCarouselItems = carouselItems.length > 0 ? carouselItems : defaultCarouselItems;
  const activeCardItems = cardItems.length > 0 ? cardItems : defaultCardItems;
  const activeMediaItems = mediaItems.length > 0 ? mediaItems : defaultMediaItems;

  // YouTube URLを埋め込み形式に変換
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // 既に埋め込み形式の場合はそのまま返す
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // 通常のYouTube URLを埋め込み形式に変換
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    
    return url;
  };

  // カルーセル用の自動スライド
  useEffect(() => {
    if (pattern === 'carousel' && activeCarouselItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % activeCarouselItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [pattern, activeCarouselItems.length]);

  // 番組ヒーロー用の自動スライド
  useEffect(() => {
    if (pattern === 'program-hero' && activeMediaItems.length > 1 && isAutoSliding) {
      const interval = setInterval(() => {
        // 動画が再生中の場合は自動スライドを停止
        if (!isVideoPlaying) {
          setCurrentMediaIndex((prev) => {
            const newIndex = (prev + 1) % activeMediaItems.length;
            return newIndex;
          });
        }
      }, 4000); // 4秒間隔
      return () => clearInterval(interval);
    }
  }, [pattern, activeMediaItems.length, isAutoSliding, isVideoPlaying]);

  // メディアスライド変更時の処理
  const changeMediaSlide = (newIndex: number) => {
    setCurrentMediaIndex(newIndex);
    setIsAutoSliding(true); // 手動変更時は自動スライドを再開
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeCarouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeCarouselItems.length) % activeCarouselItems.length);
  };

  const nextMediaSlide = () => {
    const newIndex = (currentMediaIndex + 1) % activeMediaItems.length;
    changeMediaSlide(newIndex);
  };

  const prevMediaSlide = () => {
    const newIndex = (currentMediaIndex - 1 + activeMediaItems.length) % activeMediaItems.length;
    changeMediaSlide(newIndex);
  };

  const containerStyle = {
    backgroundColor: backgroundColor || baseColor,
    color: textColor || undefined,
  };

  // パターン4: 番組ヒーロー型（新規追加）
  if (pattern === 'program-hero') {
    return (
      <div style={containerStyle} className="py-12 sm:py-16 baseColor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 左側：メディアスライダー */}
            <div className="relative">
              {activeMediaItems && activeMediaItems.length > 0 && (
                <>
                  {/* 現在のメディアアイテムを表示 */}
                  <div style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {activeMediaItems[currentMediaIndex].type === 'video' ? (
                      <iframe
                        src={convertToEmbedUrl(activeMediaItems[currentMediaIndex].url)}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none'
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={activeMediaItems[currentMediaIndex].url}
                        alt={activeMediaItems[currentMediaIndex].alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </div>

                  {/* ナビゲーションボタン */}
                  {activeMediaItems.length > 1 && (
                    <>
                      <button
                        onClick={prevMediaSlide}
                        style={{
                          position: 'absolute',
                          left: '16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={nextMediaSlide}
                        style={{
                          position: 'absolute',
                          right: '16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* ドットインジケーター */}
                  {activeMediaItems.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '8px',
                      zIndex: 10
                    }}>
                      {activeMediaItems.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeMediaSlide(index)}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: index === currentMediaIndex ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)'
                          }}
                          onMouseEnter={(e) => {
                            if (index !== currentMediaIndex) {
                              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (index !== currentMediaIndex) {
                              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                            }
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* メディア数インジケーター */}
                  {activeMediaItems.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {currentMediaIndex + 1} / {activeMediaItems.length}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 右側：番組情報 */}
            <div className="space-y-6">
              {/* タイトル */}
              <div>
                <h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                  style={{ color: headlineColor || textColor || '#333' }}
                  data-component-headline
                >
                  {title || 'ブラックリスト ファイナル・シーズン'}
                </h1>
                
                {/* 放送情報バッジ */}
                {broadcastInfo && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(broadcastInfo.badges || []).map((badge: any, index: number) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-xs font-bold rounded-full mr-2 mb-2"
                        style={{ 
                          backgroundColor: index === 0 ? badge.color : mainColor,
                          color: 'white'
                        }}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 説明文（アコーディオン対応） */}
              <div>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: descriptionColor || textColor || '#666' }}
                  data-component-description
                >
                  {description || '世界で最も危険な犯罪者たちのリストを持つ元政府エージェント、レイモンド・レディントンが、FBIと協力して凶悪犯を追い詰める。'}
                </p>
                
                {/* 展開可能な詳細説明 */}
                {expandedDescription && (
                  <div>
                    {isExpanded && (
                      <p 
                        className="text-lg leading-relaxed mt-4"
                        style={{ color: descriptionColor || textColor || '#666' }}
                      >
                        {expandedDescription}
                      </p>
                    )}
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-sm font-medium hover:underline"
                      style={{ color: accentColor }}
                    >
                      {isExpanded ? showLessText : showMoreText}
                    </button>
                  </div>
                )}
              </div>

              {/* 放送・出演情報 */}
              <div className="space-y-3">
                {broadcastInfo?.schedule && (
                  <div className="flex items-center text-sm" style={{ color: textColor || '#333' }}>
                    <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{broadcastInfo.schedule}</span>
                  </div>
                )}
                
                {broadcastInfo?.duration && (
                  <div className="flex items-center text-sm" style={{ color: textColor || '#333' }}>
                    <Play className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{broadcastInfo.duration}</span>
                  </div>
                )}
                
                {cast && (
                  <div className="flex items-start text-sm" style={{ color: textColor || '#333' }}>
                    <Users className="w-5 h-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
                    <span>{cast}</span>
                  </div>
                )}
              </div>

              {/* CTAボタン */}
              {ctaButtons && ctaButtons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {ctaButtons.map((button: any, index: number) => (
                    <a
                      key={index}
                      href={button.url}
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                        button.type === 'primary'
                          ? 'text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-white border-2 hover:bg-gray-50'
                      }`}
                      style={
                        button.type === 'primary' 
                          ? { 
                              backgroundColor: buttonBackgroundColor || mainColor,
                              color: buttonTextColor || '#ffffff'
                            }
                          : {
                              color: mainColor,
                              borderColor: mainColor
                            }
                      }
                    >
                      {button.type === 'primary' && <Play className="w-5 h-5 mr-2" />}
                      {button.text}
                    </a>
                  ))}
                </div>
              )}

              {/* 追加情報 */}
              {additionalInfo && additionalInfo.length > 0 && (
                <div 
                  className="mt-8 p-6 rounded-lg"
                  style={{
                    backgroundColor: backgroundColor ? 'rgba(255,255,255,0.1)' : base2Color,
                    color: textColor || '#374151'
                  }}
                >
                  <div className="space-y-2">
                    {additionalInfo.map((info: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{info.label}:</span>
                        <span>{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // パターン1: カルーセル・プレゼンテーション（情報整理型）
  if (pattern === 'carousel') {
    return (
      <div style={{ ...containerStyle, minHeight: '100vh', position: 'relative', overflow: 'hidden' }} className="baseColor">
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* カルーセル部分 */}
          <div style={{ flex: '1', position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {activeCarouselItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
                  }} />
                </div>
              ))}
            </div>

            {/* ナビゲーション矢印 */}
            {activeCarouselItems.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <ChevronLeft size={24} color="white" />
                </button>

                <button
                  onClick={nextSlide}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <ChevronRight size={24} color="white" />
                </button>

                {/* ドットインジケーター */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '10px'
                }}>
                  {activeCarouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 情報パネル */}
          <div style={{
            width: '400px',
            backgroundColor: backgroundColor || base2Color,
            backdropFilter: 'blur(20px)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: textColor || '#333'
          }} className="base2Color">
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                backgroundColor: mainColor,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }} className="mainColor">
                {activeCarouselItems[currentSlide].category}
              </span>
              <span style={{
                backgroundColor: accentColor,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '8px'
              }}>
                {activeCarouselItems[currentSlide].status}
              </span>
            </div>

            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px',
              lineHeight: '1.3',
              color: headlineColor || textColor || '#333'
            }}>
              {activeCarouselItems[currentSlide].title}
            </h2>

            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '20px',
              color: descriptionColor || textColor || '#666'
            }}>
              {activeCarouselItems[currentSlide].description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              {activeCarouselItems[currentSlide].tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    backgroundColor: backgroundColor ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
                    color: textColor || '#666',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginRight: '8px',
                    marginBottom: '4px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={ctaUrl}
                style={{
                  backgroundColor: buttonBackgroundColor || mainColor,
                  color: buttonTextColor || 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.3s ease'
                }}
                className="mainColor"
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <Play size={16} />
                {ctaText || '詳しくはこちら'}
              </a>
              <button style={{
                backgroundColor: 'transparent',
                color: textColor || '#666',
                padding: '12px 24px',
                borderRadius: '8px',
                border: `2px solid ${textColor || '#ddd'}`,
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = textColor || '#999';
                e.currentTarget.style.color = textColor || '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = textColor || '#ddd';
                e.currentTarget.style.color = textColor || '#666';
              }}
              >
                お気に入り
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // パターン2: シネマティック・インパクト型
  if (pattern === 'cinematic') {
    return (
      <div style={{
        ...containerStyle,
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `url(${backgroundImage || 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} className="baseColor">
        {/* オーバーレイ */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)'
        }} />

        {/* カテゴリバッジ（左上） */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          backgroundColor: mainColor,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          backdropFilter: 'blur(10px)'
        }} className="mainColor">
          プレミアム
        </div>

        {/* 放送ステータス（右上） */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          backgroundColor: accentColor,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          backdropFilter: 'blur(10px)'
        }}>
          配信中
        </div>

        {/* メインコンテンツ */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 40px'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: headlineColor || 'white',
            marginBottom: '24px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            {headline || 'シネマティック・タイトル'}
          </h1>

          <p style={{
            fontSize: '1.5rem',
            color: descriptionColor || 'rgba(255,255,255,0.9)',
            marginBottom: '40px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.4'
          }}>
            {description || '映画のような迫力ある体験をお届けします'}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <a
              href={ctaUrl}
              style={{
                backgroundColor: buttonBackgroundColor || mainColor,
                color: buttonTextColor || 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255,107,107,0.4)'
              }}
              className="mainColor"
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0.9)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,107,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,107,107,0.4)';
              }}
            >
              <Play size={20} />
              {ctaText || '今すぐ視聴'}
            </a>

            <button style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.3)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            >
              予告編
            </button>
          </div>
        </div>

        {/* 放送日時情報（左下） */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '12px 16px',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <Calendar size={16} />
          <span>毎週金曜 21:00-22:00</span>
        </div>

        {/* 出演者情報（下部中央） */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '12px 16px',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <Users size={16} />
          <span>田中太郎、山田花子、佐藤次郎</span>
        </div>
      </div>
    );
  }

  // パターン3: カード型情報整理型
  if (pattern === 'card') {
    return (
      <div style={{
        ...containerStyle,
        minHeight: '100vh',
        backgroundColor: backgroundColor || baseColor,
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} className="baseColor">
        <div style={{
          maxWidth: '1200px',
          width: '100%'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: headlineColor || textColor || '#333',
              marginBottom: '20px'
            }}>
              {headline || 'おすすめコンテンツ'}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: descriptionColor || (textColor ? `${textColor}CC` : '#666'),
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {description || '厳選されたコンテンツをカード形式で分かりやすく表示'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {activeCardItems.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: base2Color,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="base2Color"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  aspectRatio: '16/9',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {item.isNew && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: mainColor,
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }} className="mainColor">
                      NEW
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    {item.title}
                  </h3>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <Calendar size={16} />
                    <span>{item.schedule}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <span>🎭</span>
                    <span>ジャンル: {item.genre}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          fill={star <= item.rating ? accentColor : 'none'}
                          color={star <= item.rating ? accentColor : '#ddd'}
                        />
                      ))}
                    </div>
                    <span>({item.reviewCount.toLocaleString()}件)</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '8px',
                    marginBottom: '12px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <Users size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>出演: {item.cast}</span>
                  </div>

                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '20px'
                  }}>
                    {item.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      backgroundColor: buttonBackgroundColor || mainColor,
                      color: buttonTextColor || 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    className="mainColor"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'brightness(0.9)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'brightness(1)';
                    }}
                    >
                      予約
                    </button>
                    <button style={{
                      backgroundColor: '#f0f0f0',
                      color: '#666',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    >
                      詳細
                    </button>
                    <button style={{
                      backgroundColor: '#f0f0f0',
                      color: '#666',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    >
                      共有
                    </button>
                    <button style={{
                      backgroundColor: '#f0f0f0',
                      color: buttonBackgroundColor || mainColor,
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    >
                      ♡お気に入り
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <a
              href={ctaUrl}
              style={{
                backgroundColor: buttonBackgroundColor || mainColor,
                color: buttonTextColor || 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              className="mainColor"
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0.9)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {ctaText || 'すべてのコンテンツを見る'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // デフォルト（従来のKV）
  return (
    <div 
      style={{
        ...containerStyle,
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="baseColor"
    >
      {backgroundImage && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }} />
      )}
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          lineHeight: '1.2',
          marginBottom: '24px',
          color: backgroundImage ? 'white' : (headlineColor || textColor || undefined)
        }}>
          {headline}
        </h1>
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          marginBottom: '32px',
          maxWidth: '768px',
          margin: '0 auto 32px',
          color: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : (descriptionColor || (textColor ? `${textColor}CC` : undefined))
        }}>
          {description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href={ctaUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 500,
              textDecoration: 'none',
              backgroundColor: buttonBackgroundColor || mainColor,
              color: buttonTextColor || '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)'
            }}
            className="mainColor"
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(0.9)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default KVComponent;