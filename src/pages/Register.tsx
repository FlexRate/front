import RadioTwo from '@/components/RadioTwo';
import SearchAddress from '@/components/RegisterComs/SearchAddress';
import {
  Wrapper,
  SignupBox,
  SignupInfobox,
  SignupBottombox,
} from '@/styles/SignupStyle';
import { BasicInput, Button } from '@/styles/BasicStyles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import flexrateLogo from '../assets/Logos/flexrateLogo.png';
import visible from '../assets/imgs/visible.png';
import Password from '@/components/RegisterComs/Password';

import { useRecoilState } from 'recoil';
import { registerInfo } from '../state/register';

// interface RegisterValue {
//   user_id: string;
//   pwd: string;
//   nickname: string;
//   birth_year: Date;
//   gender: boolean;
//   nation: boolean;
//   phone_num: string;
//   email: string;
//   address: string;
// }

const Register = () => {
  const [registerValue, setRegisterValue] = useRecoilState(registerInfo);
  const [checkPw, setCheckPw] = useState(''); //비밀번호 확인
  const [isequal, setIsequal] = useState(false);

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue({
      ...registerValue,
      [e.target.name]: e.target.value,
    });
  };

  //boolean타입 handle
  const handleBooleanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue({
      ...registerValue,
      [e.target.name]: e.target.value === 'true',
    });
  };

  //비밀번호 확인 맞는지
  const checkPwvalue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (registerValue.pwd === e.target.value) {
      setIsequal(false);
    } else if (e.target.value || registerValue.pwd !== e.target.value) {
      setIsequal(true);
    }
  };

  useEffect(() => {
    console.log(registerValue);
  }, [registerValue]);

  const submitRegister = () => {
    //서버통신
  };

  return (
    <Wrapper>
      <SignupBox>
        {/* <div className="logo">로고</div> */}
        <Logo src={flexrateLogo} alt="flexrateLogo" />
        <p>회원가입</p>
        <SignupInfobox>
          <ul>
            <li>
              <label htmlFor="user_id">아이디</label>
              <BasicInput
                type="text"
                id="user_id"
                name="user_id"
                value={registerValue.user_id}
                onChange={handleinput}
              ></BasicInput>
            </li>
            <li>
              <label>비밀번호</label>
              <Password />
            </li>
            <li>
              <label>비밀번호 확인</label>
              <BasicInput
                type="password"
                value={checkPw}
                onChange={(e) => {
                  setCheckPw(e.target.value);
                  checkPwvalue(e);
                }}
              />
              <img className="invisible" src={visible} alt="" />
              {isequal && (
                <p className="notequal">비밀번호가 일치하지 않습니다</p>
              )}
            </li>
            <li>
              <label>이름</label>
              <BasicInput
                name="nickname"
                value={registerValue.nickname}
                onChange={handleinput}
              ></BasicInput>
            </li>
            <li>
              <label>생년월일</label>
              {/* <SelectDate /> */}
              <SelectDate
                selected={registerValue.birth_year}
                name="birth_year"
                onChange={(date: Date) => {
                  setRegisterValue((prevState) => ({
                    ...prevState,
                    birth_year: date,
                  }));
                }}
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom"
                showPopperArrow={false}
              />
            </li>
            <li className="genderAndnationBox">
              <span>
                <label>성별</label>
                <RadioTwo
                  prop1="남"
                  prop2="여"
                  commonname="gender"
                  onRadioChange={handleBooleanInput}
                />
              </span>
              <span>
                <label>국적</label>
                <RadioTwo
                  prop1="내국인"
                  prop2="외국인"
                  commonname="nation"
                  onRadioChange={handleBooleanInput}
                />
              </span>
            </li>
            <li>
              <label>휴대폰번호</label>
              <BasicInput
                type="text"
                name="phone_num"
                value={registerValue.phone_num}
                onChange={handleinput}
              ></BasicInput>
            </li>
            <li>
              <label>이메일</label>
              <BasicInput
                type="mail"
                name="email"
                value={registerValue.email}
                onChange={handleinput}
              ></BasicInput>
            </li>
            <li>
              <label>주소</label>
              <SearchAddress />
            </li>
          </ul>
        </SignupInfobox>
        <SignupBottombox>
          <ul>
            <li>
              <span>
                {false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <circle cx="11" cy="11" r="11" fill="#63C393" />
                    <path
                      d="M9.49375 13.6125L6.8875 11.0063L6 11.8875L9.49375 15.3813L16.9937 7.88125L16.1125 7L9.49375 13.6125Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="10.25"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.49375 13.6125L6.8875 11.0063L6 11.8875L9.49375 15.3813L16.9937 7.88125L16.1125 7L9.49375 13.6125Z"
                      fill="#D9D9D9"
                    />
                  </svg>
                )}
              </span>
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </li>
            <li>
              <span>
                {false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <circle cx="11" cy="11" r="11" fill="#63C393" />
                    <path
                      d="M9.49375 13.6125L6.8875 11.0063L6 11.8875L9.49375 15.3813L16.9937 7.88125L16.1125 7L9.49375 13.6125Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="10.25"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.49375 13.6125L6.8875 11.0063L6 11.8875L9.49375 15.3813L16.9937 7.88125L16.1125 7L9.49375 13.6125Z"
                      fill="#D9D9D9"
                    />
                  </svg>
                )}
              </span>
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </li>
          </ul>
          <div>
            <span>
              <p>이미 계정이 있다면?</p>
              <Link to="/login">로그인</Link>
            </span>
            <span className="btn">
              <Button onClick={submitRegister}>회원가입</Button>
            </span>
          </div>
        </SignupBottombox>
      </SignupBox>
    </Wrapper>
  );
};

const SelectDate = styled(DatePicker)`
  width: 620px;
  height: 55px;
  border-radius: 7px;
  border: 1.5px solid var(--Gray3, #d9d9d9);
  text-align: center;

  &:focus {
    outline: 1.5px solid var(--Primary, #63c393);
    border: none;
  }
`;

const Logo = styled.img`
  width: 222px;
  height: 64px;
  font-size: 40px;
  margin-right: 350px;
  margin-bottom: 40px;
`;

export default Register;
