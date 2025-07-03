import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Users } from 'lucide-react';
import { ComponentData } from '../../types';

interface KVComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const KVComponent: React.FC<KVComponentProps> = ({ component }) => {
  const { headline, description, ctaText, ctaUrl, backgroundImage, pattern = 'carousel', carouselItems = [], cardItems = [] } = component.props;
  const { 
    backgroundColor, 
    textColor, 
    headlineColor, 
    descriptionColor, 
    buttonBackgroundColor, 
    buttonTextColor 
  } = component.style || {};

  const [currentSlide, setCurrentSlide] = useState(0);

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

  const activeCarouselItems = carouselItems.length > 0 ? carouselItems : defaultCarouselItems;
  const activeCardItems = cardItems.length > 0 ? cardItems : defaultCardItems;

  useEffect(() => {
    if (pattern === 'carousel') {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % activeCarouselItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [pattern, activeCarouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeCarouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeCarouselItems.length) % activeCarouselItems.length);
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  // パターン1: カルーセル・プレゼンテーション（情報整理型）
  if (pattern === 'carousel') {
    return (
      <div style={{ ...containerStyle, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
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
          </div>

          {/* 情報パネル */}
          <div style={{
            width: '400px',
            backgroundColor: backgroundColor || 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: textColor || '#333'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {activeCarouselItems[currentSlide].category}
              </span>
              <span style={{
                backgroundColor: '#4ecdc4',
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
                  backgroundColor: buttonBackgroundColor || '#ff6b6b',
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff5252';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff6b6b';
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
      }}>
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
          backgroundColor: 'rgba(255,107,107,0.9)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          backdropFilter: 'blur(10px)'
        }}>
          プレミアム
        </div>

        {/* 放送ステータス（右上） */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          backgroundColor: 'rgba(76,175,80,0.9)',
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
                backgroundColor: buttonBackgroundColor || '#ff6b6b',
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff5252';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,107,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff6b6b';
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
        backgroundColor: backgroundColor || '#f8f9fa',
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
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
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
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
                          fill={star <= item.rating ? '#ffc107' : 'none'}
                          color={star <= item.rating ? '#ffc107' : '#ddd'}
                        />
                      ))}
                    </div>
                    <span>({item.reviewCount.toLocaleString()}件)</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <Users size={16} />
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
                      backgroundColor: buttonBackgroundColor || '#ff6b6b',
                      color: buttonTextColor || 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff5252';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff6b6b';
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
                      color: buttonBackgroundColor || '#ff6b6b',
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
                backgroundColor: buttonBackgroundColor || '#ff6b6b',
                color: buttonTextColor || 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff5252';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ff6b6b';
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
              backgroundColor: buttonBackgroundColor || '#2563eb',
              color: buttonTextColor || '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#1d4ed8';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#2563eb';
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