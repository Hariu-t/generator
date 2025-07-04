import React from 'react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import { getGlobalStyleValue } from '../../utils/globalStylesHelper';

interface AppIntroComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const AppIntroComponent: React.FC<AppIntroComponentProps> = ({ component }) => {
  const { pageData } = usePageStore();
  const { balloonText } = component.props;
  const { 
    backgroundColor, 
    textColor, 
    headlineColor, 
    descriptionColor, 
    buttonBackgroundColor, 
    buttonTextColor,
    cardBackgroundColor,
    cardTextColor,
    accentColor
  } = component.style || {};

  // 共通スタイルの取得
  const mainColor = getGlobalStyleValue(pageData.globalStyles, 'mainColor');
  const baseColor = getGlobalStyleValue(pageData.globalStyles, 'baseColor');
  const base2Color = getGlobalStyleValue(pageData.globalStyles, 'base2Color');
  const globalAccentColor = getGlobalStyleValue(pageData.globalStyles, 'accentColor');

  const containerStyle = {
    backgroundColor: backgroundColor || baseColor,
    color: textColor || '#333333',
    padding: '120px 0',
  };

  const sectionInnerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const titleStyle = {
    fontSize: '30px',
    fontWeight: 500,
    textAlign: 'center' as const,
    marginBottom: '24px',
    color: headlineColor || textColor || '#333333',
  };

  const textStyle = {
    fontSize: '16px',
    lineHeight: 1.8,
    textAlign: 'center' as const,
    color: descriptionColor || textColor || '#333333',
  };

  const annotationStyle = {
    fontSize: '14px',
    lineHeight: 1,
    margin: '20px 0 50px',
    textAlign: 'center' as const,
    color: descriptionColor || textColor || '#666666',
  };

  const viewingMethod2Style = {
    border: '2px solid #D3D3D3',
    background: cardBackgroundColor || base2Color,
    borderRadius: '12px',
    padding: '35px 0',
    maxWidth: '760px',
    width: '100%',
    margin: '0 auto',
  };

  const viewingBalloonStyle = {
    color: accentColor || globalAccentColor,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 'normal',
    position: 'relative' as const,
    background: '#fff',
    border: `2px solid ${accentColor || globalAccentColor}`,
    borderRadius: '5px',
    textAlign: 'center' as const,
    padding: '10px',
    marginBottom: '20px',
    maxWidth: '360px',
    width: '100%',
    margin: '0 auto 20px',
  };

  const balloonAfterStyle = {
    content: '""',
    position: 'absolute' as const,
    top: '100%',
    left: '12%',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderTopColor: '#fff',
    borderWidth: '10px',
    borderStyle: 'solid',
    marginLeft: '-10px',
  };

  const balloonBeforeStyle = {
    content: '""',
    position: 'absolute' as const,
    top: '100%',
    left: '12%',
    borderColor: `rgba(0, 153, 255, 0)`,
    borderTopColor: accentColor || globalAccentColor,
    borderWidth: '13px',
    borderStyle: 'solid',
    marginLeft: '-13px',
  };

