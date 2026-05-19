"use client";

import { useState, useEffect } from "react";
import { Drawer, Select, Switch, ConfigProvider } from "antd";
import { GlobalOutlined, SunFilled, MoonOutlined, WalletOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

const THEME_KEY = "lh-deal-theme";
const LANGUAGE_KEY = "lh-deal-language";

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
    const t = useTranslations("settings");
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(THEME_KEY);
            return saved ? saved === "dark" : false;
        }
        return false;
    });
    const [language, setLanguage] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(LANGUAGE_KEY);
            return saved || "zh";
        }
        return "zh";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, []);

    useEffect(() => {
        const updateTheme = () => {
            const saved = localStorage.getItem(THEME_KEY);
            setDarkMode(saved ? saved === "dark" : false);
        };
        window.addEventListener('storage', updateTheme);
        return () => window.removeEventListener('storage', updateTheme);
    }, []);

    const handleThemeChange = (checked: boolean) => {
        setDarkMode(checked);
        localStorage.setItem(THEME_KEY, checked ? "dark" : "light");
        document.documentElement.classList.toggle("dark", checked);
    };

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        localStorage.setItem(LANGUAGE_KEY, value);
        window.location.reload();
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgBase: darkMode ? '#1a1a1a' : '#ffffff',
                    colorTextBase: darkMode ? '#ededed' : '#171717',
                    colorBorder: darkMode ? '#374151' : '#e5e7eb',
                },
            }}
        >
            <Drawer
                title={t("title")}
                placement="right"
                onClose={onClose}
                open={open}
                width={320}
                mask
                maskClosable
                styles={{
                    body: {
                        backgroundColor: 'var(--color-surface-elevated)',
                        color: 'var(--color-text-primary)',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    },
                    header: {
                        backgroundColor: 'var(--color-surface-elevated)',
                        color: 'var(--color-text-primary)',
                        borderBottom: '1px solid var(--color-border)',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    },
                }}
            >
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <GlobalOutlined className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }} />
                            <span className="transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{t("language")}</span>
                        </div>
                        <Select
                            value={language}
                            onChange={handleLanguageChange}
                            style={{ width: 120 }}
                            options={[
                                { value: "zh", label: t("chinese") },
                                { value: "en", label: t("english") },
                            ]}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {darkMode ? (
                                <MoonOutlined className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }} />
                            ) : (
                                <SunFilled className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }} />
                            )}
                            <span className="transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
                                {t("theme")}
                            </span>
                        </div>
                        <Switch
                            checked={darkMode}
                            onChange={handleThemeChange}
                            checkedChildren={t("darkMode")}
                            unCheckedChildren={t("lightMode")}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href="/createWallet"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="flex items-center justify-between"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            <div className="flex items-center gap-3">
                                <WalletOutlined className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }} />
                                <span className="transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
                                    {t("walletOption")}
                                </span>
                            </div>

                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {/* <Link
                            href="/createWallet"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="flex items-center gap-1 text-sm"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link> */}
                    </div>
                </div>
            </Drawer>
        </ConfigProvider>
    );
}