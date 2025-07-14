import { useState, useEffect } from 'react';

interface PWAInstallState {
  shouldShowDialog: boolean;
  visitCount: number;
  lastDismissed: number | null;
}

const PWA_STORAGE_KEY = 'pwa_install_state';
const DISMISS_COOLDOWN_DAYS = 7; // 7日間は再表示しない

export function usePWAInstall() {
  const [state, setState] = useState<PWAInstallState>({
    shouldShowDialog: false,
    visitCount: 0,
    lastDismissed: null,
  });

  useEffect(() => {
    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(PWA_STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState(parsed);
      } catch (error) {
        console.error('Failed to parse PWA install state:', error);
      }
    }
  }, []);

  useEffect(() => {
    // 状態をローカルストレージに保存
    localStorage.setItem(PWA_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const incrementVisitCount = () => {
    setState(prev => {
      const newCount = prev.visitCount + 1;
      const shouldShow = shouldShowDialog(newCount, prev.lastDismissed);
      
      return {
        ...prev,
        visitCount: newCount,
        shouldShowDialog: shouldShow,
      };
    });
  };

  const dismissDialog = () => {
    setState(prev => ({
      ...prev,
      shouldShowDialog: false,
      lastDismissed: Date.now(),
    }));
  };

  const closeDialog = () => {
    setState(prev => ({
      ...prev,
      shouldShowDialog: false,
    }));
  };

  const shouldShowDialog = (visitCount: number, lastDismissed: number | null): boolean => {
    // 初回アクセス時
    if (visitCount === 1) {
      return true;
    }

    // 3回目、4回目のアクセス時
    if (visitCount === 3 || visitCount === 4) {
      // 最後に「後で」を押してから7日経過しているかチェック
      if (lastDismissed) {
        const daysSinceDismissed = (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed < DISMISS_COOLDOWN_DAYS) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  return {
    shouldShowDialog: state.shouldShowDialog,
    visitCount: state.visitCount,
    incrementVisitCount,
    dismissDialog,
    closeDialog,
  };
} 