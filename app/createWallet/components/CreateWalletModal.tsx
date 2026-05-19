"use client";

import { Card, Typography, Button } from "antd";
import { XOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useCreateWallet } from "../hooks/useCreateWallet";
import { useState, useEffect } from "react";

const { Title, Text } = Typography;

interface CreateWalletModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: (wallet: { address: string }) => void;
}

export default function CreateWalletModal({ visible, onCancel, onSuccess }: CreateWalletModalProps) {
    const { isCreating, createdWallet, canConfirm, createWallet, reset } = useCreateWallet();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (createdWallet && !canConfirm) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [createdWallet, canConfirm]);

    const handleCreate = async () => {
        setCountdown(5);
        await createWallet();
    };

    const handleConfirm = () => {
        if (createdWallet && canConfirm) {
            onSuccess({ address: createdWallet.address });
            reset();
            onCancel();
        }
    };

    const handleClose = () => {
        reset();
        onCancel();
    };

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
            }}
            onClick={handleClose}
        >
            <Card
                style={{
                    width: 520,
                    backgroundColor: "var(--color-surface-elevated)",
                    borderColor: "var(--color-border)",
                    position: "relative",
                    zIndex: 100,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {isCreating ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <Title level={3} style={{ margin: 0, color: "var(--color-text-primary)" }}>
                            正在创建钱包...
                        </Title>
                        <Text type="secondary" style={{ marginTop: "12px", display: "block" }}>
                            正在生成安全的私钥和助记词，请稍候...
                        </Text>
                    </div>
                ) : createdWallet ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Title level={2} style={{ margin: 0, color: "var(--color-text-primary)" }}>
                                钱包创建成功
                            </Title>
                            <Button
                                type="text"
                                icon={<XOutlined />}
                                onClick={handleClose}
                                style={{ color: "var(--color-text-secondary)" }}
                            />
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                    <Text style={{ color: "#f59e0b", fontWeight: "bold" }}>!</Text>
                                </div>
                                <div>
                                    <Text style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>
                                        重要提示
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: "13px", display: "block", marginTop: "4px" }}>
                                        请妥善保管您的助记词，这是恢复钱包的唯一凭证。请勿截图、拍照或存储在云端。
                                    </Text>
                                </div>
                            </div>
                        </div>
                        {createdWallet.mnemonic && <div>
                            <Text style={{ color: "var(--color-text-secondary)", fontSize: "14px", marginBottom: "8px", display: "block" }}>
                                助记词（12个单词）
                            </Text>
                            <div className="bg-gray-900 rounded-lg p-6 font-mono text-lg leading-relaxed">
                                <div className="flex flex-wrap gap-2">
                                    {createdWallet.mnemonic.split(" ").map((word, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-800 rounded text-green-400"
                                        >
                                            <span className="text-gray-500 mr-1">{index + 1}.</span>
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>}


                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Text type="secondary">钱包地址</Text>
                                <Text className="font-mono text-sm" style={{ color: "var(--color-text-primary)" }}>
                                    {createdWallet.address}
                                </Text>
                            </div>
                        </div>

                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={handleConfirm}
                            disabled={!canConfirm}
                            icon={canConfirm ? <CheckCircleOutlined /> : null}
                            style={{
                                backgroundColor: canConfirm ? "var(--color-primary)" : "#9ca3af",
                                borderColor: canConfirm ? "var(--color-primary)" : "#d1d5db",
                            }}
                        >
                            {canConfirm ? "我已妥善保管助记词，确认创建" : `请仔细阅读并备份助记词 (${countdown}s)`}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Title level={2} style={{ margin: 0, color: "var(--color-text-primary)" }}>
                                新建钱包
                            </Title>
                            <Button
                                type="text"
                                icon={<XOutlined />}
                                onClick={handleClose}
                                style={{ color: "var(--color-text-secondary)" }}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircleOutlined className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <Text style={{ color: "var(--color-text-primary)" }}>安全加密</Text>
                                    <Text type="secondary" style={{ fontSize: "13px", display: "block" }}>
                                        使用行业标准的加密算法生成私钥和助记词
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircleOutlined className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <Text style={{ color: "var(--color-text-primary)" }}>去中心化</Text>
                                    <Text type="secondary" style={{ fontSize: "13px", display: "block" }}>
                                        您的私钥仅存储在本地，不会上传到服务器
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircleOutlined className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <Text style={{ color: "var(--color-text-primary)" }}>跨链支持</Text>
                                    <Text type="secondary" style={{ fontSize: "13px", display: "block" }}>
                                        支持以太坊、Polygon等多条区块链网络
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="default"
                                block
                                onClick={handleClose}
                                style={{ flex: 1 }}
                            >
                                取消
                            </Button>
                            <Button
                                type="primary"
                                block
                                onClick={handleCreate}
                                style={{ flex: 1, backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                            >
                                创建钱包
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}