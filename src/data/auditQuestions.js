export const AUDIT_QUESTIONS = [
  {
    id: 1,
    category: '1. Lead Sharing & Portal Costs',
    question: 'When you buy buyer leads from property portals, what is your biggest headache?',
    iconType: 'coins',
    options: [
      {
        id: 'q1-o1',
        text: 'Portals sell the exact same buyer number to 4 to 5 other channel partners at the same time.',
        riskPoints: 2,
      },
      {
        id: 'q1-o2',
        text: 'Lead prices keep rising every month, but buyer quality keeps dropping.',
        riskPoints: 1,
      },
      {
        id: 'q1-o3',
        text: 'We get exclusive, direct inquiries that no other property firm gets.',
        riskPoints: 0,
      },
    ],
    eyeOpener: "When you don't have your own website, you pay full price for shared leads.",
    insight:
      'Shared portal leads trigger aggressive price wars among channel partners. When you own your digital gateway, every inquiry is 100% exclusive to your advisory team.',
    keyMetric: 'Shared vs. Exclusive Lead Pipeline',
  },
  {
    id: 2,
    category: '2. The Client Diversion Trap',
    question: 'When a client asks you: "Can you show me 2 or 3 more project options in this area?", what do you do?',
    iconType: 'users',
    options: [
      {
        id: 'q2-o1',
        text: 'We send builder brochures or PDFs on WhatsApp. (Then the client searches Google and calls another advisor).',
        riskPoints: 2,
      },
      {
        id: 'q2-o2',
        text: 'We tell them project names verbally over the phone.',
        riskPoints: 1,
      },
      {
        id: 'q2-o3',
        text: 'We send our own branded website link with all local projects, so the client stays only with us.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'If you send buyers PDFs, they end up on portals and buy through another agent.',
    insight:
      'Sending generic builder names or heavy PDFs prompts buyers to search Google directly, where competing brokers’ ads intercept them. An owned platform keeps buyers locked in your brand environment.',
    keyMetric: 'Client Retention & Containment',
  },
  {
    id: 3,
    category: '3. Old Database & Retargeting Power',
    question: 'You already have hundreds or thousands of old buyer leads in your phone or CRM. When a new launch comes, how do you pitch them?',
    iconType: 'database',
    options: [
      {
        id: 'q3-o1',
        text: 'We spend heavy money again to buy fresh portal packages or run new Meta ads.',
        riskPoints: 2,
      },
      {
        id: 'q3-o2',
        text: 'We send plain text or images on WhatsApp (low response, many numbers report spam).',
        riskPoints: 1,
      },
      {
        id: 'q3-o3',
        text: 'We send our website launch link, track who clicked, and call only the hot, interested buyers.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Your past 5,000+ leads can generate new bookings at zero ad cost if you send them to your own website.',
    insight:
      'Your historical contact database is your highest ROI asset. Interactive project pages let you track which past clients are actively exploring floor plans without intrusive cold calls.',
    keyMetric: 'CRM Database Monetization',
  },
  {
    id: 4,
    category: '4. Google Search & Micro-Market Control',
    question: 'When a buyer searches on Google: "Best 2 BHK in [Your Area]", whose name appears first?',
    iconType: 'search',
    options: [
      {
        id: 'q4-o1',
        text: 'Big national portals take all the traffic, our firm is nowhere to be seen.',
        riskPoints: 2,
      },
      {
        id: 'q4-o2',
        text: 'Only builders running paid ads.',
        riskPoints: 1,
      },
      {
        id: 'q4-o3',
        text: 'Our website ranks on Google, bringing us direct inquiries every single week on autopilot.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Local SEO on your own website gives you daily organic leads without spending on ads.',
    insight:
      'Hyperlocal SEO for specific micro-markets allows specialized advisory firms to consistently capture high-intent organic buyers.',
    keyMetric: 'Organic Search Authority',
  },
  {
    id: 5,
    category: '5. Paid Ad Waste (Meta / Facebook Ads)',
    question: 'When you run Facebook or Instagram ads, where do the buyers land?',
    iconType: 'megaphone',
    options: [
      {
        id: 'q5-o1',
        text: 'A simple instant lead form (lots of fake numbers, students, and invalid inquiries).',
        riskPoints: 2,
      },
      {
        id: 'q5-o2',
        text: 'Directly to WhatsApp (costs stay high and tracking who visited is difficult).',
        riskPoints: 1,
      },
      {
        id: 'q5-o3',
        text: 'Our high-speed property website (buyers check floor plans, see project details, and submit genuine site-visit requests).',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Dedicated website project landing pages filter out fake numbers and double ad ROI.',
    insight:
      'Native instant forms often suffer from high junk inquiries. High-converting dedicated property pages qualify buyer intent with interactive layouts and price filters.',
    keyMetric: 'Ad Conversion & Lead Quality',
  },
  {
    id: 6,
    category: '6. Micro-Market Dominance & Brand Respect',
    question: 'Do property buyers in your focus area recognize your firm as the #1 trusted local expert?',
    iconType: 'shield',
    options: [
      {
        id: 'q6-o1',
        text: 'No, buyers treat us just like any other normal broker who calls them.',
        riskPoints: 2,
      },
      {
        id: 'q6-o2',
        text: 'Somewhat, but only if they meet us face-to-face.',
        riskPoints: 1,
      },
      {
        id: 'q6-o3',
        text: 'Yes, because our professional website proves our scale, active listings, and market authority.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'High-net-worth buyers choose advisory firms with credible branded digital presence.',
    insight:
      'High-net-worth buyers expect an institutional-grade digital presence. A bespoke property website elevates your positioning from broker to premium micro-market real estate advisor.',
    keyMetric: 'Brand Credibility & Trust',
  },
  {
    id: 7,
    category: '7. Mobile Experience for Buyers',
    question: 'Can a buyer comfortably check project floor plans, amenities, and location maps from your firm on their mobile phone?',
    iconType: 'smartphone',
    options: [
      {
        id: 'q7-o1',
        text: 'No, they have to open heavy PDF files that fill up their phone memory.',
        riskPoints: 2,
      },
      {
        id: 'q7-o2',
        text: 'No, we send multiple WhatsApp images back and forth',
        riskPoints: 1,
      },
      {
        id: 'q7-o3',
        text: 'Yes, our mobile-friendly website opens instantly like an app with complete project details.',
        riskPoints: 0,
      },
    ],
    eyeOpener: '82% of property searches happen on mobile phones. Fast interactive websites drive 3x more site visits.',
    insight:
      'Over 80% of prime property discovery occurs on smartphones. Clunky PDFs create friction; responsive interactive catalogs accelerate site visit bookings.',
    keyMetric: 'Mobile UX & Speed-to-Visit',
  },
  {
    id: 8,
    category: '8. What Happens When You Stop Ad Spending?',
    question: 'If you pause your portal recharge and stop Facebook ads for 30 days, what happens to your lead pipeline?',
    iconType: 'pause-circle',
    options: [
      {
        id: 'q8-o1',
        text: 'Fresh inquiries immediately drop to absolute zero.',
        riskPoints: 2,
      },
      {
        id: 'q8-o2',
        text: 'We only get 1 or 2 occasional referrals from friends.',
        riskPoints: 1,
      },
      {
        id: 'q8-o3',
        text: 'Our website keeps bringing 4 to 5 organic buyer leads every day on auto-mode.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Rented portals stop delivering the moment you stop paying. Owned websites build compounding assets.',
    insight:
      '100% reliance on portal packages creates an expensive recurring dependency. An owned digital asset compounds over time, steadily producing organic inquiries.',
    keyMetric: 'Business Resilience & Asset Ownership',
  },
  {
    id: 9,
    category: '9. Developer & Builder Tie-Ups',
    question: 'When you approach top developers for exclusive mandates or high-slab channel partner payouts, what gives you the edge?',
    iconType: 'handshake',
    options: [
      {
        id: 'q9-o1',
        text: 'We just show our past booking track record on paper.',
        riskPoints: 2,
      },
      {
        id: 'q9-o2',
        text: 'We struggle to show them how we market differently from other agents.',
        riskPoints: 1,
      },
      {
        id: 'q9-o3',
        text: 'We show our branded digital platform and our active web traffic in the micro-market to demand premium terms.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Developers give exclusive mandates and higher brokerage slabs to digital-first partners.',
    insight:
      'Grade-A developers favor channel partners who bring dedicated micro-market marketing systems and digital distribution infrastructure.',
    keyMetric: 'Developer Mandate Negotiation Power',
  },
  {
    id: 10,
    category: '10. The Ultimate Growth Trigger',
    question: 'If your firm could fix just ONE cash-draining issue this month, which would create the biggest jump in your monthly profits and earnings?',
    iconType: 'target',
    options: [
      {
        id: 'q10-o1',
        text: 'Cut Lead Acquisition Costs: Stop paying monthly portal rents for non-exclusive leads and generate direct inquiries at half the cost.',
        riskPoints: 0,
      },
      {
        id: 'q10-o2',
        text: 'Zero Buyer Leakage: Give clients a reason to stay glued to our firm instead of browsing Google and closing with another local agent.',
        riskPoints: 0,
      },
      {
        id: 'q10-o3',
        text: 'Extract Bookings from Dead Data: Turn our silent CRM list of 5,000+ past buyers into fresh site visits every time a new project launches.',
        riskPoints: 0,
      },
    ],
    eyeOpener: 'Customizing your digital infrastructure around your primary goal cuts customer acquisition cost by up to 60%.',
    insight:
      'Identifying your primary quarterly objective allows us to tailor an actionable implementation roadmap specifically geared toward stopping lead leakage and increasing site visits.',
    keyMetric: 'Quarterly Strategic Alignment',
  },
];

export const CRM_LEAD_OPTIONS = [
  'Select range',
  'Less than 1,000 leads',
  '1,000 to 5,000 leads',
  '5,000 to 10,000+ leads',
  '10,000+ leads',
];
