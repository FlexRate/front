import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import visible from '../assets/imgs/visible.png';
import flexrateLogo from '../assets/Logos/flexrateLogo.png';
import { BasicInput } from '@/styles/BasicStyles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 90px;
  width: 568px;
`;
const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 568px;
  & > p {
    color: #ef4a3e;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    width: 100%;
  }
`;
const Logo = styled.img`
  width: 222px;
  height: 64px;
  font-size: 40px;
  margin-right: 350px;
`;
const LoginText = styled.div`
  width: 100%;
  font-size: 28px;
  font-weight: 800;
  line-height: 33px;
  text-align: left;
  margin-top: 40px;
`;
const Content = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  text-align: left;
  margin: 40px 0px 9px 0px;
`;

const Input = styled(BasicInput)<{ $invalid: boolean }>`
  ${({ $invalid }) => $invalid && 'border-color: red;'}
  width: 90%;
  z-index: 1;
`;

const PwBox = styled.div`
  position: relative;
  width: 100%;
`;
const ImgButton = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2; /* 버튼은 input 위에 나타나도록 설정 */
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const LeftButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
`;
const Button = styled.button`
  border: none;
  background-color: white;
  padding-top: 5px;
`;
const LoginButton = styled.button`
  color: white;
  border: none;
  background-color: #63c393;
  width: 90px;
  height: 43px;
  padding: 11px, 23px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  padding-top: 5px;
`;

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [IdFailed, setIdFailed] = useState(false);
  const [PwFailed, setPwFailed] = useState(false);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //로그인 api 호출

    setIdFailed(true);
    setPwFailed(true);
  };

  return (
    <Container>
      <LoginBox onSubmit={handleSubmit}>
        <Logo src={flexrateLogo}></Logo>
        <LoginText>로그인</LoginText>
        <Content>아이디</Content>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          $invalid={IdFailed}
        ></Input>
        {IdFailed && <p>아이디가 틀렸습니다. 다시 한 번 입력해 주세요.</p>}

        <Content>비밀번호</Content>
        <PwBox>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            $invalid={PwFailed}
          ></Input>
          <ImgButton type="button" onClick={handleTogglePasswordVisibility}>
            <img src={visible} alt="" />
          </ImgButton>
        </PwBox>
        {PwFailed && <p>비밀번호가 틀렸습니다. 다시 한 번 입력해 주세요.</p>}

        <Wrapper>
          <LeftButtonWrapper>
            <Button onClick={() => navigate('/signup')}>회원가입</Button>
            <div>|</div>
            <Button>비밀번호 찾기</Button>
          </LeftButtonWrapper>
          <LoginButton type="submit">로그인</LoginButton>
        </Wrapper>
      </LoginBox>
    </Container>
  );
};

export default Login;
