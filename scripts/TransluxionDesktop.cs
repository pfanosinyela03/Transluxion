using System;
using System.Drawing;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Windows.Forms;

internal static class TransluxionDesktop
{
    [StructLayout(LayoutKind.Sequential)]
    private struct Input
    {
        public uint Type;
        public InputUnion Data;
    }

    [StructLayout(LayoutKind.Explicit)]
    private struct InputUnion
    {
        [FieldOffset(0)]
        public MouseInput Mouse;

        [FieldOffset(0)]
        public KeyboardInput Keyboard;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct MouseInput
    {
        public int X;
        public int Y;
        public uint Data;
        public uint Flags;
        public uint Time;
        public IntPtr ExtraInfo;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct KeyboardInput
    {
        public ushort VirtualKey;
        public ushort ScanCode;
        public uint Flags;
        public uint Time;
        public IntPtr ExtraInfo;
    }

    [DllImport("user32.dll", SetLastError = true)]
    private static extern uint SendInput(uint inputCount, Input[] inputs, int inputSize);

    internal static void SendF15()
    {
        var inputs = new[]
        {
            new Input
            {
                Type = 1,
                Data = new InputUnion
                {
                    Keyboard = new KeyboardInput { VirtualKey = 0x7E }
                }
            },
            new Input
            {
                Type = 1,
                Data = new InputUnion
                {
                    Keyboard = new KeyboardInput { VirtualKey = 0x7E, Flags = 0x0002 }
                }
            }
        };

        if (SendInput((uint)inputs.Length, inputs, Marshal.SizeOf(typeof(Input))) != (uint)inputs.Length)
            throw new Win32Exception(Marshal.GetLastWin32Error(), "Windows could not send the F15 keyboard input.");
    }

    [STAThread]
    private static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new TransluxionWindow());
    }
}

internal sealed class TransluxionWindow : Form
{
    private readonly Button toggleButton;
    private readonly Timer pulseTimer;
    private readonly PulseDial pulseDial;
    private readonly Label sessionState;
    private readonly Panel sessionDot;
    private readonly Label footerStatus;
    private int pulseCount;
    private bool running = true;
    private DateTime nextPulse;

