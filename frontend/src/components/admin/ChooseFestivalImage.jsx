// components/common/ChooseFestivalImage.jsx
import React from 'react';

export const ChooseFestivalImage = ({ controlId, title, type, name, onChange }) => {
    return (
        <>
            <label 
                htmlFor={`file-input-${controlId}`} 
                className="btn btn-secondary mt-3" 
                style={{ whiteSpace: 'nowrap' }}
            >
                {title}
            </label>
            <input
                id={`file-input-${controlId}`}
                type={type}
                name={name}
                onChange={onChange}
                className='d-none mr-5' // 파일을 선택하는 input을 숨김
            />
        </>
    );
};