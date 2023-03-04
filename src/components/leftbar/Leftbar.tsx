import "./leftbar.css";
import "../buttons/ButtonGetName";
import { ButtonGetName } from "../buttons/ButtonGetName";
import { Api } from "../../Api";

export function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ButtonGetName />
        <Api />

        <button>Check Again</button>
      </div>
    </div>
  );
}
