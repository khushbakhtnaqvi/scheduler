import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const selectStyle = classNames("day-list__item", {
    "day-list__item--full": (props.spots === 0),
    "day-list__item--selected": props.selected,
  });

  return (
    <li data-testid="day"
      className={selectStyle} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
};

const formatSpots = (props) => {
  const noSpots = "no spots remaining";
  const spots = `${props.spots} spots remaining`;
  const oneSpot = "1 spot remaining";
  if (props.spots === 0) {
    return noSpots;
  };
  if (props.spots === 1) {
    return oneSpot;
  };
  return spots;
};