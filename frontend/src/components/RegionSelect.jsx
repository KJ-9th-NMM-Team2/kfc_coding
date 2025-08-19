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
      src={"/icons/region.png"}
      alt="지역 아이콘"
      width="16"
      height="16"
      style={{ marginLeft: 8, marginRight: 0 }}
    />
    {props.children}
  </components.Control>
);

function RegionSelect({ value = "", onChange }) {
  const options = [
    { value: "", label: "지역" },
    { value: "서울", label: "서울" },
    { value: "인천", label: "인천" },
    { value: "대전", label: "대전" },
    { value: "대구", label: "대구" },
    { value: "광주", label: "광주" },
    { value: "부산", label: "부산" },
    { value: "울산", label: "울산" },
    { value: "세종특별자치시", label: "세종특별자치시" },
    { value: "경기도", label: "경기도" },
    { value: "강원특별자치도", label: "강원특별자치도" },
    { value: "충청북도", label: "충청북도" },
    { value: "충청남도", label: "충청남도" },
    { value: "경상북도", label: "경상북도" },
    { value: "경상남도", label: "경상남도" },
    { value: "전북특별자치도", label: "전북특별자치도" },
    { value: "전라남도", label: "전라남도" },
    { value: "제주특별자치도", label: "제주특별자치도" },
  ];

  return (
    <div style={{ width: 230 }}>
      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(opt) => onChange?.(opt?.value ?? "")}
        styles={styles}
        theme={theme}
        placeholder="지역"
        isClearable
        components={{
          IndicatorSeparator: null,
          Control: CustomControl,
        }}
      />
    </div>
  );
}

export default RegionSelect;
