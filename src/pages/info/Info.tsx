import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoBtn from './InfoBtn';
import InfoFirst from './InfoFirst';
import InfoSecond from './InfoSecond';
import InfoThird from './InfoThird';
import apis from '../../shared/apis';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../../shared/cookie';

const Info = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // 탭 인댁스
  const [tabIndex, setTabIndex] = useState<number>(0);

  // 컴포넌트별 유저 정보 관리
  const [userInfo, setUserInfo] = useState<object>({
    name: '',
    birth: '',
    sex: '',
    residence: '',

    alcohol: '',
    tobacco: '',
    tall: '',
    height: '',

    mbti: '',
    job: '',
    hobby: '',
    appearance: '',
  });

  // 탭 인댁스에 따른 컴포넌트 렌더링
  const tabContent = [
    <InfoBtn setTabIndex={setTabIndex} />,
    <InfoFirst setTabIndex={setTabIndex} setUserInfo={setUserInfo} />,
    <InfoSecond setTabIndex={setTabIndex} setUserInfo={setUserInfo} />,
    <InfoThird
      setTabIndex={setTabIndex}
      setUserInfo={setUserInfo}
      userInfo={userInfo}
    />,
  ];

  useEffect(() => {
    // status 상태에 따른 라우팅 처리를 위한 유저 정보 호출 api
    const getUserInfo = async () => {
      try {
        const res = await apis.getUserInfo();
        if (res.data.status === true) {
          navigate('/home');
        }
      } catch (err) {
        console.log('유저 정보를 불러오는데 실패했습니다.');
        deleteCookie('Authorization');
      }
    };
    getUserInfo();
    // useEffect의 missing dependency 문제 block 설정 -> 해당 줄에 아래 주석으로 eslint 규칙 비활성화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrap>
      <Header progressPercentage={tabIndex}>
        <div className="title">
          <div>나를 소개해주세요</div>
        </div>
        <div className="title-desc">
          <div>블라인드 상대에게 전달될 내 정보입니다</div>
          <div>정확한 정보를 입력할수록 매칭 성공확률이 올라갑니다</div>
        </div>
        <div className="progress-bar">
          <div className="value"></div>
          <div className="dot"></div>
        </div>
      </Header>
      {tabContent[tabIndex]}
    </Wrap>
  );
};

export default Info;

const Wrap = styled.div``;
const Header = styled.div`
  .title {
    font-size: 3.2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-desc {
    line-height: 1.3;
  }
  .progress-bar {
    margin: 2rem 0 -2rem 0;
    background-color: #eee;
    height: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    .value {
      width: ${(props: { progressPercentage: number }) =>
        props.progressPercentage * 34}%;
      height: 2rem;
      background-color: #000;
      /* 트랜지션 효과: 모든 프로퍼티의 변화를 1초에 걸쳐 전환 */
      transition: all 1s;
    }
    .dot {
      display: ${(props: { progressPercentage: number }) =>
        props.progressPercentage === 0 || props.progressPercentage === 3
          ? 'none'
          : 'block'};
      width: 30px;
      height: 30px;
      background-color: #fff;
      border: 5px solid #000;
      border-radius: 40px;
      margin-left: -20px;
      z-index: 99;
      box-sizing: content-box;
    }
  }
`;
