"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";
import { FaPlus, FaLine } from "react-icons/fa6";

import { broadcastLine, getLineQuota } from "@/actions/senders";
import { useAlert } from "@/components/common/flash-alert";

const ACCESS_TOKEN =
  "pKGrMkR1BGFCRxOox31Sw8G8TPaSmxBcH27Nk11m8fDJS+/zty2Yl8d5bPbjrWNoHGtJ8PsFqeBuG3a/8PqO0TdeuReRNbBGom/v29i10Xtln6O0AcK6RxcPjuNV7fRStswe4fSms1B1xHkoSNDbcwdB04t89/1O/w1cDnyilFU=";

export default function LineSenderCard() {
  const { showAlert } = useAlert();
  const [quota, setQuota] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const quotaData = await getLineQuota(ACCESS_TOKEN);
        setQuota(quotaData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuota();
  }, []);

  const handleLineSender = async () => {
    if (quota === null || quota >= 10) {
      showAlert({
        title: "警告",
        description: "本月配額已使用完畢，請聯絡系統管理員",
        color: "danger",
        variant: "faded",
      });
      return;
    }
    setQuota((prev) => (prev === null ? 1 : prev + 1));
  };

  return (
    <Card shadow="sm">
      <CardHeader>
        <FaLine className="w-10 h-10" color="#00c300" />
        <Spacer x={2} />
        <p className="text-sm text-default-500">Line Message API</p>
        <Spacer />
      </CardHeader>
      <CardBody>
        <Button
          isIconOnly
          variant="ghost"
          className="w-full h-40 border-dashed border-1"
          onPress={handleLineSender}
        >
          <FaPlus />
        </Button>
      </CardBody>
      <CardFooter>
        <p className="text-sm text-default-400">
          已發出: {quota === null ? "?" : `${quota}`} / 200 則
        </p>
      </CardFooter>
    </Card>
  );
}
