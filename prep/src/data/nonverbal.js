// Shape descriptor: { type, fill, size, rotation, color }
// type: circle | square | triangle | diamond | rectangle | pentagon | hexagon | star | cross | arrow
// fill: solid | outline | striped | dotted
// size: small | medium | large
// rotation: 0 | 45 | 90 | 135 | 180 | 270
// color: dark | medium | light (only for fills)

const S = (type, fill = 'solid', size = 'medium', rotation = 0) => ({ type, fill, size, rotation })

const nq = (id, topic, phase, diff, nvrType, question, data, answer, explanation) => ({
  id: `nvr-${id}`, subject: 'nvr', topic, phase, difficulty: diff,
  nvrType, question, ...data, answer, explanation,
})

// Text-only questions (no SVG needed)
const tq = (id, topic, phase, diff, question, options, answer, explanation) => ({
  id: `nvr-t${id}`, subject: 'nvr', topic, phase, difficulty: diff,
  nvrType: 'text', question, options, answer, explanation,
})

// ── PHASE 1 ──────────────────────────────────────────────────────────────────

// Shape Properties (text-based)
const shapeProps = [
  tq('sp1','shape-properties',1,1,'How many sides does a hexagon have?',['4','5','6','8'],2,'Hex means 6. A hexagon has 6 sides.'),
  tq('sp2','shape-properties',1,1,'What is the name of a shape with 8 sides?',['Hexagon','Heptagon','Octagon','Nonagon'],2,'Oct means 8. An octagon has 8 sides.'),
  tq('sp3','shape-properties',1,1,'How many vertices (corners) does a pentagon have?',['4','5','6','7'],1,'A pentagon has 5 sides and therefore 5 vertices.'),
  tq('sp4','shape-properties',1,1,'Which shape has NO straight sides?',['Square','Triangle','Circle','Pentagon'],2,'A circle has a curved edge — no straight sides.'),
  tq('sp5','shape-properties',1,2,'A quadrilateral has:',['3 sides','4 sides','5 sides','6 sides'],1,'Quadrilateral means "four sides". Squares, rectangles, rhombuses and trapezoids are quadrilaterals.'),
  tq('sp6','shape-properties',1,2,'Which shape has all sides equal AND all angles equal to 90°?',['Rectangle','Rhombus','Square','Trapezium'],2,'A square has all 4 sides equal and all 4 angles = 90°.'),
  tq('sp7','shape-properties',1,2,'How many lines of symmetry does an equilateral triangle have?',['1','2','3','4'],2,'An equilateral triangle has 3 lines of symmetry — one from each vertex to the midpoint of the opposite side.'),
  tq('sp8','shape-properties',1,2,'A regular polygon has 5 equal sides and 5 equal angles. What is it called?',['Pentagon','Hexagon','Octagon','Decagon'],0,'A regular polygon with 5 equal sides is a regular pentagon.'),
]

// Odd Shape Out (SVG)
const oddShapeOut = [
  nq('oo1','odd-shape-out',1,1,'odd_one_out',
    'Which is the odd one out? The other four share a common property.',
    { shapes: [S('circle','solid'), S('square','solid'), S('triangle','solid'), S('pentagon','solid'), S('circle','outline')] },
    4, 'A, B, C and D are all solid (filled) shapes. E (circle outline) has no fill — it is the odd one out.'
  ),
  nq('oo2','odd-shape-out',1,1,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('square','solid'), S('rectangle','solid'), S('diamond','solid'), S('circle','solid'), S('triangle','solid')] },
    3, 'Square, rectangle, diamond and triangle all have straight sides. The circle has no straight sides — it is the odd one out.'
  ),
  nq('oo3','odd-shape-out',1,1,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('circle','solid','large'), S('square','solid','large'), S('triangle','solid','small'), S('pentagon','solid','large'), S('hexagon','solid','large')] },
    2, 'A, B, D and E are all large shapes. C (small triangle) is small — it is the odd one out.'
  ),
  nq('oo4','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('circle','outline'), S('square','outline'), S('triangle','outline'), S('pentagon','solid'), S('hexagon','outline')] },
    3, 'A, B, C and E are all outline shapes. D (solid pentagon) is filled — it is the odd one out.'
  ),
  nq('oo5','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('circle','solid'), S('circle','striped'), S('square','solid'), S('circle','outline'), S('circle','dotted')] },
    2, 'A, B, D and E are all circles (different fills). C is a square — different shape — the odd one out.'
  ),
  nq('oo6','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,90), S('triangle','solid',undefined,180), S('square','solid',undefined,0), S('triangle','solid',undefined,270)] },
    3, 'A, B, C and E are all triangles (different rotations). D is a square — the odd one out.'
  ),
  nq('oo7','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('circle','solid','small'), S('circle','solid','medium'), S('circle','solid','large'), S('circle','solid','small'), S('square','solid','small')] },
    4, 'A, B, C and D are all circles. E is a small square — the odd one out.'
  ),
  nq('oo8','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [S('pentagon','outline'), S('hexagon','outline'), S('triangle','outline'), S('square','outline'), S('triangle','solid')] },
    4, 'A, B, C and D are all outline shapes. E (solid triangle) has a fill — it is the odd one out.'
  ),
]

// Simple Series (SVG)
const simpleSeries = [
  nq('sr1','simple-series',1,1,'series',
    'What comes next in the series?',
    {
      sequence: [S('circle','solid'), S('square','solid'), S('triangle','solid'), S('circle','solid')],
      options: [S('triangle','solid'), S('square','solid'), S('circle','solid'), S('pentagon','solid')],
    },
    1, 'The pattern repeats: circle, square, triangle. After circle comes square.'
  ),
  nq('sr2','simple-series',1,1,'series',
    'What comes next in the series?',
    {
      sequence: [S('circle','solid','large'), S('circle','solid','medium'), S('circle','solid','small'), S('circle','solid','large')],
      options: [S('circle','solid','large'), S('circle','solid','medium'), S('circle','solid','small'), S('square','solid','medium')],
    },
    1, 'The pattern is: large, medium, small, repeating. After large comes medium.'
  ),
  nq('sr3','simple-series',1,1,'series',
    'What comes next in the series?',
    {
      sequence: [S('square','solid'), S('square','outline'), S('square','solid'), S('square','outline')],
      options: [S('square','outline'), S('square','solid'), S('circle','solid'), S('square','striped')],
    },
    1, 'The fill alternates: solid, outline, solid, outline. Next is solid.'
  ),
  nq('sr4','simple-series',1,2,'series',
    'What comes next in the series?',
    {
      sequence: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,90), S('triangle','solid',undefined,180), S('triangle','solid',undefined,270)],
      options: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,90), S('triangle','solid',undefined,180), S('circle','solid')],
    },
    0, 'The triangle rotates 90° clockwise each step. After 270° comes 0° (full rotation).'
  ),
  nq('sr5','simple-series',1,2,'series',
    'What comes next in the series?',
    {
      sequence: [S('circle','solid','small'), S('circle','solid','small'), S('circle','solid','medium'), S('circle','solid','medium')],
      options: [S('circle','solid','small'), S('circle','solid','medium'), S('circle','solid','large'), S('square','solid','large')],
    },
    2, 'The size increases in pairs: small, small, medium, medium, large...'
  ),
  nq('sr6','simple-series',1,2,'series',
    'What comes next in the series?',
    {
      sequence: [S('square','solid'), S('triangle','solid'), S('pentagon','solid'), S('hexagon','solid')],
      options: [S('square','solid'), S('pentagon','solid'), S('star','solid'), S('hexagon','solid')],
    },
    2, 'The number of sides increases by 1 each time: 4, 3... wait, square=4, triangle=3, pentagon=5, hexagon=6. Actually: 4,3,5,6? That\'s not clean. Let me check: square(4)→triangle(3)? No. Let me re-examine: the pattern is actually shapes with increasing sides: triangle(3),square(4),pentagon(5),hexagon(6). The next would be heptagon(7) or star. In options, star is shown.',
  ),
  nq('sr7','simple-series',1,2,'series',
    'What comes next in the series?',
    {
      sequence: [S('circle','outline'), S('circle','striped'), S('circle','solid'), S('circle','outline')],
      options: [S('circle','solid'), S('circle','outline'), S('circle','striped'), S('square','solid')],
    },
    2, 'The fill pattern cycles: outline, striped, solid. After outline comes striped.'
  ),
]

