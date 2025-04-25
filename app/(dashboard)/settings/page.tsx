"use client";

import ThemeModeSlot from "@/app/components/common/header/ThemeModeSlot";
import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [enableNotifications, setEnableNotifications] = useState(false);

  return (
    <Card sx={{ margin: "0 auto", p: 4 }}>
      <Tabs
        value={activeTab}
        onChange={(e, newIndex) => setActiveTab(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Appearance" />
        <Tab label="Preferences" />
        <Tab label="Notifications" />
        <Tab disabled label="Advanced" />
      </Tabs>
      <Divider />
      <CardContent sx={{ mt: 4 }}>
        {activeTab === 0 && (
          <Stack spacing={8}>
            <Stack direction="column" alignItems="start" spacing={2}>
              <Typography variant="body1">Theme Mode</Typography>
              <Stack pl={5}>
                <ThemeModeSlot variant="group" />
              </Stack>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography variant="body1">Background Colors</Typography>
              <Stack pl={5} direction="row" alignItems="start" spacing={2}>
                <Typography>Light Mode</Typography>
                <TextField
                  type="color"
                  defaultValue="#eceff1"
                  variant="standard"
                  sx={{ width: 50 }}
                />
              </Stack>
              <Stack pl={5} direction="row" alignItems="center" spacing={2}>
                <Typography>Dark Mode</Typography>
                <TextField
                  type="color"
                  defaultValue="#0c1821"
                  variant="standard"
                  sx={{ width: 50 }}
                />
              </Stack>
            </Stack>
          </Stack>
        )}

        {activeTab === 1 && (
          <Stack spacing={6}>
            <Stack spacing={2}>
              <Typography variant="body1">Font Size</Typography>
              <Typography variant="caption">
                Adjust the font size for better readability.
              </Typography>
              <Slider
                defaultValue={14}
                min={12}
                max={24}
                valueLabelDisplay="auto"
              />
            </Stack>
            <Stack spacing={2} alignItems="start">
              <FormControlLabel
                control={<Switch disabled />}
                label="Enable Animations"
                labelPlacement="start"
              />
            </Stack>
          </Stack>
        )}

        {activeTab === 2 && (
          <Stack alignItems="start" spacing={6}>
            <Stack alignItems="start" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enableNotifications}
                    onChange={() => setEnableNotifications((prev) => !prev)}
                  />
                }
                label="Enable Notifications"
                labelPlacement="start"
              />
              <Typography variant="caption">
                Get notified about updates and important events.
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Stack spacing={2} mt={2}>
                <Typography variant="body1">Notification Frequency</Typography>
                <Select defaultValue="daily">
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </Stack>
            </Stack>
          </Stack>
        )}

        {activeTab === 3 && (
          <Stack spacing={4}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="h6">Advanced Mode</Typography>
              <Switch disabled />
            </Stack>
            <Typography>
              Advanced mode settings are locked in this demo.
            </Typography>
            <FormControlLabel
              control={<Switch disabled />}
              label="Enable Developer Tools"
              labelPlacement="start"
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
