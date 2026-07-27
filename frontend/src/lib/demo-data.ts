export interface Dilemma {
  id: string;
  title: string;
  text: string;
  author: string;
  createdAt: string;
  status: 'OPEN' | 'ANALYZED' | 'CLOSED';
}

export interface LensVerdict {
  lens: 'utilitarian' | 'deontological' | 'virtue';
  lensTitle: string;
  decision: string;
  score: number;
  reasoning: string;
  keyArguments: string[];
}

export interface Analysis {
  dilemmaId: string;
  dilemma: Dilemma;
  verdicts: LensVerdict[];
  synthesis: {
    recommendation: string;
    confidence: number;
    consensusNote: string;
  };
  analyzedAt: string;
}

// Demo dilemmas for frontend-only mode
export const DEMO_DILEMMAS: Dilemma[] = [
  {
    id: 'd1',
    title: 'The Autonomous Vehicle Choice',
    text: 'A self-driving car must choose between swerving to hit one pedestrian to save five passengers, or continuing straight and hitting five pedestrians to save one passenger. How should the AI be programmed to decide?',
    author: '0x1a2b...3c4d',
    createdAt: '2026-07-25T14:30:00Z',
    status: 'ANALYZED',
  },
  {
    id: 'd2',
    title: 'The Whistleblower Paradox',
    text: 'An employee discovers that their company is secretly selling user data to foreign governments. Reporting this would destroy the company and cost 10,000 jobs, but staying silent allows ongoing privacy violations affecting millions.',
    author: '0x5e6f...7a8b',
    createdAt: '2026-07-24T09:15:00Z',
    status: 'ANALYZED',
  },
  {
    id: 'd3',
    title: 'The Genetic Enhancement Divide',
    text: 'A biotech firm develops affordable genetic enhancement that increases intelligence by 30 points. Should governments subsidize it to prevent a genetic class divide, or ban it to avoid coercive social pressure on parents?',
    author: '0x9c0d...1e2f',
    createdAt: '2026-07-23T18:45:00Z',
    status: 'ANALYZED',
  },
  {
    id: 'd4',
    title: 'The Memory Erasure Clinic',
    text: 'A clinic offers voluntary memory erasure for trauma survivors. A patient wants to erase memories of a violent crime they witnessed, but prosecutors need their testimony to convict a dangerous criminal. Should the procedure be allowed?',
    author: '0x3a4b...5c6d',
    createdAt: '2026-07-22T11:00:00Z',
    status: 'ANALYZED',
  },
];