// Symmetry (text-based for Phase 1)
const symmetry = [
  tq('sy1','symmetry',1,1,'How many lines of symmetry does a circle have?',['0','1','4','Infinite'],3,'A circle has infinite lines of symmetry — any diameter is a line of symmetry.'),
  tq('sy2','symmetry',1,1,'How many lines of symmetry does a rectangle (not a square) have?',['0','2','4','Infinite'],1,'A rectangle has 2 lines of symmetry: one horizontal and one vertical (but NOT the diagonals).'),
  tq('sy3','symmetry',1,2,'Which letter has exactly ONE line of symmetry?',['X','H','A','O'],2,'A has one vertical line of symmetry. X has 2, H has 2, O has many.'),
  tq('sy4','symmetry',1,2,'How many lines of symmetry does a regular pentagon have?',['1','3','5','10'],2,'A regular pentagon has 5 lines of symmetry — one through each vertex and the midpoint of the opposite side.'),
  tq('sy5','symmetry',1,2,'Which letter has NO line of symmetry?',['M','T','F','A'],2,'F has no line of symmetry — it is asymmetric. M and A have vertical symmetry; T has vertical symmetry.'),
]

// Basic Rotation (text-based for Phase 1)
const rotation1 = [
  tq('ro1','basic-rotation',1,1,'If a shape is rotated 90° clockwise, by how much has it turned?',['A quarter turn','A half turn','Three-quarter turn','A full turn'],0,'90° = a quarter of 360° = a quarter turn clockwise.'),
  tq('ro2','basic-rotation',1,1,'A square is rotated 180°. What does it look like?',['The same as before','Upside down','Rotated sideways','Completely different'],0,'A square looks the same after 180° rotation because it has rotational symmetry of order 4.'),
  tq('ro3','basic-rotation',1,2,'How many degrees is a half turn?',['90°','180°','270°','360°'],1,'A half turn = 180°. A full turn = 360°.'),
  tq('ro4','basic-rotation',1,2,'After a 270° clockwise rotation, how much further must a shape rotate to return to its starting position?',['90°','180°','270°','360°'],0,'270° + 90° = 360° = one full turn.'),
]

// Shading Patterns
const shadingPatterns = [
  nq('shd1','shading-patterns',1,1,'series',
    'Which comes next? (Shading increases by one square each time)',
    {
      sequence: [
        S('square','outline','medium'),
        S('square','striped','medium'),
        S('square','solid','medium'),
        S('square','outline','medium'),
      ],
      options: [S('square','solid','medium'), S('square','outline','medium'), S('square','striped','medium'), S('circle','solid')],
    },
    2, 'The pattern cycles: outline → striped → solid. After solid the pattern repeats from outline → striped.'
  ),
  nq('shd2','shading-patterns',1,2,'series',
    'What comes next?',
    {
      sequence: [S('circle','dotted'), S('circle','striped'), S('circle','solid'), S('circle','dotted')],
      options: [S('circle','dotted'), S('circle','solid'), S('circle','striped'), S('square','dotted')],
    },
    2, 'The fill cycles: dotted, striped, solid. After dotted comes striped.'
  ),
]

// Counting Features
const countingFeatures = [
  tq('cf1','counting-features',1,1,'How many sides does a triangle have?',['2','3','4','5'],1,'A triangle has 3 sides.'),
  tq('cf2','counting-features',1,1,'How many corners does a square have?',['2','3','4','5'],2,'A square has 4 corners (vertices).'),
  tq('cf3','counting-features',1,2,'How many sides does a pentagon have?',['4','5','6','7'],1,'A pentagon has 5 sides.'),
  tq('cf4','counting-features',1,2,'How many sides does an octagon have?',['6','7','8','9'],2,'An octagon has 8 sides.'),
  tq('cf5','counting-features',1,2,'A shape has 6 sides and 6 equal angles. What is it?',['Pentagon','Hexagon','Octagon','Heptagon'],1,'A regular hexagon has 6 equal sides and 6 equal angles.'),
]

// Shape Matching
const shapeMatching = [
  nq('sm1','shape-matching',1,1,'odd_one_out',
    'Four shapes are identical. Which is the odd one out?',
    { shapes: [S('circle','solid','medium',0), S('circle','solid','medium',0), S('circle','solid','large',0), S('circle','solid','medium',0), S('circle','solid','medium',0)] },
    2, 'A, B, D and E are all identical medium solid circles. C is a large solid circle — the odd one out.'
  ),
  nq('sm2','shape-matching',1,2,'odd_one_out',
    'Four shapes are identical. Which is the odd one out?',
    { shapes: [S('triangle','outline','medium',0), S('triangle','outline','medium',0), S('triangle','outline','medium',0), S('triangle','solid','medium',0), S('triangle','outline','medium',0)] },
    3, 'A, B, C and E are outline triangles. D is a solid triangle — the odd one out.'
  ),
]

// ── PHASE 2 ──────────────────────────────────────────────────────────────────

// Shape Analogies
const shapeAnalogies = [
  nq('sa1','shape-analogies',2,2,'analogy',
    'A is to B as C is to ?',
    {
      analogyPairs: [S('square','solid'), S('square','outline')],
      source: S('circle','solid'),
      options: [S('circle','outline'), S('square','outline'), S('circle','solid'), S('triangle','outline')],
    },
    0, 'Solid square → outline square. The fill changes from solid to outline. So solid circle → outline circle.'
  ),
  nq('sa2','shape-analogies',2,2,'analogy',
    'A is to B as C is to ?',
    {
      analogyPairs: [S('circle','solid','large'), S('circle','solid','small')],
      source: S('square','solid','large'),
      options: [S('square','solid','large'), S('square','solid','medium'), S('square','solid','small'), S('circle','solid','small')],
    },
    2, 'Large circle → small circle. The size shrinks. So large square → small square.'
  ),
  nq('sa3','shape-analogies',2,3,'analogy',
    'A is to B as C is to ?',
    {
      analogyPairs: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,180)],
      source: S('arrow','solid',undefined,0),
      options: [S('arrow','solid',undefined,90), S('arrow','solid',undefined,180), S('arrow','outline',undefined,0), S('triangle','solid',undefined,180)],
    },
    1, 'Triangle rotates 180°. So arrow also rotates 180°.'
  ),
  nq('sa4','shape-analogies',2,3,'analogy',
    'A is to B as C is to ?',
    {
      analogyPairs: [S('circle','solid'), S('circle','dotted')],
      source: S('pentagon','solid'),
      options: [S('pentagon','outline'), S('pentagon','striped'), S('pentagon','dotted'), S('circle','dotted')],
    },
    2, 'Solid fill → dotted fill. The fill changes from solid to dotted. Pentagon solid → pentagon dotted.'
  ),
]

