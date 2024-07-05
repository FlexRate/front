// 브라우저 라우터 리팩하기
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Register from './pages/Register';
import MainHeader from './components/MainHeader';
import Main from './pages/Main';
import LoanQualification from './pages/LoanQualification';
import LoanApplication from './pages/LoanApplication';
import Dashboard from './pages/Dashboard';
import LoanAgree from './pages/LoanAgree';
import LoanDisagree from './pages/LoanDisagree';
import EditingInfo from './pages/EditingInfo';
import MainSidebar from './components/MainSidebar';
import GlobalStyle from './GlobalStyle';
import Mypage from './pages/Mypage';

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
  margin-bottom: 10rem;
  box-sizing: border-box;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <MainHeader />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/Qualification" element={<LoanQualification />} />
            <Route path="/Agree" element={<LoanAgree />} />
            <Route path="/DisAgree" element={<LoanDisagree />} />
            <Route path="/LoanApplication" element={<LoanApplication />} />
            <Route path="/editInfo" element={<EditingInfo />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