    internal TransluxionWindow()
    {
        Text = "Transluxion";
        ClientSize = new Size(560, 480);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(5, 10, 19);
        ForeColor = Color.White;
        Font = new Font("Segoe UI", 9);
        FormBorderStyle = FormBorderStyle.FixedDialog;
        MaximizeBox = false;
        Icon = System.Drawing.Icon.ExtractAssociatedIcon(Application.ExecutablePath);

        var header = new Panel
        {
            Location = new Point(16, 12),
            Size = new Size(528, 48),
            BackColor = Color.FromArgb(13, 25, 41)
        };
        Controls.Add(header);

        var title = CreateLabel("TRANSLUXION", new Point(14, 5), new Size(210, 25), 14, FontStyle.Bold, Color.FromArgb(241, 247, 251));
        title.Anchor = AnchorStyles.Left | AnchorStyles.Top;
        header.Controls.Add(title);

        var subtitle = CreateLabel("D E S K T O P   C O N T R O L", new Point(15, 29), new Size(220, 14), 7, FontStyle.Regular, Color.FromArgb(112, 132, 154));
        header.Controls.Add(subtitle);

        sessionDot = new Panel
        {
            Location = new Point(366, 17),
            Size = new Size(7, 7),
            BackColor = Color.FromArgb(52, 232, 180)
        };
        header.Controls.Add(sessionDot);

        sessionState = CreateLabel("LOCAL SESSION", new Point(380, 11), new Size(132, 20), 8, FontStyle.Bold, Color.FromArgb(165, 243, 223));
        header.Controls.Add(sessionState);

        Controls.Add(CreateLabel("P E R S O N A L   D E S K T O P   U T I L I T Y", new Point(24, 72), new Size(420, 16), 8, FontStyle.Bold, Color.FromArgb(121, 164, 173)));
        Controls.Add(CreateLabel("Your focus, in motion.", new Point(24, 91), new Size(430, 31), 20, FontStyle.Bold, Color.FromArgb(245, 250, 255)));
        Controls.Add(CreateLabel("A simple local input cycle, controlled by you.", new Point(24, 122), new Size(430, 19), 9, FontStyle.Regular, Color.FromArgb(148, 167, 186)));

        var sessionPanel = new Panel
        {
            Location = new Point(24, 152),
            Size = new Size(512, 170),
            BackColor = Color.FromArgb(14, 27, 43)
        };
        sessionPanel.Paint += DrawCardBorder;
        Controls.Add(sessionPanel);

        var runningBadge = new Panel
        {
            Name = "runningBadge",
            Location = new Point(418, 12),
            Size = new Size(78, 22),
            BackColor = Color.FromArgb(20, 42, 50)
        };
        sessionPanel.Controls.Add(runningBadge);
        var badgeDot = new Panel { Name = "badgeDot", Location = new Point(9, 8), Size = new Size(6, 6), BackColor = Color.FromArgb(56, 220, 181) };
        runningBadge.Controls.Add(badgeDot);
        var badgeText = CreateLabel("RUNNING", new Point(21, 4), new Size(55, 14), 7, FontStyle.Bold, Color.FromArgb(145, 201, 189));
        badgeText.Name = "badgeText";
        runningBadge.Controls.Add(badgeText);

        pulseDial = new PulseDial
        {
            Location = new Point(166, 4),
            Size = new Size(180, 132),
            BackColor = sessionPanel.BackColor
        };
        sessionPanel.Controls.Add(pulseDial);
        sessionPanel.Controls.Add(CreateLabel("F15 keyboard input is sent locally every 45 seconds", new Point(38, 146), new Size(436, 16), 8, FontStyle.Regular, Color.FromArgb(117, 139, 160), ContentAlignment.MiddleCenter));

        var notePanel = new Panel
        {
            Location = new Point(24, 334),
            Size = new Size(512, 54),
            BackColor = Color.FromArgb(12, 23, 37)
        };
        notePanel.Paint += DrawCardBorder;
        Controls.Add(notePanel);

        var activityMark = new ActivityMark { Location = new Point(14, 16), Size = new Size(24, 22), BackColor = notePanel.BackColor };
        notePanel.Controls.Add(activityMark);
        notePanel.Controls.Add(CreateLabel("Teams status stays active while Transluxion is open and running", new Point(52, 10), new Size(444, 18), 8, FontStyle.Bold, Color.FromArgb(232, 241, 246)));
        notePanel.Controls.Add(CreateLabel("Transluxion sends local keyboard input every 45 seconds.", new Point(52, 30), new Size(444, 16), 8, FontStyle.Regular, Color.FromArgb(134, 154, 171)));

        toggleButton = new Button
        {
            Text = "PAUSE SESSION",
            Font = new Font("Segoe UI", 10, FontStyle.Bold),
            Size = new Size(512, 48),
            Location = new Point(24, 400),
            FlatStyle = FlatStyle.Flat,
            BackColor = Color.FromArgb(43, 219, 180),
            ForeColor = Color.FromArgb(4, 35, 30),
            Cursor = Cursors.Hand,
            TextAlign = ContentAlignment.MiddleCenter
        };
        toggleButton.FlatAppearance.BorderSize = 0;
        toggleButton.FlatAppearance.MouseOverBackColor = Color.FromArgb(76, 235, 202);
        toggleButton.Click += ToggleService;
        Controls.Add(toggleButton);

        footerStatus = CreateLabel("TRANSLUXION  /  WINDOWS DESKTOP", new Point(24, 456), new Size(360, 15), 7, FontStyle.Regular, Color.FromArgb(82, 101, 121));
        Controls.Add(footerStatus);

        pulseTimer = new Timer { Interval = 1000 };
        pulseTimer.Tick += SendPulse;
        FormClosed += delegate { pulseTimer.Stop(); };

        SendPulse();
        pulseTimer.Start();
    }

    private static Label CreateLabel(string text, Point location, Size size, float fontSize, FontStyle style, Color color)
    {
        return new Label
        {
            Text = text,
            Location = location,
            Size = size,
            Font = new Font("Segoe UI", fontSize, style),
            ForeColor = color,
            BackColor = Color.Transparent,
            TextAlign = ContentAlignment.MiddleLeft,
            AutoEllipsis = true
        };
    }

    private static Label CreateLabel(string text, Point location, Size size, float fontSize, FontStyle style, Color color, ContentAlignment alignment)
    {
        var label = CreateLabel(text, location, size, fontSize, style, color);
        label.TextAlign = alignment;
        return label;
    }

    private void DrawCardBorder(object sender, PaintEventArgs e)
    {
        using (var pen = new Pen(Color.FromArgb(32, 56, 73)))
            e.Graphics.DrawRectangle(pen, 0, 0, ((Panel)sender).Width - 1, ((Panel)sender).Height - 1);
    }

    private void ToggleService(object sender, EventArgs e)
    {
        running = !running;
        if (running)
        {
            toggleButton.Text = "PAUSE SESSION";
            toggleButton.BackColor = Color.FromArgb(43, 219, 180);
            toggleButton.ForeColor = Color.FromArgb(4, 35, 30);
            SendPulse();
            pulseTimer.Start();
        }
        else
        {
            pulseTimer.Stop();
            toggleButton.Text = "RESUME SESSION";
            toggleButton.BackColor = Color.FromArgb(25, 45, 57);
            toggleButton.ForeColor = Color.FromArgb(175, 238, 224);
            pulseDial.Running = false;
            pulseDial.Invalidate();
            UpdateSessionState();
        }
    }

    private void SendPulse(object sender, EventArgs e)
    {
        if (!running)
            return;

        if (DateTime.Now < nextPulse)
        {
            pulseDial.SecondsRemaining = Math.Max(0, (int)Math.Ceiling((nextPulse - DateTime.Now).TotalSeconds));
            pulseDial.Invalidate();
            return;
        }

        SendPulse();
    }

