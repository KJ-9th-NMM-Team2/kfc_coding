import axios from "axios";
import { initialFestivalData } from "../InitialFestivalData.jsx";

export default function Handlers(setFestivalData) {
    const inputChange = (e) => {
        const { name, value } = e.target;
        setFestivalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const categoryChange = (e) => {
        // radio용
        const { value } = e.target;
        setFestivalData((prevData) => ({
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
        setFestivalData((prevData) => ({
        ...prevData,
        images: newImages,
        }));
    };

    const addImageField = () => {
        setFestivalData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ""],
        }));
    };

    const submit = async (e, festivalData) => {
        e.preventDefault();
        // 여기에서 API 호출 로직을 구현합니다.
        // festivalData 객체를 백엔드에 전송
        const res = await axios.post("/api/admin/createFestival", festivalData);
        setFestivalData(initialFestivalData);
        alert(res.data.message);
    };

    return {
        inputChange,
        categoryChange,
        imageChange,
        addImageField,
        submit,
    }
}
