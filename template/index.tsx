import React from 'react';
import { createRoot } from 'react-dom/client';

import VideoTemplate from '@/video-components/VideoTemplate';

const root = createRoot(document.getElementById('root')!);
// @ts-ignore ( RENDER_DATA is injected at bundle time )
root.render(<VideoTemplate {...RENDER_DATA} />);
