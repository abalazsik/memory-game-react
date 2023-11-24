
import { CardDataWithPosition, colorToRGB, colorToText } from "./cards";
import { emitCardSelect } from "./customEvents";

function Card({ data, clickable }: { data: CardDataWithPosition, clickable: boolean }) {
    const onClick = () => {
        if (clickable && !data.visible) {
            data.visible = !data.visible;
            if (data.visible) {
                emitCardSelect(data.idx);
            }
        }
    };

    return (
        <button onClick={onClick} className="outer-box" style={{ gridColumn: data.x, gridRow: data.y }}>
            {data.visible && <div className="box"
                style={{ color: colorToRGB(data.color), backgroundColor: colorToRGB(data.backColor) }}>
                <div className="inner-box">{colorToText(data.text)}</div>
            </div>}
            {!data.visible && <div className="inner-box unknown">?</div>}
        </button>
    )
}

export default Card;