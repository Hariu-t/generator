import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, Users } from 'lucide-react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface KVComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const KVComponent: React.FC<KVComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  const {
    mediaItems = [],
    title,
    description,
    cast,
    broadcastInfo,
    ctaButtons,
    additionalInfo,
    expandedDescription,
    showMoreText = 'もっと見る',
    showLessText = '閉じる',
    channelInfo,
  } = props;

  const { mainColor, baseColor, base2Color, accentColor } = globalStyles;

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // デフォルトのメディアアイテム（番組ヒーロー用）
  const defaultMediaItems = [
    {
      type: 'image',
      url: '/program/st/promo/generator_common/img/program01.jpg',
      alt: 'メインビジュアル'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/XVVXQsv7o8I?rel=0&enablejsapi=1',
      alt: '予告編'
    },
    {
      type: 'image',
      url: '/program/st/promo/generator_common/img/program02.jpg',
      alt: 'シーン画像'
    }
  ];

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
      return `https://www.youtube.com/embed/$${videoIdMatch[1]}`;
    }
    return url;
  };

  // 番組ヒーロー用の自動スライド
  useEffect(() => {
    if (activeMediaItems.length > 1 && isAutoSliding) {
      const interval = setInterval(() => {
        // 動画が再生中の場合は自動スライドを停止
        if (!isVideoPlaying) {
          setCurrentMediaIndex((prev) => {
            const newIndex = (prev + 1) % activeMediaItems.length;
            return newIndex;
          });
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [activeMediaItems.length, isAutoSliding, isVideoPlaying]);

  // メディアスライド変更時の処理
  const changeMediaSlide = (newIndex: number) => {
    setCurrentMediaIndex(newIndex);
    setIsAutoSliding(true); // 手動変更時は自動スライドを再開
  };

  const nextMediaSlide = () => {
    const newIndex = (currentMediaIndex + 1) % activeMediaItems.length;
    changeMediaSlide(newIndex);
  };

  const prevMediaSlide = () => {
    const newIndex = (currentMediaIndex - 1 + activeMediaItems.length) % activeMediaItems.length;
    changeMediaSlide(newIndex);
  };


  // パターン4: 番組ヒーロー型
  return (
    <section ref={containerRef} id='kvArea' className="base-pattern-1">
      <div className="mainInfo">
        <div className="flexWrapper">

          {/* 左側：番組情報 */}
          <div className="textInfo">
            {/* タイトル */}
            <h2 data-component-headline>
              {title || 'ブラックリスト ファイナル・シーズン'}
            </h2>

            {/* 放送情報バッジ */}
            {broadcastInfo && (
              <div className="flagWrapper">
                {/* 1. 配信バッジ (特別扱い) */}
                {broadcastInfo.streamingBadgeText && (
                  <p className="flag flag_streaming">
                    {broadcastInfo.streamingBadgeText}
                  </p>
                )}
                {/* 2. 追加バッジ (従来通り) */}
                {(broadcastInfo.badges || []).map((badge: any, index: number) => (
                  <p key={index} className="flag main-pattern-1">
                    {badge.text}
                  </p>
                ))}
              </div>
            )}

            {/* スケジュール */}
            <p className="schedule">
              <span dangerouslySetInnerHTML={{ __html: broadcastInfo.schedule }} />
            </p>
            <div className="icon icon1">
              <div className="iconInfo">
                  <p className="chNumber">{channelInfo?.number || 'CS310'}</p>
                  <p className="chName">{channelInfo?.name || 'スーパー！ドラマＴＶ　＃海外ドラマ☆エンタメ'}</p>
              </div>
            </div>
            <div className="icon icon2">
              <div className="iconImg"><img src="/program/st/promo/generator_common/img/kihon_logo.gif" alt="基本プラン" className="guard"/></div>
              <div className="iconInfo">
                  <p className="chExplain">スカパー！基本プランでもご視聴いただけます。</p>
                  <p><a href="#priceInfo2" className="borderBottom js-scroll">詳しくはこちら</a></p>
              </div>
            </div>
            <div className="streamingBox streamingBox01">
              <div className="streamingItem img"><img src="/program/st/promo/generator_common/img/skppi_logo.svg" alt="スカッピー"/></div>
              <div className="streamingItem text">
                  <p className="streamingText weightM">この番組は<span><img src="/program/st/promo/generator_common/img/streamingText.svg" alt="スカパー！番組配信"/></span>でも<br className="sp"/>ご視聴いただけます。</p>
                  <p className="streamingText weightS">
                      ●{channelInfo?.name || 'スーパー！ドラマＴＶ　＃海外ドラマ☆エンタメ'}チャンネルをご契約の方（パック・セット等含む）は、追加料金なしでご視聴いただけます。
                  </p>
                  <p className="streamingText fontM">スカパー！番組配信のご視聴方法は<a href="#streamingArea" className="borderBottom">こちら</a></p>
              </div>
            </div>
          </div>

          {/* 右側：メディアスライダー */}
          <div className="movieInfo movieInfo_single">
            {activeMediaItems && activeMediaItems.length > 0 && (
              <>
                {/* 現在のメディアアイテムを表示 */}
                <div id='kvSlider'>
                  {activeMediaItems[currentMediaIndex].type === 'video' ? (
                    <iframe id="player" width="440" height="329"
                      src={convertToEmbedUrl(activeMediaItems[currentMediaIndex].url)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <p className='img'>
                      <img
                      className='guard'
                        src={activeMediaItems[currentMediaIndex].url}
                        alt={activeMediaItems[currentMediaIndex].alt}
                      />
                    </p>
                  )}
                </div>

                {/* ナビゲーションボタン */}
                {activeMediaItems.length > 1 && (
                  <>
                    <button
                      onClick={prevMediaSlide}
                      style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background:'none',
                        zIndex: '10',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <span className='arrow arrow-prev'
                        style={{
                          display: 'block',
                          width: '30px',
                          height: '30px',
                          transform: 'rotate(-45deg)',
                        }}
                      ></span>
                    </button>

                    <button
                      onClick={nextMediaSlide}
                      style={{
                        position: 'absolute',
                        right: '-30px',
                        top: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background:'none',
                        zIndex: '10',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <span className='arrow arrow-next' 
                        style={{
                          display: 'block',
                          width: '30px',
                          height: '30px',
                          transform: 'rotate(45deg)',
                        }}
                      ></span>
                    </button>
                  </>
                )}

                {/* ドットインジケーター */}
                {activeMediaItems.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '12px',
                    zIndex: 10
                  }}>
                    {activeMediaItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => changeMediaSlide(index)}
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: index === currentMediaIndex ? 'var(--main-color)' : 'var(--common-color)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (index !== currentMediaIndex) {
                            e.currentTarget.style.opacity = '0.7';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (index !== currentMediaIndex) {
                            e.currentTarget.style.opacity = '1';
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
        </div>
      </div>

      <div className='addInfo base2-pattern-1'>
        {/* 説明文（アコーディオン対応） */}
        <div className='inner'>
          <p
            className="description">
            {description || '世界で最も危険な犯罪者たちのリストを持つ元政府エージェント、レイモンド・レディントンが、FBIと協力して凶悪犯を追い詰める。'}
          </p>

          {/* 展開可能な詳細説明 */}
          {expandedDescription && (
            <div>
              <p className={`description description_add ${isExpanded ? 'show' : ''}`}>
                {expandedDescription}
              </p>
              <button
                id='showDesc'
                onClick={() => setIsExpanded(!isExpanded)}
                className={`borderBottom ${isExpanded ? 'active' : ''}`}
              >
                {isExpanded ? showLessText : showMoreText}
              </button>
            </div>
          )}
        </div>
      </div>


      <style>
        {`
          @media (min-width: 769px) {
            #kvArea .flexWrapper {
              display: flex;
              justify-content: space-between;
              gap: 40px;
              max-width: 1160px;
              width: 100%;
              margin: 0 auto;
              padding: 60px 0 50px 0;
            }
            #kvArea .flexWrapper .textInfo {
              max-width: 580px;
            }
            #kvArea .textInfo h2 {
              font-size: 48px;
              font-weight: bold;
              line-height: 1.5;
              margin:  0 0 35px;
            }
            #kvArea .textInfo .flagWrapper {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              gap: 10px;
              margin: 0 0 30px;
            }
            #kvArea .textInfo .flag {
              background: #C3000F;
              font-size: 12px;
              line-height: 1.8;
              font-weight: bold;
              padding: 0 12px;
              display: flex;
              max-width: max-content;
              min-height: 25px;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
            }
            #kvArea .textInfo .flag.flag_streaming {
              color: #000;
              background: #fff;
              border: 1px solid #000;
            }
            #kvArea .textInfo .schedule {
              font-size: 22px;
              line-height: 1.8;
              font-weight: 500;
              margin: 0 0 21px;
            }
            #kvArea .textInfo .icon {
              display: flex;
            }
            #kvArea .streamingBox {
              margin-top: 30px;
            }
            #kvArea .streamingIcon {
              margin: 28px 0 0;
            }
            #kvArea .textInfo .icon .iconImg {
              margin-right: 20px;
            }
            #kvArea .textInfo .iconImg img {
              max-width: 60px;
              width: 100%;
              height: auto;
            }
            #kvArea .textInfo .icon .iconInfo .chName {
              font-size: 15px;
              line-height: 1.8;
              font-weight: 500;
              margin: 0;
            }
            #kvArea .textInfo .icon .iconInfo .chNumber {
              font-size: 14px;
              line-height: 1.5;
              font-weight: 500;
              margin: 0 0 2px;
            }
            #kvArea .textInfo .icon2 .iconInfo .chExplain {
              font-size: 14px;
              line-height: 1.5;
              font-weight: 500;
              margin: 0 0 2px;
            }
            #kvArea .textInfo .icon2 .iconInfo a {
              position: relative;
              font-size: 15px;
              line-height: 1.8;
            }
            #kvArea .textInfo .icon2 .iconInfo a::after {
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 15px;
              height: 8px;
              position: absolute;
              right: -31px;
              top: 0;
              bottom: 0;
              margin: auto;
            }

            #kvArea .addInfo {
              background: #1B1B1B;
              padding: 40px 0;
            }
            #kvArea .addInfo .inner {
              max-width: 1160px;
              width: 100%;
              margin: 0 auto;
            }
            #kvArea .addInfo .description {
              font-size: 16px;
              line-height: 1.8;
            }
            #programArea .description .more{
              display: inline-block;
            }

            #kvArea .streamingInfo {
              padding: 40px 0 0;
            }
            #kvArea .streamingInfo .inner {
              max-width: 1160px;
              width: 100%;
              margin: 0 auto;
            }
            #kvArea .streamingInfo ul li {
              font-size: 16px;
              line-height: 1.8;
            }
            #kvArea .streamingInfo ul li:not(:last-child) {
              margin: 0 0 30px;
            }
            #kvArea .streamingInfo ul li a.anchorLink {
              position: relative;
            }
            #kvArea .streamingInfo ul li a.anchorLink::after {
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 15px;
              height: 8px;
              position: absolute;
              right: -31px;
              top: 0;
              bottom: 0;
              margin: auto;
            }

            #kvArea #kvSlider p.img{
              max-width: 440px;
              width: 100%;
              height: 329px;
              margin: 0 auto;
              background: #000;
              border: 1px solid #777;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            #kvArea #kvSlider p.img img.guard{
              max-height: 329px;
            }
            #kvArea .movieInfo {
              max-width: 540px;
              width: 100%;
              height: auto;
              margin: 0 auto;
            }
            #kvArea .movieInfo iframe {
              width: 100%;
            }
            #kvArea .movieInfo.movieInfo_single{
              max-width: 440px;
              width: 100%;
              height: max-content;
              margin: 0 auto;
              position: relative;
            }
            #kvArea .arrow{
              display: block;
              width: 30px;
              height: 30px;
              transform: rotate(-45deg);
            }
            #kvArea .arrow.arrow-prev{
              border-top: 3px solid var(--base-color-sub) !important;
              border-left: 3px solid var(--base-color-sub) !important;
            }
            #kvArea .arrow.arrow-next{
              border-top: 3px solid var(--base-color-sub) !important;
              border-right: 3px solid var(--base-color-sub) !important;
            }

            .streamingBox {
              display: flex;
              justify-content: flex-start;
            }
            .streamingItem:not(:last-child) {
              margin-right: 22px;
            }
            .streamingItem .streamingText {
              font-size: 14px;
              font-weight: 400;
              line-height: 1.5;
            }
            .streamingItem .streamingText a{
              position: relative;
            }
            .streamingItem .streamingText a::after{
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 15px;
              height: 8px;
              position: absolute;
              right: -25px;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .streamingItem .streamingText:not(:last-child) {
              margin-bottom: 10px;
            }
            .streamingItem .streamingText.weightM {
              font-weight: 500;
              display: flex;
            }
            .streamingItem .streamingText.weightM span{
              padding: 0 5px;
              display: inline-flex;
            }
            .streamingItem .streamingText.weightS {
              line-height: 1.8;
            }
            .streamingItem .streamingText.fontM {
              font-size: 15px;
              line-height: 1.8;
            }

            .streamingIcon a{
              display: flex;
              align-items: center;
              justify-content: center;
              max-width: 360px;
              width: 100%;
              min-height: 72px;
              font-size: 18px;
              line-height: 1.5;
              font-weight: 500;
              position: relative;
              text-align: center;
              border: 2px solid #000;
              border-radius: 36px;
              color: #000;
              background: #fff;
            }
            .streamingIcon a::before {
              content: "";
                background-image: url(/program/st/promo/generator_common/img/streamingIcon.png);
                background-repeat: no-repeat;
                background-size: 100%;
                display: inline-block;
                width: 32px;
                height: 32px;
                position: absolute;
                left: 25px;
                top: 0;
                bottom: 0;
                margin: auto;
            }


            #showDesc {
              font-size: 15px;
              line-height: 1.8;
              color: #0099ff;
              cursor: pointer;
              display: table;
              position: relative;
              background: none;
              border-radius: 0;
            }
            #showDesc:hover {
              opacity: .5;
            }
            #showDesc::before {
              content: "";
              width: 13px;
              height: 1px;
              background: #0099ff;
              position: absolute;
              top: 50%;
              right: -31px;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              z-index: 1;
            }
            #showDesc::after {
              content: "";
              width: 13px;
              height: 1px;
              background: #0099ff;
              position: absolute;
              top: 50%;
              right: -31px;
              -webkit-transform: translate(-50%, -50%) rotate(-90deg);
              -ms-transform: translate(-50%, -50%) rotate(-90deg);
              transform: translate(-50%, -50%) rotate(-90deg);
              transition: all .3s;
              z-index: 1;
            }
            #showDesc.active::after {
              -webkit-transform: translate(-50%, -50%) rotate(0deg);
              -ms-transform: translate(-50%, -50%) rotate(0deg);
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }


          @media (max-width: 1000px) {
            #kvArea .flexWrapper {
              flex-direction: column-reverse;
            }
            #kvArea .flexWrapper .movieInfo {
              text-align: center;
            }
            #kvArea .flexWrapper .movieInfo span {
              display: block;
              text-align: left;
            }
          }


          @media (max-width: 768px) {
            #kvArea .flexWrapper {
              display: flex;
              flex-direction: column-reverse;
              width: 100%;
              margin: 0 auto;
              padding: 10.66vw 5.33vw;
            }
            #kvArea .movieInfo span {
              display: block;
              text-align: left;
            }
            #kvArea .movieInfo iframe {
              width: 89.33vw;
              height: 67.06vw;
              margin: 0 auto;
            }
            #kvArea .movieInfo.movieInfo_single{
              max-width: 89.33vw;
              width: 100%;
              margin: 0 auto;
            }
            #kvArea .textInfo h2 {
              font-size: 7.46vw;
              font-weight: bold;
              line-height: 1.5;
              margin: 8vw 0;
            }
            #kvArea .textInfo .flagWrapper {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              gap: 1.33vw;
              margin: 0 0 5.33vw;
            }
            #kvArea .textInfo .flag {
              background: #C3000F;
              font-size: 3.2vw;
              line-height: inherit;
              font-weight: bold;
              display: flex;
              max-width: max-content;
              width: 100%;
              min-height: 6.8vw;
              align-items: center;
              justify-content: center;
              padding: 1.06vw 3.2vw;
              border-radius: 0.8vw;
            }
            #kvArea .textInfo .flag.flag_streaming {
              color: #000;
              background: #fff;
              border: 1px solid #000;
            }
            #kvArea .textInfo .schedule {
              font-size: 4.8vw;
              line-height: 1.8;
              margin: 0 0 5.33vw;
            }
            #kvArea .textInfo .icon {
              display: flex;
            }
            #kvArea .streamingBox {
              margin-top: 6.66vw;
            }
            #kvArea .streamingIcon {
              margin: 8vw 0 0;
            }
            #kvArea .textInfo .icon .iconImg {
              margin-right: 4vw;
            }
            #kvArea .textInfo .iconImg img {
              max-width: 13.33vw;
              width: 100%;
              height: auto;
            }
            #kvArea .textInfo .icon .iconInfo .chName {
              font-size: 3.73vw;
              line-height: 1.8;
              font-weight: 500;
              margin: 0;
            }
            #kvArea .textInfo .icon .iconInfo .chNumber {
              font-size: 3.46vw;
              line-height: 1.5;
              font-weight: 500;
              margin: 0 0 2.66vw;
            }
            #kvArea .textInfo .icon2 .iconInfo .chExplain {
              font-size: 3.46vw;
              line-height: 1.8;
              font-weight: 500;
              margin: 0 0 2.66vw;
            }
            #kvArea .textInfo .icon2 .iconInfo a {
              position: relative;
              font-size: 3.73vw;
              line-height: 1;
            }
            #kvArea .textInfo .icon2 .iconInfo a::after {
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 3.73vw;
              height: 2vw;
              position: absolute;
              right: -8.66vw;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .streamingBox {
              display: flex;
              justify-content: flex-start;
            }
            .streamingItem:not(:last-child) {
              margin-right: 5.01vw;
            }
            .streamingItem .streamingText {
              font-size: 3.46vw;
              font-weight: 400;
              line-height: 1.8;
            }
            .streamingItem .streamingText a{
              position: relative;
            }
            .streamingItem .streamingText a::after{
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 3.73vw;
              height: 2vw;
              position: absolute;
              right: -5vw;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .streamingItem .streamingText:not(:last-child){
              margin-bottom: 2.66vw;
            }
            .streamingItem .streamingText.weightM {
              font-weight: 500;
            }
            .streamingItem .streamingText.weightM span {
              padding: 0 1.06vw;
              display: inline-grid;
              vertical-align: sub;
            }
            .streamingItem .streamingText.weightM span img {
              width: 36.53vw;
              height: auto;
            }
            .streamingItem .streamingText.weightS {
              line-height: 1.8;
            }
            .streamingItem .streamingText.fontM {
              font-size: 3.73vw;
              line-height: 1.8;
            }
            .streamingItem.text{
              max-width: 72vw;
            }

            #kvArea .streamingIcon {
              margin: 8vw 0 0;
            }

            #kvArea .addInfo {
              background: #1B1B1B;
              padding: 8vw 0;
            }
            #kvArea .addInfo .inner {
              padding: 0 5.33vw;
            }
            #kvArea .addInfo .description {
              font-size: 4vw;
              line-height: 1.8;
            }

            #kvArea .streamingInfo {
              padding: 10.66vw 0 0;
            }
            #kvArea .streamingInfo .inner {
              padding: 0 5.33vw;
            }
            #kvArea .streamingInfo ul li {
              font-size: 4vw;
              line-height: 1.8;
            }
            #kvArea .streamingInfo ul li:not(:last-child) {
              margin: 0 0 9.33vw;
            }
            #kvArea .streamingInfo ul li a.anchorLink {
              position: relative;
            }
            #kvArea .streamingInfo ul li a.anchorLink::after {
              content: "";
              background-image: url(/program/st/promo/generator_common/img/arrowBottom.png);
              background-repeat: no-repeat;
              background-size: 100%;
              display: inline-block;
              width: 3.73vw;
              height: 2vw;
              position: absolute;
              right: -8.66vw;
              top: 0;
              bottom: 0;
              margin: auto;
            }
          }
        `}
      </style>
    </section>
  );
};
export default KVComponent;