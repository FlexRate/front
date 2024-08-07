import RadioTwo from '@/components/RadioTwo';
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
import Password from '@/components/RegisterComs/Password';

import { useRecoilState } from 'recoil';
import { registerInfo } from '../state/register';
import axiosInstance from '@/apis/axiosinstance';
import { useNavigate } from 'react-router-dom';
import {
  CircleCheckColor,
  CircleCheckIcon,
  HiddenIcon,
} from '@/assets/svgs/0_index';
import formatDateToString from '@/utils/formatDateToString';

const Register = () => {
  const navigate = useNavigate();

  const [registerValue, setRegisterValue] = useRecoilState(registerInfo);
  const [checkPw, setCheckPw] = useState(''); //비밀번호 확인
  const [isequal, setIsequal] = useState(false);
  const [birthValue, setBirthValue] = useState(new Date());
  const [btn1, setBtn1] = useState(false); //약관1
  const [btn2, setBtn2] = useState(false); //약관2

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
    if (registerValue.password === e.target.value) {
      setIsequal(false);
    } else if (e.target.value || registerValue.password !== e.target.value) {
      setIsequal(true);
    }
  };

  //체크버튼
  const handleCheckBtn1 = () => {
    setBtn1(!btn1);
  };
  const handleCheckBtn2 = () => {
    setBtn2(!btn2);
  };

  const submitRegister = () => {
    const tmp = {
      username: registerValue.accout,
      password: registerValue.password,
      nickname: registerValue.name,
      // email: registerValue.email,
      birth: formatDateToString(birthValue).replace(/-/g, ''),
      gender: registerValue.gender,
      // nationality: registerValue.nationality,
      // phonenumber: registerValue.phonenumber,
    };

    //서버통신
    axiosInstance
      .post('/register', tmp)
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err.response);
        alert('회원가입에 실패했습니다.');
      });
  };

  return (
    <Wrapper>
      <SignupBox>
        <Logo src={flexrateLogo} alt="flexrateLogo" />
        <p>회원가입</p>
        <SignupInfobox>
          <ul>
            <li>
              <label htmlFor="accout">아이디</label>
              <BasicInput
                type="text"
                id="accout"
                name="accout"
                value={registerValue.accout}
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
              <HiddenIcon className="invisible" />
              {isequal && (
                <p className="notequal">비밀번호가 일치하지 않습니다</p>
              )}
            </li>
            <li>
              <label>이름</label>
              <BasicInput
                name="name"
                value={registerValue.name}
                onChange={handleinput}
              ></BasicInput>
            </li>
            <li>
              <label>생년월일</label>
              <SelectDate
                selected={birthValue}
                name="birth"
                onChange={(date: Date) => {
                  setBirthValue(date);
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
                  commonname="nationality"
                  onRadioChange={handleBooleanInput}
                />
              </span>
            </li>
            {/* <li>
              <label>휴대폰번호</label>
              <BasicInput
                type="text"
                name="phonenumber"
                value={registerValue.phonenumber}
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
            </li> */}
          </ul>
        </SignupInfobox>
        <SignupBottombox>
          {/* <ul>
            <li>
              {btn1 ? (
                <CircleCheckColor onClick={handleCheckBtn1} />
              ) : (
                <CircleCheckIcon onClick={handleCheckBtn1} />
              )}
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </li>
            <li>
              {btn2 ? (
                <CircleCheckColor onClick={handleCheckBtn2} />
              ) : (
                <CircleCheckIcon onClick={handleCheckBtn2} />
              )}
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </li>
          </ul> */}
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
