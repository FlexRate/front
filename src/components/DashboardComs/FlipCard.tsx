import React, { useState } from 'react';
import styled from 'styled-components';
import flip1 from '@/assets/imgs/Flip1.png';
import upCircle from '../../assets/imgs/upCircle.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CoachMarkStage } from '@/state/CoachMarkStage';
import Tooltip3 from '../CoachMarksComs/Tooltip3';

import { LoanInfo } from '@/state/LoanInfo';
import { output } from '@/state/output';
import { userInfo } from '@/state/userInfo';
import { SubTitle } from '@/styles/MypageStyle';

const FlipCard: React.FC = () => {
  const Info = useRecoilValue(LoanInfo);
  const outputValue = useRecoilValue(output);
  const score = Math.floor(outputValue.Score);

  const [coachMark, setCoachMark] = useRecoilState(CoachMarkStage);
  const data = useRecoilValue(userInfo);

  // stage 값에 접근
  const { stage, mode } = coachMark;

  // stage 값을 업데이트하는 함수
  const updateStage = (newStage: number) => {
    setCoachMark({ ...coachMark, stage: newStage });
  };

  let isVisible = mode && stage === 2;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer $isVisible={isVisible}>
      <CardBack>
        <StTitle>1:1 맞춤 금리</StTitle>
        <StLayout>
          <StP1>
            <StStrong>60만 건의 데이터</StStrong>에 기반해
          </StP1>
          <StP1>합리적인 대출 상품을 제안해요. </StP1>
        </StLayout>
        <StLayout>
          <StP>약 60만 건의 실제 금융 가명 정보를 활용한 빅데이터</StP>
          <StP>분석 모델로, 개인의 연소득, 주거형태, 고용형태, 입사년도 </StP>
          <StP>나이, 성별 등 다양한 요소를 종합적으로 고려하여 </StP>
          <StP>개인 맞춤형 대출 상품을 제안드려요. </StP>
        </StLayout>
      </CardBack>
      {isVisible && <Tooltip3 />}
    </CardContainer>
  );
};

export default FlipCard;

const CardContainer = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;

  z-index: ${({ $isVisible }) => ($isVisible ? '10' : '1')};
  //코치마크

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px; /* 테두리 바깥쪽 영역 */
    z-index: ${({ $isVisible }) =>
      $isVisible ? '-1' : '0'}; /* div 뒤에 배치 */
    background-color: #fff;
    border-radius: 10px;
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  color: white;
`;

const CardBack = styled(CardFace)`
  background-color: #fefcf2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.7rem 2.4rem;
`;

const StTitle = styled.p`
  color: var(--Black, #262626);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.8rem 0 1.8rem;
`;

const StStrong = styled.span`
  color: #77645e;
`;

const StP1 = styled.p`
  color: var(--Black, #262626);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StP = styled.p`
  color: #8d96a1;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
