import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import PWAInstallDialog from '@/components/PWAInstallDialog';

export default function RootLayout() {
  const { shouldShowDialog, incrementVisitCount, dismissDialog, closeDialog } = usePWAInstall();
  const [testDialogVisible, setTestDialogVisible] = useState(true);
  const isTestEnv = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    incrementVisitCount();
  }, []);

  // テスト環境ではリロード時のみ表示、閉じたら再表示しない
  const showDialog = isTestEnv ? testDialogVisible : shouldShowDialog;
  const handleTestClose = () => setTestDialogVisible(false);
  const handleTestDismiss = () => setTestDialogVisible(false);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <PWAInstallDialog
        visible={showDialog}
        onClose={isTestEnv ? handleTestClose : closeDialog}
        onDismiss={isTestEnv ? handleTestDismiss : dismissDialog}
      />
    </>
  );
}