import Select, { components } from "react-select";

const PRIMARY = "#0d6efd";

const ICONS = {
  default: "/icons/category.png",
  물놀이: "/icons/water.png",
  여름: "/icons/summer.png",
  가족과함께: "/icons/family.png",
  야행: "/icons/night.png",
  문화예술: "/icons/art.png",
  공연: "/icons/show.png",
};

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

const CustomOption = (props) => {
  const { label, icon } = props.data;
  return (
    <components.Option {...props}>
      <img src={icon ?? ICONS.default} alt="" width="16" height="16" />
      <span>{label}</span>
    </components.Option>
  );
};

const CustomSingleValue = (props) => {
  const { label } = props.data;
  return <components.SingleValue {...props}>{label}</components.SingleValue>;
};

const CustomControl = (props) => {
  const selected = props.getValue?.()[0];
  const icon = selected?.icon ?? ICONS.default;
  return (
    <components.Control {...props}>
      <img
        src={icon}
        alt=""
        width="16"
        height="16"
        style={{ marginLeft: 8, marginRight: 4 }}
      />
      {props.children}
    </components.Control>
  );
};

function CategorySelect({ value = "", onChange }) {
  const options = [
    { value: "", label: "카테고리", icon: ICONS.default },
    { value: "물놀이", label: "물놀이", icon: ICONS.물놀이 },
    { value: "여름", label: "여름", icon: ICONS.여름 },
    { value: "가족과함께", label: "가족과함께", icon: ICONS.가족과함께 },
    { value: "야행", label: "야행", icon: ICONS.야행 },
    { value: "문화예술", label: "문화예술", icon: ICONS.문화예술 },
    { value: "공연", label: "공연", icon: ICONS.공연 },
  ];

  return (
    <span>
      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(opt) => onChange?.(opt?.value ?? "")}
        styles={styles}
        theme={theme}
        placeholder="카테고리"
        isClearable
        components={{
          IndicatorSeparator: null,
          Control: CustomControl,
          Option: CustomOption,
          SingleValue: CustomSingleValue,
        }}
      />
    </span>
  );
}

export default CategorySelect;
