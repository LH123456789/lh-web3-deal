"use client";

import { useState } from "react";
import { Button, Card, Typography, Divider, message } from "antd";
import { DownloadOutlined, KeyOutlined, XOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useWallet } from "../hooks/useWallet";
import { ethers } from "ethers";

const { Title, Text } = Typography;

interface ImportWalletModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

type ImportType = "mnemonic" | "privateKey";
type NetworkType = "mainnet" | "testnet";

const customInputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-text-primary)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
  ":focus": {
    borderColor: "var(--color-primary)",
  },
  "::placeholder": {
    color: "var(--color-text-secondary)",
    opacity: 1,
  },
} as React.CSSProperties;

const networkConfig = {
  mainnet: {
    name: "主网",
    rpcUrl: "https://ethereum.publicnode.com",
    chainId: 1,
    symbol: "ETH",
  },
  testnet: {
    name: "测试网",
    rpcUrl: "https://sepolia.publicnode.com",
    chainId: 11155111,
    symbol: "ETH (测试)",
  },
};

export default function ImportWalletModal({ visible, onCancel, onSuccess }: ImportWalletModalProps) {
  const { importByMnemonic, importByPrivateKey } = useWallet();
  const [importType, setImportType] = useState<ImportType>("mnemonic");
  const [network, setNetwork] = useState<NetworkType>("mainnet");
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImport = () => {
    if (importType === "mnemonic") {
      if (!mnemonic.trim()) {
        message.error("请输入助记词");
        return;
      }

      const mnemonicWords = mnemonic.trim().split(/\s+/);
      if (mnemonicWords.length !== 12 && mnemonicWords.length !== 18 && mnemonicWords.length !== 24) {
        message.error("助记词格式错误，必须是12/18/24个单词");
        return;
      }
    } else {
      if (!privateKey.trim()) {
        message.error("请输入私钥");
        return;
      }

      const cleanedKey = privateKey.trim().replace(/^0x/, "");
      if (cleanedKey.length !== 64) {
        message.error("私钥格式错误，必须是64位十六进制字符");
        return;
      }
    }

    if (!password) {
      message.error("请设置密码");
      return;
    }

    if (!confirmPassword) {
      message.error("请确认密码");
      return;
    }

    if (password !== confirmPassword) {
      message.error("两次输入的密码不一致");
      return;
    }

    let success = false;
    if (importType === "mnemonic") {
      success = importByMnemonic(mnemonic);
    } else {
      success = importByPrivateKey(privateKey);
    }

    if (success) {
      const { wallet } = useWallet();
      const config = networkConfig[network];
      
      console.log("=== 钱包导入成功 ===");
      console.log("钱包地址:", wallet?.address);
      console.log("导入类型:", wallet?.type);
      console.log("创建时间:", wallet?.createdAt ? new Date(wallet.createdAt).toLocaleString() : "N/A");
      console.log("公钥:", wallet?.publicKey);
      console.log("当前网络:", config.name, "(Chain ID:", config.chainId + ")");
      
      getWalletBalance(wallet?.address);
      
      message.success("钱包导入成功");
      onSuccess();
      onCancel();
    } else {
      message.error(importType === "mnemonic" ? "助记词无效，请检查输入" : "私钥无效，请检查输入");
    }
  };

  const getWalletBalance = async (address: string | undefined) => {
    if (!address) return;
    
    const config = networkConfig[network];
    
    try {
      const provider = new ethers.JsonRpcProvider(config.rpcUrl);
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);
      
      console.log(`=== ${config.name}钱包余额 ===`);
      console.log(`${config.symbol}余额:`, balanceInEth);
      console.log("余额(wei):", balance.toString());
    } catch (error) {
      console.log("获取余额失败:", error);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <Card
        style={{
          width: 480,
          backgroundColor: "var(--color-surface-elevated)",
          borderColor: "var(--color-border)",
          position: "relative",
          zIndex: 100,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <Title level={2} style={{ margin: 0, color: "var(--color-text-primary)" }}>
            导入钱包
          </Title>
          <Button
            type="text"
            icon={<XOutlined />}
            onClick={onCancel}
            style={{ color: "var(--color-text-secondary)" }}
          />
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              type={network === "mainnet" ? "primary" : "default"}
              onClick={() => setNetwork("mainnet")}
              style={{ flex: 1 }}
            >
              主网
            </Button>
            <Button
              type={network === "testnet" ? "primary" : "default"}
              onClick={() => setNetwork("testnet")}
              style={{ flex: 1 }}
            >
              测试网
            </Button>
          </div>

          <Divider />

          <div className="flex gap-4">
            <Card
              hoverable
              className={`flex-1 cursor-pointer transition-all ${
                importType === "mnemonic" ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setImportType("mnemonic")}
              style={{
                borderColor: importType === "mnemonic" ? "#3b82f6" : undefined,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-3">
                  <DownloadOutlined className="w-6 h-6 text-white" />
                </div>
                <Title level={4} style={{ margin: 0 }}>助记词导入</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  通过12/18/24个助记词导入
                </Text>
              </div>
            </Card>

            <Card
              hoverable
              className={`flex-1 cursor-pointer transition-all ${
                importType === "privateKey" ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setImportType("privateKey")}
              style={{
                borderColor: importType === "privateKey" ? "#3b82f6" : undefined,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                  <KeyOutlined className="w-6 h-6 text-white" />
                </div>
                <Title level={4} style={{ margin: 0 }}>私钥导入</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  通过64位私钥导入
                </Text>
              </div>
            </Card>
          </div>

          <Divider />

          {importType === "mnemonic" ? (
            <div className="space-y-4">
              <textarea
                placeholder="请输入12/18/24个助记词，用空格分隔"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                rows={3}
                style={{ ...customInputStyle, resize: "none" }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="请输入私钥（64位十六进制）"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                style={customInputStyle}
              />
            </div>
          )}

          <Divider />

          <div className="space-y-4">
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="设置钱包密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={customInputStyle}
              />
              <Button
                type="text"
                icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-secondary)",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="确认钱包密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={customInputStyle}
              />
              <Button
                type="text"
                icon={showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-secondary)",
                }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="default"
              block
              onClick={onCancel}
              style={{ flex: 1 }}
            >
              取消
            </Button>
            <Button
              type="primary"
              block
              onClick={handleImport}
              style={{ flex: 1, backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }}
            >
              导入钱包
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}