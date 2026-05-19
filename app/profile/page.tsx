"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, Row, Col, Divider, message } from "antd";
import {
  UserOutlined
} from "@ant-design/icons";
import { getUser, logout } from "@/utils/auth";
import AnimatedNumber from "@/components/AnimatedNumber";

const { Title, Text, Paragraph } = Typography;

const AVATAR_URL = "https://pic.cdfgsy.cn/assets/upload/weapp_imgs/front/avatar-img-new.png";

const menuItems = [
  { icon: UserOutlined, label: "安全设置", description: "修改密码、绑定手机" },
  { icon: UserOutlined, label: "交易记录", description: "查看所有交易历史" },
  { icon: UserOutlined, label: "邀请好友", description: "邀请好友获得奖励" },
  { icon: UserOutlined, label: "帮助中心", description: "常见问题解答" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const [totalAssets, setTotalAssets] = useState(1489932);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 200;
      setTotalAssets((prev) => {
        const newValue = prev + change;
        return Math.max(1000000, Math.min(1489932, newValue));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    message.success("退出登录成功");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleRecharge = () => {
    message.info("充值功能即将开放");
  };

  const handleWithdraw = () => {
    message.info("提现功能即将开放");
  };

  const handleTransfer = () => {
    message.info("转账功能即将开放");
  };

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Card
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg"
            >
              <img
                src={AVATAR_URL}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Title
                level={2}
                style={{ margin: 0, color: "var(--color-text-primary)" }}
              >
                {user.username}
              </Title>
              <Text style={{ color: "var(--color-text-secondary)" }}>
                {user.email}
              </Text>
            </div>
            <Button
              type="default"
              danger
              onClick={handleLogout}
              style={{ marginLeft: "auto" }}
            >
              <UserOutlined className="mr-2" />
              退出登录
            </Button>
          </div>
        </Card>

        <Card
          title={
            <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
              账户概览
            </Text>
          }
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <AnimatedNumber
                  value={totalAssets}
                  prefix="$"
                  color="var(--color-text-primary)"
                  fontSize="24px"
                />
                <div style={{ color: "var(--color-text-secondary)" }}>
                  总资产
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#10b981",
                    marginBottom: "8px",
                  }}
                >
                  $10,500.00
                </div>
                <Text style={{ color: "var(--color-text-secondary)" }}>
                  可用余额
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#f59e0b",
                    marginBottom: "8px",
                  }}
                >
                  $2,388.00
                </div>
                <Text style={{ color: "var(--color-text-secondary)" }}>
                  冻结金额
                </Text>
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Button
                type="primary"
                block
                size="large"
                onClick={handleRecharge}
                icon={<UserOutlined />}
              >
                充值
              </Button>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                block
                size="large"
                onClick={handleWithdraw}
                icon={<UserOutlined />}
              >
                提现
              </Button>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                block
                size="large"
                onClick={handleTransfer}
                icon={<UserOutlined />}
              >
                转账
              </Button>
            </Col>
          </Row>
        </Card>

        <Card
          title={
            <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
              账户设置
            </Text>
          }
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
          }}
        >
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 0",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }}
                onClick={() => message.info(`${item.label}功能即将开放`)}
              >
                <item.icon
                  style={{
                    fontSize: "20px",
                    color: "var(--color-primary)",
                    marginRight: "16px",
                  }}
                />
                <div>
                  <div style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    {item.label}
                  </div>
                  <Text style={{ color: "var(--color-text-secondary)", fontSize: "12px" }}>
                    {item.description}
                  </Text>
                </div>
              </div>
              {index < menuItems.length - 1 && (
                <Divider style={{ margin: 0, borderColor: "var(--color-border)" }} />
              )}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}