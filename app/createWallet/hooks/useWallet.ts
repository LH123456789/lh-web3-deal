/**
 * 钱包管理 Hook
 * 提供钱包导入、导出和状态管理功能
 * 使用 ethers.js 库进行加密操作
 */

import { useState, useCallback } from "react";
import { ethers } from "ethers";

/**
 * 钱包信息接口
 */
export interface WalletInfo {
  address: string;        // 钱包地址
  type: "mnemonic" | "privateKey";  // 导入类型
  createdAt: number;      // 创建时间戳
  publicKey?: string;     // 公钥（可选）
}

// 本地存储键名
const WALLET_KEY = "lh-deal-wallet";

/**
 * 自定义 Hook：管理钱包状态和操作
 * @returns {Object} 钱包状态和操作方法
 */
export function useWallet() {
  /**
   * 钱包状态
   * 从 localStorage 初始化，如果没有则为 null
   */
  const [wallet, setWallet] = useState<WalletInfo | null>(() => {
    const saved = localStorage.getItem(WALLET_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  /**
   * 通过助记词导入钱包
   * @param {string} mnemonic - 12/18/24个助记词，用空格分隔
   * @returns {boolean} - 是否导入成功
   */
  const importByMnemonic = useCallback((mnemonic: string): boolean => {
    try {
      // 验证助记词数量
      const mnemonicWords = mnemonic.trim().split(/\s+/);
      if (mnemonicWords.length !== 12 && mnemonicWords.length !== 18 && mnemonicWords.length !== 24) {
        return false;
      }
      
      // 使用 ethers.js 验证助记词有效性（通过尝试创建钱包）
      // ethers.js v6 中没有 isValidMnemonic，改用 fromPhrase 验证
      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      
      // 构造钱包信息对象
      const walletInfo: WalletInfo = {
        address: wallet.address,
        type: "mnemonic",
        createdAt: Date.now(),
        publicKey: wallet.signingKey.publicKey,
      };
      
      // 保存到本地存储
      localStorage.setItem(WALLET_KEY, JSON.stringify(walletInfo));
      
      // 更新状态
      setWallet(walletInfo);
      
      // 触发全局事件，通知其他组件钱包状态变化
      window.dispatchEvent(new Event("lh-deal:wallet-change"));
      
      return true;
    } catch {
      // 任何异常都返回失败
      return false;
    }
  }, []);

  /**
   * 通过私钥导入钱包
   * @param {string} privateKey - 64位十六进制私钥（可带或不带0x前缀）
   * @returns {boolean} - 是否导入成功
   */
  const importByPrivateKey = useCallback((privateKey: string): boolean => {
    try {
      // 清理私钥，移除可能的 0x 前缀
      const cleanedKey = privateKey.trim().replace(/^0x/, "");
      
      // 验证私钥长度
      if (cleanedKey.length !== 64) {
        return false;
      }
      
      // 使用私钥创建钱包实例
      const wallet = new ethers.Wallet(`0x${cleanedKey}`);
      
      // 构造钱包信息对象
      const walletInfo: WalletInfo = {
        address: wallet.address,
        type: "privateKey",
        createdAt: Date.now(),
        publicKey: wallet.signingKey.publicKey,
      };
      
      // 保存到本地存储
      localStorage.setItem(WALLET_KEY, JSON.stringify(walletInfo));
      
      // 更新状态
      setWallet(walletInfo);
      
      // 触发全局事件，通知其他组件钱包状态变化
      window.dispatchEvent(new Event("lh-deal:wallet-change"));
      
      return true;
    } catch {
      // 任何异常都返回失败
      return false;
    }
  }, []);

  /**
   * 清除钱包信息（退出登录）
   */
  const clearWallet = useCallback(() => {
    // 从本地存储移除钱包信息
    localStorage.removeItem(WALLET_KEY);
    
    // 更新状态为 null
    setWallet(null);
    
    // 触发全局事件，通知其他组件钱包状态变化
    window.dispatchEvent(new Event("lh-deal:wallet-change"));
  }, []);

  /**
   * 返回钱包状态和操作方法
   */
  return {
    wallet,           // 当前钱包信息
    importByMnemonic, // 助记词导入方法
    importByPrivateKey, // 私钥导入方法
    clearWallet,      // 清除钱包方法
    hasWallet: !!wallet, // 是否已绑定钱包
  };
}