"use client";

import { Button, Input, Checkbox, Divider, Typography } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { Text } = Typography;

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAgreeChange: (checked: boolean) => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({
  username,
  email,
  password,
  confirmPassword,
  agree,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAgreeChange,
  onSubmit,
  onSwitchToLogin,
}: RegisterFormProps) {
  const t = useTranslations("login");

  return (
    <div>
      <Input
        prefix={<UserOutlined />}
        type="text"
        placeholder={t("username")}
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        style={{
          height: "48px",
          marginBottom: "12px",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />
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
          marginBottom: "12px",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />
      <Input
        prefix={<LockOutlined />}
        type="password"
        placeholder={t("confirmPassword")}
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        style={{
          height: "48px",
          marginBottom: "16px",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />
      <Checkbox
        checked={agree}
        onChange={(e) => onAgreeChange(e.target.checked)}
        style={{ marginBottom: "24px" }}
      >
        <Text style={{ color: "var(--color-text-secondary)" }}>
          {t("agreeTerms")}{" "}
          <Button type="link" style={{ padding: 0, color: "var(--color-primary)" }}>
            {t("terms")}
          </Button>{" "}
          和{" "}
          <Button type="link" style={{ padding: 0, color: "var(--color-primary)" }}>
            {t("privacy")}
          </Button>
        </Text>
      </Checkbox>
      <Button
        type="primary"
        block
        size="large"
        onClick={onSubmit}
        disabled={!agree}
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-primary)",
        }}
      >
        {t("register")}
      </Button>
      <Divider style={{ margin: "16px 0", borderColor: "var(--color-border)" }} />
      <div style={{ textAlign: "center" }}>
        <Text style={{ color: "var(--color-text-secondary)" }}>
          {t("hasAccount")}{" "}
          <Button
            type="link"
            onClick={onSwitchToLogin}
            style={{ padding: 0, color: "var(--color-primary)" }}
          >
            {t("loginNow")}
          </Button>
        </Text>
      </div>
    </div>
  );
}