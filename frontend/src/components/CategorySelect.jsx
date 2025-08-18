import categoryIcon from "../../public/icons/category.png";
import waterIcon from "../../public/icons/water.png";
import summerIcon from "../../public/icons/summer.png";
import familyIcon from "../../public/icons/family.png";
import nightIcon from "../../public/icons/night.png";
import artIcon from "../../public/icons/art.png";
import showIcon from "../../public/icons/show.png";
import Select from "react-select";

const PRIMARY = "#0d6efd";

const styles = {
  control: (base, state) => ({
    ...base,
    minHeight: 47,
    borderColor: state.isFocused ? "#0d6efd" : "#212529",
    boxShadow: state.isFocused ? `0 0 0 0.2rem rgba(13,110,253,.25)` : "none",
    ":hover": { borderColor: "#0d6efd" },
    borderRadius: 12,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#adb5bd",
  }),
  singleValue: (base, state) => {
    const isCategory = state.data?.value === "";
    return {
      ...base,
      color: isCategory ? "#212529" : "#0d6efd",
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
      ? "#0d6efd"
      : state.isFocused
      ? "rgba(13,110,253,.08)"
      : "#fff",
    ":active": {
      backgroundColor: state.isSelected ? "#0d6efd" : "rgba(13,110,253,.12)",
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

function CategorySelect({ value = "", onChange }) {
  const options = [
    {
      value: "",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={categoryIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          카테고리
        </span>
      ),
    },
    {
      value: "물놀이",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={waterIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          물놀이
        </span>
      ),
    },
    {
      value: "여름",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={summerIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          여름
        </span>
      ),
    },
    {
      value: "가족과함께",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={familyIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          가족과함께
        </span>
      ),
    },
    {
      value: "야행",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={nightIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          야행
        </span>
      ),
    },
    {
      value: "문화예술",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={artIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          문화예술
        </span>
      ),
    },
    {
      value: "공연",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={showIcon}
            alt=""
            width="16"
            height="16"
            style={{ marginRight: 8 }}
          />
          공연
        </span>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 480 }}>
      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(opt) => onChange?.(opt?.value ?? "")}
        styles={styles}
        theme={theme}
        classNamePrefix="category-select"
        placeholder="카테고리"
        isClearable
        components={{ IndicatorSeparator: null }}
      />
    </div>
  );
}

export default CategorySelect;
