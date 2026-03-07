# Simple Web Renderer Implementation Plan

This plan outlines the steps to build a basic web renderer (a toy browser engine) in Python from scratch. The goal is to fetch HTML, parse it, layout elements, and render them to a window.

## Architecture
- **Network**: Handles HTTP requests and URL parsing.
- **HTML Parser**: Converts raw HTML text into a tree of nodes (DOM).
- **Layout Engine**: Calculates the position and size of each node.
- **Renderer**: Draws the layout tree onto a graphical interface (using `tkinter`).

## Phases

### Phase 1: Network & Basic Window
- [ ] Create `browser.py` entry point.
- [ ] Implement `URL` class to parse URLs (scheme, host, path) and fetch content using `socket` or `ssl`.
- [ ] Set up a basic `tkinter` window to display text.

### Phase 2: HTML Parsing
- [ ] Implement a simple `HTMLParser` to tokenize the HTML.
- [ ] Build a tree structure (DOM) with `Element` and `Text` nodes.
- [ ] Support basic tags: `<html>`, `<body>`, `<div>`, `<p>`, `<h1>`.

### Phase 3: Layout Engine
- [ ] Create a `Layout` class to traverse the DOM tree.
- [ ] Implement a "Block Layout" algorithm (elements stack vertically).
- [ ] Implement an "Inline Layout" algorithm (text flows horizontally).
- [ ] Calculate `x`, `y`, `width`, `height` for each node.

### Phase 4: Rendering (Painting)
- [ ] Implement a `paint` function to traverse the layout tree.
- [ ] Draw text and rectangles on the `tkinter` canvas based on layout coordinates.
- [ ] Handle window resizing and scrolling.

### Phase 5: Refinement
- [ ] Add basic styling support (font weight, size).
- [ ] Support scrolling (mouse wheel, scrollbar).
- [ ] Add a simple address bar to navigate to different URLs.

## Dependencies
- Python 3 standard library (`tkinter`, `socket`, `ssl`).
- No external dependencies required for the core engine.
