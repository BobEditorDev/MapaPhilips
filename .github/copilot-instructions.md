# Interactive Office Map - Philips

Interactive Office Map is a static HTML5 web application that displays an SVG-based office floor plan with clickable room selection functionality. The application is built with pure HTML5, CSS3, and vanilla JavaScript with no dependencies or build process required.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Running the Application
- **FASTEST METHOD**: `python3 -m http.server 8000` (loads in ~17ms)
- **ALTERNATIVE**: `npx http-server -p 8000` (requires package download on first run, ~10s setup time)
- **Access**: Open `http://localhost:8000` in any modern browser
- **No Build Required**: This is a static application - simply serve the files directly

### Application Testing and Validation Scenarios
After making any changes, always run through these complete scenarios:

1. **Room Selection Test**:
   - Click "Sala de Reunião 1" in the sidebar - verify button highlights in blue
   - Verify the room blinks red in the SVG map
   - Check console shows "Room selected: sala-reuniao-1"
   - Wait 10 seconds - selection should auto-clear

2. **Map Interaction Test**:
   - Click directly on "Recepção" room in the SVG map
   - Verify corresponding sidebar button becomes active
   - Verify accessibility announcement appears

3. **Clear Function Test**:
   - Select any room, then click "Limpar Seleção" button
   - Verify all selections clear immediately
   - Test ESC key also clears selection

4. **Keyboard Navigation Test**:
   - Tab through room buttons
   - Use arrow keys to navigate between rooms
   - Press Enter or Space to select focused room
   - Press ESC to clear selection

5. **Responsive Design Test**:
   - Test desktop view (>1024px): horizontal layout with sidebar
   - Test tablet view (768-1024px): vertical optimized layout
   - Test mobile view (<768px): stacked interface, map prioritized

### Performance Metrics
- **Total Size**: ~23KB (7.8KB HTML + 5.4KB CSS + 9.9KB JS)
- **Load Time**: <20ms on local server
- **Browser Requirements**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **No Dependencies**: Zero external libraries or frameworks

## Validation Requirements

### Manual Testing Protocol
**CRITICAL**: Always manually test functionality after making changes:

1. **Start Server**: `python3 -m http.server 8000`
2. **Open Browser**: Navigate to `http://localhost:8000`
3. **Screenshot Test**: Take screenshot showing initial state
4. **Click Test**: Click 3 different rooms and verify highlighting works
5. **Clear Test**: Use both "Limpar Seleção" button and ESC key
6. **Mobile Test**: Resize browser to 768px width and verify responsive layout
7. **Console Check**: Verify no JavaScript errors in browser console

### Code Quality Requirements
- **No Build Tools**: Do not add package.json, webpack, or build systems
- **No Dependencies**: Do not add external libraries - keep the application pure
- **Preserve Functionality**: All interactive features must continue working
- **Accessibility**: Maintain ARIA labels and keyboard navigation support
- **Performance**: Keep total size under 30KB

## File Structure and Key Components

### Repository Structure
```
MapaPhilips/
├── index.html          # Main HTML with embedded SVG office map
├── style.css           # CSS styles with responsive design and animations
├── script.js           # JavaScript for room selection and interactions
├── README.md           # Project documentation (Portuguese)
└── .github/
    └── copilot-instructions.md  # This file
```

### Key Files Overview

#### index.html (7.8KB)
- Semantic HTML5 structure with embedded SVG office map
- 11 interactive rooms with unique IDs (sala-reuniao-1, recepcao, etc.)
- Sidebar with categorized room list (Meeting Rooms, Offices, Common Areas, Facilities)
- Full accessibility support with ARIA labels

#### style.css (5.4KB)
- Responsive grid layout with breakpoints at 768px and 1024px
- CSS animations for room blinking effect (@keyframes blink)
- Support for reduced motion and high contrast preferences
- Mobile-first responsive design

#### script.js (9.9KB)
- OfficeMap class managing room selection state
- Event handling for clicks, keyboard navigation, and window resize
- Accessibility features including screen reader announcements
- Auto-clear selection after 10 seconds

## Common Development Tasks

### Adding a New Room
1. **Update SVG in index.html**: Add new `<g id="new-room">` element with rectangle and text
2. **Update Sidebar**: Add new button with `data-room="new-room"` attribute
3. **Update JavaScript**: Add room name mapping in `getRoomDisplayName()` function
4. **Test**: Verify room selection and highlighting works correctly

### Modifying Room Colors
- Edit CSS fill colors for room categories in style.css
- Meeting rooms: `#f0f8e8` (light green)
- Offices: `#f8f0e8` (light orange)  
- Common areas: `#e8f0f8` (light blue)
- Facilities: `#f8e8f0` (light pink)

### Accessibility Updates
- All rooms have ARIA labels in `setupAccessibility()` function
- Keyboard navigation handled in `handleKeyboardNavigation()` 
- Screen reader announcements via hidden `#room-announcer` element
- Focus management for better keyboard navigation

## Browser Compatibility and Testing

### Supported Browsers
- ✅ Chrome 60+ (Tested)
- ✅ Firefox 55+ (Supported)
- ✅ Safari 12+ (Supported) 
- ✅ Edge 79+ (Supported)
- ✅ Mobile Safari 12+ (Responsive design tested)
- ✅ Android Chrome 60+ (Responsive design tested)

### Known Limitations
- **No Server-Side Logic**: Pure client-side application
- **No Data Persistence**: Room selections don't persist across page reloads
- **Static Map**: Office layout changes require manual SVG updates
- **Portuguese Language**: Interface text is in Portuguese

## Troubleshooting

### Common Issues
1. **"Office Map initialized successfully" not in console**: JavaScript failed to load
2. **Room selection not working**: Check browser console for JavaScript errors
3. **Responsive design broken**: Verify CSS media queries and viewport meta tag
4. **Blinking animation not working**: Check CSS animation support in browser

### Debug Commands
```bash
# Test server response
curl -I http://localhost:8000/

# Check file sizes
ls -la *.html *.css *.js

# Validate HTML (if installed)
html5validator index.html

# Test mobile viewport
# Use browser dev tools and set to 768px width
```

## Development Guidelines

### Code Style
- **HTML**: Semantic elements, proper nesting, ARIA attributes
- **CSS**: Mobile-first responsive design, CSS Grid and Flexbox
- **JavaScript**: ES6+ features, class-based architecture, proper event handling
- **Comments**: Minimal comments - code should be self-documenting

### Performance Considerations
- **SVG Optimization**: Keep SVG elements minimal and properly structured
- **CSS Animations**: Use hardware-accelerated properties (transform, opacity)
- **JavaScript**: Debounce resize events, clean up timeouts properly
- **Images**: No external images - everything is SVG or CSS

### Making Changes
1. **Always test locally** with `python3 -m http.server 8000`
2. **Take screenshots** before and after changes
3. **Test all browsers** if changing core functionality
4. **Verify accessibility** with screen readers or accessibility tools
5. **Check responsive design** on mobile, tablet, and desktop viewports
6. **Validate no console errors** in browser developer tools

This application is production-ready and requires no build process. Focus on maintaining its simplicity while enhancing functionality.