import React from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoIconStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const logoTextStyle: React.CSSProperties = {
    marginLeft: '12px',
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* Logo */}
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}>LP</span>
            </div>
            <div style={logoTextStyle}>
              <h1>LP Builder</h1>
            </div>
          </div>
        </div>

      </div>

      <style>
          {`
            .fw .mainContents{
              word-break: break-word;
            }
            .fw .c-headline {
              background-image: none!important;
              background: #C3000F!important;
              margin: 0;
            }
            .fw .c-btn-top {
              z-index: 100;
            }
            .programSlider{
              display: none;
            }
            .programSlider.slick-initialized{
              display: block;
            }
            .programSlider{
              opacity: 0;
              transition: opacity .5s linear;
            }
            .programSlider.slick-initialized{
              opacity: 1;
            }
            .mainContents .mainContentsIn {
              margin: 0 auto!important;
            }
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
            .fontRobot {
              font-family: 'Roboto', sans-serif;
            }
            .description_add {
              display: none;
            }
            .description_add.show {
              display: inline;
            }
            b{
              font-weight: bold;
            }
            #programArea .img .itemGuard,
            #programArea .noImg .itemGuard{
              display: flex;
              justify-content: center;
              align-items: center;
            }

            @media (min-width: 769px) {
              .sp {
                display: none !important;
              }
              .sectionInner {
                max-width: 1160px;
                width: 100%;
                margin: 0 auto;
              }
              .borderBottom {
                padding-bottom: 2px;
                border-bottom: 1px solid #0099FF;
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

              #kvArea .movieInfo {
                max-width: 540px;
                width: 100%;
                height: auto;
                margin: 0 auto;
              }
              #kvArea .movieInfo iframe {
                width: 100%;
              }


              #addArea {
                padding: 60px 0 100px 0;
              }
              #addArea .flexWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 40px;
              }
              #addArea .flexWrapper .c-btn a {
                min-width: 360px;
                width: 100%;
                min-height: 72px;
                margin: 0 auto;
                font-size: 18px;
                line-height: 1.5;
                padding: 25px 35px 25px 25px;
              }
              .fw .c-btn--red a:after, .fw .c-btn--red button:after {
                right: 20px;
              }
              .fw .c-btn--blank.c-btn--blue a:after, .fw .c-btn--blank.c-btn--blue button:after {
                margin-left: 8px;
                width: 30px;
                height: 30px;
              }


              #programArea {
                padding: 80px 0 120px 0;
              }
              section h3 {
                max-width: 1260px;
                font-size: 48px;
                line-height: 1.5;
                font-weight: bold;
                position: relative;
                text-align: center;
                margin: 0 auto;
                margin-bottom: 94px;
              }
              section h3::after {
                content: "";
                display: inline-block;
                width: 60px;
                height: 8px;
                background: #C3000F;
                position: absolute;
                bottom: -37px;
                right: 0;
                left: 0;
                margin: auto;
              }
              #programArea h4 {
                max-width: 1260px;
                font-size: 26px;
                line-height: 1.1;
                font-weight: 500;
                text-align: center;
                margin: 0 auto 50px;
              }
              #programArea h4 span img {
                width: auto;
                height: 37px;
                margin-right: 12px;
              }
              #programArea .programWrapper {
                max-width: 1260px;
                width: 100%;
                margin: 0 auto;
                position: relative;
              }
              #programArea .programWrapper .programSlider:not(:last-child) {
                margin-bottom: 80px;
              }
              #programArea .programWrapper button.slick-arrow{
                position: absolute;
                top: 53px;
                border: none;
                width: 30px;
                height: 50px;
                margin: 0;
                background-repeat: no-repeat;
                background-size: 100%;
                background-position: center;
                overflow: hidden;
                text-indent: -999em;
                cursor: pointer;
                z-index: 1;
              }
              #programArea .programWrapper button.slick-prev{
                  left: -50px;
                  background: url(/program/st/promo/generator_common/img/arrowPrev.png);
              }
              #programArea .programWrapper button.slick-next{
                  right: -50px;
                  background: url(/program/st/promo/generator_common/img/arrowNext.png);
              }
              #programArea .programWrapper ul.slick-slider {
                max-width: 1160px;
                width: 100%;
                height: 100%;
                margin: 0 auto;
              }
              #programArea .programWrapper li.slick-slide{
                max-width: 275px;
                margin-right: 20px;
              }
              #programArea .img,
              #programArea .noImg{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 275px!important;
                height: 155px;
                background: #000;
                overflow: hidden;
                position: relative;
                margin: 0 0 20px;
                border: 1px solid #777;
                box-sizing: border-box;
              }
              #programArea .img img,
              #programArea .noImg img {
                display: flex;
                justify-content: center;
                align-items: center;
                width: auto;
                height: auto;
                max-height: 155px;
              }
              #programArea .copy {
                font-size: 12px;
                line-height: 1.5;
              }
              #programArea .flagWrapper{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
                margin: 0 0 15px;
              }
              #programArea .flag {
                font-size: 12px;
                line-height: 1.8;
                font-weight: bold;
                background: #C3000F;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: max-content;
                width: 100%;
                min-height: 25px;
                padding: 0 12px;
                text-align: center;
                border-radius: 3px;
              }
              #programArea .flag.flag_streaming {
                color: #000;
                background: #fff;
                border: 1px solid #000;
              }
              #programArea .tit {
                font-size: 22px;
                line-height: 1.5;
                font-weight: bold;
                margin: 0 0 20px;
              }
              #programArea .schedule {
                font-size: 14px;
                line-height: 1.8;
                margin: 15px 0;
              }
              #programArea .description {
                font-size: 14px;
                line-height: 1.8;
                margin-bottom: 15px;
              }
              #programArea .icon {
                margin: 0 0 15px;
              }
              #programArea .icon img.guard {
                width: auto;
                height: 37px;
              }
              #programArea .chNumber {
                font-size: 14px;
                line-height: 1.5;
                margin: 0 0 10px;
              }
              #programArea .chName {
                font-size: 15px;
                line-height: 1.5;
                margin: 0 0 15px;
              }
              #programArea .programWrapper li.slick-slide span.copy {
                display: inline-block;
                font-size: 10px;
                line-height: 2;
              }


              #floatArea {
                background: rgba(27,27,27,0.8);
                position: fixed;
                bottom: -112px;
                left: 0;
                width: 100%;
                margin: 0;
                padding: 20px 0 20px 180px;
                z-index: 90;
                transition: .5s;
              }
              #floatArea.pt5 {
                padding: 5px 0 20px 180px;
              }
              #floatArea .flexWrapper {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                gap: 40px;
              }
              #floatArea .flexWrapper .c-btn a {
                min-width: 360px;
                min-height: 72px;
                font-size: 18px;
                line-height: 1.5;
              }
              #floatArea .flexWrapper .floatAreaBubble {
                color: #1B1B1B;
                font-family: 'Roboto', sans-serif;
                font-size: 18px;
                font-weight: bold;
                line-height: 1.3;
                position: relative;
                display: block;
                max-width: max-content;
                margin: 0 auto 4px;
              }
              #floatArea .flexWrapper .floatAreaBubble::after {
                content: "";
                position: absolute;
                top: 7px;
                bottom: 0;
                right: -20px;
                width: 2px;
                height: 18px;
                margin: auto;
                background: #1B1B1B;
                transform: rotate(-150deg);
              }
              #floatArea .flexWrapper .floatAreaBubble::before {
                content: "";
                position: absolute;
                top: 7px;
                bottom: 0;
                left: -20px;
                width: 2px;
                height: 18px;
                margin: auto;
                background: #1B1B1B;
                transform: rotate(-30deg);
              }
              #floatArea .flexWrapper .floatAreaBubble span {
                font-size: 30px;
                font-weight: 500;
                line-height: 1.3;
                line-height: 1.3;
                padding: 0 2px;
              }
              .fw #floatArea .c-btn.column {
                flex-direction: column;
              }
            }


            .copyRight {
              padding: 10px 20px;
              font-size: 12px;
              line-height: 1.4;
            }


            @media (max-width: 1450px) {
              #programArea .programWrapper button.slick-prev{
                top: 28px;
                left: 0;
                width: 60px;
                height: 100px;
                background: url(/program/st/promo/generator_common/img/arrowPrev_sp.png)!important;
              }
              #programArea .programWrapper button.slick-next{
                top: 28px;
                right: 0;
                width: 60px;
                height: 100px;
                background: url(/program/st/promo/generator_common/img/arrowNext_sp.png)!important;
              }
            }


            @media (max-width: 1280px) {
              #floatArea {
                padding: 20px 0;
              }
              #floatArea.pt5 {
                padding: 5px 0 20px;
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
              .pc {
                display: none !important;
              }
              .sectionInner {
                padding: 0 5.33vw;
              }
              .borderBottom {
                padding-bottom: 2px;
                border-bottom: 1px solid #0099FF;
              }
              .fw .c-headline__inner {
                padding: 4vw 5.33vw;
              }
              .fw .c-headline__ttl {
                font-size: 5.33vw;
                line-height: 1.5;
              }
              .fw .c-btn-top {
                bottom: 23vw;
              }
              .streamingIcon a{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                min-height: 16vw;
                font-size: 4.26vw;
                line-height: 1.5;
                font-weight: 500;
                position: relative;
                text-align: center;
                border: 0.53vw solid #000;
                border-radius: 8vw;
                color: #000;
                background: #fff;
              }
              .streamingIcon a::before {
                content: "";
                background-image: url(/program/st/promo/generator_common/img/streamingIcon.png);
                background-repeat: no-repeat;
                background-size: 100%;
                display: inline-block;
                width: 8.53vw;
                height: 8.53vw;
                position: absolute;
                left: 6.13vw;
                top: 0;
                bottom: 0;
                margin: auto;
              }


              #showDesc {
                font-size: 3.73vw;
                line-height: 1.9;
                position: relative;
                display: table;
                margin: 1.33vw 0 0;
                color: #0099ff;
              }
              #showDesc::before {
                content: "";
                width: 3.46vw;
                height: 0.26vw;
                background: #0099ff;
                position: absolute;
                top: 50%;
                right: -6.4vw;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                z-index: 1;
              }
              #showDesc::after {
                content: "";
                width: 3.46vw;
                height: 0.26vw;
                background: #0099ff;
                position: absolute;
                top: 50%;
                right: -6.4vw;
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



              #addArea {
                padding: 13.33vw 0 16vw 0;
              }
              #addArea .flexWrapper {
                padding: 0 5.33vw;
              }
              #addArea .flexWrapper .c-btn a {
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: none;
                width: 100%;
                height: 16vw;
                margin: 0 auto;
                font-size: 4.26vw;
                line-height: 1;
                padding: 0;
              }
              #addArea .flexWrapper .c-btn:not(:last-child) {
                margin-bottom: 8vw;
              }
              .fw .flexWrapper .c-btn--red a:after, .fw .flexWrapper .c-btn--red button:after {
                border-radius: 100%;
                background: #fff url(/global/assets/images/icon/icon_arrow-a_red.svg) no-repeat center center;
                background-size: 100%;
                width: 5.33vw;
                height: 5.33vw;
                right: 4vw;
              }
              .fw .flexWrapper .c-btn--blank.c-btn--blue a:after, .fw .flexWrapper .c-btn--blank.c-btn--blue button:after {
                background: url(/global/assets/images/icon/icon_blank_white.svg) no-repeat center center;
                background-size: 100% auto;
                width: 7.06vw;
                height: 7.06vw;
                right: -2.13vw!important;
            }



              #programArea {
                padding: 18.66vw 0 24vw 0;
              }
              section h3 {
                font-size: 8vw;
                line-height: 1.5;
                font-weight: bold;
                position: relative;
                text-align: center;
                margin-bottom: 19.46vw;
              }
              section h3::after {
                content: "";
                display: inline-block;
                width: 16vw;
                height: 2.13vw;
                background: #C3000F;
                position: absolute;
                bottom: -6.26vw;
                right: 0;
                left: 0;
                margin: auto;
              }
              #programArea h3 {
                padding: 0 5.33vw;
              }
              #programArea h4 {
                font-size: 5.33vw;
                line-height: 1.8;
                font-weight: 500;
                text-align: center;
                margin: 0 0 9.33vw;
                padding: 0 5.33vw;
              }
              #programArea h4 span img {
                width: auto;
                height: 9.46vw;
                margin-right: 1.6vw;
              }
              #programArea .programWrapper {
                width: 100%;
                margin: 0 auto;
                position: relative;
              }
              #programArea .programWrapper .programSlider:not(:last-child) {
                margin: 0 0 18.66vw;
              }
              #programArea .programWrapper button.slick-arrow{
                position: absolute;
                top: 9.06vw;
                border: none;
                width: 8vw;
                height: 13.33vw;
                margin: 0;
                background-repeat: no-repeat;
                background-size: 100%!important;
                background-position: center;
                overflow: hidden;
                text-indent: -999em;
                cursor: pointer;
                z-index: 1;
              }
              #programArea .programWrapper button.slick-prev{
                  left: 0px;
                  background: url(/program/st/promo/generator_common/img/arrowPrev_sp.png);
              }
              #programArea .programWrapper button.slick-next{
                  right: 0;
                  background: url(/program/st/promo/generator_common/img/arrowNext_sp.png);
              }
              #programArea .programWrapper ul.slick-slider {
                width: 100%;
                height: 100%;
                margin: 0 auto;
                padding: 0 0 0 5.33vw;
              }
              #programArea .programWrapper li.slick-slide{
                width: 56vw;
                margin-right: 8vw;
              }
              #programArea .img,
              #programArea .noImg{
                display: flex;
                justify-content: center;
                align-items: center;
                background: #000;
                width: 100%;
                height: 30.46vw;
                overflow: hidden;
                position: relative;
                margin: 0 0 4vw;
                border: 0.4vw solid #777;
                box-sizing: border-box;
              }
              #programArea .img img,
              #programArea .noImg img {
                display: flex;
                justify-content: center;
                align-items: center;
                width: auto;
                height: auto;
                max-height: 30.46vw;
              }
              #programArea .copy {
                font-size: 3.2vw;
                line-height: 1.5;
                margin: 0 0 5.33vw;
              }
              #programArea .flagWrapper{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                gap: 1.33vw;
                margin: 0 0 5.33vw;
              }
              #programArea .flag {
                font-size: 3.2vw;
                line-height: inherit;
                font-weight: bold;
                display: flex;
                align-items: center;
                background: #C3000F;
                max-width: max-content;
                width: 100%;
                min-height: 6.8vw;
                padding: 1.06vw 3.2vw;
                text-align: center;
                border-radius: 0.8vw;
              }
              #programArea .flag.flag_streaming {
                color: #000;
                background: #fff;
                border: 1px solid #000;
              }
              #programArea .tit {
                font-size: 4.8vw;
                line-height: 1.5;
                font-weight: bold;
                margin: 0 0 5.33vw;
              }
              #programArea .schedule {
                font-size: 3.46vw;
                line-height: 1.8;
                margin: 5.33vw 0 2.66vw;
              }
              #programArea .description {
                font-size: 3.46vw;
                line-height: 1.8;
                margin-bottom: 2.66vw;
              }
              #programArea .description .more{
                display: inline-block;
              }
              #programArea .iconWrapper {
                display: flex;
                align-items: center;
                margin: 0 0 3.46vw;
              }
              #programArea .icon {
                margin: 0 0 2.66vw;
              }
              #programArea .icon img.guard {
                width: auto;
                height: 9.46vw;
              }
              #programArea .chName {
                font-size: 3.46vw;
                line-height: 1.5;
                font-weight: 500;
                margin: 0 0 5.33vw;
              }
              #programArea .chNumber {
                font-size: 3.2vw;
                line-height: 1.5;
                font-weight: 500;
                margin: 0 0 2.66vw;
              }
              #programArea .programWrapper li.slick-slide span.copy {
                display: inline-block;
                font-size: 2.4vw;
                line-height: 2;
              }


              #floatArea {
                background: rgba(27,27,27,0.8);
                position: fixed;
                bottom: -24vw;
                left: 0;
                width: 100%;
                margin: 0;
                padding: 4vw 0;
                z-index: 90;
                transition: .5s;
              }
              #floatArea.pt5 {
                padding: 0 0 4vw;
              }
              #floatArea .flexWrapper {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                gap: 2.66vw;
              }
              #floatArea .flexWrapper .c-btn a {
                min-width: 46vw;
                min-height: 16vw;
                font-size: 4.26vw;
                line-height: 1.4;
              }
              #floatArea .flexWrapper .floatAreaBubble {
                color: #1B1B1B;
                font-family: 'Roboto', sans-serif;
                font-size: 4.26vw;
                font-weight: bold;
                line-height: 1.3;
                position: relative;
                display: block;
                max-width: max-content;
                margin: 0 auto 0.53vw;
              }
              #floatArea .flexWrapper .floatAreaBubble::after {
                content: "";
                position: absolute;
                top: 0.93vw;
                bottom: 0;
                right: -2.66vw;
                width: 0.53vw;
                height: 4.53vw;
                margin: auto;
                background: #1B1B1B;
                transform: rotate(-150deg);
              }
              #floatArea .flexWrapper .floatAreaBubble::before {
                content: "";
                position: absolute;
                top: 0.93vw;
                bottom: 0;
                left: -2.66vw;
                width: 0.53vw;
                height: 4.53vw;
                margin: auto;
                background: #1B1B1B;
                transform: rotate(-30deg);
              }
              #floatArea .flexWrapper .floatAreaBubble span {
                font-size: 7.19vw;
                font-weight: 500;
                line-height: 1.3;
                padding: 0 0.26vw;
              }
              .fw #floatArea .c-btn.column {
                flex-direction: column;
              }


              .copyRight {
                padding: 2.667vw;
                font-size: 12px;
                line-height: 1.4;
              }
            }



            .modal {
              opacity: 0;
              visibility: hidden;
              pointer-events: none;
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 1000;
              -webkit-transition: opacity 0.3s ease, visibility 0.3s ease;
              transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            .modal.-show {
              opacity: 1;
              visibility: visible;
              pointer-events: auto;
            }
            .modal-window {
              position: absolute;
              left: 50%;
              top: 50%;
              width: calc(100% - 20px);
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
            }
            .simulation .modal-window {
              width: 100%;
              height: calc(100% - 214px);
              top: 0;
            }
            .c-contract-cv__btn__select {
            max-width: 500px;
            min-width: 310px;
            font-size: 15px;
            line-height: 1.4em;
            text-align: center;
            padding: 10px 35px 10px 25px;
            min-height: 54px;
            font-weight: 500;
            border-radius: 100px;
            display: -webkit-box;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            position: relative;
            -webkit-transition: background 0.2s;
            transition: background 0.2s;
            }
            .c-contract-cv__btn__select .basic-join {
            font-size: 17px;
              margin-right: 0.4em;
            }
            #modal-confirm .c-contract-ac__trigger::after {
            transition: 0.2s;
            -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
            }
            #modal-confirm .c-contract-ac__trigger.active::after {
              -webkit-transform: rotate(-90deg);
              transform: rotate(-90deg);
            }
            #modal-confirm .j-contract-ac__content {
            display: none;
            }
            @media screen and (max-width: 768px) {
            .simulation .modal-window {
              width: 100%;
              height: calc(100% - 57.8vw);
              top: 0;
              }
            }
            @media screen and (min-width: 769px) {
            .modal-window {
              max-width: 900px;
            }
            }

            .modal-window-inner {
            margin-left: auto;
            margin-right: auto;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            overflow: auto;
            display: none;
            }
            @media screen and (max-width: 768px) {
            .modal-window-inner {
              max-height: calc(100vh - 120px);
            }
            }
            .modal-window-inner.-show {
            display: block;
            }

            .modal-close {
            border: none;
              cursor: pointer;
              outline: none;
              padding: 0;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              width: 30px;
              height: 30px;
              position: absolute;
              top: 0;
              right: 0;
              background: url(/global/assets/images/icon/icon_close_white.svg) center center no-repeat;
              background-size: 30px 30px;
              cursor: pointer;
              -webkit-transition: 0.2s;
              transition: 0.2s;
              overflow: hidden;
            }
            .modal-window-scroll {
              position: relative;
              z-index: 2;
            }


            .modal-inner-contents {
            padding: 0;
            text-align: center;
            }
            @media screen and (min-width: 769px) {
              .modal-inner-contents {
                  padding: 52px 0 0;
              }
            }
            @media screen and (max-width: 768px) {
              .modal-inner-contents {
                  padding: 6.66vw 0 0;
              }
            }


            @media screen and (min-width: 769px) {
            .modal.-show {
              opacity: 1;
              visibility: visible;
              pointer-events: auto;
              overflow:auto;
            }
            .modal-bg {
              position: sticky;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            background: rgba(0,0,0,0.6);
            }
            }
            @media screen and (max-width: 768px) {
              .modal-bg {
                  position: sticky;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
              background: rgba(0,0,0,0.6);
              }
              .modal-window {
                  position: absolute;
                  left: 50%;
                  width: calc(100% - 20px);
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  -webkit-transform: translate(-50%,-50%);
                  transform: translate(-50%,-50%);
                  top: 50%;
              }
            }

            @media all and (-ms-high-contrast: none) {
            .modal-bg {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.6);
            }
            }
            @-moz-document url-prefix() {
            .modal-bg {
              position: sticky;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.6);
            }
            }
          `}
      </style>
    </header>

  );
};

export default Header;