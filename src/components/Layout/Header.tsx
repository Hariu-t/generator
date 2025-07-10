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



              .mustReadbox {
                box-sizing: border-box;
                border: 2px solid #D3D3D3;
                background: #fff;
                color: #222222;
                margin: 0 auto 60px;
                max-width: 760px;
                width: 100%;
              }
              .mustReadbox dl {
                margin: 0;
              }
              .mustReadbox dl dt {
                position: relative;
                padding: 15px 70px 15px 65px;
                font-size: 22px;
                font-weight: 500;
                cursor: pointer;
              }
              .mustReadbox dl dt::before {
                content: "";
                width: 26px;
                height: 26px;
                position: absolute;
                top: 50%;
                left: 42px;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                background: url(/program/st/promo/generator_common/img/payment_icon01.png) no-repeat center center;
                background-size: cover;
              }
              .mustReadbox dl dt::after {
                content: "";
                width: 24px;
                height: 24px;
                background: #0099ff;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                right: 20px;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
              }
              .mustReadbox dl dt > span::before {
                content: "";
                width: 13px;
                height: 2px;
                background: #ffffff;
                position: absolute;
                top: 50%;
                right: 31px;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                z-index: 1;
              }
              .mustReadbox dl dt > span::after {
                content: "";
                width: 13px;
                height: 2px;
                background: #ffffff;
                position: absolute;
                top: 50%;
                right: 31px;
                -webkit-transform: translate(-50%, -50%) rotate(-90deg);
                -ms-transform: translate(-50%, -50%) rotate(-90deg);
                transform: translate(-50%, -50%) rotate(-90deg);
                transition: all .5s;
                z-index: 1;
              }
              .mustReadbox dl dt.active > span::after {
                -webkit-transform: translate(-50%, -50%) rotate(0deg);
                -ms-transform: translate(-50%, -50%) rotate(0deg);
                transform: translate(-50%, -50%) rotate(0deg);
              }
              .mustReadbox dl dd {
                display: none;
                padding: 0;
                color: #888;
                font-size: 14px;
                line-height: 1.57;
                border-top: 1px solid #0099ff;
              }
              .mustReadbox dl dd .cautionTable {
                width: 100%;
                border-spacing: 0px;
                margin: 0 auto;
              }
              .mustReadbox dl dd .cautionTable th {
                background-color: #09f;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                color: #fff;
                padding: 20px 5px;
                width: 25%;
              }
              .mustReadbox dl dd .cautionTable td {
                padding: 10px;
                border-bottom: 1px solid #ccc;
              }
              .mustReadbox dl dd .cautionTable td .icon_type_01, .mustReadbox dl dd .cautionTable td .icon_type_02 {
                margin: 5px 0 0;
                padding: 0 0 0 1rem;
                font-size: 14px;
                color: #888;
                line-height: 1.57;
              }
              .mustReadbox dl dd .cautionTable td .icon_type_01::before {
                content: "※";
                margin-left: -1rem;
              }
              .mustReadbox dl dd .cautionTable tr:last-child th,
              .mustReadbox dl dd .cautionTable tr:last-child td {
                border-bottom: none;
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


              #priceArea {
                background: #1B1B1B;
                padding: 120px 0 140px 0;
              }
              #priceArea .subTitle {
                background: #C3000F;
                width: 100%;
                min-height: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 26px;
                line-height: 1.3;
                font-weight: bold;
                margin: 0 0 50px;
                text-align: center;
              }
              #priceArea .subTitle.alignBaseline {
                align-items: baseline;
              }
              #priceArea .subTitle span.textLarge {
                font-size: 36px;
                line-height: 1.4;
              }
              #priceArea .subTitle span.price {
                font-family: 'Roboto', sans-serif;
                font-size: 62px;
                line-height: 1.3;
                font-weight: 500;
                padding: 0 2px;
              }
              #priceArea .priceInfo2 .subTitle {
                max-width: 1160px;
                width: 100%;
                margin: 0 auto 50px;
              }
              #priceArea .priceInfo:not(:last-child) {
                padding-bottom: 120px;
              }
              #priceArea .priceInfo1 {
                max-width: 1160px;
                width: 100%;
                margin: 0 auto;
              }
              #priceArea .priceTable {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 40px;
                margin: 0 0 60px;
                position: relative;
              }
              #priceArea .priceTable::after {
                content: "";
                display: inline-block;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                width: 0;
                height: 0;
                border-style: solid;
                border-top: 27px solid transparent;
                border-bottom: 27px solid transparent;
                border-left: 20px solid #fff;
                border-right: 0;
              }
              #priceArea .priceTable .priceBox {
                max-width: 360px;
                width: 100%;
                background: #C3000F;
              }
              #priceArea .priceTable .tit {
                background: #E60012;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                min-height: 60px;
                font-size: 22px;
                line-height: 1.3;
                font-weight: 500;
                text-align: center;
              }
              #priceArea .priceTable .fee {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                line-height: 1.3;
                font-weight: bold;
                min-height: 90px;
                margin: 0 20px;
                padding: 0 16px;
              }
              #priceArea .priceTable .viewingFee {
                border-bottom: 1px solid #fff;
              }
              #priceArea .priceTable .fee .flag {
                color: #E60012;
                background: #fff;
                font-size: 16px;
                line-height: 1.3;
                font-weight: bold;
                padding: 5px 8px 4px 8px;
              }
              #priceArea .priceTable .fontLearge {
                font-size: 52px;
                line-height: 1.3;
              }
              #priceArea .priceTable .fontMedium {
                font-size: 22px;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .priceTable .text {
                font-size: 22px;
                line-height: 1.5;
                font-weight: bold;
              }


              #priceArea .chFee {
                margin-bottom: 60px;
              }
              #priceArea .chFee .tit {
                font-size: 26px;
                line-height: 1.3;
                font-weight: 500;
                text-align: center;
                margin: 0 0 19px;
              }
              #priceArea .chFee2 .tit img {
                width: auto;
                height: 37px;
                margin-right: 12px;
              }
              #priceArea .chFee .viewingFee {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 30px;
              }
              #priceArea .chFee .viewingFee .flag {
                font-size: 32px;
                line-height: initial;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 380px;
                width: 100%;
                min-height: 80px;
                border-radius: 6px;
                text-align: center;
                padding: 17px 30px;
                word-break: break-all;
              }
              #priceArea .chFee2 .viewingFee .flag {
                background: #0099FF!important;
                color: #fff!important;
              }
              #priceArea .chFee .viewingFee .price {
                font-size: 30px;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee .viewingFee .price .fontLearge {
                font-size: 66px;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee2 .viewingFee .price .fontLearge {
                color: #0099FF!important;
              }
              #priceArea .chFee .viewingFee .price .fontSmall {
                font-size: 22px;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee .annotation {
                font-size: 20px;
                line-height: 2.2;
                text-align: center;
                margin-top: 12px;
              }
              .chFee .mustReadbox {
                margin: 12px auto 0;
                display: none;
              }
              #priceArea .flexWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 40px;
              }
              #priceArea .flexWrapper .c-btn a {
                min-width: 360px;
                min-height: 85px;
                font-size: 18px;
                line-height: 1.5;
              }

              #priceArea .priceInfo2 .img {
                margin: 0 0 50px;
                text-align: center;
              }



              #streamingArea {
                padding: 120px 0;
              }
              #streamingArea .text {
                font-size: 16px;
                line-height: 1.8;
                text-align: center;
              }
              #streamingArea .annotion {
                font-size: 14px;
                line-height: 1;
                margin-top: 24px;
                text-align: center;
                margin: 20px 0 50px;
              }
              #streamingArea h4 {
                font-size: 30px;
                line-height: 1;
                font-weight: 500;
                margin-bottom: 41px;
                text-align: center;
              }

              #streamingArea .viewingMethod2 {
                border: 2px solid #D3D3D3;
                background: #F6F6F6;
                border-radius: 12px;
                padding: 35px 0;
                max-width: 760px;
                width: 100%;
                margin: 0 auto;
              }
              #streamingArea .viewingMethod2 + h4,
              #streamingArea .viewingMethod2 + .img.osusumePoint {
                margin-top: 50px;
              }

              #streamingArea .viewingMethod2 .viewingBallon {
                color: #0099FF;
                font-size: 16px;
                font-weight: 500;
                line-height: normal;
                position: relative;
                background: #fff;
                border: 2px solid #0099FF;
                border-radius: 5px;
                text-align: center;
                padding: 10px;
                margin-bottom: 20px;
                max-width: 360px;
                width: 100%;
              }
              #streamingArea .viewingMethod2 .viewingBallon:after, #streamingArea .viewingMethod2 .viewingBallon:before {
                top: 100%;
                left: 12%;
                border: solid transparent;
                content: "";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
              }
              #streamingArea .viewingMethod2 .viewingBallon:after {
                border-color: rgba(255, 255, 255, 0);
                border-top-color: #fff;
                border-width: 10px;
                margin-left: -10px;
              }
              #streamingArea .viewingMethod2 .viewingBallon:before {
                border-color: rgba(0, 153, 255, 0);
                border-top-color: #0099FF;
                border-width: 13px;
                margin-left: -13px;
              }

              #streamingArea .viewingMethod2 .viewindFlex {
                display: flex;
                justify-content: center;
                align-items: flex-start;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem:not(:last-child) {
                margin-right: 40px;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem.app {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem.app a:not(:last-child) {
                margin-bottom: 10px;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex {
                display: flex;
                justify-content: flex-start;
                align-items: center;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex .img {
                margin-right: 20px;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex .text {
                font-size: 18px;
                font-weight: 500;
                line-height: 1.8;
                text-align: left;
                color: #000;
              }
              #streamingArea .viewingMethod2 .viewingNote {
                font-size: 14px;
                font-weight: 400;
                line-height: 1.8;
                max-width: max-content;
                margin: 20px auto 0;
                color: #000;
              }

              #streamingArea .viewingMethod2 .viewingPoint {
                border-top: 3px solid #222;
                padding-top: 30px;
                max-width: 660px;
                width: 100%;
                margin: 30px auto 0;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_tit {
                font-size: 24px;
                font-weight: 500;
                line-height: 1.35;
                text-align: center;
                margin-bottom: 20px;
                color: #000!important;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex {
                display: flex;
                justify-content: space-between;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem:not(:last-child){
                margin-right: 20px;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem {
                background: #fff;
                border-radius: 5px;
                border: 1px solid #D3D3D3;
                padding: 21px 32px 30px;
                width: calc(100%/2 - 10px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointTit {
                color: #0099FF;
                font-size: 18px;
                font-weight: 500;
                line-height: 1.8;
                text-align: center;
                border-bottom: 1px solid #D3D3D3;
                padding-bottom: 15px;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointText{
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.8;
                text-align: center;
                letter-spacing: -0.01rem;
                margin-top: 15px;
                color: #000;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointText span{
                color: #0099FF;
              }


              #streamingArea .viewingMethod {
                margin-top: 100px;
              }
              #streamingArea .viewingMethod .tit {
                display: flex;
                width: 100%;
                min-height: 80px;
                justify-content: center;
                align-items: center;
                font-size: 26px;
                line-height: 1.3;
                font-weight: bold;
                background: #C3000F;
                text-align: center;
                margin: 0 0 50px;
              }
              #streamingArea .viewingMethod .flexWrapper {
                display: flex;
                justify-content: center;
                text-align: center;
              }
              #streamingArea .viewingMethod .flexWrapper .box {
                max-width: 384px;
                width: 100%;
                margin: 0 auto;
                box-sizing: initial;
                padding: 0 5px;
              }
              #streamingArea .viewingMethod .flexWrapper .box:not(:last-child) {
                position: relative;
              }
              #streamingArea .viewingMethod .flexWrapper .box:not(:last-child)::after {
                content: "";
                background: #fff;
                width: 3px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
              }
              #streamingArea .viewingMethod .flexWrapper .box .img {
                margin-bottom: 32px;
              }
              #streamingArea .viewingMethod .flexWrapper .box .img img {
                max-width: 126px;
                height: auto;
              }
              #streamingArea .viewingMethod .flexWrapper .box .textExplain {
                font-size: 18px;
                line-height: 1.8;
                font-weight: 500;
              }
              #streamingArea .viewingMethod .flexWrapper .box .annotation {
                font-size: 14px;
                line-height: 1;
                margin: 20px 0 0;
              }
              #streamingArea .viewingMethod .streamingInfo {
                text-align: center;
                margin: 40px 0 0;
              }
              #streamingArea .viewingMethod .streamingInfo p.text {
                font-size: 18px;
                line-height: 1.8;
                font-weight: 500;
                margin: 0 0 30px;
              }
              #streamingArea .viewingMethod .streamingInfo .streamingIcon a {
                margin: 0 auto;
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


              .mustReadbox {
                background: #fff;
                color: #222222;
                box-sizing: border-box;
                border: 0.53vw solid #D3D3D3;
                margin: 0 5.33vw 13.33vw;
              }
              .mustReadbox dl {
                margin: 0;
              }
              .mustReadbox dl dt {
                position: relative;
                padding: 2.5vw 11.5vw 2.5vw 9vw;
                font-size: 3.7vw;
                font-weight: 500;
                cursor: pointer;
                text-align: center;
              }
              .mustReadbox dl dt::before {
                content: "";
                width: 6.66vw;
                height: 6.66vw;
                position: absolute;
                top: 50%;
                left: 5.92vw;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                background: url(/program/st/promo/generator_common/img/payment_icon01.png) no-repeat center center;
                background-size: contain;
              }
              .mustReadbox dl dt::after {
                content: "";
                width: 7.19vw;
                height: 7.19vw;
                background: #0099ff;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                right: 0vw;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
              }
              .mustReadbox dl dt > span::before {
                content: "";
                width: 4vw;
                height: 0.53vw;
                background: #ffffff;
                position: absolute;
                top: 50%;
                right: 3.13vw;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                z-index: 1;
              }
              .mustReadbox dl dt > span::after {
                content: "";
                width: 4vw;
                height: 0.53vw;
                background: #ffffff;
                position: absolute;
                top: 50%;
                right: 3.13vw;
                -webkit-transform: translate(-50%, -50%) rotate(-90deg);
                -ms-transform: translate(-50%, -50%) rotate(-90deg);
                transform: translate(-50%, -50%) rotate(-90deg);
                transition: all .5s;
                z-index: 1;
              }
              .mustReadbox dl dt.active > span::after {
                -webkit-transform: translate(-50%, -50%) rotate(0deg);
                -ms-transform: translate(-50%, -50%) rotate(0deg);
                transform: translate(-50%, -50%) rotate(0deg);
              }
              .mustReadbox dl dd {
                display: none;
                padding: 0;
                color: #888;
                font-size: 3.4vw;
                line-height: 1.57;
                border-top: 1px solid #0099ff;
              }
              .mustReadbox dl dd .cautionTable {
                border: none;
                width: 100%;
                border-spacing: 0px;
                margin: 0 auto;
              }
              .mustReadbox dl dd .cautionTable th {
                background-color: #09f;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                color: #fff;
                padding: 3vw 1vw;
                width: 25%;
              }
              .mustReadbox dl dd .cautionTable td {
                font-size: 3vw;
                padding: 1.4vw;
                border-bottom: 1px solid #ccc;
              }
              .mustReadbox dl dd .cautionTable td .icon_type_01, .mustReadbox dl dd .cautionTable td .icon_type_02 {
                margin: 0.8vw 0 0;
                padding: 0 0 0 1rem;
                color: #888;
                line-height: 1.57;
              }
              .mustReadbox dl dd .cautionTable td .icon_type_01::before {
                content: "※";
                margin-left: -1rem;
              }
              .mustReadbox dl dd .cautionTable tr:last-child th,
              .mustReadbox dl dd .cautionTable tr:last-child td {
                border-bottom: none;
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



              #priceArea {
                background: #1B1B1B;
                padding: 24vw 0;
              }
              #priceArea .subTitle {
                background: #C3000F;
                display: block;
                width: 100%;
                min-height: 29.46vw;
                font-size: 5.33vw;
                line-height: 1.5;
                font-weight: bold;
                padding: 4.53vw 5.33vw 5.2vw;
                margin: 0 0 9.33vw;
                text-align: center;
              }
              #priceArea .subTitle span.textLarge {
                font-size: 8vw;
                line-height: 1.1;
              }
              #priceArea .subTitle span.price {
                font-family: 'Roboto', sans-serif;
                font-size: 14.93vw;
                line-height: 1.3;
                font-weight: 500;
              }
              #priceArea .priceInfo2 .subTitle {
                width: 89.33vw;
                margin: 0 auto 8vw;
              }
              #priceArea .priceInfo1 {
                padding: 0 5.33vw;
              }
              #priceArea .priceInfo:not(:last-child) {
                padding-bottom: 9.33vw;
              }
              #priceArea .priceTable {
                display: flex;
                flex-direction: column;
                gap: 12.8vw;
                margin: 0 0 13.33vw;
                position: relative;
              }
              #priceArea .priceTable::after {
                content: "";
                display: inline-block;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                transform: rotate(90deg);
                margin: auto;
                width: 0;
                height: 0;
                border-style: solid;
                border-top: 7.19vw solid transparent;
                border-bottom: 7.19vw solid transparent;
                border-left: 5.33vw solid #fff;
                border-right: 0;
              }
              #priceArea .priceTable .priceBox {
                width: 100%;
                background: #C3000F;
              }
              #priceArea .priceTable .tit {
                background: #E60012;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 13.33vw;
                font-size: 4.8vw;
                font-weight: 500;
                line-height: 1.8;
                text-align: center;
              }
              #priceArea .priceTable .fee {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 3.46vw;
                line-height: 1.3;
                font-weight: bold;
                min-height: 21.86vw;
                margin: 0 6.13vw;
                padding: 0 4.6vw;
              }
              #priceArea .priceTable .viewingFee {
                border-bottom: 0.26vw solid #fff;
              }
              #priceArea .priceTable .fee .flag {
                color: #E60012;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 15.46vw;
                height: 6.93vw;
                font-size: 3.73vw;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .priceTable .fontLearge {
                font-size: 13.33vw;
                line-height: 1.3;
              }
              #priceArea .priceTable .fontMedium {
                font-size: 6.93vw;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .priceTable .text {
                font-size: 4.8vw;
                line-height: 1.5;
                font-weight: bold;
              }

              #priceArea .chFee {
                margin-bottom: 13.33vw;
              }
              #priceArea .chFee .tit {
                font-size: 4.8vw;
                line-height: 1.8;
                font-weight: bold;
                text-align: center;
                margin: 0 0 5.33vw;
              }
              #priceArea .chFee2 .tit img {
                width: auto;
                height:  9.46vw;
                margin-right: 1.33vw;
              }
              #priceArea .chFee .viewingFee {
                display: flex;
                flex-direction: column;
                gap: 1.33vw;
                text-align: center;
              }
              #priceArea .chFee .viewingFee .flag {
                font-size: 5.33vw;
                line-height: initial;
                font-weight: bold;
                width: 100%;
                padding: 2.66vw 1.39vw;
                border-radius: 1.6vw;
                text-align: center;
                margin: 0 auto;
                word-break: break-all;
              }
              #priceArea .chFee2 .viewingFee .flag {
                background: #0099FF!important;
                color: #fff!important;
              }
              #priceArea .chFee .viewingFee .price {
                font-size: 5.33vw;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee .viewingFee .price .fontLearge {
                font-size: 13.33vw;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee2 .viewingFee .price .fontLearge {
                color: #0099FF!important;
              }
              #priceArea .chFee .viewingFee .price .fontSmall {
                font-size: 3.46vw;
                line-height: 1.3;
                font-weight: bold;
              }
              #priceArea .chFee .annotation {
                font-size: 4vw;
                line-height: 1.5;
                text-align: center;
                margin-top: 2.66vw;
              }
              .chFee .mustReadbox {
                width: 100%;
                margin: 2.66vw auto 0;
                display: none;
              }
              #priceArea .flexWrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 8vw;
              }
              #priceArea .priceInfo2 .flexWrapper {
                padding: 0 5.33vw;
              }
              #priceArea .flexWrapper .c-btn {
                width: 100%;
              }
              #priceArea .flexWrapper .c-btn a {
                max-width: none;
                width: 100%;
                font-size: 4.26vw;
                line-height: 1.5;
                margin: 0 auto;
              }
              #priceArea .priceInfo1 .flexWrapper .c-btn a {
                height: 21.33vw;
                border: 0.53vw solid;
              }
              #priceArea .priceInfo2 .flexWrapper .c-btn a {
                height: 16vw;
              }
              .fw .flexWrapper .c-btn--blueline a:after, .fw .flexWrapper .c-btn--blueline button:after {
                background: url(/global/assets/images/icon/icon_arrow-a_blue.svg) no-repeat center center;
                background-size: 100% auto;
                width: 5.33vw;
                height: 5.33vw;
                right: 4vw;
              }

              #priceArea .priceInfo2 .img {
                display: flex;
                justify-content: center;
                margin: 0 0 9.33vw;
              }
              #priceArea .priceInfo2 .img img {
                width: 96vw;
                margin: 0 auto;
              }



              #streamingArea {
                padding: 24vw 0;
              }
              #streamingArea .text {
                font-size: 4vw;
                line-height: 1.8;
                text-align: left;
              }
              #streamingArea .annotion {
                font-size: 3.46vw;
                line-height: 1.8;
                text-align: left;
                margin: 4vw 0 9.33vw;
              }
              #streamingArea h4 {
                font-size: 5.33vw;
                line-height: 1.8;
                font-weight: 500;
                margin-top: 9.33vw;
                margin-bottom: 8vw;
                text-align: center;
              }
              #streamingArea .viewingMethod2 + .img.osusumePoint {
                margin-top: 9.33vw;
              }
              #streamingArea .img {
                display: flex;
                justify-content: center;
              }


              #streamingArea .viewingMethod2 .viewingBallon {
                color: #0099FF;
                background: #fff;
                font-size: 4vw;
                font-weight: 500;
                line-height: normal;
                position: relative;
                border: 0.53vw solid #0099FF;
                border-radius: 1.33vw;
                text-align: center;
                padding: 1.73vw;
                margin-bottom: 4.53vw;
              }
              #streamingArea .viewingMethod2 .viewingBallon:after, #streamingArea .viewingMethod2 .viewingBallon:before {
                top: 100%;
                left: 8vw;
                border: solid transparent;
                content: "";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
              }
              #streamingArea .viewingMethod2 .viewingBallon:after {
                border-color: rgba(255, 255, 255, 0);
                border-top-color: #fff;
                border-width: 2.66vw;
                margin-left: -2.66vw;
              }
              #streamingArea .viewingMethod2 .viewingBallon:before {
                border-color: rgba(0, 153, 255, 0);
                border-top-color: #0099FF;
                border-width: 3.46vw;
                margin-left: -3.46vw;
              }
              #streamingArea .viewingMethod2 {
                border: 0.53vw solid #D3D3D3;
                background: #F6F6F6;
                border-radius: 3.2vw;
                padding: 8vw 4vw;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem:not(:last-child) {
                margin-bottom: 5.33vw;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem.app {
                display: flex;
              }
              #streamingArea .viewingMethod2 .viewindFlex .viewingItem.app a:not(:last-child) {
                margin-right: 2.66vw;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex {
                display: flex;
                justify-content: flex-start;
                align-items: center;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex .img {
                margin-right: 2.66vw;
                width: 16vw;
                height: auto;
              }
              #streamingArea .viewingMethod2 .viewindFlex .innerFlex .text {
                font-size: 4.8vw;
                font-weight: 500;
                line-height: 1.6;
                text-align: left;
                letter-spacing: -0.01rem;
                color: #000;
              }
              #streamingArea .viewingMethod2 .viewingNote {
                font-size: 3.46vw;
                font-weight: 400;
                line-height: 1.8;
                margin-top: 5.33vw;
                color: #000;
              }
              #streamingArea .viewingItem.app{
                display: flex;
                justify-content: space-between;
              }
              #streamingArea .viewingItem.app a:not(:last-child){
                margin-right: 2.66vw;
              }
              #streamingArea .viewingItem.app a{
                width: calc(100%/2 - 1.33vw);
              }

              #streamingArea .viewingMethod2 .viewingPoint {
                margin-top: 16.53vw;
                position: relative;
              }
              #streamingArea .viewingMethod2 .viewingPoint::before{
                content: "";
                position: absolute;
                top: -8vw;
                left: -4.33vw;
                width: calc(100vw - 10.66vw);
                margin: 0 auto;
                height: 0.53vw;
                background: #222;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_tit {
                font-size: 5.6vw;
                font-weight: 500;
                line-height: 1.35;
                text-align: center;
                margin-bottom: 5.33vw;
                color: #000!important;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem:not(:last-child){
                margin-bottom: 3.33vw;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem {
                background: #fff;
                border-radius: 1.33vw;
                border: 0.13vw solid #707070;
                padding: 4.66vw 3.33vw 6.66vw;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointTit {
                color: #0099FF;
                font-size: 4.8vw;
                text-align: center;
                border-bottom: 0.26vw solid #D3D3D3;
                padding-bottom: 4vw;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointText{
                font-size: 4.26vw;
                font-weight: 500;
                line-height: 1.6;
                text-align: center;
                margin-top: 4vw;
                color: #000;
              }
              #streamingArea .viewingMethod2 .viewingPoint .viewingPoint_flex .viewingPoint_flexItem .pointText span{
                color: #0099FF;
              }


              #streamingArea .viewingMethod {
                margin-top: 16vw;
              }
              #streamingArea .viewingMethod .tit {
                font-size: 5.33vw;
                line-height: 1.5;
                font-weight: bold;
                background: #C3000F;
                padding: 4.53vw 0 5.2vw;
                text-align: center;
                margin: 0 0 9.33vw;
              }
              #streamingArea .viewingMethod .flexWrapper {
                display: flex;
                flex-direction: column;
                text-align: center;
              }
              #streamingArea .viewingMethod .flexWrapper .box {
                width: 100%;
                margin: 0 auto;
                box-sizing: initial;
              }
              #streamingArea .viewingMethod .flexWrapper .box:not(:last-child) {
                padding-bottom: 60px;
                margin-bottom: 60px;
                position: relative;
              }
              #streamingArea .viewingMethod .flexWrapper .box:not(:last-child)::after {
                content: "";
                display: inline-block;
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                width: 89.33vw;
                height: 0.8vw;
                background: #fff;
              }
              #streamingArea .viewingMethod .flexWrapper .box .flexInner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 5.33vw;
              }
              #streamingArea .viewingMethod .flexWrapper .box .img img {
                width: 26.66vw;
                height: auto;
              }
              #streamingArea .viewingMethod .flexWrapper .box .textExplain {
                max-width: 57.33vw;
                font-size: 4.8vw;
                line-height: 1.8;
                font-weight: 400;
                text-align: left;
              }
              #streamingArea .viewingMethod .flexWrapper .box .annotation {
                font-size: 3.46vw;
                line-height: 1.7;
                margin: 4vw 0 0;
              }
              #streamingArea .viewingMethod .streamingInfo {
                text-align: center;
                margin: 13.33vw 0 0;
              }
              #streamingArea .viewingMethod .streamingInfo p.text {
                font-size: 4.8vw;
                line-height: 1.8;
                font-weight: 500;
                margin: 0 0 8vw;
              }
              #streamingArea .viewingMethod .streamingInfo .streamingIcon a {
                margin: 0 auto;
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


            @media (min-width: 769px) and (max-width: 900px){
              #streamingArea .viewingMethod .flexWrapper .box {
                max-width: 42.66vw;
              }
              #streamingArea .viewingMethod .flexWrapper .box:not(:last-child)::after {
                width: 0.33vw;
                height: 100%;
              }
              #streamingArea .viewingMethod .flexWrapper .box .img {
                margin-bottom: 3.55vw;
              }
              #streamingArea .viewingMethod .flexWrapper .box .img img {
                max-width: 14vw;
                height: auto;
              }
              #streamingArea .viewingMethod .flexWrapper .box .textExplain {
                font-size: 2vw;
              }
              #streamingArea .viewingMethod .flexWrapper .box .annotation {
                font-size: 1.55vw;
                margin: 2.22vw 0 0;
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