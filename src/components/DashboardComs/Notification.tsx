import React from 'react';
import flexrateExplain from '../../assets/imgs/flexrateExplain.png';
import { styled } from 'styled-components';

const Notification = () => {
  return (
    <Dash.Wrapper>
      <Dash.TopText>정교한 분석</Dash.TopText>
      <div>
        <Dash.MainText>또래와의 배교를 통해</Dash.MainText>
        <Dash.MainText>
          <ColorText>더 똑똑한 금융 결정</ColorText>을 도와드려요
        </Dash.MainText>
      </div>
      <Dash.ExplainText>
        Flex Rate는 내 또래의 직장 유형과 금융 상품 선택 현황을 분석한 맞춤형
        통계 프로그램을 제공해요. 이를 통해 자신의 금융 상황을 또래와 비교하여
        더 나은 의사 결정을 도와드리고 있어요.
      </Dash.ExplainText>
      <img src={flexrateExplain} alt="이모지" />
    </Dash.Wrapper>
  );
};

const Dash = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    background-color: #e8f7f7;

    & img {
      width: 100%;
    }
  `,
  TopText: styled.p`
    color: var(--Black, #262626);
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 700;
  `,
  MainWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  MainText: styled.p`
    color: var(--Black, #262626);
    font-family: Pretendard;
    font-size: 1.7rem;
    font-weight: 700;
  `,
  ExplainText: styled.p`
    color: #8d96a1;
    font-family: Pretendard;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.8rem;
    margin: 2rem 0 4.8rem;
  `,
};

const ColorText = styled.span`
  color: #1fa3a3;
`;

export default Notification;
