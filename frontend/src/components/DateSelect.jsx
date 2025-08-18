import dateIcon from "../../public/icons/date.png";
import Select, { components } from "react-select";

const PRIMARY = "#0d6efd";

const styles = {
    control: (base, state) => ({
        ...base,
        minHeight: 47,
        borderColor: state.isFocused ? PRIMARY : "#212529",
        boxShadow: state.isFocused ? `0 0 0 0.2rem rgba(13,110,253,.25)` : "none",
        ":hover": { borderColor: PRIMARY },
        borderRadius: 12,
    }),
    placeholder: (base) => ({
        ...base,
        color: "#adb5bd",
    }),
    singleValue: (base, state) => {
        const isDefault = state.data?.value === "";
        return {
            ...base,
            color: isDefault ? "#212529" : PRIMARY,
            display: "flex",
            alignItems: "center",
            gap: 8,
        };
    },
    option: (base, state) => ({
        ...base,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: state.isSelected ? "#fff" : "#212529",
        backgroundColor: state.isSelected
            ? PRIMARY
            : state.isFocused
                ? "rgba(13,110,253,.08)"
                : "#fff",
        ":active": {
            backgroundColor: state.isSelected ? PRIMARY : "rgba(13,110,253,.12)",
        },
    }),
};

const theme = (t) => ({
    ...t,
    colors: {
        ...t.colors,
        primary: PRIMARY,
        primary25: "rgba(13,110,253,.10)",
    },
});

const CustomControl = (props) => (
    <components.Control {...props}>
        <img
            src={dateIcon}
            alt="시기 아이콘"
            width="16"
            height="16"
            style={{ marginLeft: 8, marginRight: 0 }}
        />
        {props.children}
    </components.Control>
);

function DateSelect({ value = "", onChange }) {
    const options = [
        { value: "", label: "시기" },
        { value: "개최중", label: "개최중" },
        { value: "개최예정", label: "개최예정" },
        { value: "01월", label: "01월" },
        { value: "02월", label: "02월" },
        { value: "03월", label: "03월" },
        { value: "04월", label: "04월" },
        { value: "05월", label: "05월" },
        { value: "06월", label: "06월" },
        { value: "07월", label: "07월" },
        { value: "08월", label: "08월" },
        { value: "09월", label: "09월" },
        { value: "10월", label: "10월" },
        { value: "11월", label: "11월" },
        { value: "12월", label: "12월" },
    ];

    return (
        <div style={{ width: 230 }}>
            <Select
                options={options}
                value={options.find((opt) => opt.value === value) || null}
                onChange={(opt) => onChange?.(opt?.value ?? "")}
                styles={styles}
                theme={theme}
                placeholder="시기"
                isClearable
                components={{ IndicatorSeparator: null, Control: CustomControl }}
            />
        </div>
    );
}

export default DateSelect;
