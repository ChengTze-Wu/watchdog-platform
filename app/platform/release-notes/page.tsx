"use client";

import { Accordion, AccordionItem } from "@heroui/react";

export default function ReleaseNotes() {
  return (
    <Accordion variant="splitted" defaultExpandedKeys={["v0.4.0"]}>
      <AccordionItem key="v0.4.0" aria-label="v0.4.0" title="v0.4.0">
        <ul className="list-disc list-inside pl-4">
          <li>新增版本資訊頁面，方便用戶追蹤發行歷程。</li>
          <li>首頁每日連線數長條圖經過 UI 全面升級，圖形表現更精緻。</li>
          <li>新增首頁每日連線數切換日期功能，數據展示更靈活。</li>
        </ul>
      </AccordionItem>
      <AccordionItem key="v0.3.1" aria-label="v0.3.1" title="v0.3.1">
        <ul className="list-disc list-inside pl-4">
          <li>
            Alert Component 已替換為 HeroUI Toast
            Component，提升通知效果與一致性。
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem key="v0.3.0" aria-label="v0.3.0" title="v0.3.0">
        <ul className="list-disc list-inside pl-4">
          <li>新增首頁「今日連線狀況」圖表，直觀展現連線趨勢。</li>
          <li>裝置表格現加入自訂顯示欄位，提供更個性化的數據視圖。</li>
          <li>
            首頁中的線上裝置與 24 小時連線裝置調整為 Tabs 分組，切換更順暢。
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
}
