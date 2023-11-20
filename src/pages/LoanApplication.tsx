import RadioThree from '@/components/RadioThree';
import RadioTwo from '@/components/RadioTwo';
import { BasicInput, Button } from '@/styles/BasicStyles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dropdown from '@/components/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userFeatures } from '@/state/userFeatures';
import Scaling from '../models/Scaling';
import predict from '../models/calcLoanLimit';
import LogisticRegression from '../models/calScore';
import calculateInterestRateRange from '../models/calculateInterestRateRange';
import { output } from '@/state/output';

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
  & > button {
    margin-top: 75px;
    margin-left: 75%;
    width: 137px;
    height: 55px;
    background-color: #63c393;
    color: #fff;
    border-radius: 7px;
    border: none;
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

const LoanApplication = () => {
  const navigate = useNavigate();
  const [myFeatures, setMyFeatures] = useRecoilState(userFeatures);
  const [myOutput, setMyOutput] = useRecoilState(output);

  const [loanValue, setLoanValue] = useState({
    academicName: '',
    selectedDate: new Date(),
    income: '',
    creditScore: '',
    homeType: '',
    personalRecovery: false,
    recoveryPayment: false,
    selectedJob: '',
    selectedEmployment: '',
    selectedAcademicType: '',
    selectedPurpose: '',
  });

  const jobOptions = ['직장인', '사업자', '프리랜서', '전문직', '기타'];
  const employmentOptions = ['정규직', '일용직', '기타'];
  const academicTypeOptions = ['고졸', '전문대졸', '대졸', '석사', '박사'];
  const purposeOptions = [
    '주택 구매',
    '교육비',
    '사업/창업',
    '부채 통합',
    '기타',
  ];

  //근속년수 계산 함수
  const calcDuration = () => {
    const currentDate = new Date(); // 현재 날짜
    const pastDate = new Date(loanValue.selectedDate); // 비교할 과거의 날짜

    // 두 날짜 간의 연도와 월 차이 계산
    let yearDifference = currentDate.getFullYear() - pastDate.getFullYear();
    let monthDifference = currentDate.getMonth() - pastDate.getMonth();

    // 과거 날짜가 현재 날짜보다 월에서 더 크면 연도에서 1을 빼고 월 차이를 조정
    if (monthDifference < 0) {
      yearDifference--;
      monthDifference += 12;
    }

    // 연도와 월 차이를 합산하여 소수점으로 표현 후 첫째 자리에서 반올림
    return Math.round((yearDifference + monthDifference / 12) * 10) / 10;
  };

  const apply = () => {
    const duration = calcDuration();

    //home_type 추가 해야함

    //근무형태 저장
    switch (loanValue.selectedEmployment) {
      case '정규직':
        setMyFeatures({
          ...myFeatures,
          employment_type_기타: 0,
          employment_type_일용직: 0,
          employment_type_정규직: 1,
        });
        break;
      case '일용직':
        setMyFeatures({
          ...myFeatures,
          employment_type_기타: 0,
          employment_type_일용직: 1,
          employment_type_정규직: 0,
        });
        break;
      case '기타':
        setMyFeatures({
          ...myFeatures,
          employment_type_기타: 1,
          employment_type_일용직: 0,
          employment_type_정규직: 0,
        });
        break;
    }

    //수익유형 저장
    switch (loanValue.selectedJob) {
      case '직장인':
        setMyFeatures({
          ...myFeatures,
          income_type_EARNEDINCOME2: 1, // 수익 유형 근로소득2 (4대보험 미가입)
          income_type_FREELANCER: 0, // 수익 유형 프리랜서
          income_type_OTHERINCOME: 0, // 수익 유형 기타 소득
          income_type_PRACTITIONER: 0, // 수익 유형 전문직
          income_type_PRIVATEBUSINESS: 0, // 수익 유형 개인 사업
        });
        break;
      case '프리랜서':
        setMyFeatures({
          ...myFeatures,
          income_type_EARNEDINCOME2: 0, // 수익 유형 근로소득2 (4대보험 미가입)
          income_type_FREELANCER: 1, // 수익 유형 프리랜서
          income_type_OTHERINCOME: 0, // 수익 유형 기타 소득
          income_type_PRACTITIONER: 0, // 수익 유형 전문직
          income_type_PRIVATEBUSINESS: 0, // 수익 유형 개인 사업
        });
        break;
      case '전문직':
        setMyFeatures({
          ...myFeatures,
          income_type_EARNEDINCOME2: 0, // 수익 유형 근로소득2 (4대보험 미가입)
          income_type_FREELANCER: 0, // 수익 유형 프리랜서
          income_type_OTHERINCOME: 0, // 수익 유형 기타 소득
          income_type_PRACTITIONER: 1, // 수익 유형 전문직
          income_type_PRIVATEBUSINESS: 0, // 수익 유형 개인 사업
        });
        break;
      case '사업자':
        setMyFeatures({
          ...myFeatures,
          income_type_EARNEDINCOME2: 0, // 수익 유형 근로소득2 (4대보험 미가입)
          income_type_FREELANCER: 0, // 수익 유형 프리랜서
          income_type_OTHERINCOME: 0, // 수익 유형 기타 소득
          income_type_PRACTITIONER: 0, // 수익 유형 전문직
          income_type_PRIVATEBUSINESS: 1, // 수익 유형 개인 사업
        });
        break;
      case '기타':
        setMyFeatures({
          ...myFeatures,
          income_type_EARNEDINCOME2: 0, // 수익 유형 근로소득2 (4대보험 미가입)
          income_type_FREELANCER: 0, // 수익 유형 프리랜서
          income_type_OTHERINCOME: 1, // 수익 유형 기타 소득
          income_type_PRACTITIONER: 0, // 수익 유형 전문직
          income_type_PRIVATEBUSINESS: 0, // 수익 유형 개인 사업
        });
        break;
    }

    //나머지 저장
    setMyFeatures({
      ...myFeatures,
      credit_score: parseInt(loanValue.creditScore, 10),
      yearly_income: parseInt(loanValue.income, 10),
      company_enter_month: duration,
    });

    console.log(myFeatures);

    runModel();
    // navigate('/qualification');
  };

  const runModel = () => {
    ///////////////////////////
    //신용점수 모델
    const scaledFeatures: number[] = Scaling(myFeatures);
    console.log('scaledFeatures', scaledFeatures);
    const model = new LogisticRegression();
    const newScore = model.predictScore(scaledFeatures);
    console.log('newScore', newScore); //신용점수
    setMyOutput({
      ...myOutput,
      Score: newScore.toString(),
    });

    ///////////////////////////
    //금리 산출 모델
    // 예시: 신용평가 점수가 700일 때의 금리 범위를 계산
    const rateResult = calculateInterestRateRange(newScore);
    console.log('rateResult', rateResult);
    setMyOutput({
      ...myOutput,
      maxRate: rateResult.maxRate,
      minRate: rateResult.minRate,
    });

    ///////////////////////////
    //대출 한도 모델
    const rawSample = {
      0: 30,
      1: 0,
      2: myFeatures.credit_score,
      3: myFeatures.yearly_income,
      4: myFeatures.company_enter_month,
      5: 1,
      6: 50000000,
      7: 0,
      8: 0,
      9: 3.5,
      10: -0.5,
      11: myFeatures.income_type_EARNEDINCOME2,
      12: myFeatures.income_type_FREELANCER,
      13: myFeatures.income_type_OTHERINCOME,
      14: myFeatures.income_type_PRACTITIONER,
      15: myFeatures.income_type_PRIVATEBUSINESS,
      16: myFeatures.employment_type_기타,
      17: myFeatures.employment_type_일용직,
      18: myFeatures.employment_type_정규직,
      19: 0,
      20: 0,
    };
    const result = predict(rawSample);
    console.log(result);
    ////////////////////////

    console.log(myOutput);
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

  return (
    <Container>
      <h2>대출 심사 · 신청</h2>
      <h4>대출 심사를 진행하기 위해 본인의 신용 평가 정보를 기입해주세요.</h4>

      <h3>직업</h3>
      <p>업종</p>
      <Dropdown
        options={jobOptions}
        name="selectedJob"
        value={loanValue.selectedJob}
        onChange={handleDropdown}
      />

      <p>고용형태</p>
      <Dropdown
        options={employmentOptions}
        name="selectedEmployment"
        value={loanValue.selectedEmployment}
        onChange={handleDropdown}
      />

      <p>입사년월</p>
      <SelectDate
        selected={loanValue.selectedDate}
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
          placeholder="학교명"
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
            ph="(필수)학력선택"
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
            placeholder="만원"
            name="income"
            value={loanValue.income}
            onChange={handleinput}
          ></CreditInput>
          <CreditInput
            placeholder="점"
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
        />
      </Wrapper>

      <button onClick={apply}>신청하기</button>
    </Container>
  );
};

export default LoanApplication;
