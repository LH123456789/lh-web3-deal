"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, Card, Typography, message } from "antd";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useTranslations } from "next-intl";
import { login, isLoggedIn } from "@/utils/auth";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("login");
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  const handleLoginSubmit = () => {
    if (!loginForm.email || !loginForm.password) {
      message.error("请输入账号和密码");
      return;
    }

    const success = login(loginForm.email, loginForm.password);
    if (success) {
      message.success("登录成功");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      message.error("账号或密码错误");
    }
  };

  const handleRegisterSubmit = () => {
    console.log("注册:", registerForm);
    message.success("注册功能即将开放");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "var(--color-background)",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: "12px",
          backgroundColor: "var(--color-surface-elevated)",
          borderColor: "var(--color-border)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Title
            level={2}
            style={{
              marginBottom: "8px",
              color: "var(--color-text-primary)",
            }}
          >
            {t("title")}
          </Title>
          <Text style={{ color: "var(--color-text-secondary)" }}>
            {t("subtitle")}
          </Text>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          style={{ marginBottom: "24px" }}
        >
          <TabPane tab={t("login")} key="login" />
          <TabPane tab={t("register")} key="register" />
        </Tabs>

        {activeTab === "login" ? (
          <LoginForm
            email={loginForm.email}
            password={loginForm.password}
            remember={loginForm.remember}
            onEmailChange={(value) =>
              setLoginForm((prev) => ({ ...prev, email: value }))
            }
            onPasswordChange={(value) =>
              setLoginForm((prev) => ({ ...prev, password: value }))
            }
            onRememberChange={(checked) =>
              setLoginForm((prev) => ({ ...prev, remember: checked }))
            }
            onSubmit={handleLoginSubmit}
            onSwitchToRegister={() => setActiveTab("register")}
          />
        ) : (
          <RegisterForm
            username={registerForm.username}
            email={registerForm.email}
            password={registerForm.password}
            confirmPassword={registerForm.confirmPassword}
            agree={registerForm.agree}
            onUsernameChange={(value) =>
              setRegisterForm((prev) => ({ ...prev, username: value }))
            }
            onEmailChange={(value) =>
              setRegisterForm((prev) => ({ ...prev, email: value }))
            }
            onPasswordChange={(value) =>
              setRegisterForm((prev) => ({ ...prev, password: value }))
            }
            onConfirmPasswordChange={(value) =>
              setRegisterForm((prev) => ({ ...prev, confirmPassword: value }))
            }
            onAgreeChange={(checked) =>
              setRegisterForm((prev) => ({ ...prev, agree: checked }))
            }
            onSubmit={handleRegisterSubmit}
            onSwitchToLogin={() => setActiveTab("login")}
          />
        )}
      </Card>
    </div>
  );
}