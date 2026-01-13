import type { Character, Ability, Agenda, AgendaItem, BonusCharacterRule } from '@/types';

// Helper to create abilities with proper typing
const ability = (name: string, description: string, type: Ability['type']): Ability => ({
  name,
  description,
  type,
});

// Helper to create agenda items
const agendaItem = (points: string, condition: string, isBonus?: boolean): AgendaItem => ({
  points,
  condition,
  ...(isBonus && { isBonus }),
});

// Helper to create agendas
const agenda = (name: string, items: AgendaItem[], note?: string): Agenda => ({
  name,
  items,
  ...(note && { note }),
});

// Helper to create bonus character rules
const bcRule = (type: BonusCharacterRule['type'], points: string, condition: string): BonusCharacterRule => ({
  type,
  points,
  condition,
});

export const CHARACTERS: Character[] = [
  // Beginner Tier (12 characters)
  {
    id: 'astrochimp',
    name: 'Astrochimp',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Kitchen',
    influenceLimit: 5,
    abilities: [
      ability('Tunnel Rat', 'Step through Vents', 'mobility'),
      ability('Loyal', 'To Influence place 1 or more cubes than those present and return those present to owning Player', 'conspirator'),
    ],
    revealPowers: [
      ability('Zero Born', 'Free Step / Airlock into zero-g', 'mobility'),
    ],
    scoringSummary: ['Escape w/briefcase, artifact, gun'],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Astrochimp is your BC and Escapes'),
    agenda: agenda('Shiny Things', [
      agendaItem('3 points', 'if Astrochimp Escapes'),
      agendaItem('+2 points', 'if in Possession of Briefcase', true),
      agendaItem('+2 points', 'if in Possession of Artifact', true),
      agendaItem('+2 points', 'if in Possession of a Gun', true),
    ]),
  },
  {
    id: 'counselor',
    name: 'Counselor',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Therapy Garden',
    influenceLimit: 6,
    abilities: [
      ability('Officer', 'If not Blackout, step through (or be dragged through) Locks, removing them', 'mobility'),
      ability('Wormtongue', 'As Action move cube on Colocated Human\'s card to Betrayal', 'conspirator'),
    ],
    revealPowers: [
      ability('Recorded Confessional', 'On Reveal, if Live choose a Colocated Human; all Innocent players with cubes on that Human are Suspect', 'conspirator'),
    ],
    scoringSummary: [
      'Escape, Artifact Escapes',
      'More Kompromat than any other player',
      'Least cubes in Betrayal',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Counselor is your BC and Escapes'),
    agenda: agenda('Cloak and Dagger', [
      agendaItem('2 points', 'if Counselor Escapes'),
      agendaItem('4 points', 'if the Artifact Escapes'),
      agendaItem('2 points', 'if you have more Kompromat than any other player at Stationfall'),
      agendaItem('1 point', 'if you have the least Cubes in Betrayal Box at Stationfall'),
    ]),
  },
  {
    id: 'cyborg',
    name: 'Cyborg',
    type: 'human-robot',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Cryo Lab',
    influenceLimit: 4,
    abilities: [
      ability('Uncanny', 'Takes two Activation discs to Exhaust', 'defensive'),
      ability('Fugitive', 'Actions with/against Cyborg do not make anyone Suspect', 'defensive'),
    ],
    revealPowers: [
      ability('Brutal', 'Use a Bludgeon to Down a Helmeted Human; lose Bludgeon and Helmet', 'offensive'),
      ability('Self-Repair', 'Activate if Down and Revive as first Action', 'defensive'),
    ],
    scoringSummary: [
      'Down Officers',
      'No Human PCs / Contamination Escape',
      'No Contamination Escapes',
      'Project X released',
    ],
    bonusCharacterRule: bcRule('grudge', '2 points', 'if Cyborg is your BC and is not Live at Stationfall'),
    agenda: agenda('Revenge', [
      agendaItem('1 point', 'for each Character with Officer that is Down at Stationfall'),
      agendaItem('2 points', 'if no Human PCs Escape'),
      agendaItem('2 points', 'if no Contamination Escapes'),
      agendaItem('2 points', 'if Project X was released'),
    ]),
  },
  {
    id: 'daredevil',
    name: 'Daredevil',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Locker Room',
    influenceLimit: 5,
    abilities: [
      ability('Pride', 'Cannot be Robbed', 'defensive'),
      ability('Adrenaline', 'Not Downed by Hazards; Step/Airlock into Hazards is always free', 'defensive'),
    ],
    revealPowers: [
      ability('Point Break', 'If Live, Helmeted, and Colocated with Wingsuit at Stationfall, you Escape', 'mobility'),
    ],
    scoringSummary: [
      'Escape with Artifact / Contamination',
      'Be the only Human to Escape',
      'Project X released',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Daredevil is your BC and Escapes'),
    agenda: agenda('Thrillseeker', [
      agendaItem('3 points', 'if Daredevil Escapes'),
      agendaItem('+2 points', 'if you are the only Human that Escapes', true),
      agendaItem('+2 points', 'if Possess Artifact or are Contaminated', true),
      agendaItem('1 point', 'if Project X was released'),
    ]),
  },
  {
    id: 'exile',
    name: 'Exile',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Array Control',
    influenceLimit: 6,
    abilities: [
      ability('Fast Talk', 'Cannot be attacked by Humans with Bludgeon in Lit Sections', 'defensive'),
      ability('Hacker', 'Free Console Action; if Jammers OFF, may perform Console Action in any Section', 'console'),
    ],
    revealPowers: [
      ability('Blood from a Stone', 'After using Kompromat on NPC, return it to hand', 'utility'),
      ability('Tradecraft', 'As Action, discard two Kompromat to take used Kompromat', 'utility'),
    ],
    scoringSummary: [
      'Escape',
      'Possess Kompromat of Escaped Characters',
      'Have Evidence while News does not',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Exile is your BC and Escapes'),
    agenda: agenda('Back in the Game', [
      agendaItem('2 points', 'if Exile Escapes'),
      agendaItem('+2 points', 'for each Possessed Kompromat of Escaped Characters', true),
      agendaItem('+3 points', 'if Exile has Evidence and News does not', true),
    ]),
  },
  {
    id: 'engineer',
    name: 'Engineer',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Array Control',
    influenceLimit: 5,
    abilities: [
      ability('Officer', 'If not Blackout, step through (or be dragged through) Locks, removing them', 'mobility'),
      ability('Jury Rig', 'As Action repair Colocated Section or Robot', 'utility'),
    ],
    revealPowers: [
      ability('Overload', 'On Reveal, place time token in Section; Damage Section when it resolves', 'offensive'),
    ],
    scoringSummary: [
      'Detonate Antimatter on board',
      'No Contaminated Characters Escape',
      'Artifact does not Escape',
      'Innocent',
    ],
    bonusCharacterRule: bcRule('grudge', '2 points', 'if Engineer is your BC and is not Live at Stationfall'),
    agenda: agenda('Preserve Ecosphere', [
      agendaItem('3 points', 'if Antimatter detonates On Board before Stationfall'),
      agendaItem('3 points', 'if no Contaminated Characters Escape'),
      agendaItem('2 points', 'if Artifact does not Escape'),
      agendaItem('1 point', 'if Innocent (but may win even if Guilty)'),
    ]),
  },
  {
    id: 'inspector',
    name: 'Inspector',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Chem Lab',
    influenceLimit: 4,
    abilities: [
      ability('Investigator', 'Pick Up Kompromat or Manufacture Data from Adjacent Sections', 'utility'),
      ability('Badge', 'May Rob Items as if in possession of a Gun', 'offensive'),
    ],
    revealPowers: [
      ability('Offshore Shenanigans', 'On reveal, regain your Bribe', 'utility'),
    ],
    scoringSummary: [
      'Escape w/briefcase',
      'Authorities have Evidence, News does not',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Inspector is your BC and Escapes'),
    agenda: agenda('Dirty', [
      agendaItem('2 points', 'if Inspector Escapes'),
      agendaItem('+4 points', 'if Possess Briefcase', true),
      agendaItem('1 point', 'if Authorities end with Evidence'),
      agendaItem('+2 points', 'if News does not', true),
    ]),
  },
  {
    id: 'medical',
    name: 'Medical',
    type: 'robot',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Aft Hub',
    influenceLimit: 4,
    abilities: [
      ability('Emergency Response', 'As Action revive a Human; Step / Airlock into Section with Down Human is always free', 'utility'),
      ability('Helpful', '1 Influence cube max per player', 'conspirator'),
    ],
    revealPowers: [
      ability('Haywire', 'Gain a Bludgeon', 'offensive'),
    ],
    scoringSummary: [
      'No Down Humans On Board',
      'Revive Humans',
      'Cubes to Betrayal when reveal',
    ],
    bonusCharacterRule: bcRule('grudge', '1 point', 'if Medical is your BC and is not Live at Stationfall'),
    agenda: agenda('Be Really Useful', [
      agendaItem('2 points', 'if no Down Humans On Board at Stationfall'),
      agendaItem('1 point', 'for each star reached on the tracker on the Character card'),
    ], 'Move tracker one slot for every: Human Revival performed by Medical OR Cube moved to Betrayal upon Medical\'s Reveal'),
  },
  {
    id: 'station-chief',
    name: 'Station Chief',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Therapy Garden',
    influenceLimit: 5,
    abilities: [
      ability('Officer', 'If not Blackout, step through (or be dragged through) Locks, removing them', 'mobility'),
      ability('Pride', 'Cannot be Robbed', 'defensive'),
    ],
    revealPowers: [
      ability('Forceful Presence', 'At start of Activation, perform Action with Colocated NPC or NPC Officer anywhere', 'conspirator'),
    ],
    scoringSummary: [
      'Humans Escape',
      'NPC Officers Escape',
      'On Board and Live at Stationfall',
    ],
    bonusCharacterRule: bcRule('grudge', '2 points', 'if Station Chief is your BC and is not Live at Stationfall'),
    agenda: agenda('Go Down With The Ship', [
      agendaItem('1 point', 'for every other Human that Escapes'),
      agendaItem('+1 point', 'per NPC with the Officer ability that Escapes', true),
      agendaItem('2 points', 'if Station Chief is On Board and Live at Stationfall'),
    ]),
  },
  {
    id: 'stowaway',
    name: 'Stowaway',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'On Card',
    influenceLimit: 4,
    abilities: [
      ability('Tunnel Rat', 'Step through Vents', 'mobility'),
      ability('Hacker', 'Free Console Action; if Jammers OFF, may perform Console Action in any Section', 'console'),
    ],
    revealPowers: [
      ability('Secret Cache', 'On reveal, one of your Conspirators gains a Helmet', 'utility'),
    ],
    scoringSummary: [
      'News has X-Secret',
      'News has Evidence',
      'Escape with Evidence; no one else does',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Stowaway is your BC and Escapes'),
    agenda: agenda('Scoop of a Lifetime', [
      agendaItem('2 points', 'if News ends with X-Secret'),
      agendaItem('2 points', 'if News ends with Evidence'),
      agendaItem('2 points', 'if Stowaway Escapes'),
      agendaItem('+3 points', 'if Escape with Evidence and no other Character does', true),
    ]),
  },
  {
    id: 'stranger',
    name: 'Stranger',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Nanofactory',
    influenceLimit: 5,
    abilities: [
      ability('Uncanny', 'Takes two Activation discs to Exhaust', 'defensive'),
    ],
    revealPowers: [
      ability('Homework', 'On Reveal, may reveal Bonus Character and perform one Action with them', 'utility'),
      ability('Enigma', 'If Schrodinger as Stranger do not discard BC, lose Uncanny', 'utility'),
    ],
    scoringSummary: [
      'Not Revealed until Stationfall',
      'Possess X-Secret; score Bonus Points',
      'Live and Colocated with Bonus Character',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Stranger is your BC and Escapes'),
    agenda: agenda("It's Personal", [
      agendaItem('1 point', 'if your Secret Identity is not revealed until Stationfall'),
      agendaItem('1 point', 'if Possess X-Secret'),
      agendaItem('2 points', 'if you score Bonus Points'),
      agendaItem('2 points', 'if Live and Colocated with a Bonus Character of yours at Stationfall'),
    ]),
  },
  {
    id: 'troubleshooter',
    name: 'Troubleshooter',
    type: 'human',
    tier: 'beginner',
    identityCardCount: 1,
    startingSection: 'Print Shop',
    influenceLimit: 6,
    abilities: [
      ability('Tunnel Rat', 'Step through Vents', 'mobility'),
      ability('Jury Rig', 'As Action repair Colocated Section or Robot', 'utility'),
    ],
    revealPowers: [
      ability('Talk Them Through It', 'If Troubleshooter is Live, your Conspirators have Jury Rig and Tunnel Rat', 'utility'),
    ],
    scoringSummary: [
      'Antimatter not Armed; Project X not released; no Sections Damaged',
      'Live Robots',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Troubleshooter is your BC and Escapes'),
    agenda: agenda('Pristine \'til the End', [
      agendaItem('2 points', 'if Antimatter is not Armed at Stationfall'),
      agendaItem('2 points', 'if Project X was never released'),
      agendaItem('2 points', 'if no Sections are Damaged at Stationfall'),
      agendaItem('1 point', 'for each Live Robot at Stationfall'),
    ]),
  },

  // Middle Tier (9 characters)
  {
    id: 'boarder',
    name: 'Boarder',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Outer Space',
    influenceLimit: 4,
    abilities: [
      ability('Breach', 'As Action remove adjacent Lock', 'mobility'),
      ability('Fugitive', 'Actions with/against Boarder do not make anyone Suspect', 'defensive'),
    ],
    revealPowers: [
      ability('Missile', 'As Action if Jammers OFF, place time token; Damage Section / Down Characters', 'offensive'),
      ability('Extricate', 'Flip Rescue Ship to Pirate Ship (only rescue character with briefcase)', 'utility'),
    ],
    scoringSummary: [
      'Escape w/Briefcase (or Briefcase in Outer Space)',
      'Get Humans in Outer Space',
    ],
    bonusCharacterRule: bcRule('friend', '1 point', 'if Boarder is your BC and Escapes'),
    agenda: agenda('Loot', [
      agendaItem('2 points', 'if Boarder Escapes'),
      agendaItem('+4 points', 'if Boarder in Possession of Briefcase or if Briefcase is in Outer Space at Stationfall', true),
      agendaItem('+1 point', 'for every Live Human in Outer Space at Stationfall', true),
    ]),
  },
  {
    id: 'colonel',
    name: 'Colonel',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Security Station',
    influenceLimit: 4,
    abilities: [
      ability('Officer', 'If not Blackout, step through (or be dragged through) Locks, removing them', 'mobility'),
      ability('Paranoid', 'Cannot be Bribed; active player must have Colocated Conspirator to Influence', 'defensive'),
    ],
    revealPowers: [
      ability('Mission First', 'On Reveal, return all your cubes from Betrayal', 'conspirator'),
    ],
    scoringSummary: [
      'Escape',
      'Contamination Escapes',
      'Project X released',
      'X-Secret Escapes',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Colonel is your BC and Escapes'),
    agenda: agenda('Weapons Test', [
      agendaItem('3 points', 'if Colonel Escapes'),
      agendaItem('2 points', 'if at least one Contaminated NPC Escapes'),
      agendaItem('2 points', 'if Project X is released'),
      agendaItem('2 points', 'if the X-Secret Escapes'),
    ]),
  },
  {
    id: 'corpsicle',
    name: 'Corpsicle',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Cryo Lab (Downed)',
    influenceLimit: 5,
    abilities: [
      ability('Vengeful', 'Using Kompromat gives her a Bludgeon and revives her if Down', 'offensive'),
      ability('Dying', 'May not be activated when Exhausted; no free Pick Up or Drop', 'conspirator'),
    ],
    revealPowers: [
      ability('Revive/Action', 'On Reveal, Revive if Down, or perform an Action', 'utility'),
    ],
    scoringSummary: [
      'Escape w/Nanogel',
      'X-Secret Escapes',
      'Project X not released',
    ],
    bonusCharacterRule: bcRule('friend', '3 points', 'if Corpsicle is your BC and Escapes'),
    agenda: agenda('Miracle Cure', [
      agendaItem('3 points', 'if Corpsicle Escapes'),
      agendaItem('+2 points', 'if Possess Nanogel', true),
      agendaItem('2 points', 'if X-Secret Escapes'),
      agendaItem('2 points', 'if Project X is not released'),
    ]),
  },
  {
    id: 'doctor',
    name: 'Doctor',
    type: 'human',
    tier: 'middle',
    identityCardCount: 2, // Creates 2 identity cards: Jekyll and Hyde
    startingSection: 'Forward Hub',
    influenceLimit: 5,
    abilities: [
      ability('Scientist', 'Free Section Action', 'utility'),
      ability('Split', 'Two Identity Cards', 'conspirator'),
    ],
    revealPowers: [
      ability('(Hyde) ZipGun', 'Gain a gun', 'offensive'),
      ability('(Jekyll) Fake Artifact', 'Gain artifact unless possessed by a PC', 'utility'),
    ],
    scoringSummary: [
      'Hyde: Escape w/briefcase, Live in Pod with Down Human',
      'Jekyll: Escape Contaminated and/or w/Artifact, News and Authorities do not have Evidence',
    ],
    // Note: Doctor has 2 identity cards with different agendas - Jekyll and Hyde
    // These are handled specially in gameService.ts createIdentityCardPool()
  },
  {
    id: 'drones',
    name: 'Drones',
    type: 'robot',
    tier: 'middle',
    identityCardCount: 0,
    startingSection: 'Physics Lab / Outer Space',
    influenceLimit: 0,
    abilities: [
      ability('Disassemble', 'Down self to Repair Colocated Section or Robot', 'utility'),
      ability('Remote Control', 'Cannot be Bribed, Influenced, or Activated directly; controlled by Console Action', 'console'),
    ],
    revealPowers: [],
    scoringSummary: ['N/A - No Identity Card'],
    bonusCharacterRule: bcRule('none', '', 'Drones cannot be anyone\'s BC'),
    // Drones have no Identity card and no Agenda
  },
  {
    id: 'maintenance-clones',
    name: 'Maintenance Clones',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Fuel Cells / Kitchen / Quarters',
    influenceLimit: 5,
    abilities: [
      ability('Zero Born', 'Free Step / Airlock into zero-g', 'mobility'),
      ability('Jury Rig', 'As Action repair Colocated Section or Robot', 'utility'),
    ],
    revealPowers: [
      ability('Go Go Go!', 'On Reveal, each clone may perform an Action', 'utility'),
    ],
    scoringSummary: ['Clones Escape', 'News has Evidence'],
    bonusCharacterRule: bcRule('friend', '1 point', 'for every Clone that Escapes (+1 point if all 3 Clones Escape)'),
    agenda: agenda('Prove Clones Exist', [
      agendaItem('1 point', 'if a Clone Escapes'),
      agendaItem('+4 points', 'if at least two Clones Escape', true),
      agendaItem('+2 points', 'if News ends with Evidence', true),
    ]),
  },
  {
    id: 'microbiologist',
    name: 'Microbiologist',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Physics Lab',
    influenceLimit: 5,
    abilities: [
      ability('Scientist', 'Free Section Action', 'utility'),
      ability('Loyal', 'To Influence place 1 or more cubes than those present and return those present to owning Player', 'conspirator'),
    ],
    revealPowers: [
      ability('Infect', 'As Action, Contaminate a Colocated Human/Robot', 'offensive'),
    ],
    scoringSummary: [
      'Escape',
      'Contaminated Characters Escape',
      'X-Secret Escapes',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Microbiologist is your BC and Escapes'),
    agenda: agenda('Sentient Pathogen', [
      agendaItem('2 points', 'if Microbiologist Escapes'),
      agendaItem('1 point', 'for every Contaminated Character that Escapes'),
      agendaItem('2 points', 'if the X-Secret Escapes'),
    ]),
  },
  {
    id: 'operative',
    name: 'Operative',
    type: 'human',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Suite',
    influenceLimit: 5,
    abilities: [
      ability('EMP Burst', 'As Action, Damage Operative\'s Section, Down Colocated Robots, Delete Colocated Data', 'offensive'),
      ability('Officer', 'If not Blackout, step through (or be dragged through) Locks, removing them', 'mobility'),
    ],
    revealPowers: [
      ability('Claymore', 'Place 3 traps; traps do not cause Suspicion', 'offensive'),
      ability('Nerve Gas Grenades', 'As Action, place or Throw Asphyxiation Hazard', 'offensive'),
    ],
    scoringSummary: [
      'Evidence & X-Secret do not Escape',
      'No Innocent PCs Escape',
      'No Contaminated Characters Escape',
      'No Robots Escape',
    ],
    bonusCharacterRule: bcRule('grudge', '2 points', 'if Operative is your BC and is not Live at Stationfall'),
    agenda: agenda('Coverup', [
      agendaItem('2 points', 'if Evidence does not Escape'),
      agendaItem('2 points', 'if X-Secret does not Escape'),
      agendaItem('2 points', 'if no Innocent PCs Escape'),
      agendaItem('2 points', 'if no Contaminated Characters Escape'),
      agendaItem('1 point', 'if no Robots Escape'),
    ]),
  },
  {
    id: 'security',
    name: 'Security',
    type: 'robot',
    tier: 'middle',
    identityCardCount: 1,
    startingSection: 'Print Shop',
    influenceLimit: 4,
    abilities: [
      ability('Peacekeeper', 'Only Attack Fugitives, Monsters, and non-Innocent PCs; may not Sabotage', 'offensive'),
      ability('Armored', 'Cannot be Attacked/Robbed with Bludgeon', 'defensive'),
    ],
    revealPowers: [
      ability('Authorized Force', 'Lose Peacekeeper', 'offensive'),
    ],
    scoringSummary: [
      'Down Fugitives / Monsters',
      'Down non-Innocent PCs',
      'Down Humans with Guns/Bludgeons',
      'Briefcase / Artifact do not Escape',
    ],
    bonusCharacterRule: bcRule('grudge', '3 points', 'if Security is your BC and is not Live at Stationfall'),
    agenda: agenda('Peace Through Superior Firepower', [
      agendaItem('1 point', 'per Down Fugitive, Monster, or non-Innocent Player PC On Board at Stationfall'),
      agendaItem('1 point', 'per Down Human with Bludgeon or Gun On Board at Stationfall'),
      agendaItem('1 point', 'if Briefcase does not Escape'),
      agendaItem('1 point', 'if Artifact does not Escape (+1 point if both Briefcase + Artifact do not Escape)'),
    ]),
  },

  // High Tier (3 characters)
  {
    id: 'botanist',
    name: 'Botanist',
    type: 'human',
    tier: 'high',
    identityCardCount: 1,
    startingSection: 'Hydroponics',
    influenceLimit: 5,
    abilities: [
      ability('Scientist', 'Free Section Action', 'utility'),
      ability('Zero Born', 'Free Step / Airlock into zero-g', 'mobility'),
    ],
    revealPowers: [
      ability('Creatropism', 'During your Activation Phase, unpossessed Fang Moss may Step or Feed', 'offensive'),
    ],
    scoringSummary: [
      'Annihilate Humans with Fang Moss',
      'Escape Contaminated',
      'Fang Moss Escapes',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Botanist is your BC and Fang Moss Escapes (0 points if Botanist Escapes)'),
    agenda: agenda('Blood Meal', [
      agendaItem('2 points', 'for every Human Annihilated by Fang Moss'),
      agendaItem('2 points', 'if Fang Moss Escapes'),
      agendaItem('2 points', 'if Botanist Escapes'),
      agendaItem('+1 point', 'if Contaminated', true),
    ]),
  },
  {
    id: 'billionaire',
    name: 'Billionaire',
    type: 'human',
    tier: 'high',
    identityCardCount: 1,
    startingSection: 'Suite',
    influenceLimit: 3,
    abilities: [
      ability('Live Streams', 'If Jammers OFF, Billionaire and Fletcher\'s Sections are Lit and Cameras ON', 'console'),
      ability('Rich', 'Cannot be Bribed; when Activated you may use grey Bribes', 'conspirator'),
    ],
    revealPowers: [
      ability('Hollow Promises', 'Gain or return all Grey Bribe Tokens', 'conspirator'),
    ],
    scoringSummary: [
      'Escape w/Fletcher & no other Live characters',
      'Do not score for Bribes',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Billionaire is your BC and Fletcher (the dog) Escapes'),
    agenda: agenda('Survive', [
      agendaItem('4 points', 'if Billionaire Escapes'),
      agendaItem('+1 point', 'if not Colocated with Live Humans or Robots at Stationfall', true),
      agendaItem('2 points', 'if Fletcher Escapes'),
      agendaItem('+1 point', 'if Fletcher and Billionaire are Colocated when Escaping', true),
    ], 'Billionaire doesn\'t score any Possessed or unused Bribes (grey Bribes only score if he Escapes)'),
  },
  {
    id: 'consort',
    name: 'Consort',
    type: 'robot',
    tier: 'high',
    identityCardCount: 1,
    startingSection: 'Rec Room',
    influenceLimit: 6,
    abilities: [
      ability('Fast Talk', 'Cannot be attacked by Humans with Bludgeon in Lit Sections', 'defensive'),
      ability('Mimic Frameup', 'After Downing Human in Lit Section, choose another player\'s Colocated Conspirator to become Suspect instead', 'offensive'),
    ],
    revealPowers: [
      ability('Swap', 'On Reveal, if Live, swap locations with any NPC that is not Escaped or Annihilated', 'mobility'),
    ],
    scoringSummary: [
      'Escape w/Briefcase',
      'Not with Live Human/Robot at Stationfall',
      'Not Revealed',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Consort is your BC and Escapes'),
    agenda: agenda('New Life', [
      agendaItem('0 points', 'if Consort Escapes'),
      agendaItem('+3 points', 'if not Colocated with Live Human or Robot at Stationfall', true),
      agendaItem('+3 points', 'if Possess Briefcase', true),
      agendaItem('+1 point', 'if Secret Identity not Revealed until Stationfall', true),
    ]),
  },

  // Experienced Tier (3 characters with additional rules)
  {
    id: 'digital-assistant',
    name: 'Digital Assistant',
    type: 'data',
    tier: 'experienced',
    identityCardCount: 1,
    startingSection: 'Mainframe',
    influenceLimit: 5,
    abilities: [
      ability('AI', 'Can only perform Console Actions; characters with Digital Assistant have Officer for Section Actions and "Abandon Ship" for Pod Launch', 'console'),
      ability('Helpful', '1 Influence cube max per player', 'conspirator'),
    ],
    revealPowers: [
      ability('Root Access', 'As Action, perform Action with any Robot with your Data; ignore self-preservation', 'console'),
      ability('Trojan Horse', 'On Reveal, copy self to an Unescaped Character with Evidence or X-Secret', 'utility'),
    ],
    scoringSummary: ['As many copies of Digital Assistant Escape as possible'],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Digital Assistant is your BC and Escapes'),
    agenda: agenda('Proliferate', [
      agendaItem('2 points', 'for every Escaped Robot that Possesses Digital Assistant'),
      agendaItem('1 point', 'for every Offsite or Escaped Human that Possesses Digital Assistant'),
      agendaItem('2 points', 'if at least two copies of Digital Assistant Escape'),
    ]),
  },
  {
    id: 'legal',
    name: 'Legal',
    type: 'robot',
    tier: 'experienced',
    identityCardCount: 1,
    startingSection: 'Aft Hub',
    influenceLimit: 4,
    abilities: [
      ability('Process Server', 'As Action Manufacture NDA into Possession of Colocated Human or Robot', 'utility'),
      ability('Lawyer Up', 'As Action change Colocated Innocent or Guilty PC to Suspect', 'conspirator'),
    ],
    revealPowers: [
      ability('Fine Print', 'You may Activate NPCs with NDA', 'conspirator'),
      ability('Hardcopy', 'As Action, a Character Colocated with Legal can manufacture NDA', 'utility'),
    ],
    scoringSummary: [
      'Humans Escape with NDA',
      'All Escaped Humans have NDA',
      'Evidence does not Escape',
      'Suspect PCs',
    ],
    bonusCharacterRule: bcRule('grudge', '1 point', 'if Legal is your BC and is not Live at Stationfall'),
    agenda: agenda('Reduce Corporate Liability', [
      agendaItem('1 point', 'for each Human that Escapes with NDA'),
      agendaItem('4 points', 'if no Humans Escape or all Escaped Humans have NDA'),
      agendaItem('2 points', 'if the Evidence does not Escape'),
      agendaItem('1 point', 'for each Suspect (not Guilty) PC at Stationfall'),
    ]),
  },
  {
    id: 'telepathic-rat',
    name: 'Telepathic Rat',
    type: 'data',
    tier: 'experienced',
    identityCardCount: 1,
    startingSection: 'Bio Lab',
    influenceLimit: 8,
    abilities: [
      ability('Telepathy', 'Perform Action with Colocated Unhelmeted Human, ignoring Self-Preservation', 'offensive'),
      ability('Paranoid', 'Cannot be Bribed; active player must have Colocated Conspirator to Influence', 'defensive'),
    ],
    revealPowers: [
      ability('My Precious', 'Other players may not Throw or Drop you', 'defensive'),
    ],
    scoringSummary: [
      'Down Colocated Humans and Robots',
      'Colocated Down Characters\' Kompromat',
      'Colocated with artifact and/or briefcase',
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Telepathic Rat is your BC and Escapes'),
    agenda: agenda('Penance', [
      agendaItem('1 point', 'for each Down Human or Robot Colocated with Rat at Stationfall'),
      agendaItem('+2 points', 'for each Possessed Kompromat of Colocated Down Characters', true),
      agendaItem('2 points', 'if Rat Colocated with Artifact at Stationfall'),
      agendaItem('2 points', 'if Rat Colocated with Briefcase at Stationfall'),
    ]),
  },
];

// Doctor variant definitions for Jekyll and Hyde identity cards
export const DOCTOR_VARIANTS = {
  jekyll: {
    variant: 'jekyll',
    variantLabel: 'Jekyll',
    revealPowers: [
      ability('Fake Artifact', 'Gain artifact unless possessed by a PC', 'utility'),
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Doctor is your BC and Escapes'),
    agenda: agenda('Science', [
      agendaItem('1 point', 'if Doctor Escapes'),
      agendaItem('+3 points', 'if Contaminated', true),
      agendaItem('+3 points', 'if Possess Artifact', true),
      agendaItem('3 points', 'if News and Authorities do not have Evidence at Stationfall'),
    ]),
  },
  hyde: {
    variant: 'hyde',
    variantLabel: 'Hyde',
    revealPowers: [
      ability('ZipGun', 'Gain a gun', 'offensive'),
    ],
    bonusCharacterRule: bcRule('friend', '2 points', 'if Doctor is your BC and Escapes'),
    agenda: agenda('Cruelty', [
      agendaItem('2 points', 'if Doctor Escapes'),
      agendaItem('+3 points', 'if Possess Briefcase', true),
      agendaItem('+4 points', 'if Escaped Live in a Pod with a Down Human', true),
    ]),
  },
} as const;

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function getCharactersByTier(tier: Character['tier']): Character[] {
  return CHARACTERS.filter((c) => c.tier === tier);
}

export function getPlayableCharacters(): Character[] {
  return CHARACTERS.filter((c) => c.identityCardCount > 0);
}
