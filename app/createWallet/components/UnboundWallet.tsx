"use client";

import { useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { PlusCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import ImportWalletModal from "./ImportWalletModal";
import CreateWalletModal from "./CreateWalletModal";

const { Title, Text } = Typography;

export default function UnboundWallet() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const walletList = [
    {
      name: "导入钱包",
      description: "通过助记词导入现有钱包",
      icon: DownloadOutlined,
      bgColor: "#3b82f6",
      textColor: "#fff",
    },
    {
      name: "新建钱包",
      description: "创建新的加密货币钱包",
      icon: PlusCircleOutlined,
      bgColor: "var(--color-primary)",
      textColor: "#fff",
    },
    {
      name: "导入OKX钱包",
      description: "连接您的OKX账户",
      icon: "OKX",
      bgColor: "#145CEC",
      textColor: "#fff",
    },
    {
      name: "导入币安钱包",
      description: "连接您的币安账户",
      icon: "BNB",
      bgColor: "#F3BA2F",
      textColor: "#000",
    },
  ];

  const handleClick = (name: string) => {
    console.log("点击了:", name);
    if (name === "导入钱包") {
      console.log("设置 showImportModal 为 true");
      setShowImportModal(true);
    } else if (name === "新建钱包") {
      console.log("设置 showCreateModal 为 true");
      setShowCreateModal(true);
    } else {
      console.log("点击:", name);
    }
  };

  const handleImportSuccess = () => {
    console.log("钱包导入成功");
  };

  const handleCreateSuccess = (wallet: { address: string }) => {
    console.log("钱包创建成功:", wallet.address);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Card
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--color-primary)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <Title
              level={2}
              style={{ marginBottom: "8px", color: "var(--color-text-primary)" }}
            >
              检测到你还没有绑定钱包，请选择以下方式创建/导入钱包
            </Title>
            <Text style={{ color: "var(--color-text-secondary)" }}>
              { "选择以下方式管理您的数字资产"}
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {walletList.map((wallet, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  hoverable
                  style={{
                    backgroundColor: wallet.bgColor,
                    borderColor: wallet.bgColor,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleClick(wallet.name)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-col items-center text-center p-4">
                    {typeof wallet.icon === "string" ? (
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4">
                        <Text style={{ color: wallet.bgColor, fontWeight: "bold", fontSize: "20px" }}>
                          {wallet.icon}
                        </Text>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                        <wallet.icon className="w-8 h-8" style={{ color: wallet.bgColor }} />
                      </div>
                    )}
                    <Title level={4} style={{ margin: "0 0 8px 0", color: wallet.textColor }}>
                      {wallet.name}
                    </Title>
                    <Text
                      style={{
                        color: wallet.textColor === "#fff" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      {wallet.description}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      <ImportWalletModal
        visible={showImportModal}
        onCancel={() => setShowImportModal(false)}
        onSuccess={handleImportSuccess}
      />

      <CreateWalletModal
        visible={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}