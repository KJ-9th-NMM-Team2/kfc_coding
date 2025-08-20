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
        newImages[index] = e.target.value;
        setData((prevData) => ({
            ...prevData,
            images: newImages,
        }));
    };

    const addImageField = (e, setImages) => {
        // 1. 선택된 파일 객체 가져오기
        const file = e.target.files[0];
        // 파일이 선택되었을 때만 로직 실행
        if (file) {
            // 2. setData를 사용하여 새로운 필드를 추가하고 파일명 할당
            setData((prevData) => ({
                ...prevData,
                images: [...prevData.images, file],
            }));
            setImages([...images, file]);
        }
    };

    const addUrlField = () => {
        setData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ""] // 빈 문자열 필드 추가
        }));
    };


    const submit = async (e, festivalData, postFile, thumbnailFile, images, setPostFile, setThumbnailFile, setImages) => {
        e.preventDefault();
        // 여기에서 API 호출 로직을 구현합니다.
        // festivalData 객체를 백엔드에 전송
        
        // console.log(festivalData);
        // const inputFlag = false;
        // if (postFile && thumbnailFile && images ) {
        //     inputFlag = true;
        // }
        const formData = new FormData();
        // 1. festivalData의 일반 데이터 추가

        // festivalData.forEach((key, value) => {
        //     console.log("key: ", key);
        //     console.log("value: ", value);
        //     formData.append(key, value);
        // })
        for (const key in festivalData) {
            formData.append(key, festivalData[key]);
        }

        // 2. 파일 객체들 확인 및 추가
        console.log('파일 처리 시작...');
        
        // 포스터 파일 처리
        if (postFile && postFile instanceof File) {
            console.log('포스터 파일 추가:', postFile.name);
            formData.append('posterFile', postFile);
        } else {
            console.warn('포스터 파일이 File 객체가 아닙니다:', typeof postFile, postFile);
        }

        // 썸네일 파일 처리
        if (thumbnailFile && thumbnailFile instanceof File) {
            console.log('썸네일 파일 추가:', thumbnailFile.name);
            formData.append('thumbnailFile', thumbnailFile);
        } else {
            console.warn('썸네일 파일이 File 객체가 아닙니다:', typeof thumbnailFile, thumbnailFile);
        }
        
        // 4. 이미지 배열 처리 (파일과 URL 모두 처리)
        if (festivalData.images && Array.isArray(festivalData.images)) {
            festivalData.images.forEach((item) => {
                if (item instanceof File) {
                    formData.append('imageFiles', item); // 파일 객체 추가
                } else if (typeof item === 'string' && item.startsWith('http')) {
                    console.log("DEBUG 용");
                }
            });
        }

        // FormData 내용 확인 (디버깅용)
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        
        const res = await axios.post("/api/admin/createFestival", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // 성공 시 모든 상태 초기화
        setData(initialFestivalData);
        setPostFile(null);
        setThumbnailFile(null);
        setImages([]);

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

    const chooseFile = (e, setFile) => {
        const {name, files} =  e.target;
        const file = files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                [name]: file.name
            }));

            if (setFile) {
                setFile(file);
            }
        }
    }
    return {
        inputChange,
        categoryChange,
        imageChange,
        addImageField,
        addUrlField,
        submit,
        loginButtonSubmit,
        chooseFile,
    }
}
