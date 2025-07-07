# Product board v1 - MVP

This document summarizes the main features for the first version of the moodboard application.

| ID | Feature | Objective | Priority | Acceptance Criteria | KPI | Owner | Status |
|----|---------|-----------|----------|---------------------|-----|-------|--------|
|1|Create & delete moodboard|Allow user to start a new project or clean workspace|P0|- Sidebar shows a ➕ 'Nouveau moodboard' button\n- A blank moodboard opens instantly after creation\n- Deletion requires confirmation modal|Nb moodboards created / active|Front-end|À faire|
|2|Folder organisation|Keep workspace clear when user has >5 moodboards|P0|- Drag-and-drop moodboard into folder\n- Rename or delete folder|% moodboards inside a folder|Front-end|À faire|
|3|Image upload / URL|Store visual inspirations|P0|- Accept .jpg, .png, .webp\n- Show upload progress bar\n- Reject files >10 MB|Upload success rate|Front + Storage|À faire|
|4|Add text block|Capture quick notes|P0|- Inline editable block, Ctrl+Enter to save\n- Max 500 characters|Notes per session|Front-end|À faire|
|5|Add web link|Preserve web references|P1|- Pasting a URL creates a link card with favicon & page title|% valid links|Front + Scraper|À faire|
|6|Free placement (drag-and-drop)|Visual composition flexibility|P0|- Cards move with latency <80 ms\n- Position stored in database|Average drag latency|Front + Firestore|À faire|
|7|Real-time collaboration|Simultaneous work without conflict|P0|- Show active user avatars\n- Changes visible to others <300 ms\n- Handle edit conflicts gracefully|Sessions with ≥2 users|Front + Firestore|En cours|
|8|Share via permissioned link|Invite clients / colleagues easily|P0|- Generate unique URL: fboard.app/m/{id}?role=viewer\|editor\n- Viewer/editor rights enforced by Firestore rules|Links shared|Back-end + Rules|À faire|
|9|Basic history (last edited)|Track recent activity|P2|- Display 'Modifié par X • hh:mm' bottom-right|null|Front + Firestore|Backlog|
|10|One-page onboarding|Lower first-use friction|P2|- Popup tutorial on first login, replayable|Day-1 activation rate|UX|Backlog|
|11|Presentation mode|Full-screen share in meetings|P3|- Toggle hides editing UI for clean view|Presentation sessions|Front-end|Backlog|

