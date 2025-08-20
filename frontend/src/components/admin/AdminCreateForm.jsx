import { Form, Col } from 'react-bootstrap';
import { ChooseFestivalImage } from './ChooseFestivalImage'
import Handlers from '../handler/AdminHandler';


export const AdminCreateForm = ({ controlId, title, name, type, onChange, value, requiredStatus, festivalData}) => {
    const regions = [
        "서울",
        "인천",
        "대전",
        "대구",
        "광주",
        "부산",
        "울산",
        "세종특별자치시",
        "경기도",
        "강원특별자치도",
        "충청북도",
        "충청남도",
        "경상북도",
        "경상남도",
        "전북특별자치도",
        "전라남도",
        "제주특별자치도",
    ];

    const categories = [
        "물놀이",
        "여름",
        "가족과함께",
        "야행",
        "문화예술",
        "공연",
    ];

    if (name === "description") {
        return (
            <Form.Group as={Col} controlId={controlId}>
                <Form.Label>
                    {title}
                </Form.Label>
                <Form.Control
                    as={type}
                    rows={3}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </Form.Group>
        )
    } else if (name === "region") {
        return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Select
                name={name}
                value={value}
                onChange={onChange}
                required={requiredStatus ? true : false}
            >
                <option value="">지역 선택</option>
                {regions.map((region) => (
                <option key={region} value={region}>
                    {region}
                </option>
                ))}
            </Form.Select>
        </Form.Group>
        )
    } else if (type === "radio"){
        return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            {categories.map((category) => (
                <Form.Check
                    key={category}
                    type={type}
                    id={`category-${category}`}
                    label={category}
                    value={category}
                    onChange={onChange}
                    checked={festivalData.category.includes(category)}
                />
            ))}
        </Form.Group>
        )
    } else if (type === 'image') {
        return (
        <Form.Group as={Col} controlId={controlId} className="mb-4">
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Control
                type="text"
                name={name}
                value={value}
                required={requiredStatus ? true : false}
                readOnly
            />
            {/* Choose File 버튼 스타일링을 위해 label과 input을 사용 */}
            <ChooseFestivalImage controlId={controlId} name={name} onChange={onChange}/>
        </Form.Group>
        )
    } else {
        return (
        <Form.Group as={Col} controlId={controlId} className="mb-4">
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={requiredStatus ? true : false}
            />
        </Form.Group>
        )
    }
}