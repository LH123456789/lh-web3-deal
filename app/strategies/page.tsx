"use client";

import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Tag,
  Progress,
  Statistic,
  Row,
  Col,
  Table,
  Space,
  Divider,
} from "antd";
import {
  TransactionOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const strategies = [
  {
    id: 1,
    name: "网格交易策略",
    description: "在价格区间内自动低买高卖，适用于震荡行情",
    type: "量化",
    profit: 12.5,
    winRate: 78,
    risk: "中",
    status: "运行中",
    icon: TransactionOutlined,
  },
  {
    id: 2,
    name: "趋势跟踪策略",
    description: "跟随市场趋势，捕捉大行情波动",
    type: "趋势",
    profit: 28.3,
    winRate: 65,
    risk: "高",
    status: "运行中",
    icon: TransactionOutlined,
  },
  {
    id: 3,
    name: "套利策略",
    description: "利用不同交易所间的价格差异获利",
    type: "套利",
    profit: 5.2,
    winRate: 95,
    risk: "低",
    status: "运行中",
    icon: TransactionOutlined,
  },
  {
    id: 4,
    name: "均值回归策略",
    description: "基于价格回归均值的统计套利策略",
    type: "量化",
    profit: 8.7,
    winRate: 82,
    risk: "中",
    status: "暂停",
    icon: TransactionOutlined,
  },
];

const recentTrades = [
  {
    id: 1,
    strategy: "网格交易",
    pair: "BTC/USDT",
    type: "买入",
    price: 42500,
    amount: 0.01,
    time: "2分钟前",
    profit: "+2.5%",
  },
  {
    id: 2,
    strategy: "趋势跟踪",
    pair: "ETH/USDT",
    type: "卖出",
    price: 2280,
    amount: 0.5,
    time: "5分钟前",
    profit: "+5.2%",
  },
  {
    id: 3,
    strategy: "套利",
    pair: "SOL/USDT",
    type: "买入",
    price: 98.5,
    amount: 10,
    time: "8分钟前",
    profit: "+0.8%",
  },
];

const columns = [
  {
    title: "策略名称",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <Text style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
        {text}
      </Text>
    ),
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render: (text: string) => (
      <Tag
        color={
          text === "量化"
            ? "blue"
            : text === "趋势"
            ? "green"
            : text === "套利"
            ? "purple"
            : "gray"
        }
      >
        {text}
      </Tag>
    ),
  },
  {
    title: "收益率",
    dataIndex: "profit",
    key: "profit",
    render: (text: number) => (
      <Text
        style={{
          color: text >= 0 ? "#10b981" : "#ef4444",
          fontWeight: 500,
        }}
      >
        {text >= 0 ? "+" : ""}
        {text}%
      </Text>
    ),
  },
  {
    title: "胜率",
    dataIndex: "winRate",
    key: "winRate",
    render: (text: number) => (
      <Space>
        <Progress
          percent={text}
          size="small"
          strokeColor={text >= 80 ? "#10b981" : text >= 60 ? "#f59e0b" : "#ef4444"}
          showInfo={false}
        />
        <Text style={{ color: "var(--color-text-secondary)" }}>{text}%</Text>
      </Space>
    ),
  },
  {
    title: "风险等级",
    dataIndex: "risk",
    key: "risk",
    render: (text: string) => (
      <Tag
        color={
          text === "低" ? "green" : text === "中" ? "yellow" : "red"
        }
      >
        {text}
      </Tag>
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (text: string) => (
      <Tag color={text === "运行中" ? "green" : "gray"}>
        {text}
      </Tag>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space>
        <Button size="small" type="primary">
          启动
        </Button>
        <Button size="small">详情</Button>
      </Space>
    ),
  },
];

export default function StrategiesPage() {
  const [activeStrategy, setActiveStrategy] = useState(strategies[0]);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--color-background)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <Title level={2} style={{ color: "var(--color-text-primary)" }}>
            交易策略
          </Title>
          <Paragraph style={{ color: "var(--color-text-secondary)" }}>
            探索和管理您的量化交易策略，实现自动化交易
          </Paragraph>
        </div>

        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col span={6}>
            <Card
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <Statistic
                title="总收益"
                value={45.8}
                precision={2}
                suffix="%"
                valueStyle={{ color: "#10b981" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <Statistic
                title="运行中策略"
                value={3}
                suffix="/4"
                valueStyle={{ color: "var(--color-primary)" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <Statistic
                title="总胜率"
                value={80}
                suffix="%"
                valueStyle={{ color: "#f59e0b" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <Statistic
                title="总交易次数"
                value={1256}
                valueStyle={{ color: "var(--color-text-primary)" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Card
              title={
                <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
                  策略列表
                </Text>
              }
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
                marginBottom: "24px",
              }}
            >
              <Table
                columns={columns}
                dataSource={strategies}
                rowKey="id"
                pagination={false}
              />
            </Card>

            <Card
              title={
                <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
                  最近交易
                </Text>
              }
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <Table
                dataSource={recentTrades}
                rowKey="id"
                pagination={false}
                columns={[
                  {
                    title: "策略",
                    dataIndex: "strategy",
                    key: "strategy",
                    render: (text: string) => (
                      <Text style={{ color: "var(--color-text-primary)" }}>
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: "交易对",
                    dataIndex: "pair",
                    key: "pair",
                    render: (text: string) => (
                      <Text style={{ color: "var(--color-text-primary)" }}>
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: "方向",
                    dataIndex: "type",
                    key: "type",
                    render: (text: string) => (
                      <Tag
                        color={text === "买入" ? "green" : "red"}
                      >
                        {text}
                      </Tag>
                    ),
                  },
                  {
                    title: "价格",
                    dataIndex: "price",
                    key: "price",
                    render: (text: number) => (
                      <Text style={{ color: "var(--color-text-primary)" }}>
                        ${text.toLocaleString()}
                      </Text>
                    ),
                  },
                  {
                    title: "数量",
                    dataIndex: "amount",
                    key: "amount",
                    render: (text: number) => (
                      <Text style={{ color: "var(--color-text-primary)" }}>
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: "收益",
                    dataIndex: "profit",
                    key: "profit",
                    render: (text: string) => (
                      <Text
                        style={{
                          color: text.startsWith("+") ? "#10b981" : "#ef4444",
                          fontWeight: 500,
                        }}
                      >
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: "时间",
                    dataIndex: "time",
                    key: "time",
                    render: (text: string) => (
                      <Text style={{ color: "var(--color-text-secondary)" }}>
                        {text}
                      </Text>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card
              title={
                <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
                  策略详情
                </Text>
              }
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
                marginBottom: "24px",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      backgroundColor: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TransactionOutlined
                      style={{ fontSize: 24, color: "#fff" }}
                    />
                  </div>
                  <div>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {activeStrategy.name}
                    </Title>
                    <Tag color="blue">{activeStrategy.type}</Tag>
                  </div>
                </div>
                <Paragraph
                  style={{
                    margin: "8px 0",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {activeStrategy.description}
                </Paragraph>
              </div>

              <Divider style={{ borderColor: "var(--color-border)" }} />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "8px",
                  }}
                >
                  <Text style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>
                    累计收益
                  </Text>
                  <div
                    style={{
                      color: "#10b981",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    +{activeStrategy.profit}%
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "8px",
                  }}
                >
                  <Text style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>
                    胜率
                  </Text>
                  <div
                    style={{
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    {activeStrategy.winRate}%
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <TransactionOutlined style={{ color: "var(--color-text-secondary)" }} />
                <Text style={{ color: "var(--color-text-secondary)" }}>
                  风险等级：
                </Text>
                <Tag
                  color={
                    activeStrategy.risk === "低"
                      ? "green"
                      : activeStrategy.risk === "中"
                      ? "yellow"
                      : "red"
                  }
                >
                  {activeStrategy.risk}
                </Tag>
              </div>

              <Button
                type="primary"
                block
                size="large"
                style={{
                  backgroundColor: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                }}
              >
                启动策略
              </Button>
            </Card>

            <Card
              title={
                <Text style={{ color: "var(--color-text-primary)", fontSize: "16px", fontWeight: 600 }}>
                  策略收益曲线
                </Text>
              }
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <TransactionOutlined
                    style={{
                      fontSize: 48,
                      color: "var(--color-text-secondary)",
                    }}
                  />
                  <Text style={{ color: "var(--color-text-secondary)" }}>
                    收益曲线图表
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}