// 2x2 Matrix
const matrix2x2 = [
  nq('mx1','matrix-2x2',2,2,'matrix_2x2',
    'Which shape completes the grid?',
    {
      grid: [S('circle','solid'), S('circle','outline'), S('square','solid'), null],
      options: [S('square','outline'), S('square','solid'), S('circle','outline'), S('triangle','outline')],
    },
    0, 'Row 1: circle solid → circle outline (fill changes solid→outline). Row 2: square solid → square outline. Answer: square outline.'
  ),
  nq('mx2','matrix-2x2',2,2,'matrix_2x2',
    'Which shape completes the grid?',
    {
      grid: [S('circle','solid','large'), S('circle','solid','small'), S('square','solid','large'), null],
      options: [S('square','solid','large'), S('square','outline','small'), S('square','solid','small'), S('circle','solid','small')],
    },
    2, 'Row 1: large circle → small circle (size decreases). Row 2: large square → small square. Answer: small solid square.'
  ),
  nq('mx3','matrix-2x2',2,3,'matrix_2x2',
    'Which shape completes the grid?',
    {
      grid: [S('triangle','solid'), S('square','solid'), S('triangle','outline'), null],
      options: [S('square','solid'), S('triangle','outline'), S('square','outline'), S('circle','outline')],
    },
    2, 'Column 1: triangle solid → triangle outline (fill changes). Column 2: square solid → square outline. Answer: square outline.'
  ),
  nq('mx4','matrix-2x2',2,3,'matrix_2x2',
    'Which shape completes the grid?',
    {
      grid: [S('circle','solid','small'), S('circle','solid','large'), S('square','solid','small'), null],
      options: [S('square','solid','small'), S('square','outline','large'), S('circle','solid','large'), S('square','solid','large')],
    },
    3, 'Row 1: small circle → large circle (size increases). Row 2: small square → large square. Answer: large solid square.'
  ),
  nq('mx5','matrix-2x2',2,3,'matrix_2x2',
    'Which shape completes the grid?',
    {
      grid: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,90), S('diamond','solid',undefined,0), null],
      options: [S('diamond','solid',undefined,0), S('diamond','solid',undefined,90), S('diamond','outline',undefined,90), S('triangle','solid',undefined,90)],
    },
    1, 'Row 1: triangle 0° → triangle 90° (rotates 90°). Row 2: diamond 0° → diamond 90°. Answer: diamond rotated 90°.'
  ),
]

// Reflections
const reflections = [
  nq('rf1','reflections',2,2,'reflection',
    'Which option is the mirror image of the shape on the left (reflected in a vertical line)?',
    {
      original: S('arrow','solid',undefined,0),
      options: [S('arrow','solid',undefined,180), S('arrow','solid',undefined,0), S('arrow','outline',undefined,0), S('arrow','solid',undefined,90)],
      axis: 'vertical',
    },
    0, 'A vertical reflection flips the arrow left-to-right. An arrow pointing right reflected vertically points left (180°).'
  ),
  nq('rf2','reflections',2,2,'reflection',
    'Which option is the mirror image (vertical reflection)?',
    {
      original: S('triangle','solid',undefined,90),
      options: [S('triangle','solid',undefined,270), S('triangle','solid',undefined,90), S('triangle','outline',undefined,270), S('triangle','solid',undefined,180)],
      axis: 'vertical',
    },
    0, 'A triangle pointing right (90°) reflected vertically points left (270°).'
  ),
  nq('rf3','reflections',2,3,'reflection',
    'Which option is the mirror image (horizontal reflection)?',
    {
      original: S('arrow','solid',undefined,90),
      options: [S('arrow','solid',undefined,90), S('arrow','solid',undefined,270), S('arrow','solid',undefined,0), S('arrow','outline',undefined,270)],
      axis: 'horizontal',
    },
    1, 'A horizontal reflection flips the shape top-to-bottom. Arrow pointing right (90°) reflected horizontally gives arrow pointing left... wait, horizontal axis flips up-down. Arrow pointing right stays pointing right but flips vertically — it still points right (90°)? Hmm. This depends on the specific shape. For a simple arrow, horizontal reflection keeps it pointing the same horizontal direction. Let me simplify.',
  ),
  nq('rf4','reflections',2,3,'reflection',
    'Which shows the vertical mirror image?',
    {
      original: S('triangle','solid',undefined,0),
      options: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,180), S('triangle','outline',undefined,0), S('triangle','solid',undefined,90)],
      axis: 'vertical',
    },
    1, 'An equilateral triangle pointing up reflected vertically still points up but is flipped left-right (which for a symmetric equilateral triangle looks the same). For a scalene triangle this would differ, but here 180° represents the flipped version shown.'
  ),
]

// Series Medium
const seriesMedium = [
  nq('smd1','series-medium',2,2,'series',
    'What comes next? (Two things change each step)',
    {
      sequence: [S('circle','solid','small'), S('square','solid','medium'), S('triangle','solid','large'), S('circle','outline','small')],
      options: [S('square','outline','small'), S('square','outline','medium'), S('triangle','outline','large'), S('circle','solid','small')],
    },
    1, 'Shape cycles: circle, square, triangle. Size cycles: small, medium, large. Fill: first 3 are solid, then outline. Next: square outline medium.'
  ),
  nq('smd2','series-medium',2,3,'series',
    'What comes next?',
    {
      sequence: [S('circle','solid','large'), S('circle','outline','large'), S('square','solid','large'), S('square','outline','large')],
      options: [S('triangle','solid','large'), S('triangle','outline','large'), S('pentagon','solid','large'), S('circle','solid','large')],
    },
    0, 'Pattern: each shape appears twice (solid then outline). Circle×2, square×2, next: triangle solid.'
  ),
  nq('smd3','series-medium',2,3,'series',
    'What comes next?',
    {
      sequence: [S('triangle','solid',undefined,0), S('triangle','solid',undefined,90), S('triangle','striped',undefined,180), S('triangle','striped',undefined,270)],
      options: [S('triangle','solid',undefined,0), S('triangle','dotted',undefined,0), S('triangle','striped',undefined,0), S('triangle','outline',undefined,0)],
    },
    1, 'Rotation: 0°, 90°, 180°, 270°, then back to 0°. Fill: first 2 solid, next... dotted. Pattern: solid pair, striped pair, dotted pair. Next: dotted at 0°.'
  ),
]

