import { createGlobalStyle } from 'styled-components';
import PretendardExtraLight from './assets/fonts/Pretendard/Pretendard-Light.woff2';
import PretendardRegular from './assets/fonts/Pretendard/Pretendard-Regular.woff2';
import PretendardBold from './assets/fonts/Pretendard/Pretendard-Bold.woff2';
import PretendardExtraBold from './assets/fonts/Pretendard/Pretendard-ExtraBold.woff2';

const GlobalStyle = createGlobalStyle`

  html {
    font-size: 62.5%;
  }

  *{
    box-sizing: border-box;
  }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 200;
        src: url(${PretendardExtraLight}) format('woff2');    
        /* unicode-range: U+AC00-D7A3; */
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        src: url(${PretendardRegular}) format('woff2');    
        /* unicode-range: U+AC00-D7A3; */
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        src: url(${PretendardBold}) format('woff2');    
        /* unicode-range: U+AC00-D7A3; */
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        src: url(${PretendardExtraBold}) format('woff2');    
        /* unicode-range: U+AC00-D7A3; */
    }

    @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

    body {
    font-family: 'Pretendard','SUIT',serif;
    
    
    
}
`;

export default GlobalStyle;
