/* eslint-disable default-case */
import { produce } from "immer";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Compeleted: "compeleted",
};
const initState = {
  statuses: StatusFilters.All,
  colors: [],
};
export const filterReducer = produce((state, action) => {
  switch (action.type) {
    case "filter/changeStatusesFilter":
      state.statuses = action.payloade;
      break;
    case "filter/changeColorFilter":
      const { color, changType } = action.payloade;

      switch (changType) {
        case "added":
          state.colors.push(color);
          break;
        case "removed":
          state.colors = state.colors.filter((c) => c !== color);
      }
  }
}, initState);

export const changeStatusesFilter = (statuse) => ({
  type: "filter/changeStatusesFilter",
  payloade: statuse,
});
export const changeColorFilter = (color, changType) => ({
  type: "filter/changeColorFilter",
  payloade: {
    color,
    changType,
  },
});

export const selectedStatusFilter = (state) => state.filters.statuses;
export const selectedColorsFilter = (state) => state.filters.colors;