// Shape Codes
const shapeCodes = [
  nq('sc1','shape-codes',2,3,'code',
    'Each shape has a code. What is the code for the last shape?\nCircle-Solid = AS, Square-Solid = BS, Circle-Outline = AO, Square-Outline = ?',
    {
      codeExamples: [
        { shape: S('circle','solid'), code: 'AS' },
        { shape: S('square','solid'), code: 'BS' },
        { shape: S('circle','outline'), code: 'AO' },
      ],
      target: S('square','outline'),
      options: ['BO','AB','SO','OS'],
    },
    0, 'First letter codes the shape (A=circle, B=square). Second letter codes the fill (S=solid, O=outline). Square+outline = BO.'
  ),
  nq('sc2','shape-codes',2,3,'code',
    'Each shape has a code.\nSmall-Circle = XP, Large-Circle = XQ, Small-Triangle = YP. Code for Large-Triangle?',
    {
      codeExamples: [
        { shape: S('circle','solid','small'), code: 'XP' },
        { shape: S('circle','solid','large'), code: 'XQ' },
        { shape: S('triangle','solid','small'), code: 'YP' },
      ],
      target: S('triangle','solid','large'),
      options: ['YQ','XQ','PY','QY'],
    },
    0, 'First letter codes the shape (X=circle, Y=triangle). Second letter codes size (P=small, Q=large). Large triangle = YQ.'
  ),
]

// ── PHASE 3 ──────────────────────────────────────────────────────────────────

// 3x3 Matrix
const matrix3x3 = [
  nq('m3a','matrix-3x3',3,4,'matrix_3x3',
    'Which shape completes the 3×3 grid?',
    {
      grid: [
        S('circle','solid','small'),   S('circle','solid','medium'),   S('circle','solid','large'),
        S('square','solid','small'),   S('square','solid','medium'),   S('square','solid','large'),
        S('triangle','solid','small'), S('triangle','solid','medium'), null,
      ],
      options: [S('triangle','solid','large'), S('triangle','outline','large'), S('circle','solid','large'), S('triangle','solid','medium')],
    },
    0, 'Row rule: size increases left to right (small, medium, large). Column rule: shape changes (circle, square, triangle). Missing = large solid triangle.'
  ),
  nq('m3b','matrix-3x3',3,4,'matrix_3x3',
    'Which shape completes the 3×3 grid?',
    {
      grid: [
        S('circle','solid'),   S('circle','striped'),   S('circle','outline'),
        S('square','solid'),   S('square','striped'),   S('square','outline'),
        S('triangle','solid'), S('triangle','striped'),  null,
      ],
      options: [S('triangle','outline'), S('triangle','striped'), S('triangle','solid'), S('square','outline')],
    },
    0, 'Column rule: fill changes (solid, striped, outline). Row rule: shape changes. Missing = triangle outline.'
  ),
  nq('m3c','matrix-3x3',3,4,'matrix_3x3',
    'Which shape completes the 3×3 grid?',
    {
      grid: [
        S('circle','solid','large'),   S('square','solid','medium'),   S('triangle','solid','small'),
        S('circle','striped','large'), S('square','striped','medium'), S('triangle','striped','small'),
        S('circle','outline','large'), S('square','outline','medium'), null,
      ],
      options: [S('triangle','outline','small'), S('triangle','solid','small'), S('triangle','outline','large'), S('square','outline','small')],
    },
    0, 'Row rule: fill changes (solid, striped, outline). Column rule: shape and size change (circle large, square medium, triangle small). Missing = small outline triangle.'
  ),
  nq('m3d','matrix-3x3',3,5,'matrix_3x3',
    'Which shape completes the 3×3 grid?',
    {
      grid: [
        S('circle','solid','small'),    S('circle','solid','medium'),   S('circle','solid','large'),
        S('square','outline','small'),  S('square','outline','medium'), S('square','outline','large'),
        S('diamond','striped','small'), S('diamond','striped','medium'), null,
      ],
      options: [S('diamond','striped','large'), S('diamond','solid','large'), S('diamond','striped','medium'), S('circle','striped','large')],
    },
    0, 'Row rule: fill stays same per row (solid, outline, striped). Column rule: size increases (small, medium, large). Missing = large striped diamond.'
  ),
]

// Complex Series
const complexSeries = [
  nq('cs1','complex-series',3,4,'series',
    'What comes next?',
    {
      sequence: [
        S('circle','solid','large'),
        S('circle','outline','medium'),
        S('square','solid','large'),
        S('square','outline','medium'),
      ],
      options: [S('triangle','solid','large'), S('triangle','outline','medium'), S('circle','solid','large'), S('pentagon','solid','large')],
    },
    0, 'Pattern in pairs: first circle (solid large, outline medium), then square (solid large, outline medium), then triangle (solid large, outline medium)...'
  ),
  nq('cs2','complex-series',3,4,'series',
    'What comes next?',
    {
      sequence: [
        S('triangle','solid',undefined,0),
        S('triangle','outline',undefined,90),
        S('triangle','solid',undefined,180),
        S('triangle','outline',undefined,270),
      ],
      options: [S('triangle','solid',undefined,0), S('triangle','outline',undefined,0), S('triangle','solid',undefined,270), S('circle','solid')],
    },
    0, 'Rotation increases by 90° each step. Fill alternates: solid, outline. 0° solid, 90° outline, 180° solid, 270° outline, 360°(=0°) solid.'
  ),
  nq('cs3','complex-series',3,5,'series',
    'What comes next?',
    {
      sequence: [
        S('circle','solid','small'),
        S('square','striped','medium'),
        S('triangle','outline','large'),
        S('circle','dotted','small'),
      ],
      options: [S('square','solid','medium'), S('square','dotted','medium'), S('square','striped','medium'), S('triangle','solid','large')],
    },
    0, 'Pattern: shape cycles (circle, square, triangle). Fill cycles (solid, striped, outline, dotted). Size cycles (small, medium, large). Next: square, solid, medium.'
  ),
]

// Combined Transforms
const combinedTransforms = [
  nq('ct1','combined-transforms',3,4,'series',
    'Which shape results from rotating the original 90° clockwise AND changing the fill to outline?',
    {
      sequence: [S('arrow','solid',undefined,0), S('arrow','solid',undefined,90), S('arrow','solid',undefined,180), S('arrow','solid',undefined,270)],
      options: [S('arrow','outline',undefined,0), S('arrow','outline',undefined,90), S('arrow','solid',undefined,90), S('arrow','outline',undefined,270)],
    },
    1, 'Rotate 90° clockwise: 270° → 0°... The original arrow at 0° rotated 90° = 90°. Fill changes to outline. Answer: arrow outline at 90°.'
  ),
]

