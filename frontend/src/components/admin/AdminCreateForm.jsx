import { Form, Col } from 'react-bootstrap';

export const AdminCreateForm = ({ controlId, title, name, handleInputChange, handleCategoryChange, value, requiredStatus, festivalData}) => {
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
                    as="textarea"
                    rows={3}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                />
            </Form.Group>
        )
    } else if (name.split("_")[1] === "date") {
        return (
            <Form.Group as={Col} controlId={controlId}>

                <Form.Label>
                    {title}
                </Form.Label>
                <Form.Control
                    type="date"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                />
            </Form.Group>
        )
    } else if (name === "website") {
        return (
            <Form.Group as={Col} controlId={controlId}>

                <Form.Label>
                    {title}
                </Form.Label>
                <Form.Control
                    type="url"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
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
                onChange={handleInputChange}
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
    } else if (controlId === "formCategory"){
        return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            {categories.map((category) => (
                <Form.Check
                    key={category}
                    type="radio"
                    id={`category-${category}`}
                    label={category}
                    value={category}
                    onChange={handleCategoryChange}
                    checked={festivalData.category.includes(category)}
                />
            ))}
        </Form.Group>
        )
    } else {
        return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Label>
                {title} {requiredStatus ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Control
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                required={requiredStatus ? true : false}
            />
        </Form.Group>
        )
    }
}