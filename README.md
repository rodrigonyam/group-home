# Group Home App

A modern, accessible application designed specifically for seniors in group homes and assisted living facilities. This React-based application prioritizes ease of use, accessibility, and meaningful connections between residents, families, and caregivers.

## 🌟 Features (Phase 1: Foundation)

### ✅ Currently Available
- **User Profiles**: Simple setup with photo, emergency contact, and personal preferences
- **Accessibility Settings**: Adjustable font sizes, high contrast mode, and large touch targets
- **Reminder System**: Medication, meal, and activity reminders with customizable schedules
- **Intuitive Interface**: Senior-friendly design with large buttons and clear navigation
- **Responsive Design**: Works on tablets, computers, and mobile devices

### 🚀 Coming Soon
- **Phase 2**: Group chat, video calls, activity calendar, photo sharing
- **Phase 3**: Emergency button, wellness check-ins, health monitoring
- **Phase 4**: Games, puzzles, music, audiobooks
- **Phase 5**: Staff dashboard, family portal, offline mode

## 🎯 Target Users

- **Primary**: Seniors aged 65+ living in group homes or assisted living
- **Secondary**: Family members, caregivers, and facility staff
- **Focus**: Users with varying levels of tech comfort and accessibility needs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A modern web browser
- Basic familiarity with command line (or a caregiver to help with setup)

### Installation

1. **Clone or download the project**:
   ```bash
   git clone [repository-url]
   cd group-home
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

### First Time Setup

1. **Choose a demo profile** or create a new one
   - Margaret Johnson (voice support enabled)
   - Robert Williams (high contrast mode)  
   - Dorothy Chen (standard settings)

2. **Customize accessibility settings**:
   - Adjust font size (Small to Extra Large)
   - Enable high contrast if needed
   - Configure notification preferences

3. **Set up reminders**:
   - Add medication reminders
   - Schedule meal notifications
   - Create activity alerts

## 🎨 Design Philosophy

### Accessibility First
- **Large text sizes**: Minimum 18px, up to 24px for maximum readability
- **High contrast options**: Strong color differences for visual clarity
- **Large touch targets**: Minimum 44px for easy tapping
- **Simple navigation**: Clear, predictable interface patterns
- **Voice support ready**: Infrastructure prepared for future voice features

### Senior-Friendly Features
- **Simplified interface**: Reduced cognitive load with clear sections
- **Consistent patterns**: Same interactions work the same way throughout
- **Error prevention**: Confirmation dialogs for destructive actions
- **Clear feedback**: Visual and auditory confirmation of actions
- **Forgiving design**: Easy to undo mistakes

## 📱 Usage Guide

### Getting Started
1. **Login**: Choose your profile or create a new one
2. **Explore**: Use the sidebar navigation to visit different sections
3. **Customize**: Go to Settings to adjust the app to your preferences
4. **Add reminders**: Set up your daily medication and meal schedules

### Daily Workflow
1. **Morning**: Check dashboard for today's schedule and reminders
2. **Throughout day**: Receive reminder notifications as scheduled
3. **Evening**: Review completed activities and prepare for tomorrow
4. **Anytime**: Access emergency contact information from your profile

### Managing Reminders
- **Create**: Click "Add Reminder" and fill out the simple form
- **Edit**: Click the pencil icon on any existing reminder
- **Pause/Resume**: Use the play/pause button to temporarily disable reminders
- **Delete**: Use the trash icon (with confirmation) to remove reminders

## 🔧 Technical Details

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom senior-friendly components
- **Routing**: React Router for navigation
- **State Management**: Zustand for simple, predictable state
- **Animations**: Framer Motion for smooth, gentle transitions
- **Build Tool**: Vite for fast development and builds
- **Notifications**: React Hot Toast for user feedback

### Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── Layout.tsx    # Main app layout
│   ├── Sidebar.tsx   # Navigation sidebar
│   └── Header.tsx    # Top header with time and user info
├── pages/            # Main application pages
│   ├── LoginPage.tsx    # User authentication
│   ├── Dashboard.tsx    # Home dashboard
│   ├── ProfilePage.tsx  # User profile management
│   ├── RemindersPage.tsx # Reminder management
│   └── SettingsPage.tsx # App configuration
├── stores/           # State management
│   ├── userStore.ts     # User data and preferences
│   └── reminderStore.ts # Reminder management
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

### Accessibility Features
- **WCAG 2.1 AA compliance** target
- **Keyboard navigation** support
- **Screen reader** friendly markup
- **Focus management** with visible focus indicators
- **Color contrast** ratios meet accessibility standards
- **Text scaling** up to 200% without horizontal scrolling

## 🔒 Privacy & Security

### Data Storage
- **Local storage**: User preferences and settings stored locally
- **No cloud sync** in Phase 1 (privacy by design)
- **No tracking**: No analytics or user behavior tracking
- **Secure by default**: No external data transmission

### Future Considerations
- **Encrypted communication** for family messaging (Phase 2)
- **HIPAA compliance** preparation for health features (Phase 3)
- **Staff access controls** and audit logs (Phase 5)

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript types
```

### Code Style
- **TypeScript**: Strict typing for better reliability
- **ESLint**: Code quality and consistency
- **Prettier**: Automated code formatting
- **Component-based**: Modular, reusable components
- **Accessibility-first**: ARIA labels and semantic HTML

### Adding Features
1. **Follow the phase roadmap**: Respect the planned development phases
2. **Accessibility testing**: Test with screen readers and keyboard navigation
3. **Senior user testing**: Validate with actual target users when possible
4. **Error handling**: Provide clear, helpful error messages
5. **Documentation**: Update this README with new features

## 🗺️ Roadmap

### Phase 2: Social & Community (Q2 2024)
- Group chat with large, clear message bubbles
- Simple video calling interface
- Activity calendar with RSVP functionality
- Family photo sharing with approval workflow
- Contact management for family and friends

### Phase 3: Health & Safety (Q3 2024)
- One-tap emergency alert system
- Daily wellness check-in prompts
- Medication tracking integration
- Wearable device connectivity
- Staff notification system

### Phase 4: Entertainment & Enrichment (Q4 2024)
- Memory games and brain training
- Large-button music player
- Audiobook integration
- Simple puzzle games
- TV and radio schedule reminders

### Phase 5: Expansion (Q1 2025)
- Staff dashboard for caregivers
- Family portal for remote monitoring
- Offline mode for core features
- Multi-facility support
- Advanced reporting and analytics

## 🤝 Contributing

### Getting Involved
- **User feedback**: Most valuable contribution is testing with seniors
- **Accessibility testing**: Help ensure the app works for all users
- **Feature suggestions**: Based on real user needs and feedback
- **Bug reports**: Clear descriptions with steps to reproduce

### Development Guidelines
1. **User-centered design**: Every feature should solve a real problem
2. **Accessibility first**: Never compromise on accessibility for aesthetics
3. **Simple and reliable**: Prefer proven solutions over cutting-edge tech
4. **Test with users**: Validate changes with actual seniors when possible

## 📞 Support

### For Residents
- Ask a caregiver or family member for help
- Use the simple interface design to find what you need
- Settings can be adjusted to make text larger or contrast higher

### For Families
- Help your loved one set up their profile and reminders
- Customize accessibility settings based on their needs
- Look forward to family communication features in Phase 2

### For Caregivers
- Assist residents with initial setup and customization
- Staff dashboard and management features coming in Phase 5
- Contact information and training materials will be provided

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the senior community** - Making technology accessible, meaningful, and joyful for older adults.