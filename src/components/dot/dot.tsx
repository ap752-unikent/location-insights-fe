import { hex } from "chroma-js";
import hexToRgba from "hex-to-rgba";

type Props = {
    size: number;
    color: string;
}

export const Dot = ({
    size, 
    color
} : Props) => {

    const borderSize = Math.ceil(size / 6);

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `${borderSize}px solid ${color}`,
            backgroundColor: hexToRgba(color, 0.5)
        }}>

        </div>
    )
}