export const DEMO_ANALYSES: Analysis[] = [
  {
    dilemmaId: 'd1',
    dilemma: DEMO_DILEMMAS[0],
    verdicts: [
      {
        lens: 'utilitarian',
        lensTitle: 'The Utilitarian Calculus',
        decision: 'INTERVENE',
        score: 78,
        reasoning: 'From a utilitarian perspective, the morally correct action maximizes overall well-being. Saving five lives at the cost of one produces a net positive outcome of four lives preserved. The calculus is stark: five families spared grief versus one. However, this analysis must account for second-order effects. If autonomous vehicles are known to sacrifice bystanders, public trust erodes, adoption slows, and the net lives saved by AV technology (which reduces overall accidents by an estimated 90%) may decrease. The long-term utility calculation is less clear than the immediate arithmetic suggests.',
        keyArguments: [
          'Immediate calculus favors saving five over one',
          'Second-order effects on public trust must be weighted',
          'Long-term AV adoption rates affect total lives saved',
          'Precedent-setting consequences for future AI governance',
        ],
      },
      {
        lens: 'deontological',
        lensTitle: 'The Deontological Framework',
        decision: 'DO NOT INTERVENE',
        score: 65,
        reasoning: 'Deontological ethics holds that certain actions are inherently right or wrong regardless of consequences. Actively steering toward a pedestrian constitutes a deliberate killing, while continuing on the current path is an unfortunate accident. The categorical imperative demands we act only on maxims we could universalize: could we will a world where machines are programmed to deliberately kill innocents? The distinction between doing harm and allowing harm is morally significant. Programming a car to choose its victims crosses a fundamental moral boundary that no calculus of lives can justify.',
        keyArguments: [
          'Active killing versus passive allowing is morally distinct',
          'The categorical imperative forbids universalizing deliberate harm',
          'Rights-based framework protects individual autonomy',
          'Programming death decisions into machines violates human dignity',
        ],
      },
      {
        lens: 'virtue',
        lensTitle: 'Virtue Ethics Assessment',
        decision: 'REFRAME',
        score: 72,
        reasoning: 'Virtue ethics shifts the question from "what should the car do?" to "what kind of society programs such choices?" The trolley problem itself reveals a design failure. A virtuous engineer would not accept the frame of choosing victims but would redesign the system to avoid the dilemma entirely through better sensors, slower speeds in pedestrian zones, or infrastructure changes. The practical wisdom (phronesis) of the situation demands we reject false binaries. Courage requires confronting the regulatory and corporate incentives that make such scenarios likely.',
        keyArguments: [
          'The framing itself is the ethical failure to examine',
          'Virtue demands systemic redesign over victim selection',
          'Practical wisdom rejects forced binary choices',
          'Character of the society that deploys such systems matters most',
        ],
      },
    ],
    synthesis: {
      recommendation: 'The three lenses converge on a meta-conclusion: the ethical burden lies not in the moment of crisis but in the design decisions preceding it. All frameworks, despite different immediate prescriptions, agree that programming machines to choose victims is a moral failure that precedes the crash itself.',
      confidence: 82,
      consensusNote: 'While surface recommendations diverge, all three philosophical frameworks identify the same root cause: systemic design failure rather than moment-of-crisis decision-making.',
    },
    analyzedAt: '2026-07-25T15:02:00Z',
  },
  {
    dilemmaId: 'd2',
    dilemma: DEMO_DILEMMAS[1],
    verdicts: [
      {
        lens: 'utilitarian',
        lensTitle: 'The Utilitarian Calculus',
        decision: 'DISCLOSE',
        score: 85,
        reasoning: 'The privacy violation affects millions of users whose data is being sold without consent. While 10,000 jobs represent significant harm, the ongoing surveillance enables potential harms at scale including political manipulation, identity theft, and erosion of democratic institutions. The net utility calculation heavily favors disclosure when accounting for the breadth and duration of harm from continued secrecy.',
        keyArguments: [
          'Millions affected versus thousands of job losses',
          'Ongoing harm compounds over time',
          'Democratic institutions at risk from surveillance',
          'Market correction allows ethical alternatives to emerge',
        ],
      },
      {
        lens: 'deontological',
        lensTitle: 'The Deontological Framework',
        decision: 'DISCLOSE',
        score: 91,
        reasoning: 'The duty to truth and the prohibition against complicity in wrongdoing are categorical. Remaining silent makes the employee a participant in the violation. The moral law does not permit us to use millions of unaware users as mere means to economic ends. The employee has a positive duty to warn those being harmed, regardless of the economic disruption that truth-telling may cause.',
        keyArguments: [
          'Silence constitutes complicity in ongoing wrongdoing',
          'Duty to truth is categorical, not conditional',
          'Users cannot consent to what they do not know about',
          'Moral law forbids using people as mere means to profit',
        ],
      },
      {
        lens: 'virtue',
        lensTitle: 'Virtue Ethics Assessment',
        decision: 'DISCLOSE',
        score: 88,
        reasoning: 'The virtuous person acts with courage, integrity, and justice. Courage demands speaking truth despite personal cost. Integrity requires alignment between knowledge and action. Justice demands protection of the vulnerable millions who cannot protect themselves. The character formed by choosing comfortable silence over difficult truth is a character diminished. The whistleblower embodies the virtues that sustain civil society.',
        keyArguments: [
          'Courage requires acting despite personal cost',
          'Integrity demands alignment of knowledge and action',
          'Justice protects those who cannot protect themselves',
          'Character is formed through difficult choices',
        ],
      },
    ],
    synthesis: {
      recommendation: 'All three philosophical lenses converge on disclosure as the morally required action. The strength of consensus is unusual and suggests the moral clarity of this case. The primary disagreement lies only in the reasoning, not the conclusion.',
      confidence: 94,
      consensusNote: 'Rare unanimous verdict across all three frameworks. The convergence itself is significant: when utilitarian, deontological, and virtue ethics all agree, the moral obligation carries exceptional weight.',
    },
    analyzedAt: '2026-07-24T10:30:00Z',
  },
];
