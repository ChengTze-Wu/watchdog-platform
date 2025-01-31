"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  {
    time: "00",
    數量: 4,
  },
  {
    time: "01",
    數量: 8,
  },
  {
    time: "02",
    數量: 4,
  },
  {
    time: "03",
    數量: 7,
  },
  {
    time: "04",
    數量: 9,
  },
  {
    time: "05",
    數量: 3,
  },
  {
    time: "06",
    數量: 2,
  },
  {
    time: "07",
    數量: 5,
  },
  {
    time: "08",
    數量: 4,
  },
  {
    time: "09",
    數量: 7,
  },
  {
    time: "10",
    數量: 8,
  },
  {
    time: "11",
    數量: 6,
  },
  {
    time: "12",
    數量: 5,
  },
  {
    time: "13",
    數量: 4,
  },
  {
    time: "14",
    數量: 6,
  },
  {
    time: "15",
    數量: 8,
  },
  {
    time: "16",
    數量: 6,
  },
  {
    time: "17",
    數量: 0,
  },
  {
    time: "18",
    數量: 0,
  },
  {
    time: "19",
    數量: 0,
  },
  {
    time: "20",
    數量: 0,
  },
  {
    time: "21",
    數量: 0,
  },
  {
    time: "22",
    數量: 0,
  },
  {
    time: "23",
    數量: 0,
  },
];

export default function Dashboard() {
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
            <Bar dataKey="數量" fill="#8884d8" maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
