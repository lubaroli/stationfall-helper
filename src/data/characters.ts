import type { Character, Ability } from '@/types';

// Helper to create abilities with proper typing
const ability = (name: string, description: string, type: Ability['type']): Ability => ({
  name,
  description,
  type,
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
  },
  {
    id: 'doctor',
    name: 'Doctor',
    type: 'human',
    tier: 'middle',
    identityCardCount: 2,
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
  },
];

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function getCharactersByTier(tier: Character['tier']): Character[] {
  return CHARACTERS.filter((c) => c.tier === tier);
}

export function getPlayableCharacters(): Character[] {
  return CHARACTERS.filter((c) => c.identityCardCount > 0);
}
