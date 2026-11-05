'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Ban,
  Camera,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Info,
  Search,
} from 'lucide-react'

const guidance = [
  { icon: CreditCard, title: 'Use the health plan card you show at', body: 'the doctor’s office, not your red, white, and blue Medicare card.' },
  { icon: Search, title: 'Look for a Plan ID that starts with H,', body: 'like H1234-056. Your card might label the two parts Contract and Plan instead.' },
  { icon: Ban, title: 'Do not enter your Member ID.', body: 'It identifies you personally and is not your plan number.', bold: true },
  { icon: Camera, title: 'Can’t find the Plan ID? Take a photo', body: 'and check the suggested match, or tap Search for my plan instead.' },
]

function StatusBar() {
  return <div className="status-bar" aria-hidden="true"><span>9:41</span><div className="status-indicators"><span className="signal"><i /><i /><i /><i /></span><span className="battery"><i /></span></div></div>
}

function Header({ onHelp }: { onHelp: () => void }) {
  return (
    <><StatusBar /><header className="top-bar">
      <button className="top-action" type="button" aria-label="Go back"><ArrowLeft aria-hidden="true" /><span>Back</span></button>
      <button className="top-action" type="button" onClick={onHelp}><CircleHelp aria-hidden="true" /><span>Help</span></button>
    </header></>
  )
}

function PlanConfirmation({ onContinue, onHelp }: { onContinue: () => void; onHelp: () => void }) {
  return <>
    <Header onHelp={onHelp} />
    <section className="page-content confirmation-content">
      <h1>Is this your plan?</h1>
      <p>Check that the name and number match<br />your plan card.</p>
      <div className="plan-card">
        <h2>Health First Premier Access</h2>
        <div className="plan-row"><span>Plan ID</span><strong>H1099-027-000</strong></div>
        <div className="plan-row"><span>Type</span><strong>HMO-POS</strong></div>
        <div className="plan-row"><span>State</span><strong>Florida</strong></div>
        <div className="plan-row"><span>Plan year</span><strong>2026</strong></div>
      </div>
      <div className="info-note"><Info aria-hidden="true" /><span>Found in public Medicare plan<br />information.</span></div>
    </section>
    <div className="bottom-actions">
      <button className="primary-button" type="button" onClick={onContinue}>Yes, this is my plan</button>
      <button className="secondary-button" type="button" onClick={onContinue}>No, this isn&apos;t</button>
    </div>
  </>
}

function Matches({ onHelp }: { onHelp: () => void }) {
  return <>
    <Header onHelp={onHelp} />
    <section className="page-content matches-content">
      <h1>We found possible<br />matches</h1>
      <p>Pick the one that matches the name and<br />plan number on your card.</p>
      <div className="match-list">
        <button className="match-card" type="button"><span><strong>HealthSpring Premier</strong><small>HMO-POS · H0439-024-000 · Utah</small></span><ChevronRight aria-hidden="true" /></button>
        <button className="match-card" type="button"><span><strong>HealthSpring Preferred Full<br />Savings</strong><small>HMO · H4513-088-000 · Alabama</small></span><ChevronRight aria-hidden="true" /></button>
      </div>
      <button className="no-match" type="button" onClick={onHelp}>I do not see my plan</button>
    </section>
  </>
}

function HelpSheet({ onClose }: { onClose: () => void }) {
  return <>
    <button className="scrim" type="button" aria-label="Close help" onClick={onClose} />
    <section className="help-sheet" role="dialog" aria-modal="true" aria-labelledby="help-title">
      <div className="sheet-handle" aria-hidden="true" />
      <h2 id="help-title">Need help finding your plan?</h2>
      <div className="guidance-list">{guidance.map(({ icon: Icon, title, body, bold }) => <div className="guidance-row" key={title}><Icon aria-hidden="true" className="guidance-icon" /><p>{bold ? <strong>{title}</strong> : title} {body}</p></div>)}</div>
      <div className="contact-note"><p>Still stuck? Email <a href="mailto:support@alreadyyours.com">support@alreadyyours.com</a>.<br />For questions about your benefits, call the number on your plan card.</p></div>
      <button className="primary-button" type="button" onClick={onClose}>Got it</button>
    </section>
  </>
}

export default function Page() {
  const [screen, setScreen] = useState<'confirmation' | 'matches'>('confirmation')
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" className="screen" aria-label="Find your health plan">
    {screen === 'confirmation' ? <PlanConfirmation onContinue={() => setScreen('matches')} onHelp={() => setIsHelpOpen(true)} /> : <Matches onHelp={() => setIsHelpOpen(true)} />}
    {isHelpOpen && <HelpSheet onClose={() => setIsHelpOpen(false)} />}
  </main></div>
}
