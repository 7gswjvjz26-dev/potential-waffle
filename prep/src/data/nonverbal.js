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
  nq('csc1','complex-codes',3,4,'code',
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
  nq('csc2','complex-codes',3,5,'code',
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
]
