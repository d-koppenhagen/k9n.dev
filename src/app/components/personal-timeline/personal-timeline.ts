import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TimelineStep {
  location: string;
  when: string;
  what: string;
  where: string;
  info: string;
}

@Component({
  selector: 'app-personal-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './personal-timeline.html',
  styleUrl: './personal-timeline.css',
})
export class PersonalTimeline {
  readonly steps: TimelineStep[] = [
    {
      location: 'Frankfurt (Oder)',
      when: '2012',
      what: '🧰 Facharbeiter\nIT-Systemelektroniker',
      where: 'Deutschen Telekom AG',
      info: 'Informatik, Telekommunikationstechnik sowie Elektrotechnik',
    },
    {
      location: 'Cottbus',
      when: '2012',
      what: '☎️ Sachbearbeiter Technische Kundenberatung',
      where: 'Deutsche Telekom Technischer Service GmbH (Customer Competence Center)',
      info: 'Second Level Support für VoIP und WLAN Produkte.',
    },
    {
      location: 'Leipzig',
      when: '2015',
      what: '🎓 Bachelor Of Engineering\nKommunikations- Und Medieninformatik',
      where: 'Deutsche Telekom Hochschule für Telekommunikation',
      info: 'Netzwerk- und Übertragungstechnik, Software Engineering, IT-Architektur, Protokollengineering sowie Web und Medien-Technologien.',
    },
    {
      location: 'Berlin',
      when: '2015',
      what: '🚨 Entwickler TETRA Support Und Umsetzung',
      where: 'Deutsche Telekom Healthcare & Security Solutions GmbH',
      info: 'Umsetzung von Client- und Serversystemen im Bereich des TETRA-BOS. Administration, Konfiguration, Integration und Test von IT-Systemen.',
    },
    {
      location: '',
      when: '2017',
      what: '📕 Angular (1. Auflage)',
      where: 'dpunkt.verlag',
      info: 'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript',
    },
    {
      location: 'Berlin',
      when: '2019',
      what: '💎 Spezialist\nEntwickler Und IT-Berater',
      where: 'DB Systel GmbH',
      info: 'Entwicklung nutzerzentrierter Webanwendungen im Enterprise-Umfeld. Beratung zur Umsetzung von Web-Anwendungen und -Architekturen sowie User Experience (UX) Consulting.',
    },
    {
      location: '',
      when: '2019',
      what: '📕 Angular (2. Auflage)',
      where: 'dpunkt.verlag',
      info: 'Grundlagen, fortgeschrittene Themen und Best Practices – inklusive NativeScript und NgRx',
    },
    {
      location: '',
      when: '2020',
      what: '📕 Angular (3. Auflage)',
      where: 'dpunkt.verlag',
      info: 'Grundlagen, fortgeschrittene Themen und Best Practices – inklusive RxJS, NgRx und PWA',
    },
    {
      location: 'Berlin',
      when: '2022',
      what: '💎 Seniorberater & Frontend Architect',
      where: 'DB Systel GmbH',
      info: 'Entwicklung von Enterprise-Webanwendungen',
    },
    {
      location: '',
      when: '2023',
      what: '📕 Angular (4. Auflage)',
      where: 'dpunkt.verlag',
      info: 'Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices. Inklusive RxJS, NgRx und a11y.',
    },
    {
      location: 'Berlin',
      when: '2024',
      what: '💎 DevOps Engineer mit Spezialisierung in Frontend Architektur und Barrierefreiheit',
      where: 'DB Systel GmbH',
      info: 'Experte für Webtechnologien und barrierefreie Webanwendungen.',
    },
    {
      location: '',
      when: '2026',
      what: '📘 Angular: Das Praxisbuch (1. Auflage)',
      where: 'dpunkt.verlag',
      info: 'Von den Grundlagen bis zur professionellen Entwicklung mit Signals.',
    },
  ].reverse();
}
