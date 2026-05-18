"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans transition-colors duration-300" style={{ backgroundColor: 'var(--color-background)' }}>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 transition-colors duration-300 sm:items-start" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
            LH-DEAL 交易平台
          </h1>
          <p className="max-w-md text-lg leading-8 transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
            欢迎来到 LH-DEAL，您的专业数字资产交易平台。支持现货交易、合约交易和多种交易策略。
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors duration-300 md:w-[158px]"
            style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
            href="/spot"
          >
            开始交易
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full px-5 transition-colors duration-300 md:w-[158px]"
            style={{ borderColor: 'var(--color-border)', borderWidth: '1px', borderStyle: 'solid', color: 'var(--color-text-primary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            href="/market"
          >
            查看行情
          </a>
        </div>
      </main>
    </div>
  );
}
