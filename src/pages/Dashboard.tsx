import MainSidebar from '@/components/MainSidebar';
import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import DashHeader from '@/components/DashboardComs/DashHeader';

import LoanTobepaid from '@/components/DashboardComs/LoanTobepaid';
import RateChange from '@/components/DashboardComs/RateChange';
import Notification from '@/components/DashboardComs/Notification';
import LoanHistory from '@/components/DashboardComs/LoanHistory';
import Test from '@/components/DashboardComs/FlipCard';
import axiosInstance from '@/apis/axiosinstance';

import { useRecoilState, useRecoilValue } from 'recoil';
import { CoachMarkStage } from '@/state/CoachMarkStage';
import { ShowCoachMark } from '@/state/CoachMarkStage';
import { userInfo } from '@/state/userInfo';

const useNarrowScreen = () => {
  // 초기 상태 설정
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth > 1300,
  );

  useEffect(() => {
    // 화면 크기 변경 시 호출될 함수
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth > 1300);
    };
    window.addEventListener('resize', handleResize); // 이벤트 리스너 추가
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isNarrowScreen;
};

/**대시보드 페이지 */
const Dashboard = () => {
  const [coachMark, setCoachMark] = useRecoilState(CoachMarkStage);

  // stage 값에 접근
  const { mode } = coachMark;

  const isNarrowScreen = useNarrowScreen();

  //처음 Dashboard시작시 코지마크 실행
  const [showCoachMark, setShow] = useRecoilState(ShowCoachMark);
  const { beginer } = showCoachMark;
  const [data, setData] = useRecoilState(userInfo);
  const { loan_payment_count } = data;

  useEffect(() => {
    console.log(
      localStorage.getItem('accessToken'),
      beginer,
      loan_payment_count,
    );
    if (!localStorage.getItem('accessToken') || beginer === true) {
      //처음이면(coachMark를 보여줘야하면)
      setCoachMark((prevCoachMark) => ({
        ...prevCoachMark,
        stage: 1,
        mode: true,
      }));
    }
  }, [beginer]);

  //서버에서 정보 가져오기

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const memberId = localStorage.getItem('memberid');
    //서버통신
    await axiosInstance
      .get(`/main/dashboard/${memberId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.loan_request) {
          setData(res.data);
          const change = res.data.changes;
        } else {
          setShow(() => ({
            beginer: true,
          }));
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log(data);
  return (
    <Wrapper $isNarrowScreen={isNarrowScreen} $isVisible={mode}>
      {isNarrowScreen ? <MainSidebar /> : <></>}
      <MainDashBoard $isNarrowScreen={isNarrowScreen}>
        <div id="Date"></div>
        <GridContainer>
          <div className="item1">
            <DashHeader />
          </div>
          {/*대출상품, 상환날짜, 납부 회차*/}
          <div className="item2">
            <Notification />
          </div>
          {/*알림*/}
          <div className="item3">
            <Test />
            {/*금융지식 1*/}
          </div>
          <div className="item4">
            <LoanTobepaid />
          </div>
          {/*이번달 대출금*/}
          <div className="item5">
            <RateChange />
          </div>
          {/*금리변화*/}
          <div className="item6">
            <LoanHistory />
          </div>
          {/*대출 히스토리*/}
        </GridContainer>
      </MainDashBoard>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isNarrowScreen: boolean; $isVisible: boolean }>`
  margin-left: ${(props) => (props.$isNarrowScreen ? '15rem' : '0')};
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &::before {
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(25, 25, 25, 0.85); // 어두운 오버레이
    z-index: 3; // 오버레이 z-index
  }
`;

const MainDashBoard = styled.span<{ $isNarrowScreen: boolean }>`
  position: absolute;
  width: ${(props) => (props.$isNarrowScreen ? 'calc(100% - 18rem)' : '100%')};
  height: calc(100% - 110px);
  margin: 1.5rem 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열, 각각 동일한 크기 */
  grid-template-rows: repeat(5, 1fr); /* 5개의 행, 각각 동일한 크기 */
  gap: 18px; /* 그리드 사이의 간격 */
  .item1 {
    grid-area: 1 / 1 / 2 / 4;
  } /* 나의 대출 상품,이번달 대출금 상환 날짜, 대출금 납부 회차 */
  .item2 {
    grid-area: 1 / 4 / 4 / 5;
  } /* 첫 번째 행, 3~4열 */
  .item3 {
    grid-area: 2 / 1 / 4 / 2;
  } /* 2~3행, 첫 번째 열 */
  .item4 {
    grid-area: 2 / 2 / 4 / 4;
  } /* 2~3행, 2~3열 */
  .item5 {
    grid-area: 4 / 1 / 6 / 3;
  } /* 4~5행, 1~2열 */
  .item6 {
    grid-area: 4 / 3 / 6 / 5;
  } /* 4~5행, 3~4열 */
`;

export default Dashboard;
