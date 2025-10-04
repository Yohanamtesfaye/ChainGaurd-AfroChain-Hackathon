"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Bell, Shield, Database, User } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Notification Settings
    emailAlerts: true,
    highRiskAlerts: true,
    mediumRiskAlerts: false,
    lowRiskAlerts: false,
    dailyReports: true,
    weeklyReports: false,

    // Risk Thresholds
    highRiskThreshold: "80",
    mediumRiskThreshold: "50",
    autoBlockThreshold: "90",

    // API Settings
    apiEndpoint: "https://mainnet-public.mirrornode.hedera.com",
    refreshInterval: "30",

    // User Profile
    organizationName: "ChainGuard Ethiopia",
    contactEmail: "admin@chainguard.et",
    timezone: "Africa/Addis_Ababa",
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1500)
  }

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your ChainGuard dashboard preferences and configurations</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Risk Settings</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">API Config</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Alert Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts" className="text-base">
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Receive alerts via email</p>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={settings.emailAlerts}
                    onCheckedChange={(checked) => updateSetting("emailAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-risk" className="text-base">
                      High Risk Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Get notified of high-risk transactions</p>
                  </div>
                  <Switch
                    id="high-risk"
                    checked={settings.highRiskAlerts}
                    onCheckedChange={(checked) => updateSetting("highRiskAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="medium-risk" className="text-base">
                      Medium Risk Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Get notified of medium-risk transactions</p>
                  </div>
                  <Switch
                    id="medium-risk"
                    checked={settings.mediumRiskAlerts}
                    onCheckedChange={(checked) => updateSetting("mediumRiskAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="low-risk" className="text-base">
                      Low Risk Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Get notified of low-risk transactions</p>
                  </div>
                  <Switch
                    id="low-risk"
                    checked={settings.lowRiskAlerts}
                    onCheckedChange={(checked) => updateSetting("lowRiskAlerts", checked)}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Schedules</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-reports" className="text-base">
                      Daily Reports
                    </Label>
                    <p className="text-sm text-gray-600">Receive daily transaction summaries</p>
                  </div>
                  <Switch
                    id="daily-reports"
                    checked={settings.dailyReports}
                    onCheckedChange={(checked) => updateSetting("dailyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports" className="text-base">
                      Weekly Reports
                    </Label>
                    <p className="text-sm text-gray-600">Receive weekly analytics reports</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Risk Settings Tab */}
          <TabsContent value="risk" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Score Thresholds</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="high-threshold">High Risk Threshold</Label>
                  <Input
                    id="high-threshold"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.highRiskThreshold}
                    onChange={(e) => updateSetting("highRiskThreshold", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">Transactions above this score are marked as high risk</p>
                </div>

                <div>
                  <Label htmlFor="medium-threshold">Medium Risk Threshold</Label>
                  <Input
                    id="medium-threshold"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.mediumRiskThreshold}
                    onChange={(e) => updateSetting("mediumRiskThreshold", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">Transactions above this score are marked as medium risk</p>
                </div>

                <div>
                  <Label htmlFor="auto-block">Auto-Block Threshold</Label>
                  <Input
                    id="auto-block"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.autoBlockThreshold}
                    onChange={(e) => updateSetting("autoBlockThreshold", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Automatically flag transactions above this score for review
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* API Configuration Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hedera Network Configuration</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-endpoint">Mirror Node API Endpoint</Label>
                  <Input
                    id="api-endpoint"
                    value={settings.apiEndpoint}
                    onChange={(e) => updateSetting("apiEndpoint", e.target.value)}
                    className="mt-2 font-mono text-sm"
                  />
                  <p className="text-sm text-gray-600 mt-1">Hedera mirror node endpoint for transaction data</p>
                </div>

                <div>
                  <Label htmlFor="refresh-interval">Data Refresh Interval (seconds)</Label>
                  <Input
                    id="refresh-interval"
                    type="number"
                    min="10"
                    max="300"
                    value={settings.refreshInterval}
                    onChange={(e) => updateSetting("refreshInterval", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">How often to fetch new transaction data</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">API Status</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-gray-700">Connected to Hedera Mainnet</span>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={settings.organizationName}
                    onChange={(e) => updateSetting("organizationName", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting("contactEmail", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                    <SelectTrigger id="timezone" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Addis_Ababa">Africa/Addis Ababa (EAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <Card className="p-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}
