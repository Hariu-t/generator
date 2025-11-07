import React from 'react';

const Footer: React.FC = () => {
  return (
    // <footer id="footer">
    //   <div className="c-breadcrumb">
    //       <div className="c-breadcrumb__logo"><a href="/"><img src="https://www.skyperfectv.co.jp/global/assets/images/logo/logo_white.svg" alt="スカパー！"/></a>
    //       </div>
    //       <ul className="c-breadcrumb-list">
    //       <li><a href="/program/">番組を探す</a></li>
    //       <li><a href="/program/special">特集ページ</a></li>
    //       <li><span>シリーズ10年の歴史がついに完結！ジェームズ・スぺイダー主演「ブラックリスト ファイナル・シーズン」独占日本初放送！</span></li>
    //   </ul>
    //   </div>
    //   <script src="/global/assets/js/global.js"></script>
    //   <script src="/global/assets/js/jquery.min.js"></script>
    // </footer>
    <footer id="footer">
      <div className="c-breadcrumb">
          {/* <div className="c-breadcrumb__logo"><a href="/"><img src="https://www.skyperfectv.co.jp/global/assets/images/logo/logo_white.svg" alt="スカパー！"/></a>
          </div> */}
          <ul className="c-breadcrumb-list">
          <li><a href="#">番組を探す</a></li>
          <li><a href="#">特集ページ</a></li>
          <li><span>シリーズ10年の歴史がついに完結！ジェームズ・スぺイダー主演「ブラックリスト ファイナル・シーズン」独占日本初放送！</span></li>
      </ul>
      </div>
      <script src="/global/assets/js/global.js"></script>
      <script src="/global/assets/js/jquery.min.js"></script>
    </footer>
  );
};
export default Footer;