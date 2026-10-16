import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './styles/tokens.css'
import './styles/global.css'
import './styles/mobile.css'
import HomePage from './pages/HomePage.jsx'
import RecordPage from './pages/RecordPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import BlogListPage from './pages/BlogListPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import DevAuthSwitcher from './components/DevAuthSwitcher.jsx'
import AuthGate from './components/AuthGate.jsx'

// Public: "/" (landing for visitors, dashboard for members), the track record,
// articles and privacy. Gated: the community, and "/signin", which shows the
// sign-in card and sends a signed-in user home. Today's picks live on the
// members' dashboard, so they stay behind "/" + sign-in.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/articles" element={<BlogListPage />} />
        <Route path="/articles/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/signin" element={<AuthGate><Navigate to="/" replace /></AuthGate>} />
        <Route path="/community" element={<AuthGate><CommunityPage /></AuthGate>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      {import.meta.env.DEV && <DevAuthSwitcher />}
    </BrowserRouter>
  </StrictMode>,
)
