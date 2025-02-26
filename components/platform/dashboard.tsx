"use client";

import { useState, useEffect } from "react";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { useTheme } from "next-themes";
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

import { getDailyConnected } from "@/actions/statistics";

interface BarChartData {
  time: string;
  連線數: number;
}

export default function Dashboard() {
  const [data, setData] = useState([] as BarChartData[]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    getDailyConnected().then((response) => {
      const data = response.map((item) => ({
        time: item.hour,
        連線數: item.count,
      }));
      setData(data);
    });
  }, []);

  return (
    <Card className="p-2">
      <CardHeader className="flex items-center justify-between">
        <h2 className="font-semibold">今日連線狀況</h2>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 15 }}
          >
            <XAxis
              dataKey="time"
              label={{
                value: "時刻",
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f4f4f4",
                opacity: 0.9,
                color: "#333",
                borderRadius: "12px",
              }}
              cursor={false}
            />
            <Bar
              dataKey="連線數"
              fill="#8884d8"
              maxBarSize={20}
              radius={[5, 5, 0, 0]}
              label={{
                fill: isDarkMode ? "#fff" : "#000",
                position: "top",
                fontSize: 12,
              }} // 顯示數值標籤
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
