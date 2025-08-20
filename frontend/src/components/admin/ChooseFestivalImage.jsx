// components/common/ChooseFestivalImage.jsx
import React from 'react';

export const ChooseFestivalImage = ({ controlId, name, onChange }) => {
    return (
        <>
            <label 
                htmlFor={`file-input-${controlId}`} 
                className="btn btn-secondary mt-3" 
                style={{ whiteSpace: 'nowrap' }}
            >
                이미지 선택
            </label>
            <input
                id={`file-input-${controlId}`}
                type="file"
                name={name}
                onChange={onChange}
                className='d-none' // 파일을 선택하는 input을 숨김
            />
        </>
    );
};