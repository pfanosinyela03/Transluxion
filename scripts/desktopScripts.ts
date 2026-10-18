export interface DesktopScript {
  id: string;
  name: string;
  os: 'windows' | 'mac' | 'linux' | 'python';
  filename: string;
  badge: string;
  description: string;
  tags: string[];
  code: string;
  oneLiner?: string;
  stopInstruction: string;
  reviewNote: string;
}

export const DESKTOP_SCRIPTS: DesktopScript[] = [
  {
    id: 'windows-gui-bat',
    name: 'Transluxion Windows Desktop GUI App (.bat)',
    os: 'windows',
    filename: 'Transluxion_GUI.bat',
    badge: 'Graphical GUI Window',
    description: 'Opens a Windows Forms window with Start/Pause controls. The script generates keyboard input and does not check Microsoft Teams status.',
    tags: ['Windows 10/11', 'Graphical Window', 'Review source before running'],
    code: `@echo off
title Transluxion GUI Launcher
powershell -NoProfile -WindowStyle Hidden -Command "& { Add-Type -AssemblyName System.Windows.Forms, System.Drawing; $f = New-Object System.Windows.Forms.Form; $f.Text = 'Transluxion - Local Input Example'; $f.Size = New-Object System.Drawing.Size(560, 480); $f.StartPosition = 'CenterScreen'; $f.BackColor = [System.Drawing.Color]::FromArgb(15, 23, 42); $f.FormBorderStyle = 'FixedDialog'; $f.MaximizeBox = $false; $lblTitle = New-Object System.Windows.Forms.Label; $lblTitle.Text = 'TRANSLUXION DESKTOP'; $lblTitle.Font = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold); $lblTitle.ForeColor = [System.Drawing.Color]::FromArgb(16, 185, 129); $lblTitle.Location = New-Object System.Drawing.Point(24, 18); $lblTitle.AutoSize = $true; $f.Controls.Add($lblTitle); $lblSub = New-Object System.Windows.Forms.Label; $lblSub.Text = 'Local keyboard input example (Teams status not checked)'; $lblSub.Font = New-Object System.Drawing.Font('Segoe UI', 9); $lblSub.ForeColor = [System.Drawing.Color]::FromArgb(148, 163, 184); $lblSub.Location = New-Object System.Drawing.Point(24, 46); $lblSub.AutoSize = $true; $f.Controls.Add($lblSub); $btn = New-Object System.Windows.Forms.Button; $btn.Text = 'PAUSE TRANSLUXION'; $btn.Font = New-Object System.Drawing.Font('Segoe UI', 10, [System.Drawing.FontStyle]::Bold); $btn.Size = New-Object System.Drawing.Size(496, 42); $btn.Location = New-Object System.Drawing.Point(24, 76); $btn.FlatStyle = 'Flat'; $btn.BackColor = [System.Drawing.Color]::FromArgb(239, 68, 68); $btn.ForeColor = [System.Drawing.Color]::White; $btn.Cursor = [System.Windows.Forms.Cursors]::Hand; $f.Controls.Add($btn); $lblLog = New-Object System.Windows.Forms.Label; $lblLog.Text = 'TERMINAL TELEMETRY & SYSTEM INVARIANTS:'; $lblLog.Font = New-Object System.Drawing.Font('Segoe UI', 8, [System.Drawing.FontStyle]::Bold); $lblLog.ForeColor = [System.Drawing.Color]::FromArgb(148, 163, 184); $lblLog.Location = New-Object System.Drawing.Point(24, 130); $lblLog.AutoSize = $true; $f.Controls.Add($lblLog); $txt = New-Object System.Windows.Forms.TextBox; $txt.Multiline = $true; $txt.ReadOnly = $true; $txt.ScrollBars = 'Vertical'; $txt.Location = New-Object System.Drawing.Point(24, 150); $txt.Size = New-Object System.Drawing.Size(496, 260); $txt.BackColor = [System.Drawing.Color]::Black; $txt.ForeColor = [System.Drawing.Color]::FromArgb(52, 211, 153); $txt.Font = New-Object System.Drawing.Font('Consolas', 9); $nl = [Environment]::NewLine; $txt.Text = '[OK] Transluxion Engine initialized.' + $nl + '[OK] F15 input pulse loop ready' + $nl + 'STATUS: RUNNING - F15 input pulse loop active' + $nl + '=================================================================' + $nl + '[' + (Get-Date -Format 'HH:mm:ss') + '] Transluxion Pulse #1 dispatched (F15 input sent).' + $nl; $f.Controls.Add($txt); $w = New-Object -ComObject WScript.Shell; $c = 1; $t = New-Object System.Windows.Forms.Timer; $t.Interval = 45000; $t.Add_Tick({ $c++; $w.SendKeys('{F15}'); $txt.AppendText('[' + (Get-Date -Format 'HH:mm:ss') + '] Transluxion Pulse #' + $c + ' dispatched (F15 input sent).' + [Environment]::NewLine); }); $t.Start(); $btn.Add_Click({ if($t.Enabled){ $t.Stop(); $btn.Text='START TRANSLUXION'; $btn.BackColor=[System.Drawing.Color]::FromArgb(16, 185, 129); $txt.AppendText('[' + (Get-Date -Format 'HH:mm:ss') + '] PAUSED. Idle timer restored.' + [Environment]::NewLine); } else { $t.Start(); $btn.Text='PAUSE TRANSLUXION'; $btn.BackColor=[System.Drawing.Color]::FromArgb(239, 68, 68); $w.SendKeys('{F15}'); $txt.AppendText('[' + (Get-Date -Format 'HH:mm:ss') + '] RESUMED. Local input cycle resumed.' + [Environment]::NewLine); } }); $f.ShowDialog() }`,
    stopInstruction: 'Click the "Pause Transluxion" button or simply close the graphical window.',
    reviewNote: 'This script generates virtual keyboard input. Review its source and confirm that this is permitted on your device.'
  },
  {
    id: 'windows-direct-bat',
    name: 'Transluxion Windows Console Utility (.bat)',
    os: 'windows',
    filename: 'Transluxion.bat',
    badge: 'Console App',
    description: 'A console example that periodically sends a virtual key input and prints local logs. It does not verify Teams status.',
    tags: ['Windows 10/11', 'Console Telemetry', 'Direct Launch'],
    code: `@echo off
title Transluxion - Desktop Activity Utility
color 0A
mode con: cols=65 lines=18
cls

echo =================================================================
echo                    TRANSLUXION DESKTOP
echo       Local input example (Teams status is not verified)
echo =================================================================
echo.
echo   [OK] Transluxion Engine initialized.
echo   [INFO] Sends virtual keyboard input
echo   [INFO] Teams status is not checked
echo.
echo   STATUS: RUNNING - Teams status is not verified
echo.
echo   Minimize this window and continue working peacefully.
echo   To pause or stop: Simply close this window or press Ctrl+C.
echo =================================================================
echo.

powershell -NoProfile -Command "$w=New-Object -ComObject WScript.Shell; $c=0; while($true){ $c++; $w.SendKeys('{F15}'); $d=Get-Random -Min 35 -Max 60; $t=Get-Date -Format 'HH:mm:ss'; Write-Host ('[' + $t + '] Transluxion Pulse #' + $c + ' active. Next in ' + $d + 's...') -ForegroundColor Green; Start-Sleep -Seconds $d; }"

pause`,
    stopInstruction: 'Simply close the Transluxion command window or press Ctrl + C.',
    reviewNote: 'This script sends virtual keyboard input. Review the source and confirm that this is permitted on your device.'
  },
  {
    id: 'windows-desktop-installer',
    name: 'Transluxion Desktop Auto-Launcher (.bat)',
    os: 'windows',
    filename: 'Install_Transluxion_Desktop.bat',
    badge: 'Auto-Launcher',
    description: 'A Windows batch example that starts a local input-generation loop. It does not verify Teams status.',
    tags: ['Windows 10/11', 'Instant Run', 'Zero Install'],
    code: `@echo off
title Transluxion Desktop Controller
color 0A
cls
echo ==============================================================
echo           TRANSLUXION - DESKTOP CONTROLLER FOR PC
echo   Local input example (Teams status is not verified)
echo ==============================================================
echo.
echo [OK] Transluxion Engine initialized.
echo [INFO] Sends virtual keyboard input
echo [INFO] Teams status is not checked
echo.
echo STATUS: RUNNING - Teams status is not verified
echo.
echo Minimize this window and continue working peacefully.
echo To pause or stop: Simply close this window or press Ctrl+C.
echo ==============================================================
echo.

powershell -NoProfile -Command "$w=New-Object -ComObject WScript.Shell; $c=0; while($true){ $c++; $w.SendKeys('{F15}'); $d=Get-Random -Min 35 -Max 60; $t=Get-Date -Format 'HH:mm:ss'; Write-Host ('[' + $t + '] Transluxion Pulse #' + $c + ' active. Next in ' + $d + 's...') -ForegroundColor Green; Start-Sleep -Seconds $d; }"

pause`,
    stopInstruction: 'Close the launched Transluxion window.',
    reviewNote: 'This script sends virtual keyboard input. Review the source and confirm that this is permitted on your device.'
  },
  {
    id: 'powershell-oneliner',
    name: 'Transluxion PowerShell Terminal App',
    os: 'windows',
    filename: 'Transluxion.ps1',
    badge: 'Quick Launch',
    description: 'A PowerShell example that periodically sends a virtual key input. It does not verify Teams status.',
    tags: ['Windows 10/11', 'No Admin Rights', 'Zero Install', 'F15 Benign Key'],
    oneLiner: `powershell -WindowStyle Hidden -Command "$w=New-Object -ComObject WScript.Shell; while($true){$w.SendKeys('{F15}'); Start-Sleep -Seconds (Get-Random -Min 40 -Max 70)}"`,
    code: `    # Transluxion - Windows desktop activity utility
# How to run:
# 1. Press Win + R, type 'powershell', and hit Enter.
# 2. Paste this script and press Enter.
# 3. This script sends virtual keyboard input; it does not verify Teams status.

$wscript = New-Object -ComObject WScript.Shell
Clear-Host
Write-Host "==========================================" -ForegroundColor Green
Write-Host "   TRANSLUXION: Local Input Example       " -ForegroundColor Cyan
Write-Host "   Teams status is not verified by script " -ForegroundColor Yellow
Write-Host "   Sends a virtual F15 key input          " -ForegroundColor Gray
Write-Host "   To Stop: Press Ctrl + C in this window " -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Green

$cycle = 0
while ($true) {
    $cycle++
    $wscript.SendKeys("{F15}")
    $jitter = Get-Random -Minimum 35 -Maximum 65
    $timestamp = (Get-Date).ToString("HH:mm:ss")
    Write-Host "[$timestamp] Transluxion pulse #$cycle executed. Next in \${jitter}s..." -ForegroundColor DarkGreen
    Start-Sleep -Seconds $jitter
}`,
    stopInstruction: 'Press Ctrl + C in the PowerShell console window, or simply close the terminal.',
    reviewNote: 'This script sends virtual keyboard input. Review the source and confirm that this is permitted on your device.'
  },
  {
    id: 'windows-vbscript',
    name: 'Transluxion Silent VBScript Engine (.vbs)',
    os: 'windows',
    filename: 'Transluxion_Silent.vbs',
    badge: 'Background script',
    description: 'Runs in the background without a console window. It sends virtual keyboard input; use only where permitted.',
    tags: ['Windows 10/11', 'Background operation', 'Review source before running'],
    code: `' ==============================================================
' Transluxion - Background keyboard input example
' Double-click this file to launch. Runs silently via wscript.exe.
' No console window or taskbar clutter!
' ==============================================================

Set wsc = CreateObject("WScript.Shell")
Randomize

Do While True
    wsc.SendKeys "{F15}"
    randomSeconds = Int((65 - 40 + 1) * Rnd + 40)
    WScript.Sleep randomSeconds * 1000
Loop`,
    stopInstruction: 'Open Command Prompt or PowerShell and run: taskkill /f /im wscript.exe (or find "Microsoft Windows Based Script Host" in Task Manager and End Task).',
    reviewNote: 'This background script sends virtual keyboard input. It may be restricted or detected by security software; check your device policy.'
  },
  {
    id: 'python-gui',
    name: 'Transluxion Python Native Desktop App',
    os: 'python',
    filename: 'Transluxion_App.py',
    badge: 'GUI Desktop App',
    description: 'A desktop example with Start/Stop buttons and local logs. It can generate operating-system input but cannot verify Teams status.',
    tags: ['Windows / macOS / Linux', 'Native Window', 'Compile to .exe'],
    code: `"""
Transluxion - Desktop keyboard input example
Run directly with Python: python Transluxion_App.py
Or compile to standalone .exe: pip install pyinstaller && pyinstaller --onefile --noconsole Transluxion_App.py
"""
import tkinter as tk
from tkinter import ttk, scrolledtext
import threading
import time
import random
import sys
from datetime import datetime

try:
    import pyautogui
    pyautogui.FAILSAFE = True
    HAS_PYAUTOGUI = True
except ImportError:
    HAS_PYAUTOGUI = False

class TransluxionApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Transluxion - Desktop Activity Utility")
        self.geometry("540x510")
        self.configure(bg="#020617")
        self.resizable(False, False)

        self.running = True
        self.ping_count = 0

        self.setup_ui()
        self.worker_thread = threading.Thread(target=self.run_loop, daemon=True)
        self.worker_thread.start()

    def setup_ui(self):
        header = tk.Frame(self, bg="#0f172a", padx=20, pady=14)
        header.pack(fill="x")
        
        title_label = tk.Label(header, text="TRANSLUXION DESKTOP", font=("Segoe UI", 15, "bold"), fg="#10b981", bg="#0f172a")
        title_label.pack(anchor="w")
        sub_label = tk.Label(header, text="Local keyboard input example (Teams status not checked)", font=("Segoe UI", 9), fg="#94a3b8", bg="#0f172a")
        sub_label.pack(anchor="w")

        # Control button
        btn_frame = tk.Frame(self, bg="#020617", padx=20, pady=12)
        btn_frame.pack(fill="x")

        self.btn_toggle = tk.Button(
            btn_frame, text="PAUSE TRANSLUXION", font=("Segoe UI", 10, "bold"),
            bg="#ef4444", fg="#ffffff", activebackground="#dc2626", activeforeground="#ffffff",
            relief="flat", pady=8, cursor="hand2", command=self.toggle_service
        )
        self.btn_toggle.pack(fill="x")

        # Terminal Section Label
        lbl_term = tk.Label(self, text="TERMINAL TELEMETRY & SYSTEM INVARIANTS:", font=("Segoe UI", 8, "bold"), fg="#94a3b8", bg="#020617")
        lbl_term.pack(anchor="w", padx=20, pady=(6, 2))

        # Terminal Log Box
        self.log_text = scrolledtext.ScrolledText(
            self, wrap=tk.WORD, height=16, bg="#000000", fg="#34d399",
            font=("Consolas", 9), insertbackground="#34d399", padx=10, pady=8
        )
        self.log_text.pack(fill="both", expand=True, padx=20, pady=(0, 16))

        # Initial Terminal Headers
        self.log_line("[OK] Transluxion Engine initialized.")
        self.log_line("[INFO] Sends operating-system input")
        self.log_line("[INFO] Teams status is not checked by this utility")
        self.log_line("STATUS: RUNNING - Teams status is not verified")
        self.log_line("=================================================================")
        self.log_line(f"[{datetime.now().strftime('%H:%M:%S')}] Local input cycle started.")

    def log_line(self, text):
        self.log_text.insert(tk.END, text + "\\n")
        self.log_text.see(tk.END)

    def toggle_service(self):
        if not self.running:
            self.running = True
            self.btn_toggle.configure(text="PAUSE TRANSLUXION", bg="#ef4444", activebackground="#dc2626")
            self.log_line(f"[{datetime.now().strftime('%H:%M:%S')}] Local input cycle resumed.")
            self.worker_thread = threading.Thread(target=self.run_loop, daemon=True)
            self.worker_thread.start()
        else:
            self.running = False
            self.btn_toggle.configure(text="START TRANSLUXION", bg="#10b981", activebackground="#059669")
            self.log_line(f"[{datetime.now().strftime('%H:%M:%S')}] PAUSED. Idle timer restored.")

    def run_loop(self):
        while self.running:
            delay = random.randint(35, 60)
            time.sleep(delay)
            if not self.running:
                return

            self.ping_count += 1
            now_str = datetime.now().strftime('%H:%M:%S')
            self.log_line(f"[{now_str}] Local input cycle #{self.ping_count} completed. Next in {delay}s...")

            if HAS_PYAUTOGUI:
                x, y = pyautogui.position()
                pyautogui.moveTo(x + 1, y, duration=0.1)
                pyautogui.moveTo(x, y, duration=0.1)
            else:
                if sys.platform == "win32":
                    import ctypes
                    ctypes.windll.user32.keybd_event(0x7E, 0, 0, 0)
                    ctypes.windll.user32.keybd_event(0x7E, 0, 2, 0)

if __name__ == "__main__":
    app = TransluxionApp()
    app.mainloop()`,
    stopInstruction: 'Click the "Pause Transluxion" button or close the application window.',
    reviewNote: 'This script can generate mouse or keyboard input. Review all dependencies and confirm that it is permitted on your device.'
  },
  {
    id: 'mac-caffeinate',
    name: 'Transluxion for macOS Terminal',
    os: 'mac',
    filename: 'Transluxion_Mac.sh',
    badge: 'Native macOS',
    description: 'A macOS shell example that requests the system stay awake and sends periodic keyboard input. It does not verify Teams status.',
    tags: ['macOS Monterey/Ventura/Sonoma/Sequoia', 'Native CLI', 'Zero 3rd-Party Software'],
    oneLiner: `caffeinate -u -t 28800 & while true; do osascript -e 'tell application "System Events" to key code 124' 2>/dev/null; sleep $((40 + RANDOM % 30)); done`,
    code: `#!/usr/bin/env bash
# ==============================================================
# Transluxion for macOS
# Requests that macOS stay awake and sends periodic keyboard input.
# ==============================================================

echo "=========================================================="
echo " Transluxion for macOS is running..."
echo " Teams status is not checked by this utility"
echo " Press Ctrl + C to stop at any time."
echo "=========================================================="

caffeinate -d -i -m -u &
CAFF_PID=$!

trap "kill $CAFF_PID 2>/dev/null; echo 'Transluxion stopped.'; exit 0" SIGINT SIGTERM

while true; do
  osascript -e 'tell application "System Events" to key code 124' 2>/dev/null
  SLEEP_TIME=$((40 + RANDOM % 26))
  echo "[$(date '+%H:%M:%S')] Local input sent. Next cycle in \${SLEEP_TIME}s..."
  sleep \$SLEEP_TIME
done`,
    stopInstruction: 'Press Ctrl + C in the Mac Terminal window.',
    reviewNote: 'This script requests that macOS stay awake and sends keyboard input. Review the source and your device policy before running it.'
  }
];
