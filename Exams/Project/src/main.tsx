import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Header from './components/header/header.tsx'
import Content from './components/content/content.tsx'

import './main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Content />
  </StrictMode>,
)
