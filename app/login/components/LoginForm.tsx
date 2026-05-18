"use client";

import { Button, Input, Checkbox, Divider, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { Text } = Typography;

interface LoginFormProps {
  email: string;
  password: string;
  remember: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (checked: boolean) => void;
  onSubmit: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({
  email,
  password,
  remember,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onSwitchToRegister,
}: LoginFormProps) {
  const t = useTranslations("login");

  return (
    <div>
      <Input
        prefix={<MailOutlined />}
        type="email"
        placeholder={t("email")}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        style={{
          height: "48px",
          marginBottom: "12px",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />
      <Input
        prefix={<LockOutlined />}
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        style={{
          height: "48px",
          marginBottom: "16px",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Checkbox checked={remember} onChange={(e) => onRememberChange(e.target.checked)}>
          <Text style={{ color: "var(--color-text-secondary)" }}>
            {t("remember")}
          </Text>
        </Checkbox>
        <Button type="link" style={{ padding: 0, color: "var(--color-primary)" }}>
          {t("forgotPassword")}
        </Button>
      </div>
      <Button
        type="primary"
        block
        size="large"
        onClick={onSubmit}
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-primary)",
        }}
      >
        {t("login")}
      </Button>
      <Divider style={{ margin: "16px 0", borderColor: "var(--color-border)" }} />
      <div style={{ textAlign: "center" }}>
        <Text style={{ color: "var(--color-text-secondary)" }}>
          {t("noAccount")}{" "}
          <Button
            type="link"
            onClick={onSwitchToRegister}
            style={{ padding: 0, color: "var(--color-primary)" }}
          >
            {t("registerNow")}
          </Button>
        </Text>
      </div>
    </div>
  );
}