# Setup Guide for Group Home App

This guide will help you get the Group Home App up and running on your device.

## For IT Staff / Caregivers

### System Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Network**: Internet connection for initial setup

### Installation Steps

#### Option 1: Simple Setup (Recommended)
1. **Download Node.js**:
   - Go to https://nodejs.org
   - Download the LTS version (Long Term Support)
   - Run the installer with default settings

2. **Download the App**:
   - Extract the project files to a folder (e.g., `C:\\GroupHomeApp`)
   - Open Command Prompt or PowerShell
   - Navigate to the folder: `cd C:\\GroupHomeApp`

3. **Install and Run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Access the App**:
   - Open a web browser
   - Go to `http://localhost:3000`
   - The app should now be running!

#### Option 2: Production Setup
For a more permanent installation:

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Serve the files**:
   - Use a simple web server
   - Or deploy to your facility's intranet

### Configuration for Seniors

#### Initial User Setup
1. **Create profiles** for each resident
2. **Set accessibility preferences**:
   - Font size: Start with "Large" or "Extra Large"
   - High contrast: Enable for users with vision difficulties
   - Large buttons: Keep enabled (default)

3. **Configure reminders**:
   - Work with nursing staff to set up medication schedules
   - Add meal times based on facility schedule
   - Include activity reminders for group events

#### Recommended Settings by User Type

**For users with vision difficulties**:
- Font size: Extra Large (24px)
- High contrast: Enabled
- Reduced motion: Enabled

**For users with motor difficulties**:
- Large buttons: Enabled (default)
- Font size: Large or Extra Large
- Touch targets: Maximum size

**For tech-comfortable users**:
- Font size: Medium or Large
- Standard settings with notifications enabled

### Device Setup

#### Tablets (Recommended)
- **iPad**: iOS 14+ with Safari
- **Android**: Android 8+ with Chrome
- **Windows**: Surface tablets with Edge or Chrome

**Tablet Configuration**:
1. Set up kiosk mode to prevent accidental navigation away
2. Increase system font size if needed
3. Disable auto-lock or set to 30+ minutes
4. Pin the app to the home screen

#### Computers
- Use full-screen browser mode (F11)
- Create desktop shortcut for easy access
- Consider using large monitors (24" or bigger)

#### Smartphones (Phase 2+)
- Currently not optimized for small screens
- Will be supported in future phases

## For Residents

### Getting Started
1. **Ask for help** - A caregiver will help you set up your profile
2. **Choose your photo** - Pick a picture you like for your profile
3. **Add emergency contact** - Usually a family member or friend
4. **Try the demo** - Explore the app with guidance

### Your First Day
1. **Login** - Click on your name and photo
2. **Look around** - Use the menu on the left to explore
3. **Check your dashboard** - See what's planned for today
4. **Set up reminders** - Add your medication times

### Daily Use
- **Morning**: Check your dashboard to see the day's schedule
- **Reminders**: The app will alert you for medications and meals
- **Navigation**: Use the big buttons on the left side to move around
- **Help**: Ask a caregiver if you're confused

### Tips for Success
- **Take your time** - There's no rush to learn everything at once
- **Ask questions** - Caregivers are there to help
- **Practice daily** - The more you use it, the easier it becomes
- **Customize settings** - Make the text larger if needed

## For Family Members

### Supporting Your Loved One
1. **Visit during setup** - Help them choose photos and settings
2. **Practice together** - Show them how to navigate and use features
3. **Set up reminders** - Help add their medication schedule
4. **Encourage use** - Regular practice builds confidence

### What to Expect
- **Phase 1**: Basic profiles, reminders, and settings
- **Phase 2**: You'll be able to message and video call (coming soon)
- **Phase 3**: Health monitoring and emergency features (coming soon)

### Helping from Home
- **Call regularly** - Ask about their experience with the app
- **Be patient** - Learning new technology takes time
- **Celebrate progress** - Acknowledge their efforts and improvements
- **Stay informed** - Ask facility staff about new features

## Troubleshooting

### Common Issues

#### App Won't Load
1. **Check internet connection**
2. **Refresh the browser** (F5 or Ctrl+R)
3. **Clear browser cache**
4. **Try a different browser**

#### Text Too Small
1. Go to **Settings** in the app
2. Choose **Text Size**: Large or Extra Large
3. Or use browser zoom: Ctrl and + (Windows) or Cmd and + (Mac)

#### Can't See Buttons Clearly
1. Go to **Settings**
2. Turn on **High Contrast Mode**
3. Adjust screen brightness on device

#### Reminders Not Working
1. Check **Settings** → **Notification Settings**
2. Make sure **Reminder Notifications** is enabled
3. Verify reminder times are set correctly
4. Ask caregiver to check browser notification permissions

#### Accidentally Changed Something
1. **Don't panic** - most changes can be undone
2. Go to **Settings** to fix display issues
3. Ask a caregiver for help
4. Profile information is safe and can be restored

### Getting Help

#### For Technical Issues
1. **Restart the browser** first
2. **Ask IT staff** or tech-savvy caregiver
3. **Check this guide** for common solutions
4. **Contact app support** (information in Settings)

#### For Using the App
1. **Ask a caregiver** - they've been trained to help
2. **Practice with family** during visits
3. **Take notes** about what you learn
4. **Go slowly** - there's no rush

### Contact Information

- **Facility IT Support**: [Contact your facility]
- **Caregiver Assistance**: Available during all shifts
- **Family Support**: Coordinate through facility staff
- **App Updates**: Check Settings → About for version info

---

## Quick Reference Card

*Print this card and post it near devices*

### Basic Navigation
- **Home**: Click the house icon 📱
- **My Profile**: Click the person icon 👤
- **Reminders**: Click the bell icon 🔔
- **Settings**: Click the gear icon ⚙️

### Getting Help
- **Find a caregiver** for immediate assistance
- **Look for the blue help buttons** in the app
- **Use the emergency contact** in your profile if needed

### Emergency
- **Call 911** for medical emergencies
- **Find facility staff** for urgent needs
- **Use your emergency contact** from your profile

**Remember**: It's okay to ask for help! Everyone is learning together.