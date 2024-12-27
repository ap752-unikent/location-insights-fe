

type Props = {
    value: number;
    color: string;
    height?: number;
}

export const ProgressBar = ({ value, color, height = 12}: Props) => {
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "transparent",
                borderRadius: 8,
                border: "1px solid lightgray",
                overflow: "hidden",
                height: height + 2,
            }}
        >
            <div style={{
                width: `${value * 100}%`,
                height: height,
                backgroundColor: color,
                borderRadius: 8,
            }} />
        </div>
    )
}