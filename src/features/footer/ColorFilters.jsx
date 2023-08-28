import { useDispatch, useSelector } from "react-redux";
import { selectedColorsFilter,changeColorFilter } from "../filter/filterSlice";

export const availableColors = ["green", "blue", "orange", "purple", "red"];

const ColorFilters = () => {
  const colors = useSelector(selectedColorsFilter);
  const dispatch = useDispatch();

  const selectCheckColor = (color, changType) => {
    dispatch(changeColorFilter(color,changType));
  };

  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const changType = checked ? "removed" : "added";


    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          defaultChecked={checked}
          onClick={()=>selectCheckColor(color,changType)}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {color}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  );
};

export default ColorFilters;
