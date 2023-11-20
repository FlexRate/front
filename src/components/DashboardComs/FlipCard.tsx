import React, { useState } from 'react';
import styled from 'styled-components';
import flip1 from '@/assets/imgs/Flip1.png';
import upCircle from '../../assets/imgs/upCircle.png';

const CardContainer = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const CardFlipper = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const CardFront = styled(CardFace)`
  display: flex;
  flex-direction: column;
  gap: 0.85em;
  color: black;
  & > div {
    /* border: 1px solid #d9d9d9; */
    outline: 1px solid var(--Gray3, #d9d9d9);
    border-radius: 8px;
    width: 99%;
    height: 45.5%;
    display: flex;
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  width: 90%;
  padding: 22px 21px;
  & > h1 {
    color: #595959;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
  }
  & > div {
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.2em;
    margin-bottom: 0.5em;
    & > span {
      display: flex;
      align-items: center;
      gap: 0.2em;
      & > h2 {
        font-family: SUIT;
        font-size: 28px;
        font-weight: 700;
        line-height: 35px;
      }
      & > h3 {
        font-family: SUIT;
        font-size: 13px;
        font-weight: 600;
        line-height: 16px;
        margin-top: 0.8em;
      }
      & > h4 {
        font-family: Pretendard;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
        color: #8c8c8c;
        margin-top: 0.9em;
      }
      & > h5 {
        font-family: SUIT;
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        color: #51b13a;
        margin-top: 0.8em;
      }
      & > h6 {
        font-family: Pretendard;
        font-size: 10px;
        font-weight: 600;
        line-height: 12px;
        color: #bfbfbf;
        margin-top: 1.1em;
      }
      & > img {
        width: 0.7em;
        height: 0.7em;
        margin-top: 0.4em;
      }
    }
  }
`;
const RateBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 87%;
  padding: 0.5em 1em;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  text-align: center;
  color: #414141;
  border: none;
  border-radius: 5px;
  background-color: #f4f4f4;
`;
const ScoreBox = styled(RateBox)`
  color: #51b13a;
  background-color: #e3f5ee;
  color: #397356;
  & > div {
    color: #63c393;
  }
`;

const CardBack = styled(CardFace)`
  background-color: #e8f7f7;
  background-image: url(${flip1});
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotateY(180deg);
`;

const FlipCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer onClick={handleClick} $isFlipped={isFlipped}>
      <CardFlipper $isFlipped={isFlipped}>
        <CardFront>
          <div>
            <Wrapper>
              <h1>나의 대출 금리</h1>
              <div>
                <span>
                  <h2>12</h2>
                  <h3>%</h3>
                  <h4>이번 분기 기준</h4>
                </span>
                <span>
                  <img src={upCircle} alt="" />
                  <h5>3%</h5>
                  <h6>전달 대비</h6>
                </span>
              </div>

              <RateBox>💵 연봉이 오르면 금리가 저렴해진다?</RateBox>
            </Wrapper>
          </div>
          <div>
            <Wrapper>
              <h1>나의 신용 평가 점수</h1>
              <div>
                <span>
                  <h2>640</h2>
                  <h3>점</h3>
                </span>
                <span>
                  <h5>상위 68%</h5>
                </span>
              </div>
              <ScoreBox>
                NICE 신용평가점수보다 약 <div>220점</div> 더 높게 평가 받았어요
              </ScoreBox>
            </Wrapper>
          </div>
        </CardFront>
        <CardBack></CardBack>
      </CardFlipper>
    </CardContainer>
  );
};

export default FlipCard;
