"use client";

import { useState } from "react";
import { Card, Typography, Row, Col, Button, Divider } from "antd";
import { WalletOutlined} from "@ant-design/icons";
import AnimatedNumber from "@/components/AnimatedNumber";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

const SUB_WALLETS = [
  { name: "BTC", balance: 0.5234, usdValue: 26170, icon: "B" },
  { name: "ETH", balance: 3.875, usdValue: 8265, icon: "E" },
  { name: "USDT", balance: 1250.50, usdValue: 1250.50, icon: "T" },
  { name: "BNB", balance: 15.2, usdValue: 5776, icon: "N" },
];

export default function BoundWallet() {
  const t = useTranslations("wallet");
  const [totalBalance] = useState(41462);

  const handleCopyAddress = () => {
    console.log("复制地址");
  };

  const handleDeposit = () => {
    console.log("充值");
  };

  const handleWithdraw = () => {
    console.log("提现");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <Card
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <WalletOutlined
                  className="w-6 h-6"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <Text style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                {t("totalAssets") || "总资产"}
              </Text>
              <Title
                level={2}
                style={{ margin: "8px 0", color: "var(--color-text-primary)" }}
              >
                <AnimatedNumber
                  value={totalBalance}
                  prefix="$"
                  color="var(--color-text-primary)"
                  fontSize="32px"
                />
              </Title>
              <div className="flex items-center gap-2">
                <Text style={{ color: "#10b981", fontSize: "14px", fontWeight: 500 }}>
                  <WalletOutlined className="w-4 h-4" />
                  +12.5% {t("today") || "今日"}
                </Text>
              </div>
            </div>
            <Button
              type="default"
              onClick={handleCopyAddress}
              icon={<WalletOutlined />}
              style={{ marginTop: "12px" }}
            >
              {t("copyAddress") || "复制地址"}
            </Button>
          </div>
        </Card>

        <Card
          title={t("subWallets") || "子钱包"}
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
          }}
          titleStyle={{ color: "var(--color-text-primary)" }}
        >
          <div className="space-y-4">
            {SUB_WALLETS.map((wallet, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200"
                style={{ backgroundColor: "var(--color-surface)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-border)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-surface)";
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>{wallet.icon}</Text>
                  </div>
                  <div>
                    <Text style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                      {wallet.name}
                    </Text>
                    <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      {wallet.balance.toFixed(4)} {wallet.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Text style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    ${wallet.usdValue.toLocaleString()}
                  </Text>
                  <WalletOutlined
                    className="w-5 h-5 ml-2"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Button type="primary" block size="large" onClick={handleDeposit}>
                {t("deposit") || "充值"}
              </Button>
            </Col>
            <Col span={12}>
              <Button type="default" block size="large" onClick={handleWithdraw}>
                {t("withdraw") || "提现"}
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}