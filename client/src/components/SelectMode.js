import React from "react";
import Button from "material-ui/Button";

export default function SelectModer(props) {
  return (
    <section className="mode">
      <span className="section-title">モード選択</span>
      <Button
        raised
        color="primary"
        onClick={() => props.func()}
        className="button"
      >
        {props.toggleMode}モードへ
      </Button>
    </section>
  );
}
