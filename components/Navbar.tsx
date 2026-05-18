"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import SettingsDrawer from "./SettingsDrawer";
import { useTranslations } from "next-intl";
import { isLoggedIn, logout, getUser } from "@/utils/auth";
import { message } from "antd";

const AVATAR_URL = "https://pic.cdfgsy.cn/assets/upload/weapp_imgs/front/avatar-img-new.png";

export default function Navbar() {
  const t = useTranslations("navbar");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [user, setUser] = useState(getUser());

  const navItems = [
    { name: t("market"), href: "/market" },
    { name: t("spot"), href: "/spot" },
    { name: t("futures"), href: "/futures" },
    { name: t("strategies"), href: "/strategies" },
  ];

  useEffect(() => {
    const handleStorage = () => {
      setLoggedIn(isLoggedIn());
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUser(null);
    message.success("退出登录成功");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300" style={{ backgroundColor: 'var(--color-surface-elevated)', borderColor: 'var(--color-border)' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold transition-colors duration-300" style={{ color: 'var(--color-primary)' }}>
                {t("title")}
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium transition-colors duration-300"
                  style={{ color: 'var(--color-text-primary)' }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = 'var(--color-text-primary)';
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  '--tw-placeholder-color': 'var(--color-text-muted)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {loggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors duration-300"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  <LogoutOutlined className="h-4 w-4" />
                  退出
                </button>
                <Link
                  href="/profile"
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  title={user?.username}
                >
                  <img
                    src={AVATAR_URL}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }} onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = 'var(--color-primary-hover)';
              }} onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = 'var(--color-text-primary)';
              }}>
                {t("login")}
              </Link>
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 transition-colors duration-300"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              <SettingOutlined className="h-5 w-5" />
            </button>

            <button className="md:hidden p-2 transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <SettingsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </nav>
  );
}