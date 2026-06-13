export const PHASES = [
  { id: 1, name: 'Foundation', months: '1–3', dailyMinutes: [15, 25], color: '#6366F1', description: 'Build core skills across all four subjects.' },
  { id: 2, name: 'Development', months: '4–6', dailyMinutes: [30, 45], color: '#0EA5E9', description: 'Expand knowledge and tackle harder question types.' },
  { id: 3, name: 'Consolidation', months: '7–9', dailyMinutes: [50, 65], color: '#10B981', description: 'Reinforce all topics with increasingly complex problems.' },
  { id: 4, name: 'Mastery', months: '10–12', dailyMinutes: [70, 90], color: '#F59E0B', description: 'Exam-style practice, time management and final preparation.' },
]

export const SUBJECTS = {
  maths:   { id: 'maths',   name: 'Maths',                color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE', icon: '∑' },
  english: { id: 'english', name: 'English',              color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', icon: 'Aa' },
  verbal:  { id: 'verbal',  name: 'Verbal Reasoning',     color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE', icon: 'VR' },
  nvr:     { id: 'nvr',     name: 'Non-Verbal Reasoning', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', icon: '◈' },
}

export const TOPICS = {
  maths: {
    1: [
      { id: 'place-value',     name: 'Place Value',     desc: '4-digit numbers, thousands, hundreds, tens, units' },
      { id: 'addition',        name: 'Addition',        desc: 'Adding 3- and 4-digit numbers' },
      { id: 'subtraction',     name: 'Subtraction',     desc: 'Subtracting 3- and 4-digit numbers' },
      { id: 'times-tables',    name: 'Times Tables',    desc: 'Multiplication tables 2–12' },
      { id: 'division',        name: 'Division',        desc: 'Basic division and remainders' },
      { id: 'fractions-intro', name: 'Fractions',       desc: 'Halves, quarters, thirds and eighths' },
      { id: 'shapes-2d',       name: '2D Shapes',       desc: 'Names, sides and angles of flat shapes' },
      { id: 'time',            name: 'Time',            desc: '12-hour and 24-hour clocks; duration' },
      { id: 'measurement',     name: 'Measurement',     desc: 'Length, mass and capacity conversions' },
      { id: 'money',           name: 'Money',           desc: 'Pounds, pence, change and totals' },
    ],
    2: [
      { id: 'large-numbers',       name: 'Large Numbers',       desc: 'Numbers up to 1,000,000; rounding' },
      { id: 'long-multiplication', name: 'Long Multiplication', desc: '2-digit × 2-digit and beyond' },
      { id: 'long-division',       name: 'Long Division',       desc: 'Dividing by 2-digit numbers' },
      { id: 'decimals',            name: 'Decimals',            desc: 'Tenths, hundredths; ordering and operations' },
      { id: 'fractions',           name: 'Fractions',           desc: 'Equivalent, comparing, adding and subtracting' },
      { id: 'percentages',         name: 'Percentages',         desc: 'Finding percentages of amounts' },
      { id: 'area-perimeter',      name: 'Area & Perimeter',    desc: 'Calculate area and perimeter of shapes' },
      { id: 'angles',              name: 'Angles',              desc: 'Types, measuring and angles in shapes' },
      { id: 'data-handling',       name: 'Data Handling',       desc: 'Charts, graphs and averages' },
      { id: 'word-problems',       name: 'Word Problems',       desc: 'Multi-step arithmetic problems' },
    ],
    3: [
      { id: 'ratio',                name: 'Ratio & Proportion',    desc: 'Sharing in a ratio; scaling up and down' },
      { id: 'algebra',              name: 'Algebra',               desc: 'Expressions, solving equations, sequences' },
      { id: 'negative-numbers',     name: 'Negative Numbers',      desc: 'Ordering; adding and subtracting' },
      { id: 'fractions-advanced',   name: 'Advanced Fractions',    desc: 'Multiply, divide, mixed numbers' },
      { id: 'percentages-advanced', name: 'Advanced Percentages',  desc: 'Percentage change; increase and decrease' },
      { id: 'speed-distance',       name: 'Speed, Distance & Time', desc: 'Formula and calculations' },
      { id: 'primes-factors',       name: 'Primes & Factors',      desc: 'Prime numbers, HCF, LCM' },
      { id: 'coordinates',          name: 'Coordinates',           desc: 'All four quadrants; plotting and reading' },
      { id: 'statistics',           name: 'Statistics',            desc: 'Mean, median, mode and range' },
      { id: 'complex-problems',     name: 'Multi-step Problems',   desc: 'Complex exam-style word problems' },
    ],
    4: [
      { id: 'algebra-advanced',  name: 'Advanced Algebra',   desc: 'Forming and solving equations; inequalities' },
      { id: 'geometry-advanced', name: 'Advanced Geometry',  desc: 'Circle properties, transformations' },
      { id: 'number-theory',     name: 'Number Theory',      desc: 'Powers, roots, prime factorisation' },
      { id: 'mixed-timed',       name: 'Timed Mixed',        desc: 'Mixed questions at exam speed' },
      { id: 'exam-maths',        name: 'Exam Practice',      desc: 'Full GL 11+ style maths paper' },
    ],
  },
  english: {
    1: [
      { id: 'parts-of-speech',    name: 'Parts of Speech',      desc: 'Nouns, verbs, adjectives, adverbs' },
      { id: 'sentences',          name: 'Sentences',            desc: 'Subject, verb, object; sentence types' },
      { id: 'punctuation-basic',  name: 'Basic Punctuation',    desc: 'Full stops, commas, question marks' },
      { id: 'plural-forms',       name: 'Plurals',              desc: 'Regular and irregular plurals' },
      { id: 'comprehension-basic',name: 'Comprehension',        desc: 'Finding information in short texts' },
      { id: 'spelling-patterns',  name: 'Spelling Patterns',    desc: 'Common spelling rules and patterns' },
      { id: 'prefixes-suffixes',  name: 'Prefixes & Suffixes',  desc: 'un-, re-, pre-, -ing, -ed, -ness, -ful' },
      { id: 'synonyms-basic',     name: 'Synonyms',             desc: 'Words with similar meanings' },
      { id: 'antonyms-basic',     name: 'Antonyms',             desc: 'Words with opposite meanings' },
      { id: 'vocabulary-basic',   name: 'Vocabulary',           desc: 'Word meanings and usage in context' },
    ],
    2: [
      { id: 'pronouns-adverbs',        name: 'Pronouns & Adverbs',   desc: 'Types, forms and correct usage' },
      { id: 'punctuation-advanced',    name: 'Advanced Punctuation', desc: 'Apostrophe, colon, semicolon, speech marks' },
      { id: 'comprehension-inference', name: 'Inference',            desc: 'Reading between the lines' },
      { id: 'word-families',           name: 'Word Families',        desc: 'Related words and roots' },
      { id: 'homophones',              name: 'Homophones',           desc: 'Words that sound alike but differ' },
      { id: 'conjunctions',            name: 'Conjunctions',         desc: 'Coordinating and subordinating conjunctions' },
      { id: 'tenses',                  name: 'Tenses',               desc: 'Past, present, future and perfect' },
      { id: 'figurative-language',     name: 'Figurative Language',  desc: 'Simile, metaphor, personification' },
      { id: 'vocabulary-medium',       name: 'Vocabulary Building',  desc: 'More complex word meanings' },
      { id: 'grammar-intermediate',    name: 'Grammar',              desc: 'Clauses, phrases, subject-verb agreement' },
    ],
    3: [
      { id: 'clauses',              name: 'Clauses',               desc: 'Main, subordinate and relative clauses' },
      { id: 'comprehension-author', name: "Author's Craft",        desc: "Author's intent, viewpoint and effect" },
      { id: 'persuasive-language',  name: 'Persuasive Language',   desc: 'Rhetorical devices and techniques' },
      { id: 'word-roots',           name: 'Word Roots',            desc: 'Greek and Latin roots' },
      { id: 'literary-devices',     name: 'Literary Devices',      desc: 'Alliteration, onomatopoeia, irony' },
      { id: 'vocabulary-advanced',  name: 'Advanced Vocabulary',   desc: 'Complex and literary words in context' },
      { id: 'active-passive',       name: 'Active & Passive Voice', desc: 'Transforming and identifying sentences' },
      { id: 'complex-grammar',      name: 'Complex Grammar',       desc: 'Conditionals, subjunctive, reported speech' },
    ],
    4: [
      { id: 'comprehension-exam', name: 'Exam Comprehension', desc: 'Full exam-style reading passages' },
      { id: 'vocabulary-exam',    name: 'Exam Vocabulary',    desc: 'High-level words in context' },
      { id: 'grammar-exam',       name: 'Exam Grammar',       desc: 'Mixed grammar and punctuation' },
      { id: 'mixed-english',      name: 'Mixed English',      desc: 'Timed mixed English questions' },
    ],
  },
  verbal: {
    1: [
      { id: 'odd-one-out',      name: 'Odd One Out',      desc: 'Find the word that does not belong' },
      { id: 'closest-meaning',  name: 'Closest Meaning',  desc: 'Find the word closest in meaning' },
      { id: 'opposite-meaning', name: 'Opposite Meaning', desc: 'Find the word most opposite in meaning' },
      { id: 'analogies',        name: 'Word Analogies',   desc: 'A is to B as C is to ?' },
      { id: 'number-sequences', name: 'Number Sequences', desc: 'Find the next number in the pattern' },
      { id: 'letter-sequences', name: 'Letter Sequences', desc: 'Find the next letter in the pattern' },
      { id: 'word-pairs',       name: 'Word Pairs',       desc: 'Find the word that links two groups' },
      { id: 'simple-codes',     name: 'Simple Codes',     desc: 'Decode words using basic letter codes' },
      { id: 'categories',       name: 'Categories',       desc: 'Group and classify words' },
      { id: 'complete-word',    name: 'Complete the Word', desc: 'Fill in missing letters' },
    ],
    2: [
      { id: 'hidden-words',      name: 'Hidden Words',      desc: 'Find a word hidden across two words' },
      { id: 'word-connections',  name: 'Word Connections',  desc: 'Find the word linking two groups' },
      { id: 'compound-words',    name: 'Compound Words',    desc: 'Join two words to form one' },
      { id: 'letter-codes',      name: 'Letter Codes',      desc: 'Letters shifted in the alphabet' },
      { id: 'number-patterns',   name: 'Number Patterns',   desc: 'Multiplication and mixed-rule sequences' },
      { id: 'alphabet-positions',name: 'Alphabet Positions',desc: 'Letters by position (A=1, B=2…)' },
      { id: 'anagrams',          name: 'Anagrams',          desc: 'Rearrange letters to make a word' },
      { id: 'two-letter-words',  name: 'Two-letter Words',  desc: 'Find two letters to complete both words' },
    ],
    3: [
      { id: 'complex-codes',      name: 'Complex Codes',    desc: 'Multi-rule letter encoding' },
      { id: 'number-letter-codes',name: 'Number-Letter Codes',desc: 'Mixed letter and number codes' },
      { id: 'complex-sequences',  name: 'Complex Sequences',desc: 'Alternating and multi-rule patterns' },
      { id: 'word-substitution',  name: 'Word Substitution',desc: 'Replace words using a given code' },
      { id: 'logical-deduction',  name: 'Logical Deduction',desc: 'Verbal logic and reasoning' },
      { id: 'mixed-vr',           name: 'Mixed Verbal',     desc: 'Mixed question types at higher difficulty' },
    ],
    4: [
      { id: 'advanced-codes', name: 'Advanced Codes',     desc: 'Complex multi-step codes' },
      { id: 'exam-verbal',    name: 'Exam Verbal',        desc: 'GL exam-style verbal reasoning' },
      { id: 'timed-verbal',   name: 'Timed Verbal',       desc: 'Timed verbal reasoning practice' },
    ],
  },
  nvr: {
    1: [
      { id: 'shape-properties',  name: 'Shape Properties', desc: 'Identify shapes by sides, angles and properties' },
      { id: 'odd-shape-out',     name: 'Odd One Out',      desc: 'Which shape does not belong?' },
      { id: 'shape-matching',    name: 'Shape Matching',   desc: 'Find the identical shape' },
      { id: 'simple-series',     name: 'Simple Series',    desc: 'What shape comes next?' },
      { id: 'symmetry',          name: 'Symmetry',         desc: 'Lines of symmetry in shapes' },
      { id: 'basic-rotation',    name: 'Rotation',         desc: 'Identify rotated shapes' },
      { id: 'shading-patterns',  name: 'Shading Patterns', desc: 'Spot the pattern in shading sequences' },
      { id: 'counting-features', name: 'Counting Features',desc: 'Count sides, corners, shapes within shapes' },
    ],
    2: [
      { id: 'shape-analogies', name: 'Shape Analogies', desc: 'A is to B as C is to ?' },
      { id: 'matrix-2x2',      name: '2×2 Matrix',      desc: 'Find the missing shape in a 2×2 grid' },
      { id: 'reflections',     name: 'Reflections',     desc: 'Find the mirror image' },
      { id: 'rotations-90',    name: 'Rotations',       desc: 'Rotate shapes by 90° and 180°' },
      { id: 'series-medium',   name: 'Series',          desc: 'Shape sequences with two changing rules' },
      { id: 'shape-codes',     name: 'Shape Codes',     desc: 'Match shape features to letter codes' },
    ],
    3: [
      { id: 'matrix-3x3',        name: '3×3 Matrix',             desc: 'Find the missing shape in a 3×3 grid' },
      { id: 'complex-series',    name: 'Complex Series',         desc: 'Multi-rule shape sequences' },
      { id: 'combined-transforms',name: 'Combined Transformations',desc: 'Rotation + reflection combined' },
      { id: 'abstract-reasoning',name: 'Abstract Reasoning',     desc: 'Complex pattern rules in shape sets' },
    ],
    4: [
      { id: 'advanced-matrix', name: 'Advanced Matrix', desc: 'Complex 3×3 matrices with multiple rules' },
      { id: 'exam-nvr',        name: 'Exam Style NVR',  desc: 'GL exam-style non-verbal questions' },
      { id: 'timed-nvr',       name: 'Timed NVR',       desc: 'Timed non-verbal reasoning practice' },
    ],
  },
}

export const getQuestionsPerSession = (phase, monthInPhase = 1) => {
  const p = PHASES[phase - 1]
  const [min, max] = p.dailyMinutes
  const frac = Math.max(0, Math.min(1, (monthInPhase - 1) / 2))
  const mins = Math.round(min + frac * (max - min))
  return Math.max(8, Math.floor(mins / 1.4))
}
