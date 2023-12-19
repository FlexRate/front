import { useEffect, useState } from 'react';
import * as S from '../styles/MypageStyle';
import axiosInstance from '../apis/axiosinstance';
import { HOSUE, PERSONAL } from '@/constants/creditInfo';
import { useNavigate } from 'react-router-dom';
import formatDateToKorean from '../utils/formatDateToKorean';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Mypage = () => {
  let memberId: string | null;
  const nav = useNavigate();

  const [creditData, setCreditData] = useState({
    business_type: '',
    employment_type: '',
    company_enter_month: '',
    academic_ability_school: '',
    academic_ability: '',
    yearly_income: 0,
    credit_score: 0,
    houseown_type: '',
    personal_rehabilitation_yn: 1,
    personal_rehabilitation_complete_yn: false,
    loan_purpose: '',
  });
  const [userData, setUserData] = useState({
    name: 'Sample Name',
    email: 'sample@email.com',
    phonenumber: '123-456-7890',
  });

  useEffect(() => {
    memberId = localStorage.getItem('memberid');
    getUserData();
    getLoanInfo();
  }, []);
  //정보 api 받아오기
  const getUserData = async () => {
    //서버통신
    await axiosInstance
      .get(`/mypage/${memberId}`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //신용정보 api 받아오기
  const getLoanInfo = async () => {
    //서버통신
    await axiosInstance
      .get(`/credit/get/${memberId}`)
      .then((res) => {
        console.log(res.data);
        setCreditData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>
          <span
            onClick={() => {
              nav('/dashboard');
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </span>
          <span>마이페이지</span>
        </S.Title>
        <S.계정정보>
          <h3>계정 정보</h3>
          <S.ColumnBox>
            <S.Column>
              <p>이름</p>
              <span>{userData.name}</span>
            </S.Column>
            <S.Column>
              <p>이메일</p>
              <span>{userData.email}</span>
            </S.Column>
            <S.Column>
              <p>연락처</p>
              <span>{userData.phonenumber}</span>
            </S.Column>
          </S.ColumnBox>
        </S.계정정보>
        <S.신용평가정보>
          <S.SubTitle>
            <h3>신용평가정보</h3>
            <S.StyledSVG
              onClick={() => {
                nav('/editInfo');
              }}
            />
          </S.SubTitle>

          <h4>직업</h4>
          <S.ColumnBox>
            <S.Column>
              <p>업종</p>
              <span>{creditData.business_type}</span>
            </S.Column>
            <S.Column>
              <p>고용형태</p>
              <span>{creditData.employment_type}</span>
            </S.Column>
            <S.Column>
              <p>입사년월</p>
              <span>{formatDateToKorean(creditData.company_enter_month)}</span>
            </S.Column>
          </S.ColumnBox>
          <h4>신용</h4>
          <S.ColumnBox>
            <S.Column>
              <p>연소득</p>
              <span>{creditData.yearly_income}만원</span>
            </S.Column>
            <S.Column>
              <p>신용평가등급</p>
              <span>{creditData.credit_score}점</span>
            </S.Column>
            <S.Column>
              <p>주거정보</p>
              <span>{HOSUE[parseInt(creditData.houseown_type)]}</span>
            </S.Column>
            <S.Column>
              <p>개인회생자정보</p>
              <span>
                {PERSONAL[Number(creditData.personal_rehabilitation_yn)]}
              </span>
            </S.Column>
          </S.ColumnBox>
        </S.신용평가정보>
      </S.Container>
    </S.Wrapper>
  );
};

export default Mypage;
