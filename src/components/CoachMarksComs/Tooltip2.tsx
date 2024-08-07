import React from 'react';
import styled, { css } from 'styled-components';
import * as S from '@/styles/CoachMarkStyles';
import { useRecoilState } from 'recoil';
import { CoachMarkStage } from '@/state/CoachMarkStage';

interface TooltipProps {
  $directionIndex: number; // 화살표 방향을 나타내는 인덱스
}

const arrow = [
  {
    top: '100%',
    left: '50%',
    marginLeft: '-5px', // 화살표의 폭에 따라 조정 가능
    borderColor: 'black transparent transparent transparent',
  },
  {
    bottom: '100%',
    right: '50%',
    marginLeft: '-5px', // 화살표의 폭에 따라 조정 가능
    borderColor: 'transparent transparent black transparent',
  },
  {
    top: '50%',
    left: '100%',
    marginTop: '-5px', // 화살표의 높이에 따라 조정 가능
    borderColor: 'transparent black transparent transparent',
  },
  {
    top: '50%',
    right: '100%',
    marginTop: '-5px', // 화살표의 높이에 따라 조정 가능
    borderColor: 'transparent transparent transparent black',
  },
];

const Tooltip2 = () => {
  const [state, setState] = useRecoilState(CoachMarkStage);
  const { stage, totalStage } = state;
  return (
    <TooltipContainer $directionIndex={1}>
      <S.TooltipText>
        <div>입력한 정보를 바탕으로 산출된</div>
        <div>
          <S.PointColorText>맞춤형 대출 상품</S.PointColorText> 이에요!
        </div>
      </S.TooltipText>
      <S.TooltipFooter>
        <span className="stageStatus">
          {stage}/{totalStage}
        </span>
        <S.Btn
          onClick={(e) => {
            e.preventDefault();
            setState((prev) => ({
              ...prev,
              stage: stage + 1,
            }));
          }}
        >
          다음
        </S.Btn>
      </S.TooltipFooter>
      <Xbtn
        onClick={(e) => {
          e.preventDefault();
          setState((prev) => ({
            ...prev,
            mode: false,
          }));
        }}
      >
        x
      </Xbtn>
    </TooltipContainer>
  );
};

const Xbtn = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const TooltipContainer = styled.span<TooltipProps>`
  /* 기본 스타일 */
  visibility: visible;
  box-sizing: border-box;
  width: 298px;
  height: 130px;
  background-color: black;
  color: white;
  border-radius: 13px;
  padding: 20px;
  position: absolute;
  z-index: 20;
  bottom: -15rem;
  left: 20rem;

  &::after {
    content: '';
    position: absolute;
    border-width: 5px;
    border-style: solid;

    /* 화살표 위치 스타일 조정 */
    ${({ $directionIndex }) => css`
      ${arrow[$directionIndex]}
    `}
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Tooltip2;
