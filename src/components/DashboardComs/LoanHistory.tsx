import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../styles/CustomTooltip.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CoachMarkStage } from '@/state/CoachMarkStage';
import Tooltip5 from '../CoachMarksComs/Tooltip5';
import { userInfo } from '@/state/userInfo';
import TransverseGraph from './TransverseGraph';
import { SubTitle } from '@/styles/MypageStyle';

const Container = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* border: 1px solid #d9d9d9; */
  outline: 1px solid var(--Gray3, #d9d9d9);
  outline-offset: -1px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  padding: 2.8rem;

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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    color: #595959;
    padding-bottom: 0.75em;
  }
`;
const Num = styled.span`
  color: #21272d;
  font-size: 3rem;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
`;
const Per = styled.span`
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  margin-right: 0.4em;
`;
const Text = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  color: #8c8c8c;
  margin-right: 5em;
`;
const Chart = styled.div`
  width: 100%;
`;

interface ChartFunctionParams {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: {
    globals: {
      labels: string[];
    };
    // ...w에 대한 추가적인 타입 정의
  };
}

const LoanHistory = () => {
  const [coachMark, setCoachMark] = useRecoilState(CoachMarkStage);
  const data = useRecoilValue(userInfo);

  // stage 값에 접근
  const { stage, mode } = coachMark;

  // stage 값을 업데이트하는 함수
  const updateStage = (newStage: number) => {
    setCoachMark({ ...coachMark, stage: newStage });
  };

  let isVisible = mode && stage === 4;
  const changes = data.changes;
  const lineData = changes.map((item) => item.change_loan_initial);

  return (
    <Container $isVisible={isVisible}>
      <Wrapper>
        <p>또래의 대출 금리 범위와 나의 금리 범위 위치</p>
        <div>
          <Num>{`0 ~ 21`}</Num>
          <Per>%</Per>
          <Text>20대 여자</Text>
          <Num>{`8 ~ 12`}</Num>
          <Per>%</Per>
          <Text>나의 범위</Text>
        </div>
      </Wrapper>
      <TransverseGraph value={10} min={0} max={100} />
      <StLabelWrapper>
        <StLabelContainer>
          <StCircle />
          <StLabel>내 상품의 금리 범위</StLabel>
        </StLabelContainer>
        <StLabelContainer>
          <StbasicCircle />
          <StLabel>대출 상품을 가입한 20대 여자의 평균 금리 범위</StLabel>
        </StLabelContainer>
      </StLabelWrapper>
      {isVisible && <Tooltip5 />}
    </Container>
  );
};

export default LoanHistory;

const StLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StLabelContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: #5bc569;
`;

const StLabel = styled.p`
  color: #87898d;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StbasicCircle = styled(StCircle)`
  background-color: #f6f7f8;
`;
