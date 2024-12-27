import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import "@fontsource/inter";
import { useBreakpointValue, useToken } from "@chakra-ui/react";

type Props = {
    min: number;
    max: number;
    yourBudget: number;
}

const yMapping = {
    1: "Your Budget",
    2: "Rent",
};

export const PriceChart = ({
    min,
    max,
    yourBudget
}: Props) => {

    const [primary, secondary] = useToken("colors", ["primary", "secondary"]);
    const priceRangeData = [
        {
            "x": min,
            "y": 2,
        },
        {
            "x": max,
            "y": 2,
        }
    ]

    const yourBudgetData = [
        {
            "x": yourBudget,
            "y": 1,
        }
    ]

    const chartFontSize = useBreakpointValue({ base: "10px", md: "12px" });

    return (
        <ResponsiveContainer width="100%" height={140}>
            <ScatterChart
                style={{
                    fontSize: chartFontSize,
                    fontFamily: "Inter",
                    fontWeight: 800
                }}
                height={140}
                margin={{
                    top: 20,
                    right: 20,
                    left: -12,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" name="rent" unit="£" />
                <YAxis
                    dataKey="y"
                    type="number"
                    ticks={[1, 2]}
                    // @ts-ignore
                    tickFormatter={(tick) => yMapping[tick]}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={priceRangeData} fill={primary} line />
                <Scatter data={yourBudgetData} fill={secondary} />
            </ScatterChart>
        </ResponsiveContainer>
    )
}