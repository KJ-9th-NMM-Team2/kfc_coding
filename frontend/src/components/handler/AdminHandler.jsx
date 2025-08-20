import axios from "axios";
import { initialFestivalData } from "../InitialFestivalData.jsx";

export default function Handlers(setData) {
    const inputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const categoryChange = (e) => {
        // radio용
        const { value } = e.target;
        setData((prevData) => ({
            ...prevData,
            category: value,
        }));

        // checkbox용
        // const { value, checked } = e.target;
        // setFestivalData((prevData) => {
        //   const newCategories = checked
        //     ? [...prevData.category, value]
        //     : prevData.category.filter((cat) => cat !== value);
        //   return { ...prevData, category: newCategories };
        // });
    };

    const imageChange = (e, index, festivalData) => {
        const newImages = [...festivalData.images];
        newImages[index] = e.target;
        setData((prevData) => ({
        ...prevData,
        images: newImages,
        }));
    };

    const addImageField = (e) => {
        // 1. 선택된 파일 객체 가져오기
        const file = e.target.files[0];

        // 파일이 선택되었을 때만 로직 실행
        if (file) {
            // 2. setData를 사용하여 새로운 필드를 추가하고 파일명 할당
            setData((prevData) => ({
                ...prevData,
                images: [...prevData.images, file.name],
            }));
        }
    };

    const submit = async (e, festivalData) => {
        e.preventDefault();
        // 여기에서 API 호출 로직을 구현합니다.
        // festivalData 객체를 백엔드에 전송
        const res = await axios.post("/api/admin/createFestival", festivalData);
        setData(initialFestivalData);
        alert(res.data.message);
    };

    const loginButtonSubmit = async (e, id, password) => {
        e.preventDefault();
        // TODO: 여기에 실제 로그인 처리 로직을 추가합니다.
        // 예: API 호출, 상태 업데이트 등
        
        try {
            const res = await axios.post('/api/admin/login', {
                id, password
            });
            const token = res.data.token;
            // 1. 웹 브라우저의 로컬 스토리지에 저장
            localStorage.setItem('admin', token);

            // 2. 이후 요청에 자동으로 토큰을 포함시키기 위해 axios 기본 헤더 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
            } else {
                alert("로그인 중 오류가 발생했습니다.");
            }

            return false;
        }
    };

    const chooseFile = (e) => {
        const {name, files} =  e.target;
        const file = files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                [name]: file.name
            }));
        }
    }
    return {
        inputChange,
        categoryChange,
        imageChange,
        addImageField,
        submit,
        loginButtonSubmit,
        chooseFile,
    }
}
