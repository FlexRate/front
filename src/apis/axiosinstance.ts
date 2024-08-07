import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // CORS 요청에 쿠키/인증 헤더 포함
  // 기타 설정
});

axiosInstance.interceptors.request.use((config: any) => {
  const accessToken = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

  // 인증이 필요 없는 요청을 식별 (예: 로그인, 회원가입, 토큰 재발급)
  const noAuthRequired = ['/login', '/register'].some((path) =>
    config.url?.includes(path),
  );

  if (!noAuthRequired) {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return config;
});

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const originalRequest: any = error.config;

//     if (error.response?.status === 489 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response: AxiosResponse<{ accessToken: string }> =
//           await axios.get('/reissue');
//         const newAccessToken = response.data.accessToken;
//         localStorage.setItem('accessToken', newAccessToken); // localStorage에 새로운 accessToken 저장
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // 새로운 토큰을 받아오는 데 실패
//         // 로그아웃 처리 등의 조치를 취함
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// 사용예시
// const response = await axiosInstance.post('/login');

export default axiosInstance;
