import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import "@fontsource/inter";
import { useBreakpointValue, useToken, Text, Stack } from "@chakra-ui/react";

type Props = {
    min?: number;
    max: number;
    title?: string;
    bottomYLabel?: string;
    topYLabel: string;
    bottomValue?: number;
    unit: string;
    top?: number;
    width?: string | number;
    height?: number;
    left?: number;
}

export const RangeChart = ({
    min,
    max,
    title,
    bottomValue: yourBudget,
    bottomYLabel,
    topYLabel,
    unit,
    top = 20,
    width = "110%",
    height = 140,
    left = 12,
}: Props) => {

    const yMapping = {
        1: bottomYLabel,
        2: topYLabel,
    };

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
        <Stack
            width={"100%"}
        >
            {
                title && (
                    <Text
                        style={{
                            alignSelf: "center",
                            fontSize: chartFontSize,
                            fontWeight: "bold",
                            marginBottom: -16,
                        }}
                    >
                        {title}
                    </Text>
                )
            }
            <ResponsiveContainer
                width={width}
                height={height}
                style={{
                    marginLeft: -left,
                    fontSize: chartFontSize,
                    fontFamily: "Inter",
                    fontWeight: 800,
                }}
            >
                <ScatterChart
                    margin={{
                        top: top,
                        right: 20,
                        left: -left,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" type="number" unit={unit} />
                    <YAxis
                        dataKey="y"
                        type="number"
                        ticks={yourBudget ? [1, 2] : [2]}
                        // @ts-ignore
                        tickFormatter={(tick) => yMapping[tick]}
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={priceRangeData} fill={primary} line />
                    {
                        yourBudget && (
                            <Scatter data={yourBudgetData} fill={secondary} />
                        )
                    }
                </ScatterChart>
            </ResponsiveContainer>
        </Stack>
    )
}