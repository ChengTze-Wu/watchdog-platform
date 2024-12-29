"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Guide() {
  return (
    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="Accordion 1" title="如何認列裝置？">
        至 [所有裝置]
        頁面，點選表格中的某列操作按鈕，即可開啟認列視窗，填寫認列名稱後儲存即可。
      </AccordionItem>
    </Accordion>
  );
}