  const viewingFlexStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '40px',
    flexWrap: 'wrap' as const,
  };

  const innerFlexStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
  };

  const appItemStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
  };

  const viewingNoteStyle = {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.8,
    maxWidth: 'max-content',
    margin: '20px auto 0',
    color: cardTextColor || textColor || '#000',
    listStyle: 'none',
    padding: 0,
  };

  const viewingPointStyle = {
    borderTop: '3px solid #222',
    paddingTop: '30px',
    maxWidth: '660px',
    width: '100%',
    margin: '30px auto 0',
  };

  const viewingPointTitleStyle = {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.35,
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: cardTextColor || textColor || '#000',
  };

  const viewingPointFlexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap' as const,
  };

  const viewingPointItemStyle = {
    background: '#fff',
    borderRadius: '5px',
    border: '1px solid #D3D3D3',
    padding: '21px 32px 30px',
    width: 'calc(50% - 10px)',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  };

  const pointTitleStyle = {
    color: accentColor || globalAccentColor,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.8,
    textAlign: 'center' as const,
    borderBottom: '1px solid #D3D3D3',
    paddingBottom: '15px',
  };

  const pointTextStyle = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.8,
    textAlign: 'center' as const,
    letterSpacing: '-0.01rem',
    marginTop: '15px',
    color: cardTextColor || textColor || '#000',
  };

  const h4Style = {
    fontSize: '30px',
    lineHeight: 1,
    fontWeight: 500,
    marginTop: '50px',
    marginBottom: '41px',
    textAlign: 'center' as const,
    color: headlineColor || textColor || '#333333',
  };

  const imageContainerStyle = {
    textAlign: 'center' as const,
    marginTop: '50px',
  };

  return (
    <section style={containerStyle} className="baseColor">
      <div style={sectionInnerStyle}>
        <h3 style={titleStyle}>スカパー！番組配信とは</h3>
        <p style={textStyle}>
          スカパー！ご加入のお客さまは、スマホ・タブレット・PCなどでも<br />
          追加料金なしで契約商品をご視聴いただけます。
        </p>
        <p style={annotationStyle}>※ご契約している商品でも一部視聴できないチャンネル・番組がございます。</p>

        <div style={viewingMethod2Style} className="base2Color">
          <div style={viewingFlexStyle}>
            <div>
              <div style={viewingBalloonStyle} className="accentColor">
                {balloonText || 'ブラックリストをマイリスト登録すれば便利！'}
                <div style={balloonAfterStyle}></div>
                <div style={balloonBeforeStyle}></div>
              </div>
              <div style={innerFlexStyle}>
                <div style={{ marginRight: '20px' }}>
                  <img 
                    src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=120" 
                    alt="スカパー！番組配信" 
                    style={{ width: '120px', height: 'auto' }}
                  />
                </div>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: 1.8,
                  textAlign: 'left' as const,
                  color: cardTextColor || textColor || '#000',
                }}>
                  スカパー！番組配信を<br />
                  見るならアプリがおすすめ！
                </p>
              </div>
            </div>
            <div style={appItemStyle}>
              <a href="https://itunes.apple.com/jp/app/id1059697991/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="App Store" 
                  style={{ width: '200px', height: 'auto' }}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.yomumiru" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Google Play" 
                  style={{ width: '200px', height: 'auto' }}
                />
              </a>
            </div>
          </div>
          
          <ul style={viewingNoteStyle}>
            <li>※Androidタブレットは、動作保証外のため正しく動作しない/表示されない場合があります。</li>
          </ul>
          
          <div style={viewingPointStyle}>
            <p style={viewingPointTitleStyle}>スカパー！番組アプリなら</p>
            <div style={viewingPointFlexStyle}>
              <div style={viewingPointItemStyle}>
                <p style={pointTitleStyle} className="accentColor">point1</p>
                <div style={pointTextStyle}>
                  <p>
                    番組配信の視聴はもちろん、<br />
                    <span style={{ color: accentColor || globalAccentColor }} className="accentColor">気になる番組が探しやすい！</span>
                  </p>
                </div>
              </div>
              <div style={viewingPointItemStyle}>
                <p style={pointTitleStyle} className="accentColor">point2</p>
                <div style={pointTextStyle}>
                  <p>
                    気になった番組をマイリストに<br />
                    登録すれば、<span style={{ color: accentColor || globalAccentColor }} className="accentColor">配信・放送前に通知が<br />
                    来るので見逃す心配なし！</span>
                  </p>
                </div>
              </div>
            </div>
            <ul style={viewingNoteStyle}>
              <li>※スカパー！番組配信は、WEBブラウザでもご視聴いただけます。</li>
              <li>※dボタン・FireTV・AndroidTV・Net-VISIONでテレビでもご視聴いただけます。（ご利用には、テレビとインターネット回線の接続が必要です。）</li>
            </ul>
          </div>
        </div>

        <h4 style={h4Style}>基本プランなら、50chのうち37chが番組配信も楽しめる！</h4>

        <div style={imageContainerStyle}>
          <img 
            src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="番組配信チャンネル一覧" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .viewing-method-2 {
              padding: 8vw 4vw !important;
            }
            .viewing-balloon {
              font-size: 4vw !important;
              border-width: 0.53vw !important;
              border-radius: 1.33vw !important;
              padding: 1.73vw !important;
              margin-bottom: 4.53vw !important;
            }
            .viewing-balloon:after {
              border-width: 2.66vw !important;
              margin-left: -2.66vw !important;
            }
            .viewing-balloon:before {
              border-width: 3.46vw !important;
              margin-left: -3.46vw !important;
            }
            .viewing-flex {
              flex-direction: column !important;
              gap: 5.33vw !important;
            }
            .inner-flex {
              gap: 2.66vw !important;
            }
            .inner-flex img {
              width: 16vw !important;
            }
            .inner-flex p {
              font-size: 4.8vw !important;
              line-height: 1.6 !important;
            }
            .app-item {
              flex-direction: row !important;
              gap: 2.66vw !important;
            }
            .app-item a {
              width: calc(50% - 1.33vw) !important;
            }
            .viewing-point {
              margin-top: 16.53vw !important;
            }
            .viewing-point::before {
              content: "";
              position: absolute;
              top: -8vw;
              left: -4.33vw;
              width: calc(100vw - 10.66vw);
              height: 0.53vw;
              background: #222;
            }
            .viewing-point-title {
              font-size: 5.6vw !important;
              margin-bottom: 5.33vw !important;
            }
            .viewing-point-flex {
              flex-direction: column !important;
              gap: 3.33vw !important;
            }
            .viewing-point-item {
              width: 100% !important;
              min-width: auto !important;
              padding: 4.66vw 3.33vw 6.66vw !important;
              border-radius: 1.33vw !important;
              border-width: 0.13vw !important;
            }
            .point-title {
              font-size: 4.8vw !important;
              padding-bottom: 4vw !important;
              border-bottom-width: 0.26vw !important;
            }
            .point-text {
              font-size: 4.26vw !important;
              line-height: 1.6 !important;
              margin-top: 4vw !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default AppIntroComponent;