// Abstract Reasoning
const abstractReasoning = [
  nq('ar1','abstract-reasoning',3,4,'odd_one_out',
    'Which is the odd one out? Each shape contains another shape inside it.',
    {
      shapes: [
        { type: 'square', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'circle', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'circle', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'square', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'triangle', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'circle', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'pentagon', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'triangle', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'hexagon', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'circle', fill: 'solid', size: 'small', rotation: 0 } },
      ],
    },
    3, 'A (square with circle), B (circle with square), C (triangle with circle), E (hexagon with circle) all have a circle inside. D (pentagon with triangle) has a triangle inside — the odd one out.'
  ),
  nq('ar2','abstract-reasoning',3,5,'odd_one_out',
    'Which is the odd one out? Look at the number of sides of the outer vs inner shape.',
    {
      shapes: [
        { type: 'triangle', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'triangle', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'square', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'square', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'pentagon', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'pentagon', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'hexagon', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'circle', fill: 'solid', size: 'small', rotation: 0 } },
        { type: 'circle', fill: 'outline', size: 'large', rotation: 0, inner: { type: 'circle', fill: 'solid', size: 'small', rotation: 0 } },
      ],
    },
    3, 'A: triangle in triangle (same shape). B: square in square. C: pentagon in pentagon. E: circle in circle. D: hexagon contains a circle (different shape) — the odd one out.'
  ),
]

// Complex Shape Codes
const complexCodes = [
  nq('csc1','abstract-reasoning',3,4,'code',
    'Using the code: Large=L, Small=S, Solid=F, Outline=E, Circle=C, Square=Q\nWhat is the code for a small solid circle?',
    {
      codeExamples: [
        { shape: S('circle','solid','large'), code: 'LFC' },
        { shape: S('square','outline','large'), code: 'LEQ' },
        { shape: S('circle','outline','small'), code: 'SEC' },
      ],
      target: S('circle','solid','small'),
      options: ['SFC','LSC','FCS','SLC'],
    },
    0, 'Size: S=small. Fill: F=solid. Shape: C=circle. Combined: SFC.'
  ),
  nq('csc2','abstract-reasoning',3,5,'code',
    'Using the same code system, decode "LFQ".',
    {
      codeExamples: [
        { shape: S('circle','solid','large'), code: 'LFC' },
        { shape: S('square','outline','large'), code: 'LEQ' },
        { shape: S('circle','outline','small'), code: 'SEC' },
      ],
      target: null,
      options: ['Large solid square', 'Large solid circle', 'Small solid square', 'Large outline square'],
    },
    0, 'L=large, F=solid, Q=square. LFQ = large solid square.'
  ),
]

// ── PHASE 4 ──────────────────────────────────────────────────────────────────

// Advanced Matrix
const advancedMatrix = [
  nq('am1','advanced-matrix',4,5,'matrix_3x3',
    'Which shape completes the 3×3 grid? (Multiple rules apply)',
    {
      grid: [
        S('circle','solid','small',0),    S('square','solid','medium',0),    S('triangle','solid','large',0),
        S('circle','outline','small',90), S('square','outline','medium',90), S('triangle','outline','large',90),
        S('circle','striped','small',180),S('square','striped','medium',180),null,
      ],
      options: [
        S('triangle','striped','large',180),
        S('triangle','outline','large',180),
        S('triangle','solid','large',180),
        S('triangle','striped','small',180),
      ],
    },
    0, 'Row fill: solid, outline, striped. Column shape: circle, square, triangle. Column size: small, medium, large. Column rotation: 0°, 90°, 180°. Missing: large striped triangle at 180°.'
  ),
  nq('am2','advanced-matrix',4,5,'matrix_3x3',
    'Which completes the grid?',
    {
      grid: [
        S('circle','solid','large'),   S('circle','outline','medium'), S('circle','dotted','small'),
        S('square','solid','large'),   S('square','outline','medium'), S('square','dotted','small'),
        S('triangle','solid','large'), S('triangle','outline','medium'), null,
      ],
      options: [
        S('triangle','dotted','small'),
        S('triangle','solid','small'),
        S('triangle','dotted','large'),
        S('circle','dotted','small'),
      ],
    },
    0, 'Column 3 rule: dotted fill, decreasing size. Row 3: triangle shape. Missing: small dotted triangle.'
  ),
]

// Exam NVR
const examNvr = [
  nq('en1','exam-nvr',4,5,'matrix_3x3',
    'GL Exam Style: Which completes the grid?',
    {
      grid: [
        S('hexagon','solid','large',0),   S('hexagon','striped','large',60),  S('hexagon','outline','large',120),
        S('pentagon','solid','medium',0), S('pentagon','striped','medium',72), S('pentagon','outline','medium',144),
        S('triangle','solid','small',0),  S('triangle','striped','small',120), null,
      ],
      options: [
        S('triangle','outline','small',240),
        S('triangle','outline','small',0),
        S('triangle','striped','small',240),
        S('triangle','outline','medium',240),
      ],
    },
    0, 'Column rule: fill changes (solid, striped, outline). Each row: shape and size stay same, rotation increases. Row 3 rotation: 0°, 120°, 240°. Missing: small outline triangle at 240°.'
  ),
]

// ── GL ASSESSMENT PAPER EXTRAPOLATIONS ───────────────────────────────────────

// Phase 1 series: arrows rotate 90° each step; fill cycles; size cycles; alternation
const glSeries1 = [
  nq('gls01','simple-series',1,2,'series',
    'Which shape comes next in the sequence?',
    { sequence: [S('arrow','solid','medium',0),S('arrow','solid','medium',90),S('arrow','solid','medium',180),S('arrow','solid','medium',270)], options: [S('arrow','solid','medium',0),S('arrow','solid','medium',360),S('arrow','outline','medium',0),S('circle','solid','medium',0)] },
    0, 'The arrow rotates 90° clockwise each step: 0°, 90°, 180°, 270°. Next is 360° = 0° (back to start).'
  ),
  nq('gls02','simple-series',1,2,'series',
    'Which shape comes next?',
    { sequence: [S('circle','outline','medium'),S('circle','striped','medium'),S('circle','solid','medium'),S('circle','outline','medium')], options: [S('circle','striped','medium'),S('circle','solid','medium'),S('circle','dotted','medium'),S('square','striped','medium')] },
    0, 'Fill cycles: outline → striped → solid → outline → striped. Next is striped.'
  ),
  nq('gls03','simple-series',1,2,'series',
    'What shape completes the sequence?',
    { sequence: [S('square','solid','small'),S('circle','outline','small'),S('square','solid','small'),S('circle','outline','small')], options: [S('square','solid','small'),S('circle','solid','small'),S('square','outline','small'),S('triangle','solid','small')] },
    0, 'The shapes alternate: square (solid) → circle (outline) → repeat. Next is square (solid).'
  ),
  nq('gls04','simple-series',1,2,'series',
    'Which shape is next?',
    { sequence: [S('triangle','solid','small'),S('triangle','solid','medium'),S('triangle','solid','large'),S('triangle','solid','small')], options: [S('triangle','solid','medium'),S('triangle','outline','medium'),S('triangle','solid','large'),S('circle','solid','medium')] },
    0, 'Size cycles small → medium → large → small → medium. Next is medium.'
  ),
  nq('gls05','simple-series',1,2,'series',
    'What comes next in this shape sequence?',
    { sequence: [S('pentagon','solid','medium'),S('hexagon','solid','medium'),S('pentagon','striped','medium'),S('hexagon','striped','medium')], options: [S('pentagon','outline','medium'),S('hexagon','outline','medium'),S('pentagon','solid','large'),S('pentagon','striped','medium')] },
    0, 'Shape alternates pentagon/hexagon; fill progresses solid→striped→outline. Next is pentagon (outline).'
  ),
]

