"use client";

import { Accordion, AccordionItem, Link, Spacer } from "@heroui/react";

export default function ReleaseNotes() {
  return (
    <Accordion variant="splitted" defaultExpandedKeys={["0.4.0"]}>
      <AccordionItem key="0.4.0" aria-label="0.4.0" title="0.4.0">
        <h2 className="text-lg font-bold">Fixes</h2>
        <ul className="list-disc list-inside pl-4">
          <li>修正 useCallback 的 dependencies 警告。</li>
        </ul>
        <Spacer />
        <h2 className="text-lg font-bold">Features</h2>
        <ul className="list-disc list-inside pl-4">
          <li>加入「版本資訊」頁面。</li>
        </ul>
        <Spacer />
        <h2 className="text-lg font-bold">Internal</h2>
        <ul className="list-disc list-inside pl-4">
          <li>更換 GitHub Actions 觸發自動部署規則。</li>
        </ul>
      </AccordionItem>
      <AccordionItem key="0.3.1" aria-label="0.3.1" title="0.3.1">
        <h2 className="text-lg font-bold">Features</h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Alert Component 替換為 HeroUI Toast Component。
            <Link
              isBlock
              showAnchorIcon
              href="https://github.com/ChengTze-Wu/watchdog-platform/pull/6"
              isExternal
            >
              PR #6
            </Link>
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem key="0.3.0" aria-label="0.3.0" title="0.3.0">
        <h2 className="text-lg font-bold">Features</h2>
        <ul className="list-disc list-inside pl-4">
          <li>首頁加入「今日連線狀況」長條圖。</li>
        </ul>
        <ul className="list-disc list-inside pl-4">
          <li>所有裝置表格加入顯示欄位選項。</li>
        </ul>
        <Spacer />
        <h2 className="text-lg font-bold">Refactors</h2>
        <ul className="list-disc list-inside pl-4">
          <li>首頁中的「線上裝置」及「24小時連線裝置」改用切換 Tabs。</li>
        </ul>
        <Spacer />
        <h2 className="text-lg font-bold">Internal</h2>
        <ul className="list-disc list-inside pl-4">
          <li>導入 GitHub Actions 進行自動部署。</li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
}
