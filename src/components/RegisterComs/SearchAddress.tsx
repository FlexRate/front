import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

//상태관리

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .invisible {
    position: absolute;
    right: 23px;
    top: 46px;
  }

  .areamodal {
    position: absolute;
    z-index: 1;
  }

  input {
    width: 568px;
    height: 55px;
    border-radius: 7px;
    border: 1.5px solid var(--Gray3, #d9d9d9);
    padding: 0px 28px;

    &:focus {
      outline: 1.5px solid var(--Primary, #63c393);
      border: none;
    }
  }

  .input::-webkit-input-placeholder {
    color: var(--Gray6, #8c8c8c);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const RegisterStoreAddress = () => {
  const [modal, setmodal] = useState(false); //모달띄울지 말지
  //주소 state
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  //상세주소검색
  const handleComplete = (data: any) => {
    let fullAddress = data.address; //기본 주소
    let extraAddress = '';

    if (data.addressType === 'R') {
      //R:도로명, J:지번
      if (data.bname !== '') {
        //bname: 법정동/법정리 이름
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        //buildingName: 건물명
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setmodal(false);
  };

  return (
    <Wrapper>
      {modal && (
        <DaumPostcode
          className="areamodal"
          onComplete={handleComplete}
          autoClose={false}
        />
      )}

      <input
        type="text"
        placeholder="주소 검색"
        onClick={(e) => {
          e.preventDefault();
          setmodal(true);
        }}
        defaultValue={address}
      />
      <svg
        className="invisible"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1228 11.4265C13.1782 10.0653 13.6756 8.35301 13.5138 6.63796C13.352 4.9229 12.5431 3.33392 11.2518 2.19428C9.96048 1.05465 8.28367 0.449963 6.5625 0.503244C4.84133 0.556526 3.2051 1.26377 1.98668 2.4811C0.767203 3.69927 0.0579269 5.33679 0.00339405 7.05995C-0.0511388 8.78311 0.553176 10.4622 1.69319 11.7551C2.8332 13.048 4.42311 13.8574 6.13893 14.0183C7.85474 14.1793 9.56733 13.6796 10.9277 12.6212L10.9641 12.6593L14.5544 16.2519C14.633 16.3305 14.7264 16.3929 14.8291 16.4355C14.9318 16.4781 15.042 16.5 15.1532 16.5C15.2644 16.5 15.3745 16.4781 15.4772 16.4355C15.58 16.3929 15.6733 16.3305 15.752 16.2519C15.8306 16.1732 15.893 16.0798 15.9355 15.977C15.9781 15.8742 16 15.7641 16 15.6528C16 15.5416 15.9781 15.4314 15.9355 15.3286C15.893 15.2258 15.8306 15.1325 15.752 15.0538L12.1608 11.4621C12.1485 11.4499 12.1358 11.438 12.1228 11.4265ZM10.3657 3.67918C10.8436 4.14951 11.2236 4.70983 11.4839 5.32783C11.7442 5.94583 11.8797 6.60927 11.8824 7.27989C11.8851 7.95051 11.7551 8.61503 11.4998 9.23513C11.2445 9.85523 10.8691 10.4186 10.3951 10.8928C9.92105 11.367 9.35787 11.7427 8.73802 11.998C8.11817 12.2534 7.45391 12.3835 6.78356 12.3807C6.11321 12.378 5.45003 12.2425 4.83228 11.9821C4.21453 11.7217 3.65443 11.3415 3.18429 10.8635C2.24476 9.90811 1.72063 8.62007 1.72609 7.27989C1.73154 5.93971 2.26613 4.65598 3.21341 3.70832C4.16069 2.76066 5.44391 2.22586 6.78356 2.2204C8.12321 2.21494 9.41074 2.73928 10.3657 3.67918Z"
          fill="#BFBFBF"
        />
      </svg>
      <input
        type="text"
        placeholder="상세 주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
    </Wrapper>
  );
};

export default RegisterStoreAddress;