    private void SendPulse()
    {
        try
        {
            TransluxionDesktop.SendF15();
        }
        catch (Win32Exception error)
        {
            pulseTimer.Stop();
            running = false;
            toggleButton.Text = "RESUME SESSION";
            toggleButton.BackColor = Color.FromArgb(25, 45, 57);
            toggleButton.ForeColor = Color.FromArgb(175, 238, 224);
            pulseDial.Running = false;
            pulseDial.Invalidate();
            UpdateSessionState();
            MessageBox.Show(error.Message, "Transluxion input error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }

        pulseCount++;
        nextPulse = DateTime.Now.AddSeconds(45);
        pulseDial.Running = true;
        pulseDial.SecondsRemaining = 45;
        pulseDial.Invalidate();
        footerStatus.Text = "TRANSLUXION  /  F15 INPUT #" + pulseCount.ToString("D2") + "  /  " + DateTime.Now.ToString("HH:mm:ss");
        UpdateSessionState();
    }

    private void UpdateSessionState()
    {
        pulseDial.Running = running;
        pulseDial.Invalidate();
        sessionState.Text = running ? "LOCAL SESSION" : "SESSION PAUSED";
        sessionDot.BackColor = running ? Color.FromArgb(52, 232, 180) : Color.FromArgb(245, 185, 73);
        foreach (Control control in Controls)
        {
            var sessionPanel = control as Panel;
            if (sessionPanel == null || sessionPanel.Controls["runningBadge"] == null)
                continue;

            var badge = sessionPanel.Controls["runningBadge"];
            badge.BackColor = running ? Color.FromArgb(20, 42, 50) : Color.FromArgb(48, 39, 27);
            badge.Controls["badgeDot"].BackColor = running ? Color.FromArgb(56, 220, 181) : Color.FromArgb(245, 185, 73);
            badge.Controls["badgeText"].Text = running ? "RUNNING" : "PAUSED";
        }
    }
}

internal sealed class PulseDial : Panel
{
    internal bool Running { get; set; }
    internal int SecondsRemaining { get; set; }

    internal PulseDial()
    {
        DoubleBuffered = true;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        e.Graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;

        var diameter = 104;
        var x = (Width - diameter) / 2;
        var y = 8;
        var bounds = new Rectangle(x, y, diameter, diameter);
        using (var basePen = new Pen(Color.FromArgb(29, 52, 67), 5))
            e.Graphics.DrawEllipse(basePen, bounds);

        var accent = Running ? Color.FromArgb(55, 225, 194) : Color.FromArgb(105, 125, 139);
        if (Running)
        {
            var elapsed = Math.Max(0, Math.Min(45, 45 - SecondsRemaining));
            using (var arcPen = new Pen(accent, 5))
            {
                arcPen.StartCap = System.Drawing.Drawing2D.LineCap.Round;
                arcPen.EndCap = System.Drawing.Drawing2D.LineCap.Round;
                e.Graphics.DrawArc(arcPen, bounds, -90, Math.Max(2, elapsed * 8));
            }
        }

        DrawCentered(e.Graphics, "TEAMS STATUS", new Font("Segoe UI", 7, FontStyle.Bold), Color.FromArgb(128, 150, 169), new Rectangle(0, 31, Width, 15));
        DrawCentered(e.Graphics, Running ? "ACTIVE" : "PAUSED", new Font("Segoe UI", 18, FontStyle.Bold), Color.FromArgb(244, 250, 255), new Rectangle(0, 45, Width, 29));
        var countdown = Running
            ? "NEXT PULSE  " + TimeSpan.FromSeconds(SecondsRemaining).ToString(@"mm\:ss")
            : "INPUT PAUSED";
        DrawCentered(e.Graphics, countdown, new Font("Consolas", 7, FontStyle.Regular), Running ? accent : Color.FromArgb(157, 174, 188), new Rectangle(0, 74, Width, 16));
    }

    private static void DrawCentered(Graphics graphics, string text, Font font, Color color, Rectangle bounds)
    {
        using (font)
        using (var brush = new SolidBrush(color))
        using (var format = new StringFormat { Alignment = StringAlignment.Center, LineAlignment = StringAlignment.Center })
            graphics.DrawString(text, font, brush, bounds, format);
    }
}

internal sealed class ActivityMark : Control
{
    internal ActivityMark()
    {
        DoubleBuffered = true;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        e.Graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
        using (var pen = new Pen(Color.FromArgb(82, 229, 196), 2))
        {
            pen.StartCap = System.Drawing.Drawing2D.LineCap.Round;
            pen.EndCap = System.Drawing.Drawing2D.LineCap.Round;
            e.Graphics.DrawLines(pen, new[]
            {
                new Point(0, 12), new Point(6, 12), new Point(10, 5),
                new Point(15, 19), new Point(19, 10), new Point(24, 10)
            });
        }
    }
}