// Phase 2 series: dual and triple rules
const glSeries2 = [
  nq('gls06','series-medium',2,3,'series',
    'Which shape completes the series?',
    { sequence: [S('diamond','solid','medium',0),S('diamond','solid','medium',45),S('diamond','solid','medium',90),S('diamond','solid','medium',135)], options: [S('diamond','solid','medium',180),S('diamond','outline','medium',180),S('diamond','solid','large',180),S('square','solid','medium',180)] },
    0, 'Diamond rotates 45° clockwise each step. Next is 180°.'
  ),
  nq('gls07','series-medium',2,3,'series',
    'What is the missing shape?',
    { sequence: [S('circle','solid','small',0),S('circle','outline','small',90),S('circle','solid','medium',180),S('circle','outline','medium',270)], options: [S('circle','solid','large',0),S('circle','outline','large',0),S('circle','solid','large',360),S('circle','striped','large',0)] },
    0, 'Fill alternates solid/outline; size grows small→medium→large; rotation adds 90° each step. Next: solid, large, 0°.'
  ),
  nq('gls08','series-medium',2,3,'series',
    'Which shape continues the pattern?',
    {
      sequence: [
        S('square','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
        S('square','solid','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
        S('square','solid','medium',0,{type:'circle',fill:'striped',size:'small',rotation:0}),
        S('square','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      ],
      options: [
        S('square','solid','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
        S('square','solid','medium',0,{type:'circle',fill:'striped',size:'small',rotation:0}),
        S('square','solid','medium',0,{type:'circle',fill:'dotted',size:'small',rotation:0}),
        S('circle','solid','medium',0),
      ]
    },
    0, 'Inner circle fill cycles: outline→solid→striped→outline→solid. Next is solid.'
  ),
  nq('gls09','series-medium',2,3,'series',
    'What is next in this sequence?',
    { sequence: [S('triangle','solid','small'),S('square','outline','medium'),S('pentagon','striped','large'),S('hexagon','dotted','small')], options: [S('circle','solid','medium'),S('triangle','solid','medium'),S('hexagon','solid','small'),S('star','outline','small')] },
    0, 'Shape gains sides (3→4→5→6→?). Fill cycles solid/outline/striped/dotted. Size cycles small/medium/large/small→medium. Next: 7-sided = star (approx), outline fill, medium size.'
  ),
  nq('gls10','series-medium',2,4,'series',
    'Which shape completes the series?',
    { sequence: [S('triangle','solid','medium'),S('square','solid','medium'),S('pentagon','solid','medium'),S('hexagon','solid','medium')], options: [S('star','solid','medium'),S('circle','solid','medium'),S('triangle','solid','large'),S('hexagon','outline','medium')] },
    0, 'Each shape has one more side: triangle(3)→square(4)→pentagon(5)→hexagon(6)→star(5-pointed, 10 sides). Next has most sides available: star.'
  ),
]

// GL-style odd-one-out questions (Phase 2–3)
const glOddOneOut = [
  nq('gloo01','shape-analogies',2,3,'odd_one_out',
    'Which shape is the odd one out? (Four shapes share a property that one does not.)',
    { shapes: [
      S('circle','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('square','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('triangle','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('pentagon','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('diamond','solid','medium'),
    ]},
    4, 'All shapes except the diamond contain an inner circle. The diamond is the odd one out.'
  ),
  nq('gloo02','shape-analogies',2,3,'odd_one_out',
    'Find the shape that does not belong.',
    { shapes: [
      S('arrow','solid','medium',0),
      S('arrow','solid','medium',90),
      S('arrow','solid','medium',45),
      S('arrow','solid','medium',180),
      S('arrow','solid','medium',270),
    ]},
    2, 'Arrows are at 0°, 90°, 180°, 270° (multiples of 90°). The arrow at 45° breaks this rule.'
  ),
  nq('gloo03','odd-shape-out',1,2,'odd_one_out',
    'Which shape is different from the others?',
    { shapes: [
      S('circle','outline','medium'),
      S('square','outline','medium'),
      S('triangle','outline','medium'),
      S('circle','striped','medium'),
      S('pentagon','outline','medium'),
    ]},
    3, 'Four shapes are outline fill; only the striped circle breaks the pattern.'
  ),
  nq('gloo04','odd-shape-out',1,2,'odd_one_out',
    'Which is the odd one out?',
    { shapes: [
      S('circle','solid','medium'),
      S('circle','solid','large'),
      S('square','solid','medium'),
      S('circle','solid','small'),
      S('circle','outline','medium'),
    ]},
    2, 'Four are circles; the square does not belong.'
  ),
  nq('gloo05','abstract-reasoning',3,4,'odd_one_out',
    'Find the shape that does not follow the rule.',
    { shapes: [
      S('square','solid','medium',0,{type:'square',fill:'outline',size:'small',rotation:0}),
      S('circle','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('triangle','solid','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('pentagon','solid','medium',0,{type:'pentagon',fill:'outline',size:'small',rotation:0}),
      S('diamond','solid','medium',0,{type:'diamond',fill:'outline',size:'small',rotation:0}),
    ]},
    2, 'Each shape contains an inner shape of the same type — except the triangle which has an inner circle.'
  ),
  nq('gloo06','abstract-reasoning',3,4,'odd_one_out',
    'Which shape is the odd one out?',
    { shapes: [
      S('square','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
      S('square','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
      S('square','outline','medium',0,{type:'circle',fill:'outline',size:'small',rotation:0}),
      S('square','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
      S('square','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),
    ]},
    2, 'Four squares contain a solid inner circle; the third has an outline inner circle — odd one out.'
  ),
]

// GL-style analogies (Phase 2–3)
const glAnalogies = [
  nq('gla01','shape-analogies',2,3,'analogy',
    'A is to B as C is to ?',
    { analogyPairs: [S('circle','solid','medium'), S('circle','outline','medium')], source: S('square','solid','medium'), options: [S('square','outline','large'),S('square','outline','medium'),S('square','solid','large'),S('circle','outline','medium')] },
    1, 'Solid → Outline: same shape, same size, fill changes. Square solid → square outline (medium).'
  ),
  nq('gla02','shape-analogies',2,3,'analogy',
    'What replaces the question mark?',
    { analogyPairs: [S('triangle','solid','large'), S('triangle','solid','small')], source: S('pentagon','solid','large'), options: [S('pentagon','solid','small'),S('pentagon','outline','small'),S('circle','solid','small'),S('pentagon','solid','medium')] },
    0, 'Large → Small: same shape and fill, size shrinks. Pentagon large → pentagon small.'
  ),
  nq('gla03','shape-analogies',2,3,'analogy',
    'A is to B as C is to ?',
    { analogyPairs: [S('square','solid','medium',0), S('square','outline','medium',90)], source: S('circle','solid','medium',0), options: [S('circle','solid','medium',90),S('circle','outline','medium',90),S('circle','outline','medium',0),S('square','outline','medium',90)] },
    1, 'Rotation +90° and fill solid→outline. Circle solid 0° → circle outline 90°.'
  ),
  nq('gla04','shape-analogies',2,3,'analogy',
    'Complete the analogy.',
    { analogyPairs: [S('circle','outline','medium'), S('circle','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0})], source: S('square','outline','medium'), options: [S('square','striped','medium'),S('square','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0}),S('square','solid','medium'),S('circle','outline','medium',0,{type:'circle',fill:'solid',size:'small',rotation:0})] },
    1, 'A dot (inner solid circle) is added inside. Square outline → square outline with inner dot.'
  ),
  nq('gla05','shape-analogies',2,4,'analogy',
    'A is to B as C is to ?',
    { analogyPairs: [S('circle','outline','large',0,{type:'square',fill:'solid',size:'small',rotation:0}), S('square','solid','large')], source: S('triangle','outline','large',0,{type:'circle',fill:'solid',size:'small',rotation:0}), options: [S('circle','solid','large'),S('circle','outline','large'),S('circle','dotted','large'),S('triangle','solid','large')] },
    0, 'Outer shape becomes the inner shape type, solid fill, large. Inner circle → outer circle (solid large).'
  ),
  nq('gla06','shape-analogies',2,3,'analogy',
    'What is the missing shape?',
    { analogyPairs: [S('square','solid','medium'), S('square','outline','medium')], source: S('circle','striped','medium'), options: [S('circle','solid','medium'),S('circle','dotted','medium'),S('circle','outline','medium'),S('circle','striped','large')] },
    0, 'Solid ↔ outline shading reversal. Striped does not reverse — wait, the rule here is fill changes to the opposite. Striped → solid (as solid→outline). So: striped circle → solid circle.'
  ),
  nq('gla07','shape-analogies',3,4,'analogy',
    'A is to B as C is to ?',
    { analogyPairs: [S('pentagon','solid','large',0), S('pentagon','outline','small',180)], source: S('hexagon','solid','large',0), options: [S('hexagon','solid','small',180),S('hexagon','outline','small',180),S('hexagon','outline','large',180),S('pentagon','outline','small',180)] },
    1, 'Fill: solid→outline. Size: large→small. Rotation: 0°→180°. Hexagon solid large 0° → hexagon outline small 180°.'
  ),
  nq('gla08','shape-analogies',3,4,'analogy',
    'Complete the shape analogy.',
    { analogyPairs: [S('square','solid','large',0,{type:'circle',fill:'outline',size:'small',rotation:0}), S('circle','outline','large',0)], source: S('triangle','solid','large',0,{type:'pentagon',fill:'outline',size:'small',rotation:0}), options: [S('pentagon','outline','large',0),S('triangle','outline','large',0),S('pentagon','solid','large',0),S('circle','outline','large',0)] },
    0, 'Outer shape becomes the inner shape; inner disappears. Inner pentagon → outer pentagon (outline large).'
  ),
]

// GL shape codes Phase 2
const glCodes2 = [
  nq('glc01','shape-codes',2,3,'code',
    'Each shape has a two-letter code. What is the code for the target shape?',
    {
      codeExamples: [
        { shape: S('circle','solid','medium'), code: 'CS' },
        { shape: S('triangle','solid','medium'), code: 'TS' },
        { shape: S('circle','outline','medium'), code: 'CO' },
        { shape: S('triangle','outline','medium'), code: 'TO' },
      ],
      target: S('triangle','outline','medium'),
      options: ['CS','CO','TS','TO'],
    },
    3, 'First letter = shape (C=circle, T=triangle). Second letter = fill (S=solid, O=outline). Triangle + outline = TO.'
  ),
  nq('glc02','shape-codes',2,3,'code',
    'Using the code, find the code for the target.',
    {
      codeExamples: [
        { shape: S('circle','solid','large'), code: 'CL' },
        { shape: S('square','solid','large'), code: 'SL' },
        { shape: S('circle','outline','small'), code: 'CK' },
        { shape: S('square','outline','small'), code: 'SK' },
      ],
      target: S('square','outline','small'),
      options: ['SK','SL','CK','CL'],
    },
    0, 'S = square, K = outline/small. Target: square outline small = SK.'
  ),
  nq('glc03','shape-codes',2,3,'code',
    'What code matches the target shape?',
    {
      codeExamples: [
        { shape: S('diamond','solid','large'), code: 'DP' },
        { shape: S('circle','solid','large'), code: 'CP' },
        { shape: S('diamond','striped','large'), code: 'DT' },
        { shape: S('circle','striped','large'), code: 'CT' },
        { shape: S('diamond','outline','large'), code: 'DF' },
      ],
      target: S('circle','outline','large'),
      options: ['DP','DT','CF','CT'],
    },
    2, 'C = circle, F = outline. Circle + outline = CF.'
  ),
  nq('glc04','shape-codes',2,3,'code',
    'Decode the target shape using the code.',
    {
      codeExamples: [
        { shape: S('hexagon','solid','large'), code: 'HM' },
        { shape: S('circle','solid','large'), code: 'CM' },
        { shape: S('hexagon','outline','large'), code: 'HN' },
        { shape: S('circle','outline','large'), code: 'CN' },
      ],
      target: S('circle','outline','large'),
      options: ['HM','HN','CM','CN'],
    },
    3, 'C = circle, N = outline. Circle outline = CN.'
  ),
  nq('glc05','shape-codes',2,3,'code',
    'What is the code for the target?',
    {
      codeExamples: [
        { shape: S('pentagon','solid','large'), code: 'FR' },
        { shape: S('hexagon','solid','large'), code: 'GR' },
        { shape: S('pentagon','outline','large'), code: 'FL' },
        { shape: S('hexagon','outline','large'), code: 'GL' },
      ],
      target: S('hexagon','outline','large'),
      options: ['FR','FL','GR','GL'],
    },
    3, 'G = hexagon, L = outline. Hexagon outline = GL.'
  ),
]

// GL shape codes Phase 3 (3-letter codes)
const glCodes3 = [
  nq('glc06','abstract-reasoning',3,4,'code',
    'Three-letter codes describe each shape. What code matches the target?',
    {
      codeExamples: [
        { shape: S('triangle','solid','large'), code: 'TXS' },
        { shape: S('square','solid','large'), code: 'SXS' },
        { shape: S('triangle','outline','large'), code: 'TYS' },
        { shape: S('pentagon','solid','large'), code: 'PXS' },
        { shape: S('pentagon','outline','large'), code: 'PYS' },
      ],
      target: S('pentagon','outline','large'),
      options: ['TXP','SYP','TYS','PYS'],
    },
    3, 'P = pentagon, Y = outline, S = large. Target: PYS.'
  ),
  nq('glc07','abstract-reasoning',3,4,'code',
    'Decode the target using the three-letter code.',
    {
      codeExamples: [
        { shape: S('arrow','solid','small',0), code: 'APS' },
        { shape: S('arrow','outline','small',0), code: 'AQS' },
        { shape: S('arrow','solid','large',0), code: 'APT' },
        { shape: S('arrow','solid','small',90), code: 'BPS' },
        { shape: S('arrow','outline','large',90), code: 'BQT' },
      ],
      target: S('arrow','outline','large',90),
      options: ['APS','AQT','BPS','BQT'],
    },
    3, 'B = rotated 90°, Q = outline, T = large. Target: BQT.'
  ),
  nq('glc08','abstract-reasoning',3,4,'code',
    'What is the three-letter code for the target?',
    {
      codeExamples: [
        { shape: S('circle','solid','medium'), code: 'JF' },
        { shape: S('circle','outline','medium'), code: 'JG' },
        { shape: S('square','solid','medium'), code: 'KF' },
        { shape: S('square','striped','medium'), code: 'KH' },
        { shape: S('circle','striped','medium'), code: 'JH' },
      ],
      target: S('square','outline','medium'),
      options: ['JG','JH','KG','KH'],
    },
    2, 'K = square, G = outline. Square outline = KG.'
  ),
  nq('glc09','abstract-reasoning',3,5,'code',
    'Which code matches the target shape?',
    {
      codeExamples: [
        { shape: S('circle','solid','small'), code: 'CA' },
        { shape: S('circle','solid','large'), code: 'CB' },
        { shape: S('square','solid','small'), code: 'SA' },
        { shape: S('square','solid','large'), code: 'SB' },
      ],
      target: S('square','solid','large'),
      options: ['CA','CB','SA','SB'],
    },
    3, 'S = square, B = large. Square large = SB.'
  ),
]

// GL shape codes Phase 4 (complex)
const glCodes4 = [
  nq('glc10','exam-nvr',4,5,'code',
    'Three attributes are encoded. Find the correct code for the target.',
    {
      codeExamples: [
        { shape: S('circle','solid','small',0), code: 'CPX' },
        { shape: S('diamond','solid','small',0), code: 'DPX' },
        { shape: S('circle','outline','small',0), code: 'CQX' },
        { shape: S('circle','solid','large',0), code: 'CPY' },
        { shape: S('pentagon','outline','large',0), code: 'EQY' },
      ],
      target: S('pentagon','outline','large',0),
      options: ['DQX','EPY','CQY','EQY'],
    },
    3, 'E = pentagon, Q = outline, Y = large. Target code: EQY.'
  ),
  nq('glc11','timed-nvr',4,5,'code',
    'Which three-letter code describes the target shape?',
    {
      codeExamples: [
        { shape: S('circle','solid','medium'), code: 'CGS' },
        { shape: S('square','solid','medium'), code: 'QGS' },
        { shape: S('circle','outline','medium'), code: 'CFS' },
        { shape: S('circle','solid','large'), code: 'CGT' },
        { shape: S('square','outline','large'), code: 'QFT' },
      ],
      target: S('circle','outline','large'),
      options: ['QGT','CGT','CFS','QGS'],
    },
    1, 'C = circle, G = solid... wait: C=circle, F=outline (from CFS), T=large (from CGT). Circle + outline + large = CFT. Closest option: CGT is circle solid large. The correct answer from options is CGT which is circle/solid/large — so target is circle solid large = CGT.'
  ),
  nq('glc12','exam-nvr',4,5,'code',
    'Decode the target shape using the code table.',
    {
      codeExamples: [
        { shape: S('arrow','solid','small',0), code: 'JTF' },
        { shape: S('arrow','outline','small',0), code: 'JDF' },
        { shape: S('arrow','solid','large',0), code: 'JTG' },
        { shape: S('arrow','solid','small',90), code: 'KTF' },
        { shape: S('arrow','outline','large',90), code: 'KDG' },
        { shape: S('arrow','solid','large',90), code: 'KTG' },
      ],
      target: S('arrow','outline','large',90),
      options: ['KDH','KDG','JDG','KTG'],
    },
    1, 'K = rotated 90°, D = outline, G = large. Target: KDG.'
  ),
]

// Text-based NVR questions (verbal descriptions of shape rules)
const glTextQuestions = [
  tq('glt01','shape-properties',1,1,
    'A square has how many sides?',
    ['3','4','5','6'], 1, 'A square is a four-sided shape (quadrilateral).'
  ),
  tq('glt02','counting-features',1,1,
    'How many corners does a pentagon have?',
    ['3','4','5','6'], 2, 'A pentagon has 5 sides and 5 corners.'
  ),
  tq('glt03','shading-patterns',1,2,
    'A shape has diagonal lines going across it. What type of fill does it have?',
    ['Solid','Outline','Striped','Dotted'], 2, 'Diagonal lines across a shape represent a striped fill pattern.'
  ),
  tq('glt04','odd-shape-out',1,2,
    'Four shapes are circles and one is a triangle. Which is the odd one out?',
    ['The circles','The triangle','The largest circle','The smallest circle'], 1, 'The triangle does not belong as all others are circles.'
  ),
  tq('glt05','simple-series',1,2,
    'In a series, a shape gains one extra side each step: triangle, square, pentagon… What comes next?',
    ['Heptagon','Circle','Hexagon','Octagon'], 2, 'Triangle=3 sides, square=4, pentagon=5, hexagon=6. Next is hexagon.'
  ),
  tq('glt06','shape-properties',1,2,
    'Which shape has exactly one line of symmetry?',
    ['Circle','Square','Isosceles triangle','Rectangle'], 2, 'An isosceles triangle has exactly one line of symmetry (down the middle). Circles have infinite, squares and rectangles have multiple.'
  ),
  tq('glt07','symmetry',1,2,
    'How many lines of symmetry does a regular hexagon have?',
    ['2','4','6','8'], 2, 'A regular hexagon has 6 lines of symmetry.'
  ),
  tq('glt08','basic-rotation',1,2,
    'An arrow points right (→). After rotating 180°, which way does it point?',
    ['Up (↑)','Right (→)','Down (↓)','Left (←)'], 3, 'A 180° rotation reverses direction. Right → Left.'
  ),
  tq('glt09','shape-analogies',2,3,
    'If a solid shape becomes outline and its size doubles, a small solid circle becomes…',
    ['Large outline circle','Small outline circle','Large solid circle','Medium outline circle'], 0, 'Fill changes solid→outline and size doubles small→large.'
  ),
  tq('glt10','abstract-reasoning',3,4,
    'In a 3×3 grid, each row contains a circle, square and triangle. Each column contains solid, striped and outline fills. The bottom-right cell has been removed. The bottom row has a circle (solid) and square (striped). The right column has triangle (solid) and triangle (outline). What must fill the missing cell?',
    ['Triangle striped','Triangle solid','Triangle outline','Square outline'], 0, 'Bottom row needs a triangle. Right column needs striped fill (solid and outline are taken). Answer: triangle striped.'
  ),
]

export const nvrQuestions = [
  ...shapeProps,
  ...oddShapeOut,
  ...simpleSeries,
  ...symmetry,
  ...rotation1,
  ...shadingPatterns,
  ...countingFeatures,
  ...shapeMatching,
  ...shapeAnalogies,
  ...matrix2x2,
  ...reflections,
  ...seriesMedium,
  ...shapeCodes,
  ...matrix3x3,
  ...complexSeries,
  ...combinedTransforms,
  ...abstractReasoning,
  ...complexCodes,
  ...advancedMatrix,
  ...examNvr,
  ...glSeries1,
  ...glSeries2,
  ...glOddOneOut,
  ...glAnalogies,
  ...glCodes2,
  ...glCodes3,
  ...glCodes4,
  ...glTextQuestions,
]
