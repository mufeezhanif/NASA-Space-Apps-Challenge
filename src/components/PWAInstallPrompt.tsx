import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor, Wifi, Bell, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallPromptProps {
  onClose?: () => void;
  className?: string;
}

export function PWAInstallPrompt({ onClose, className }: PWAInstallPromptProps) {
  // Component intentionally disabled to prevent PWA install prompt during app load
  return null;
}