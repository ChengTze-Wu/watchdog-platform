"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    time: "00:00",
    數量: 4,
  },
  {
    time: "01:00",
    數量: 8,
  },
  {
    time: "02:00",
    數量: 4,
  },
  {
    time: "03:00",
    數量: 7,
  },
  {
    time: "04:00",
    數量: 9,
  },
  {
    time: "05:00",
    數量: 3,
  },
  {
    time: "06:00",
    數量: 2,
  },
  {
    time: "07:00",
    數量: 5,
  },
  {
    time: "08:00",
    數量: 4,
  },
  {
    time: "09:00",
    數量: 7,
  },
  {
    time: "10:00",
    數量: 8,
  },
  {
    time: "11:00",
    數量: 6,
  },
];

export default function Dashboard() {
  return (
    <Card className="p-2 w-1/2">
      <CardHeader className="flex items-center justify-between">
        <h2 className="font-semibold">12小時內連線狀況</h2>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <XAxis dataKey="time" />
            <YAxis width={20} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f4f4f4",
                opacity: 0.8,
                color: "#333",
                borderRadius: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="數量"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
