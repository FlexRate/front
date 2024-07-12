import { styled } from 'styled-components';
import payback from '../../assets/imgs/paybackTag.png';
import TransverseGraph from './TransverseGraph';
import AmountSection from './AmountSection';

import { useRecoilState, useRecoilValue } from 'recoil';
import { CoachMarkStage } from '@/state/CoachMarkStage';
import { LoanInfo } from '@/state/LoanInfo';
import { output } from '@/state/output';
import Tooltip4 from '../CoachMarksComs/Tooltip4';
import { userInfo } from '@/state/userInfo';
import { SubTitle } from '@/styles/MypageStyle';
import { GraphMonk } from '@/assets/svgs/0_index';

const LoanTobepaid = () => {
  const [coachMark, setCoachMark] = useRecoilState(CoachMarkStage);
  const info = useRecoilValue(LoanInfo);
  const outputVal = useRecoilValue(output);
  const data = useRecoilValue(userInfo);

  const monthPeriod = data.loan_repay_term * 12;

  //원금 이자 계산
  const amount = Math.floor(data.loan_request / monthPeriod); //총액 / 개월수
  const interestVal = Math.floor(
    (data.loan_request * data.loan_initial) / (monthPeriod * 100),
  ); //총액 *금리 / 개월수

  const paidtoAmount = amount + interestVal;

  // stage 값에 접근
  const { stage, mode } = coachMark;

  // stage 값을 업데이트하는 함수
  const updateStage = (newStage: number) => {
    setCoachMark({ ...coachMark, stage: newStage });
  };

  let isVisible = mode && stage === 3;

  return (
    <>
      <Dash.Wrapper $isVisible={isVisible}>
        <Dash.Container>
          <Dash.Title>나의 대출 변동 금리 범위</Dash.Title>
          <Dash.SubTitle>
            기준 · 사용자 입력 데이터 기반 ML모델 예측
          </Dash.SubTitle>
          <div>
            <Big>{`8 ~ 12`}</Big>
            <span>%</span>
          </div>
          <STGraphMonk />
        </Dash.Container>
        <Dash.Container>
          <Dash.Title>내 또래의 업직종 구성</Dash.Title>
          <Dash.SubTitle>기준 · 나이대별 직종</Dash.SubTitle>
          <StyleUL>
            <StyleLi>
              <ListStyle>1</ListStyle>
              <ListContent>서비스업</ListContent>
              <Box $backgroundColor="#FAF1F3">25.2%</Box>
            </StyleLi>
            <StyleLi>
              <ListStyle>2</ListStyle>
              <ListContent>서비스업</ListContent>
              <Box $backgroundColor="#FAF1F3">25.2%</Box>
            </StyleLi>
            <StyleLi>
              <ListStyle>3</ListStyle>
              <ListContent>서비스업</ListContent>
              <Box $backgroundColor="#FAF1F3">25.2%</Box>
            </StyleLi>
            <StyleLi>
              <ListStyle>4</ListStyle>
              <ListContent>서비스업</ListContent>
              <Box $backgroundColor="#FAF1F3">25.2%</Box>
            </StyleLi>
            <StyleLi>
              <ListStyle>5</ListStyle>
              <ListContent>서비스업</ListContent>
              <Box $backgroundColor="#FAF1F3">25.2%</Box>
            </StyleLi>
          </StyleUL>
        </Dash.Container>
        {isVisible && <Tooltip4 />}
      </Dash.Wrapper>
    </>
  );
};

const Dash = {
  Wrapper: styled.div<{ $isVisible: boolean }>`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    /* border: 1px solid var(--Gray3, #d9d9d9); */
    /* outline: 1px solid var(--Gray3, #d9d9d9); */
    outline-offset: -1px; /* 내부로 2px 만큼 옮김 */
    /* padding: 22px; */
    display: flex;
    gap: 1.5rem;
    z-index: ${({ $isVisible }) => ($isVisible ? '10' : '1')};
    //코치마크

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px; /* 테두리 바깥쪽 영역 */
      z-index: ${({ $isVisible }) =>
        $isVisible ? '-1' : 'none'}; /* div 뒤에 배치 */
      background-color: #fff;
      border-radius: 10px;
      display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
    }

    .amount-section {
      display: flex;
    }
  `,
  Container: styled.div`
    position: relative;
    outline: 1px solid var(--Gray3, #d9d9d9);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 2.8rem 2.5rem;
    gap: 0.8rem;
  `,
  Title: styled.p`
    color: #4f5561;
    font-family: Pretendard;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  SubTitle: styled.p`
    color: var(--Gray5, #a6a6a6);
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0.8rem 0 1.5rem;
  `,
  LoanPrice: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    & > img {
      width: 90px;
      margin-bottom: 0.25rem;
    }
  `,

  Grape: styled.div``,
};

const Big = styled.span`
  color: #21272d;
  font-family: SUIT;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const StyleUL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyleLi = styled.li`
  display: flex;
  gap: 1.6rem;
`;

const ListStyle = styled.span`
  color: var(--Gray7, #737373);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  padding-right: 0.2rem;
`;

const ListContent = styled.span`
  color: #21272d;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Box = styled.span<{ $backgroundColor: string }>`
  //color background color prop으로
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 5px;
  background-color: ${(props) => props.$backgroundColor};
  color: #d96c87;
  padding: 3px 5px;
`;

const STGraphMonk = styled(GraphMonk)`
  position: absolute;
  bottom: 5.4rem;
  right: 3.2rem;
`;

export default LoanTobepaid;
