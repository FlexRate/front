import RadioThree from '@/components/RadioThree';
import RadioTwo from '@/components/RadioTwo';
import { BasicInput, Button } from '@/styles/BasicStyles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dropdown from '@/components/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loanApplyInfo } from '@/state/LoanApplyInfo';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 567px;
  margin-top: 116px;

  & > p {
    margin: 1em 0;
  }

  & > h2 {
    font-family: Pretendard;
    font-size: 28px;
    font-weight: 800;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: left;
    color: #262626;
  }
  & > h4 {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #595959;
    margin: 15px 0px 65px 0px;
  }
`;
const SelectDate = styled(DatePicker)`
  width: 100%;
  height: 55px;
  border-radius: 7px;
  border: 1.5px solid var(--Gray3, #d9d9d9);
  text-align: center;

  &:focus {
    outline: 1.5px solid var(--Primary, #63c393);
    border: none;
  }
`;
const Academic = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const HalfInput = styled(BasicInput)`
  width: 50%;
`;
const DropdownWrapper = styled.div`
  width: 50%;
`;
const Wrapper = styled.div`
  margin-top: 75px;
  & > p {
    margin-top: 25px;
    margin-bottom: 1em;
  }
`;
const Credit = styled(Wrapper)`
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 25px;
    & > p {
      text-align: left;
      width: 50%;
      margin: 1em 0;
    }
  }
`;
const CreditInput = styled(HalfInput)`
  text-align: right;
`;

const CompleteButton = styled.button`
  margin-top: 75px;
  width: 100%;
  height: 55px;
  background-color: #63c393;
  color: #fff;
  border-radius: 7px;
  border: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
`;
const CancelButton = styled(CompleteButton)`
  margin-top: 15px;
  background-color: #e3f5ee;
  color: #4d9a75;
`;

const EditingInfo = () => {
  const navigate = useNavigate();
  const [myLoanApplyInfo, setMyLoanApplyInfo] = useRecoilState(loanApplyInfo);

  const [loanValue, setLoanValue] = useState({
    academicName: '',
    selectedDate: new Date(),
    income: '',
    creditScore: '',
    homeType: '',
    personalRecovery: myLoanApplyInfo.personalRecovery,
    recoveryPayment: myLoanApplyInfo.recoveryPayment,
    selectedJob: '',
    selectedEmployment: '',
    selectedAcademicType: '',
    selectedPurpose: '',
  });

  const jobOptions = ['직장인', '사업자', '프리랜서', '기타'];
  const employmentOptions = ['정규직', '계약직', '기타'];
  const academicTypeOptions = ['고졸', '전문대졸', '대졸', '석사', '박사'];
  const purposeOptions = ['목적1', '목적2', '목적3', '목적4', '목적5'];

  const apply = () => {
    //userFeatures에 정보 저장
    //goto qulification
    navigate('/qualification');
  };

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanValue({
      ...loanValue,
      [e.target.name]: e.target.value,
    });
    console.log(loanValue);
  };

  //boolean타입 handle
  const handleBooleanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanValue({
      ...loanValue,
      [e.target.name]: e.target.value === 'true',
    });
    console.log(loanValue);
  };

  const handleDropdown = (name: string, value: string) => {
    setLoanValue({
      ...loanValue,
      [name]: value,
    });
    console.log(loanValue);
  };
  const handlethree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanValue({
      ...loanValue,
      [e.target.name]: e.target.value,
    });
    console.log(loanValue);
  };

  return (
    <Container>
      <h2>신용평가정보 수정</h2>
      <h4>
        대출 심사를 다시 진행하기 위해 본인의 신용 평가 정보를 업데이트 해주세요
        .
      </h4>

      <h3>직업</h3>
      <p>업종</p>
      <Dropdown
        options={jobOptions}
        name="selectedJob"
        value={loanValue.selectedJob}
        onChange={handleDropdown}
        ph={myLoanApplyInfo.selectedJob}
      />

      <p>고용형태</p>
      <Dropdown
        options={employmentOptions}
        name="selectedEmployment"
        value={loanValue.selectedEmployment}
        onChange={handleDropdown}
        ph={myLoanApplyInfo.selectedEmployment}
      />

      <p>입사년월</p>
      <SelectDate
        selected={myLoanApplyInfo.selectedDate}
        onChange={(date: Date) =>
          setLoanValue({ ...loanValue, selectedDate: date })
        }
        dateFormat="yyyy년 MM월"
        popperPlacement="bottom"
        showPopperArrow={false}
        showMonthYearPicker
      />

      <p>학력</p>
      <Academic>
        <HalfInput
          placeholder={myLoanApplyInfo.academicName}
          name="academicName"
          value={loanValue.academicName}
          onChange={handleinput}
        ></HalfInput>
        <DropdownWrapper>
          <Dropdown
            options={academicTypeOptions}
            name="selectedAcademicType"
            value={loanValue.selectedAcademicType}
            onChange={handleDropdown}
            ph={myLoanApplyInfo.selectedAcademicType}
          />
        </DropdownWrapper>
      </Academic>

      <Credit>
        <h3>신용</h3>
        <div>
          <p>연소득</p>
          <p>신용등급</p>
        </div>
        <div>
          <CreditInput
            placeholder={myLoanApplyInfo.income + '만원'}
            name="income"
            value={loanValue.income}
            onChange={handleinput}
          ></CreditInput>
          <CreditInput
            placeholder={myLoanApplyInfo.creditScore + '점'}
            name="creditScore"
            value={loanValue.creditScore}
            onChange={handleinput}
          ></CreditInput>
        </div>
        <p>주거정보</p>
        <RadioThree
          prop1="자가"
          prop2="전세"
          prop3="월세"
          commonname="homeType"
          onRadioChange={handlethree}
        />
        <div>
          <p>개인회생자 여부</p>
          <p>개인회생 납부 여부</p>
        </div>
        <div>
          <RadioTwo
            prop1="예"
            prop2="아니오"
            commonname="personalRecovery"
            onRadioChange={handleBooleanInput}
          />
          <RadioTwo
            prop1="예"
            prop2="아니오"
            commonname="recoveryPayment"
            onRadioChange={handleBooleanInput}
            disabled={loanValue.personalRecovery !== true}
          />
        </div>
      </Credit>

      <Wrapper>
        <h3>대출 목적</h3>
        <p>목적</p>
        <Dropdown
          options={purposeOptions}
          name="selectedPurpose"
          value={loanValue.selectedPurpose}
          onChange={handleDropdown}
          ph={myLoanApplyInfo.selectedPurpose}
        />
      </Wrapper>

      <CompleteButton onClick={apply}>
        수정 완료 및 다시 심사 받기
      </CompleteButton>
      <CancelButton onClick={() => navigate('/dashboard')}>
        그만두기
      </CancelButton>
    </Container>
  );
};

export default EditingInfo;
