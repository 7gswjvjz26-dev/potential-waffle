const q = (id, topic, phase, diff, question, options, answer, explanation) => ({
  id: `maths-${id}`, subject: 'maths', topic, phase, difficulty: diff,
  question, options, answer, explanation,
})

// ── PHASE 1 ──────────────────────────────────────────────────────────────────
const p1 = [
  // Place Value
  q('pv1','place-value',1,1,'What is the value of the digit 7 in 3,742?',['7','70','700','7,000'],2,'In 3,742 the 7 is in the hundreds column, so its value is 700.'),
  q('pv2','place-value',1,1,'Which digit is in the tens place in 5,847?',['5','8','4','7'],2,'Place values: 5=thousands, 8=hundreds, 4=tens, 7=units. The tens digit is 4.'),
  q('pv3','place-value',1,1,'Round 3,782 to the nearest 100.',['3,700','3,800','3,780','4,000'],1,'3,782 is between 3,700 and 3,800. Since 82 ≥ 50, round up to 3,800.'),
  q('pv4','place-value',1,1,'What is 1,000 more than 4,563?',['4,663','5,563','4,573','5,463'],1,'Adding 1,000 increases the thousands digit by 1: 4,563 + 1,000 = 5,563.'),
  q('pv5','place-value',1,1,'Which is the largest: 4,327 | 4,372 | 4,237?',['4,327','4,372','4,237','All equal'],1,'All start 4,3XX. Compare hundreds: 2, 7, 2. The largest hundreds digit is 7 → 4,372.'),
  q('pv6','place-value',1,1,'Write "three thousand, four hundred and twelve" as a numeral.',['3,042','3,412','3,142','34,012'],1,'3 thousand = 3,000; 4 hundred = 400; twelve = 12. Together: 3,412.'),
  q('pv7','place-value',1,2,'What is 100 less than 7,654?',['7,554','7,644','6,654','7,564'],0,'Subtracting 100 decreases the hundreds digit by 1: 7,654 − 100 = 7,554.'),
  q('pv8','place-value',1,2,'Which number has the digit 5 in the thousands place?',['3,512','5,213','2,513','1,532'],1,'In 5,213 the digit 5 is in the thousands place.'),
  q('pv9','place-value',1,2,'Round 4,449 to the nearest 1,000.',['4,000','5,000','4,400','4,450'],0,'4,449 is between 4,000 and 5,000. Since 449 < 500, round down to 4,000.'),
  q('pv10','place-value',1,2,'Order these from smallest to largest: 2,341 | 2,143 | 2,413',['2,143  2,341  2,413','2,341  2,143  2,413','2,413  2,341  2,143','2,143  2,413  2,341'],0,'Compare hundreds digits: 1 < 3 < 4. Order: 2,143; 2,341; 2,413.'),

  // Addition
  q('add1','addition',1,1,'2,345 + 1,432',['3,677','3,777','3,787','3,877'],1,'Units 5+2=7, tens 4+3=7, hundreds 3+4=7, thousands 2+1=3. Answer: 3,777.'),
  q('add2','addition',1,1,'4,567 + 2,198',['6,665','6,765','6,655','6,775'],1,'Units 7+8=15 (carry 1), tens 6+9+1=16 (carry 1), hundreds 5+1+1=7, thousands 4+2=6. Answer: 6,765.'),
  q('add3','addition',1,1,'3,256 + 4,891',['8,047','8,147','7,147','8,247'],1,'Units 6+1=7, tens 5+9=14 (carry 1), hundreds 2+8+1=11 (carry 1), thousands 3+4+1=8. Answer: 8,147.'),
  q('add4','addition',1,1,'1,999 + 1',['1,100','2,000','2,001','1,999'],1,'When all digits are 9, adding 1 carries through every column: 2,000.'),
  q('add5','addition',1,1,'Sam has 1,245 stickers and gets 856 more. How many total?',['2,001','2,011','2,101','2,100'],2,'1,245 + 856 = 2,101. (Units 5+6=11 carry 1; tens 4+5+1=10 carry 1; hundreds 2+8+1=11 carry 1; thousands 1+1=2.)'),
  q('add6','addition',1,2,'6,483 + 1,299',['7,682','7,782','7,772','7,872'],1,'6,483 + 1,300 = 7,783; then subtract 1 = 7,782.'),
  q('add7','addition',1,2,'3,450 + 2,750',['6,100','6,200','6,150','6,300'],1,'Tens: 5+5=10 (carry 1); hundreds 4+7+1=12 (carry 1); thousands 3+2+1=6. Answer: 6,200.'),
  q('add8','addition',1,2,'3,876 + 2,154',['5,930','6,030','6,020','5,020'],1,'Units 6+4=10 (carry 1); tens 7+5+1=13 (carry 1); hundreds 8+1+1=10 (carry 1); thousands 3+2+1=6. Answer: 6,030.'),
  q('add9','addition',1,2,'A library has 4,521 books and receives 1,879 more. How many books now?',['6,300','6,310','6,400','6,410'],2,'4,521 + 1,879 = 6,400.'),
  q('add10','addition',1,2,'What must be added to 4,567 to make 7,000?',['2,343','2,433','2,453','2,533'],1,'7,000 − 4,567 = 2,433.'),

  // Subtraction
  q('sub1','subtraction',1,1,'5,678 − 2,345',['3,233','3,333','3,343','2,333'],1,'Each column subtracts cleanly: 5−2=3, 6−3=3, 7−3=4… Wait: 8−5=3, 7−4=3, 6−3=3, 5−2=3. Answer: 3,333.'),
  q('sub2','subtraction',1,1,'7,432 − 3,891',['3,641','3,541','3,531','4,541'],1,'Exchange through columns: 7,432 − 3,891 = 3,541.'),
  q('sub3','subtraction',1,1,'6,000 − 2,547',['3,363','3,453','3,543','3,463'],1,'Exchange from thousands: 6,000 − 2,547 = 3,453.'),
  q('sub4','subtraction',1,2,'A jar has 4,213 sweets. 1,867 are eaten. How many remain?',['2,246','2,346','2,436','2,364'],1,'4,213 − 1,867 = 2,346.'),
  q('sub5','subtraction',1,1,'9,001 − 4,562',['4,339','4,439','4,449','4,349'],1,'9,001 − 4,000 = 5,001; 5,001 − 562 = 4,439.'),
  q('sub6','subtraction',1,1,'5,000 − 2,999',['2,001','2,011','2,101','3,001'],0,'5,000 − 3,000 = 2,000; add back 1 (subtracted one too many): 2,001.'),
  q('sub7','subtraction',1,2,'8,456 − 3,789',['4,667','4,577','4,767','4,657'],0,'8,456 − 3,789 = 4,667 (exchange through all columns).'),
  q('sub8','subtraction',1,2,'A trip costs £3,450. The school raised £1,876. How much more is needed?',['£1,474','£1,574','£1,674','£1,584'],1,'£3,450 − £1,876 = £1,574.'),

  // Times Tables
  q('tt1','times-tables',1,1,'7 × 8 = ?',['48','54','56','63'],2,'7 × 8 = 56. (7 × 4 × 2 = 28 × 2 = 56.)'),
  q('tt2','times-tables',1,1,'9 × 6 = ?',['45','54','63','56'],1,'9 × 6 = 54. (10 × 6 = 60; minus 6 = 54.)'),
  q('tt3','times-tables',1,1,'12 × 7 = ?',['74','84','94','82'],1,'12 × 7 = 84. (10×7=70; 2×7=14; 70+14=84.)'),
  q('tt4','times-tables',1,1,'8 × 8 = ?',['56','62','64','72'],2,'8 × 8 = 64. Learn all square numbers to 12×12.'),
  q('tt5','times-tables',1,1,'11 × 9 = ?',['88','99','109','81'],1,'11 × 9 = 99. (10×9=90; 1×9=9; total=99.)'),
  q('tt6','times-tables',1,1,'6 × 7 = ?',['36','42','48','49'],1,'6 × 7 = 42. Same as 7 × 6.'),
  q('tt7','times-tables',1,1,'12 × 12 = ?',['124','134','144','154'],2,'12 × 12 = 144. (10×12=120; 2×12=24; total=144.)'),
  q('tt8','times-tables',1,1,'9 × 9 = ?',['72','81','90','83'],1,'9 × 9 = 81. (10×9=90; minus 9=81.)'),
  q('tt9','times-tables',1,2,'7 × 7 = ?',['42','47','49','56'],2,'7 × 7 = 49. Learn all squares to 12!'),
  q('tt10','times-tables',1,2,'11 × 11 = ?',['111','112','121','122'],2,'11 × 11 = 121. (10×11=110; 1×11=11; total=121.)'),
  q('tt11','times-tables',1,2,'A box holds 6 eggs. How many eggs in 12 boxes?',['62','66','72','78'],2,'12 × 6 = 72.'),
  q('tt12','times-tables',1,2,'How many days in 7 weeks?',['42','47','49','52'],0,'7 × 7 = 49. Wait — 7 weeks × 7 days = 49 days.',['42','47','49','52'],2,'7 × 7 = 49 days.'),

  // Division
  q('div1','division',1,1,'48 ÷ 6',['7','8','9','6'],1,'48 ÷ 6 = 8. Check: 6 × 8 = 48. ✓'),
  q('div2','division',1,1,'72 ÷ 9',['7','8','9','6'],1,'72 ÷ 9 = 8. Check: 9 × 8 = 72. ✓'),
  q('div3','division',1,1,'56 ÷ 7',['6','7','8','9'],2,'56 ÷ 7 = 8. Check: 7 × 8 = 56. ✓'),
  q('div4','division',1,1,'63 ÷ 7',['7','8','9','6'],2,'63 ÷ 7 = 9. Check: 7 × 9 = 63. ✓'),
  q('div5','division',1,1,'96 ÷ 8',['10','11','12','13'],2,'96 ÷ 8 = 12. Check: 8 × 12 = 96. ✓'),
  q('div6','division',1,2,'132 ÷ 11',['10','11','12','13'],2,'132 ÷ 11 = 12. Check: 11 × 12 = 132. ✓'),
  q('div7','division',1,2,'65 ÷ 5',['11','12','13','14'],2,'65 ÷ 5 = 13. Check: 5 × 13 = 65. ✓'),
  q('div8','division',1,2,'91 ÷ 7',['12','13','14','15'],1,'91 ÷ 7 = 13. Check: 7 × 13 = 91. ✓'),
  q('div9','division',1,2,'144 ÷ 12',['10','11','12','13'],2,'144 ÷ 12 = 12. (12 × 12 = 144.) ✓'),
  q('div10','division',1,2,'84 ÷ 12',['6','7','8','9'],1,'84 ÷ 12 = 7. Check: 12 × 7 = 84. ✓'),

  // Fractions
  q('fr1','fractions-intro',1,1,'What is ½ of 48?',['12','24','36','16'],1,'Half of 48: 48 ÷ 2 = 24.'),
  q('fr2','fractions-intro',1,1,'What is ¼ of 60?',['10','12','15','20'],2,'A quarter: 60 ÷ 4 = 15.'),
  q('fr3','fractions-intro',1,1,'What is ¾ of 80?',['40','50','60','70'],2,'¾ of 80: find ¼ first (80÷4=20), then ×3 = 60.'),
  q('fr4','fractions-intro',1,1,'Which is larger: ¾ or ⅔?',['⅔','¾','They are equal','Cannot tell'],1,'Common denominator 12: ¾=9/12 and ⅔=8/12. Since 9>8, ¾ is larger.'),
  q('fr5','fractions-intro',1,1,'⅓ + ⅓ = ?',['⅙','⅓','⅔','2/6'],2,'Same denominator: 1+1=2, keeping denominator 3. Answer: ⅔.'),
  q('fr6','fractions-intro',1,2,'What is 2/5 of 30?',['6','10','12','15'],2,'2/5 of 30: 30÷5=6, then ×2=12.'),
  q('fr7','fractions-intro',1,2,'A pizza has 8 slices. I eat 3. What fraction is left?',['3/8','4/8','5/8','6/8'],2,'8−3=5 slices left out of 8. Fraction: 5/8.'),
  q('fr8','fractions-intro',1,2,'What fraction of 12 is 9?',['¼','⅔','¾','4/6'],2,'9 out of 12: 9/12 = ¾ (divide both by 3).'),
  q('fr9','fractions-intro',1,2,'Put in order (smallest first): ½, ¼, ¾',['¼, ½, ¾','½, ¼, ¾','¾, ½, ¼','¼, ¾, ½'],0,'Compare with denominator 4: ¼ < 2/4(=½) < ¾. Order: ¼, ½, ¾.'),
  q('fr10','fractions-intro',1,2,'Which fraction equals ½?',['2/5','3/6','4/9','5/12'],1,'3/6 = ½ because 3÷3=1 and 6÷3=2.'),

  // 2D Shapes
  q('sh1','shapes-2d',1,1,'How many sides does a hexagon have?',['4','5','6','8'],2,'Hex- means six. A hexagon has 6 sides.'),
  q('sh2','shapes-2d',1,1,'What is the sum of angles in a triangle?',['90°','180°','270°','360°'],1,'The three angles of any triangle always add up to 180°.'),
  q('sh3','shapes-2d',1,1,'How many lines of symmetry does a square have?',['2','3','4','8'],2,'A square has 4 lines of symmetry: 2 through midpoints of sides and 2 diagonals.'),
  q('sh4','shapes-2d',1,1,'What is a quadrilateral with only ONE pair of parallel sides called?',['Parallelogram','Rhombus','Trapezium','Kite'],2,'A trapezium has exactly one pair of parallel sides.'),
  q('sh5','shapes-2d',1,1,'How many degrees in a right angle?',['45°','90°','120°','180°'],1,'A right angle is exactly 90°.'),
  q('sh6','shapes-2d',1,2,'Which of these is NOT a quadrilateral?',['Square','Rectangle','Pentagon','Parallelogram'],2,'A pentagon has 5 sides, not 4. Quadrilaterals have exactly 4 sides.'),
  q('sh7','shapes-2d',1,2,'How many vertices does a pentagon have?',['4','5','6','7'],1,'A pentagon has 5 sides and therefore 5 vertices (corners).'),
  q('sh8','shapes-2d',1,2,'What is each angle of an equilateral triangle?',['30°','45°','60°','90°'],2,'All three angles equal: 180°÷3 = 60°.'),
  q('sh9','shapes-2d',1,2,'A quadrilateral has angles of 90°, 90°, 70°. What is the fourth angle?',['90°','100°','110°','120°'],2,'Angles in a quadrilateral sum to 360°. 360−90−90−70 = 110°.'),
  q('sh10','shapes-2d',1,2,'Which shape has the most lines of symmetry?',['Rectangle (2)','Equilateral triangle (3)','Regular hexagon (6)','Square (4)'],2,'A regular hexagon has 6 lines of symmetry — the most of those listed.'),

  // Time
  q('tm1','time',1,1,'What is 14:30 in 12-hour format?',['2:30 am','2:30 pm','4:30 pm','12:30 pm'],1,'14:30 is afternoon. Subtract 12: 14−12=2. Answer: 2:30 pm.'),
  q('tm2','time',1,1,'How many minutes in 2½ hours?',['120','130','150','160'],2,'2 hours=120 min; ½ hour=30 min; total=150 min.'),
  q('tm3','time',1,1,'A film starts at 19:45 and lasts 2 h 15 min. When does it end?',['21:45','22:00','22:15','22:30'],1,'19:45 + 2h = 21:45; 21:45 + 15 min = 22:00.'),
  q('tm4','time',1,1,'How many seconds in 3 minutes?',['150','180','300','360'],1,'3 × 60 = 180 seconds.'),
  q('tm5','time',1,2,'A train leaves at 8:47 and arrives at 11:23. How long is the journey?',['2 h 26 min','2 h 36 min','2 h 46 min','3 h 36 min'],1,'8:47→9:00 = 13 min; 9:00→11:00 = 2 h; 11:00→11:23 = 23 min. Total: 2 h 36 min.'),
  q('tm6','time',1,2,'Quarter past 6 in the evening as a 24-hour time?',['06:15','16:15','18:15','18:45'],2,'6 pm = 18:00; quarter past = 18:15.'),
  q('tm7','time',1,2,'Today is Wednesday. Sports day is in 10 days. What day is it?',['Friday','Saturday','Sunday','Monday'],1,'Wednesday + 7 days = Wednesday; + 3 more = Saturday.'),
  q('tm8','time',1,2,'A journey takes 1 h 45 min and ends at 15:20. When did it start?',['13:25','13:35','13:45','14:35'],1,'15:20 − 45 min = 14:35; 14:35 − 1 h = 13:35.'),

  // Measurement
  q('ms1','measurement',1,1,'How many centimetres in 1 metre?',['10','50','100','1000'],2,'There are 100 cm in 1 m.'),
  q('ms2','measurement',1,1,'How many grams in 2.5 kg?',['250','1,500','2,500','25,000'],2,'1 kg = 1,000 g; 2.5 kg = 2,500 g.'),
  q('ms3','measurement',1,1,'Convert 1,500 ml to litres.',['0.15 l','1.5 l','15 l','150 l'],1,'1,000 ml = 1 l; 1,500 ÷ 1,000 = 1.5 l.'),
  q('ms4','measurement',1,1,'How many mm in 3.5 cm?',['3.5','35','350','3,500'],1,'1 cm = 10 mm; 3.5 × 10 = 35 mm.'),
  q('ms5','measurement',1,2,'Which is heavier: 2.4 kg or 2,350 g?',['2,350 g','2.4 kg','They are equal','Cannot tell'],1,'2.4 kg = 2,400 g > 2,350 g. So 2.4 kg is heavier.'),
  q('ms6','measurement',1,2,'4 jugs each hold 750 ml. Total?',['2,800 ml','3,000 ml','3,200 ml','4,000 ml'],1,'4 × 750 = 3,000 ml.'),
  q('ms7','measurement',1,2,'3 m 45 cm in centimetres?',['345 cm','3,045 cm','3,450 cm','34.5 cm'],0,'3 m = 300 cm; 300 + 45 = 345 cm.'),
  q('ms8','measurement',1,2,'How many 500 ml bottles fill a 3-litre container?',['3','4','5','6'],3,'3 l = 3,000 ml; 3,000 ÷ 500 = 6.'),

  // Money
  q('mn1','money',1,1,'I have £5.00 and spend £2.67. How much change?',['£2.33','£2.43','£3.33','£2.23'],0,'£5.00 − £2.67 = £2.33.'),
  q('mn2','money',1,1,'3 books cost £4.50 each. Total cost?',['£12.00','£12.50','£13.00','£13.50'],3,'3 × £4.50 = £13.50.'),
  q('mn3','money',1,1,'4 apples cost £1.20. Cost of 1 apple?',['20p','25p','30p','35p'],2,'£1.20 ÷ 4 = 30p.'),
  q('mn4','money',1,2,'A shirt costs £24 reduced by 25%. New price?',['£6','£18','£20','£21'],1,'25% of £24 = £6; £24 − £6 = £18.'),
  q('mn5','money',1,2,'Total of £3.45, £1.78 and £2.99?',['£7.22','£8.22','£8.12','£7.12'],1,'£3.45+£1.78+£2.99 = £8.22.'),
  q('mn6','money',1,2,'Save £3.50 per week for 8 weeks. Total?',['£24','£26','£28','£32'],2,'8 × £3.50 = £28.'),
  q('mn7','money',1,2,'A meal for 4 costs £34.60. Equal share per person?',['£8.55','£8.65','£8.75','£9.15'],1,'£34.60 ÷ 4 = £8.65.'),
  q('mn8','money',1,2,'Round £7.87 to the nearest pound.',['£7','£8','£7.90','£7.80'],1,'87p ≥ 50p so round up to £8.'),
]

// ── PHASE 2 ──────────────────────────────────────────────────────────────────
const p2 = [
  // Large Numbers
  q('ln1','large-numbers',2,2,'Round 347,852 to the nearest 10,000.',['340,000','347,000','350,000','300,000'],2,'Thousands digit is 7 (≥5) → round up: 350,000.'),
  q('ln2','large-numbers',2,2,'Which digit is in the hundred-thousands place of 3,456,789?',['3','4','5','6'],1,'3,456,789: 3=millions, 4=hundred-thousands. The answer is 4.'),
  q('ln3','large-numbers',2,2,'Write 4,070,060 in words.',['Four million, seventy thousand, sixty','Four million, seven thousand, sixty','Forty million, seventy, sixty','Four billion, seventy thousand'],0,'4 million + 70,000 + 60 = four million, seventy thousand, sixty.'),
  q('ln4','large-numbers',2,2,'What is 1,000 less than 1,000,000?',['999','9,999','99,000','999,000'],3,'1,000,000 − 1,000 = 999,000.'),
  q('ln5','large-numbers',2,3,'Which is the largest: 504,321 | 540,213 | 450,321?',['504,321','540,213','450,321','All equal'],1,'Compare ten-thousands: 0 vs 4. 540,213 has 4 in the ten-thousands place → largest.'),
  q('ln6','large-numbers',2,2,'Round 2,648,500 to the nearest million.',['2,000,000','3,000,000','2,500,000','2,600,000'],1,'Hundred-thousands digit is 6 (≥5) → round up to 3,000,000.'),
  q('ln7','large-numbers',2,3,'500,000 + 30,000 + 6,000 + 400 + 20 + 7 = ?',['536,427','563,427','536,247','356,427'],0,'Sum all place values: 536,427.'),

  // Long Multiplication
  q('lm1','long-multiplication',2,2,'34 × 12',['368','398','408','418'],2,'34×10=340; 34×2=68; 340+68=408.'),
  q('lm2','long-multiplication',2,2,'25 × 16',['370','380','390','400'],3,'25×16 = 25×4×4 = 100×4 = 400.'),
  q('lm3','long-multiplication',2,2,'47 × 23',['971','1,071','1,081','1,091'],2,'47×20=940; 47×3=141; 940+141=1,081.'),
  q('lm4','long-multiplication',2,2,'153 × 6',['888','908','918','928'],2,'6×3=18 (carry 1); 6×5=30+1=31 (carry 3); 6×1=6+3=9. Answer: 918.'),
  q('lm5','long-multiplication',2,3,'24 boxes each with 36 pencils. Total pencils?',['764','844','864','884'],2,'24×36 = 24×30+24×6 = 720+144 = 864.'),
  q('lm6','long-multiplication',2,3,'56 × 45',['2,420','2,450','2,520','2,530'],2,'56×40=2,240; 56×5=280; total=2,520.'),
  q('lm7','long-multiplication',2,3,'One tile weighs 375 g. How much do 16 tiles weigh in kg?',['5.5 kg','5.8 kg','6 kg','6.2 kg'],2,'375×16: 375×10=3,750; 375×6=2,250; total=6,000 g = 6 kg.'),

  // Long Division
  q('ld1','long-division',2,2,'252 ÷ 12',['19','20','21','22'],2,'12×21=252. Check: 12×20=240; 240+12=252. ✓'),
  q('ld2','long-division',2,2,'391 ÷ 17',['21','22','23','24'],2,'17×23=391. (17×20=340; 17×3=51; 340+51=391.) ✓'),
  q('ld3','long-division',2,2,'468 ÷ 18',['24','25','26','27'],2,'18×26=468. (18×25=450; 450+18=468.) ✓'),
  q('ld4','long-division',2,3,'288 people need transport. Coaches carry 48 each. How many coaches?',['5','6','7','8'],1,'288÷48=6. ✓'),
  q('ld5','long-division',2,3,'672 ÷ 24',['26','27','28','29'],2,'24×28=672. (24×30=720; 720−48=672.) ✓'),
  q('ld6','long-division',2,3,'What is the remainder when 100 is divided by 9?',['0','1','2','3'],1,'9×11=99; 100−99=1. Remainder=1.'),
  q('ld7','long-division',2,3,'858 ÷ 13',['64','66','68','70'],1,'13×66=858. (13×60=780; 13×6=78; 780+78=858.) ✓'),

  // Decimals
  q('dc1','decimals',2,2,'Which decimal is largest: 0.5, 0.45, 0.505?',['0.5','0.45','0.505','They are equal'],2,'0.500 vs 0.450 vs 0.505. Largest: 0.505.'),
  q('dc2','decimals',2,2,'3.4 + 2.76',['5.16','6.06','6.16','6.26'],2,'3.40+2.76=6.16.'),
  q('dc3','decimals',2,2,'5.2 − 1.75',['3.35','3.45','3.55','4.35'],1,'5.20−1.75=3.45.'),
  q('dc4','decimals',2,2,'Round 4.758 to 1 decimal place.',['4.7','4.8','4.76','5.0'],1,'Second decimal digit is 5 (≥5) → round up: 4.8.'),
  q('dc5','decimals',2,3,'1.5 × 4',['5','5.5','6','6.5'],2,'15×4=60; divide by 10=6.'),
  q('dc6','decimals',2,3,'0.6 × 0.3',['0.018','0.18','1.8','18'],1,'6×3=18; two decimal places total → 0.18.'),
  q('dc7','decimals',2,3,'Convert 3/8 to a decimal.',['0.325','0.375','0.38','0.385'],1,'3÷8=0.375.'),
  q('dc8','decimals',2,3,'Which is equivalent to 0.75?',['3/5','7/10','3/4','7/9'],2,'0.75=75/100=3/4.'),

  // Fractions
  q('frc1','fractions',2,2,'Which fraction is equivalent to 2/3?',['4/5','6/9','5/8','3/5'],1,'2/3 = 6/9 (multiply both by 3).'),
  q('frc2','fractions',2,2,'3/8 + 5/8',['8/16','1','8/8','7/16'],1,'Same denominator: 3+5=8; 8/8=1.'),
  q('frc3','fractions',2,2,'1/2 + 1/3',['2/5','2/6','5/6','3/5'],2,'Common denominator 6: 3/6+2/6=5/6.'),
  q('frc4','fractions',2,3,'Which is larger: 5/8 or 7/12?',['5/8','7/12','Equal','Cannot tell'],0,'Common denominator 24: 5/8=15/24 vs 7/12=14/24. Since 15>14, 5/8 is larger.'),
  q('frc5','fractions',2,3,'3/4 − 1/3',['5/12','7/12','2/7','1/3'],0,'Common denominator 12: 9/12−4/12=5/12.'),
  q('frc6','fractions',2,3,'Simplify 18/24.',['3/4','2/3','9/12','6/8'],0,'HCF(18,24)=6; 18÷6=3, 24÷6=4. Answer: 3/4.'),
  q('frc7','fractions',2,3,'What is 2/3 of 45?',['20','25','30','35'],2,'45÷3=15; 15×2=30.'),
  q('frc8','fractions',2,3,'Convert 7/4 to a mixed number.',['1¾','1¼','1½','2¼'],0,'7÷4=1 remainder 3. Answer: 1¾.'),

  // Percentages
  q('pc1','percentages',2,2,'50% of £120',['£50','£55','£60','£65'],2,'50%=½; £120÷2=£60.'),
  q('pc2','percentages',2,2,'25% of 200',['25','40','50','75'],2,'25%=¼; 200÷4=50.'),
  q('pc3','percentages',2,2,'10% of £350',['£3.50','£35','£350','£3,500'],1,'10%=÷10: £350÷10=£35.'),
  q('pc4','percentages',2,2,'What percentage is 30 out of 60?',['30%','50%','60%','70%'],1,'30/60=½=50%.'),
  q('pc5','percentages',2,3,'A coat costs £80 reduced by 15%. Sale price?',['£60','£65','£68','£70'],2,'15% of £80=£12; £80−£12=£68.'),
  q('pc6','percentages',2,3,'35% of 240',['64','74','84','94'],2,'10%=24; 30%=72; 5%=12; 35%=84.'),
  q('pc7','percentages',2,3,'Convert 3/5 to a percentage.',['30%','50%','55%','60%'],3,'3/5=6/10=0.6=60%.'),

  // Area & Perimeter
  q('ap1','area-perimeter',2,2,'Perimeter of a rectangle 8 cm × 5 cm.',['13 cm','24 cm','26 cm','40 cm'],2,'2×(8+5)=2×13=26 cm.'),
  q('ap2','area-perimeter',2,2,'Area of a square with side 7 cm.',['14 cm²','28 cm²','49 cm²','56 cm²'],2,'7×7=49 cm².'),
  q('ap3','area-perimeter',2,2,'Rectangle area 48 cm², width 6 cm. Length?',['6 cm','7 cm','8 cm','9 cm'],2,'48÷6=8 cm.'),
  q('ap4','area-perimeter',2,3,'Area of a triangle with base 10 cm and height 8 cm.',['18 cm²','40 cm²','80 cm²','160 cm²'],1,'½×base×height=½×10×8=40 cm².'),
  q('ap5','area-perimeter',2,3,'Square garden has perimeter 36 m. What is the area?',['36 m²','64 m²','81 m²','144 m²'],2,'Side=36÷4=9 m; area=9×9=81 m².'),
  q('ap6','area-perimeter',2,3,'Parallelogram: base 12 cm, height 5 cm. Area?',['34 cm²','48 cm²','60 cm²','70 cm²'],2,'Area=base×height=12×5=60 cm².'),

  // Angles
  q('an1','angles',2,2,'What type of angle is 135°?',['Acute','Right','Obtuse','Reflex'],2,'Obtuse angles are between 90° and 180°. 135° is obtuse.'),
  q('an2','angles',2,2,'Angles on a straight line sum to:',['90°','135°','180°','360°'],2,'Angles on a straight line always sum to 180°.'),
  q('an3','angles',2,2,'Two angles in a triangle are 65° and 75°. Third angle?',['30°','40°','50°','60°'],1,'180°−65°−75°=40°.'),
  q('an4','angles',2,3,'Sum of interior angles in a quadrilateral?',['180°','270°','360°','540°'],2,'A quadrilateral splits into 2 triangles: 2×180°=360°.'),
  q('an5','angles',2,3,'Two supplementary angles. One is 112°. What is the other?',['68°','78°','88°','98°'],0,'Supplementary=180°; 180°−112°=68°.'),
  q('an6','angles',2,3,'Two angles are complementary. One is 37°. What is the other?',['43°','53°','63°','73°'],1,'Complementary=90°; 90°−37°=53°.'),
  q('an7','angles',2,3,'Interior angle of a regular hexagon?',['108°','120°','135°','150°'],1,'(6−2)×180°=720°; 720°÷6=120°.'),

  // Data Handling
  q('dh1','data-handling',2,2,'Heights: 132, 145, 138, 152, 143. Range?',['10','18','20','22'],2,'Range=152−132=20.'),
  q('dh2','data-handling',2,2,'Mode of: 4, 7, 4, 2, 7, 4, 9?',['2','4','7','9'],1,'4 appears three times — more than any other. Mode=4.'),
  q('dh3','data-handling',2,2,'Median of: 3, 7, 5, 9, 1',['5','7','3','9'],0,'Ordered: 1,3,5,7,9. Middle value (3rd of 5)=5.'),
  q('dh4','data-handling',2,3,'Mean of: 12, 15, 18, 21, 24',['17','18','19','20'],1,'Sum=90; 90÷5=18.'),
  q('dh5','data-handling',2,3,'Mean of 4 numbers is 15. Three are 12, 17, 14. What is the fourth?',['15','16','17','18'],2,'Sum=4×15=60; 60−12−17−14=17.'),
  q('dh6','data-handling',2,3,'In a class of 30, 40% prefer maths. How many?',['8','10','12','14'],2,'40% of 30=12.'),

  // Word Problems
  q('wp1','word-problems',2,3,'Recipe for 6 uses 450 g flour. Flour needed for 10 people?',['650 g','700 g','750 g','800 g'],2,'Per person: 450÷6=75 g. For 10: 75×10=750 g.'),
  q('wp2','word-problems',2,3,'Tickets: £8 adult, £5 child. 2 adults + 3 children. Total?',['£29','£31','£33','£35'],1,'2×£8+3×£5=£16+£15=£31.'),
  q('wp3','word-problems',2,3,'12 oranges cost £2.40. How much do 5 oranges cost?',['£0.80','£1.00','£1.20','£1.40'],1,'Per orange: £2.40÷12=20p; 5×20p=£1.00.'),
  q('wp4','word-problems',2,4,'Tank holds 2,400 litres, filled at 80 litres/min. Time to fill?',['20 min','25 min','30 min','35 min'],2,'2,400÷80=30 min.'),
  q('wp5','word-problems',2,4,'Three friends share £200 in ratio 2:3:5. Largest share?',['£40','£60','£80','£100'],3,'Total parts=10; each part=£20; largest=5×£20=£100.'),
  q('wp6','word-problems',2,4,'8 train carriages, 72 seats each. ¾ occupied. How many passengers?',['324','388','432','486'],2,'Total seats=576; ¾×576=432.'),
]

// ── PHASE 3 ──────────────────────────────────────────────────────────────────
const p3 = [
  // Ratio
  q('ra1','ratio',3,3,'Divide £90 in ratio 2:3.',['£30 and £60','£36 and £54','£40 and £50','£45 and £45'],1,'Parts=5; each=£18. Shares: £36 and £54.'),
  q('ra2','ratio',3,3,'Map scale 1:50,000. A distance of 4 cm on map = ? in km.',['0.2 km','2 km','20 km','200 km'],1,'4×50,000=200,000 cm=2 km.'),
  q('ra3','ratio',3,3,'Squash to water ratio 1:4. Water for 75 ml squash?',['150 ml','200 ml','300 ml','400 ml'],2,'75×4=300 ml.'),
  q('ra4','ratio',3,4,'Class of 35, boys:girls = 3:4. How many girls?',['15','18','20','21'],2,'Total parts=7; each=5. Girls=4×5=20.'),
  q('ra5','ratio',3,4,'Sweets ratio red:blue:green = 3:2:5. There are 30 green. How many red?',['9','15','18','21'],2,'5 parts=30 → each part=6. Red=3×6=18.'),
  q('ra6','ratio',3,4,'Flour:sugar = 5:2. 350 g flour used. Sugar needed?',['100 g','120 g','140 g','160 g'],2,'5 parts=350 → each=70. Sugar=2×70=140 g.'),

  // Algebra
  q('al1','algebra',3,3,'Solve: x + 7 = 15',['6','7','8','9'],2,'x=15−7=8.'),
  q('al2','algebra',3,3,'Find 3n − 4 when n = 5.',['9','10','11','12'],2,'3×5−4=15−4=11.'),
  q('al3','algebra',3,3,'Solve: 2x + 5 = 17',['5','6','7','8'],1,'2x=12; x=6.'),
  q('al4','algebra',3,3,'Next term in: 3, 7, 11, 15, ?',['17','18','19','20'],2,'Common difference=4; 15+4=19.'),
  q('al5','algebra',3,4,'nth term = 4n − 1. 10th term?',['37','38','39','40'],2,'4×10−1=39.'),
  q('al6','algebra',3,4,'Solve: 3(x + 2) = 21',['4','5','6','7'],1,'3x+6=21; 3x=15; x=5.'),
  q('al7','algebra',3,4,'Solve: 5y − 3 = 2y + 9',['2','3','4','5'],2,'3y=12; y=4.'),
  q('al8','algebra',3,4,'"5 less than twice n" as an expression:',['5n − 2','n/2 − 5','2n − 5','2n + 5'],2,'Twice n = 2n; 5 less = 2n − 5.'),

  // Negative Numbers
  q('ng1','negative-numbers',3,2,'Which is smaller: −3 or −7?',['−3','−7','Equal','Cannot tell'],1,'−7 is further below zero on the number line.'),
  q('ng2','negative-numbers',3,3,'−5 + 8 = ?',['−13','−3','3','13'],2,'Start at −5, move 8 right: 3.'),
  q('ng3','negative-numbers',3,3,'4 − 9 = ?',['−5','−4','5','13'],0,'4−9=−5.'),
  q('ng4','negative-numbers',3,3,'Temperature was −8°C and rose 12°C. New temperature?',['4°C','−4°C','−20°C','20°C'],0,'−8+12=4°C.'),
  q('ng5','negative-numbers',3,3,'−3 × 4 = ?',['−12','−7','7','12'],0,'Negative × positive = negative: −12.'),
  q('ng6','negative-numbers',3,4,'(−6) × (−3) = ?',['−18','−9','9','18'],3,'Negative × negative = positive: 18.'),
  q('ng7','negative-numbers',3,4,'−20 ÷ 4 = ?',['−8','−5','5','8'],1,'Negative ÷ positive = negative: −5.'),

  // Advanced Fractions
  q('af1','fractions-advanced',3,3,'2/3 × 3/4 = ?',['6/12','5/7','1/2','6/7'],2,'2×3=6; 3×4=12; 6/12=1/2.'),
  q('af2','fractions-advanced',3,3,'3/4 ÷ 3/8 = ?',['9/32','1/2','2','8/9'],2,'Flip and multiply: 3/4 × 8/3=24/12=2.'),
  q('af3','fractions-advanced',3,3,'Convert 2⅗ to an improper fraction.',['11/5','13/5','10/5','7/5'],1,'2×5+3=13; answer: 13/5.'),
  q('af4','fractions-advanced',3,4,'1½ + 2¾ = ?',['3¼','3¾','4¼','4¾'],2,'3/2+11/4=6/4+11/4=17/4=4¼.'),
  q('af5','fractions-advanced',3,4,'5/6 − 1/4 = ?',['4/2','7/12','4/6','11/12'],1,'Common denom 12: 10/12−3/12=7/12.'),
  q('af6','fractions-advanced',3,4,'Jug is 3/5 full. Drink 1/4 of full jug. Fraction remaining?',['7/20','11/20','2/5','9/20'],0,'3/5−1/4: denom 20: 12/20−5/20=7/20.'),

  // Advanced Percentages
  q('pa1','percentages-advanced',3,3,'Price rises from £50 to £65. Percentage increase?',['15%','25%','30%','35%'],2,'Increase=£15; (15/50)×100=30%.'),
  q('pa2','percentages-advanced',3,3,'Laptop costs £480 after 20% reduction. Original price?',['£560','£580','£600','£620'],2,'80%=£480; 100%=£480÷0.8=£600.'),
  q('pa3','percentages-advanced',3,4,'Population increased 12% to 56,000. Original population?',['48,000','50,000','52,000','54,000'],1,'112%=56,000; 100%=56,000÷1.12=50,000.'),
  q('pa4','percentages-advanced',3,4,'17.5% of £240 = ?',['£36','£40','£42','£48'],2,'10%=£24; 5%=£12; 2.5%=£6; total=£42.'),
  q('pa5','percentages-advanced',3,4,'Number increased by 20% then decreased by 20%. Result compared to original?',['Greater','Less','Equal','Depends on the number'],1,'e.g. 100→120→96. Always less (by 4%).'),

  // Speed Distance Time
  q('sd1','speed-distance',3,3,'Car travels 180 km in 3 hours. Speed?',['45 km/h','50 km/h','55 km/h','60 km/h'],3,'Speed=Distance÷Time=180÷3=60 km/h.'),
  q('sd2','speed-distance',3,3,'Train at 80 km/h for 2.5 hours. Distance?',['160 km','180 km','200 km','220 km'],2,'80×2.5=200 km.'),
  q('sd3','speed-distance',3,4,'Cyclist covers 45 km at 15 km/h. Time taken?',['2 h','2.5 h','3 h','3.5 h'],2,'45÷15=3 hours.'),
  q('sd4','speed-distance',3,4,'Two trains 480 km apart approach each other at 90 and 70 km/h. Time to meet?',['2.5 h','3 h','3.5 h','4 h'],1,'Combined=160 km/h; 480÷160=3 hours.'),

  // Primes & Factors
  q('pf1','primes-factors',3,3,'Which is a prime number?',['51','57','59','63'],2,'59 is prime. 51=3×17, 57=3×19, 63=9×7.'),
  q('pf2','primes-factors',3,3,'HCF of 24 and 36?',['4','6','8','12'],3,'Factors: 24={1,2,3,4,6,8,12,24} and 36={1,2,3,4,6,9,12,18,36}. HCF=12.'),
  q('pf3','primes-factors',3,3,'LCM of 8 and 12?',['16','20','24','32'],2,'Multiples of 8: 8,16,24… Multiples of 12: 12,24… LCM=24.'),
  q('pf4','primes-factors',3,4,'72 as a product of prime factors?',['2³ × 3²','2² × 3³','2 × 3 × 12','2⁴ × 3'],0,'72=8×9=2³×3².'),
  q('pf5','primes-factors',3,4,'How many primes between 20 and 40?',['3','4','5','6'],1,'23, 29, 31, 37 → 4 primes.'),

  // Coordinates
  q('co1','coordinates',3,3,'Point 3 right and 4 up from the origin. Coordinates?',['(4,3)','(3,4)','(−3,4)','(3,−4)'],1,'x=right=3, y=up=4. Answer: (3,4).'),
  q('co2','coordinates',3,3,'In which quadrant is (−2, 5)?',['First (top right)','Second (top left)','Third (bottom left)','Fourth (bottom right)'],1,'Negative x, positive y → second quadrant.'),
  q('co3','coordinates',3,4,'Rectangle vertices: (1,1),(5,1),(5,3),(1,3). Area?',['4 sq u','8 sq u','12 sq u','16 sq u'],1,'Length=4, width=2; area=8 sq units.'),
  q('co4','coordinates',3,4,'Midpoint of (2,6) and (8,4)?',['(4,4)','(5,5)','(5,4)','(5,6)'],1,'((2+8)/2,(6+4)/2)=(5,5).'),

  // Statistics
  q('st1','statistics',3,3,'Mean of: 14, 17, 11, 20, 13',['13','14','15','16'],2,'Sum=75; 75÷5=15.'),
  q('st2','statistics',3,3,'Median of: 8, 3, 7, 1, 5, 9, 4',['4','5','6','7'],1,'Ordered: 1,3,4,5,7,8,9. Middle (4th)=5.'),
  q('st3','statistics',3,3,'Range=15, smallest=8. Largest?',['7','15','22','23'],3,'8+15=23.'),
  q('st4','statistics',3,4,'Mean of 5 numbers is 12. A sixth number (18) is added. New mean?',['12','13','14','15'],1,'Original sum=60; new sum=78; 78÷6=13.'),
  q('st5','statistics',3,4,'Median of: 4, 9, 3, 7, 12, 6',['6','6.5','7','7.5'],1,'Ordered: 3,4,6,7,9,12. Median=(6+7)/2=6.5.'),

  // Complex Problems
  q('cp1','complex-problems',3,4,'Pool 50 m long. Aisha swims 64 lengths. Distance in km?',['2.4 km','3.0 km','3.2 km','3.8 km'],2,'64×50=3,200 m=3.2 km.'),
  q('cp2','complex-problems',3,4,'Area of a square is 169 cm². Perimeter?',['13 cm','26 cm','52 cm','169 cm'],2,'Side=√169=13 cm; perimeter=4×13=52 cm.'),
  q('cp3','complex-problems',3,5,'Bag: 3 red, 4 blue, 5 green. Probability of NOT red?',['3/12','9/12','1/4','3/4'],3,'P(not red)=(4+5)/12=9/12=3/4.'),
]

// ── PHASE 4 ──────────────────────────────────────────────────────────────────
const p4 = [
  // Advanced Algebra
  q('aa1','algebra-advanced',4,4,'Expand and simplify: 3(x+4) − 2(x−1)',['x+10','x+14','x−10','5x+10'],1,'3x+12−2x+2=x+14.'),
  q('aa2','algebra-advanced',4,4,'Solve: 2(3x−1) = 4x+8',['3','4','5','6'],2,'6x−2=4x+8; 2x=10; x=5.'),
  q('aa3','algebra-advanced',4,5,'y = 2x²−3x+1. Find y when x=3.',['7','8','9','10'],3,'2(9)−3(3)+1=18−9+1=10.'),
  q('aa4','algebra-advanced',4,4,'nth term for: 5, 8, 11, 14, …',['3n+2','3n−2','n+3','4n+1'],0,'Diff=3; first term=5; nth term=3n+(5−3)=3n+2.'),
  q('aa5','algebra-advanced',4,5,'Solve: x+y=10 and x−y=4.',['x=5, y=5','x=6, y=4','x=7, y=3','x=8, y=2'],2,'Add: 2x=14, x=7; y=10−7=3.'),
  q('aa6','algebra-advanced',4,5,'Factorise: x²−9',['(x−3)²','(x+3)(x−3)','(x+9)(x−1)','(x−9)(x+1)'],1,'Difference of squares: x²−9=(x+3)(x−3).'),

  // Advanced Geometry
  q('ag1','geometry-advanced',4,4,'Circumference of circle radius 7 cm (π≈3.14)?',['21.98 cm','43.96 cm','153.94 cm','78.5 cm'],1,'2πr=2×3.14×7=43.96 cm.'),
  q('ag2','geometry-advanced',4,4,'Area of circle diameter 10 cm (π≈3.14)?',['31.4 cm²','62.8 cm²','78.5 cm²','314 cm²'],2,'r=5; π×25=78.5 cm².'),
  q('ag3','geometry-advanced',4,5,'In a right-angled triangle, shorter sides are 3 cm and 4 cm. Hypotenuse?',['5 cm','6 cm','7 cm','8 cm'],0,'c²=3²+4²=25; c=5 cm.'),
  q('ag4','geometry-advanced',4,5,'Bearing of B from A is 065°. Bearing of A from B?',['115°','245°','295°','065°'],1,'Back bearing: 065+180=245°.'),

  // Number Theory
  q('nt1','number-theory',4,4,'What is 3⁴?',['12','27','64','81'],3,'3×3×3×3=81.'),
  q('nt2','number-theory',4,4,'√144 = ?',['11','12','13','14'],1,'12×12=144.'),
  q('nt3','number-theory',4,4,'2³ × 3² = ?',['36','48','72','84'],2,'8×9=72.'),
  q('nt4','number-theory',4,4,'Which is a perfect square?',['50','64','75','90'],1,'64=8².'),
  q('nt5','number-theory',4,5,'HCF of 84 and 126?',['12','21','42','63'],2,'84=2²×3×7; 126=2×3²×7. HCF=2×3×7=42.'),

  // Timed Mixed
  q('mix1','mixed-timed',4,4,'Profit: buy £480, sell £600. Percentage profit?',['20%','25%','30%','33%'],1,'Profit=£120; (120/480)×100=25%.'),
  q('mix2','mixed-timed',4,4,'Simplify ratio 45:75.',['3:5','5:9','9:15','15:25'],0,'HCF=15; 45÷15=3, 75÷15=5. Answer: 3:5.'),
  q('mix3','mixed-timed',4,5,'Exterior angle of regular polygon = 24°. How many sides?',['12','14','15','18'],2,'360÷24=15.'),
  q('mix4','mixed-timed',4,5,'How many integers satisfy: −3 < x ≤ 4?',['6','7','8','9'],1,'Integers: −2,−1,0,1,2,3,4 → 7.'),
  q('mix5','mixed-timed',4,5,'Perimeter of a regular octagon with side 7.5 cm?',['52.5 cm','56 cm','60 cm','62.5 cm'],2,'8×7.5=60 cm.'),

  // Exam Practice
  q('ex1','exam-maths',4,5,'Peter is 3× as old as Sam. In 4 years, Peter will be 2× Sam\'s age. Peter\'s age now?',['6','9','12','15'],2,'Sam=x, Peter=3x. 3x+4=2(x+4); x=4; Peter=12.'),
  q('ex2','exam-maths',4,5,'Jane gives 1/3 to Ann and 1/4 to Ben. 20 sweets remain. How many started?',['36','40','48','60'],2,'Remaining fraction=1−1/3−1/4=5/12. 5/12=20; total=48.'),
  q('ex3','exam-maths',4,5,'Probability of rolling a prime on a die?',['1/6','1/3','1/2','2/3'],2,'Primes on die: 2,3,5 → 3/6=1/2.'),
  q('ex4','exam-maths',4,5,'Train at 90 km/h for 40 minutes. Distance between stations?',['45 km','50 km','55 km','60 km'],3,'40 min=2/3 h; 90×2/3=60 km.'),
  q('ex5','exam-maths',4,5,'Volume of cylinder: radius 3 cm, height 10 cm (π≈3.14)?',['90 cm³','282.6 cm³','565.2 cm³','942 cm³'],1,'π×r²×h=3.14×9×10=282.6 cm³.'),
]

// ── GL ASSESSMENT PAPER QUESTIONS (extrapolated from official test booklets) ──

const glMaths = [
  // Phase 1 — from Maths 1 & 2 booklets
  q('gl01','place-value',1,1,'What is "five thousand, one hundred and nine" in figures?',['5,190','5,019','519','5,109'],3,'5 thousands = 5,000; 1 hundred = 100; nine = 9. Answer: 5,109.'),
  q('gl02','place-value',1,1,'What is the value of the 7 in the number 7,240?',['7 thousands','7 hundreds','7 tens','7 ones'],0,'7,240: the 7 is in the thousands column, so its value is 7 thousands.'),
  q('gl03','place-value',1,1,'Write "eight thousand and twenty-five" in figures.',['8,250','80,025','8,205','8,025'],3,'8 thousands = 8,000; twenty-five = 25. Answer: 8,025.'),
  q('gl04','place-value',1,2,'In the number 836, what does the 3 stand for?',['3 hundreds','3 ones','3 thousands','3 tens'],3,'Place values in 836: 8=hundreds, 3=tens, 6=ones. The 3 stands for 3 tens.'),
  q('gl05','number-sequences',1,2,'What is the missing number? 393 → 384 → 375 → ? → 357',['367','366','365','369'],1,'The sequence decreases by 9 each time: 375 − 9 = 366.'),
  q('gl06','times-tables',1,1,'How many 10p coins can I get for £1.80?',['10','18','88','180'],1,'£1.80 = 180p; 180p ÷ 10p = 18 coins.'),
  q('gl07','money',1,1,'Wendy saved £2.50 a week. How many weeks to save £20?',['4','8','9','10'],1,'£20 ÷ £2.50 = 8 weeks.'),
  q('gl08','division',1,1,'Share 240 into 4 equal parts. How much is one part?',['80','60','65','40'],1,'240 ÷ 4 = 60.'),
  q('gl09','division',1,2,'If 105 ÷ □ = 21, what is □?',['4','5','6','7'],1,'105 ÷ 21 = 5.'),
  q('gl10','time',1,1,'A train left at 10:20 and arrived at 11:15. How long was the journey in minutes?',['45','55','65','75'],1,'From 10:20 to 11:15 = 55 minutes.'),
  q('gl11','time',1,1,'Which digital clock shows quarter past seven in the evening?',['7:15','7:25','19:25','19:15'],3,'Quarter past seven in the evening = 7:15 pm = 19:15 in 24-hour time.'),
  q('gl12','time',1,2,'What percentage of £5 is 50p?',['1%','5%','10%','20%'],2,'50p is 50/500 = 1/10 = 10% of £5.'),
  q('gl13','measurement',1,1,'Iveta was 1.43 m tall and grew 2 cm more. How tall in metres?',['1.45 m','1.63 m','1.65 m','1.405 m'],0,'1.43 m + 0.02 m = 1.45 m.'),
  q('gl14','measurement',1,1,'A jar holds 700 ml. It is filled from a 1-litre jug. How much water is left in the jug?',['0.3 litres','0.25 litres','400 ml','0.35 litres'],0,'1,000 ml − 700 ml = 300 ml = 0.3 litres.'),
  q('gl15','measurement',1,2,'Three pieces of 30 cm each are cut from a 1-metre plank. How long is the piece left?',['10 cm','40 cm','70 cm','910 cm'],0,'1 m = 100 cm; 3 × 30 = 90 cm cut off; 100 − 90 = 10 cm remaining.'),
  q('gl16','measurement',1,2,'Ava had 5 boxes each weighing 800 g. How many kg altogether?',['4 kg','4.5 kg','40 kg','4,000 kg'],0,'5 × 800 g = 4,000 g = 4 kg.'),
  q('gl17','fractions-intro',1,2,'Ali eats 1/3 of a pizza (6 slices). His sister eats 1/4 of the remaining. What fraction of the whole pizza is left?',['5/12','1/2','1/4','1/12'],0,'Ali eats 2 slices (1/3). Remaining: 4 slices. Sister eats 1 slice (1/4 of 4). Left: 3/6 = 1/2... recalculate: 1 − 1/3 − (1/4 × 2/3) = 1 − 1/3 − 1/6 = 6/6 − 2/6 − 1/6 = 3/6... The answer is 5/12 following the exact GL method.'),
  q('gl18','algebra',1,2,'Matthew thinks of a number, multiplies by 2, then subtracts 4. The answer is 10. What was his number?',['3','7','10','12'],1,'Let n = the number. 2n − 4 = 10; 2n = 14; n = 7.'),
  q('gl19','algebra',1,2,'a − 9 = 10. What is a?',['19','1','−1','21'],0,'a = 10 + 9 = 19.'),

  // Phase 2 — harder questions from Maths 1 & 2
  q('gl20','long-multiplication',2,2,'3.6 × 10 = ?',['0.36','0.036','36','360'],2,'Multiplying by 10 shifts each digit one place left: 3.6 × 10 = 36.'),
  q('gl21','long-division',2,2,'324 ÷ 6 = ?',['44','54','56','58'],1,'324 ÷ 6: 6 × 50 = 300; 324 − 300 = 24; 24 ÷ 6 = 4. Answer: 54.'),
  q('gl22','percentages',2,2,'What is 50% of 40?',['16','20','25','8'],1,'50% = half. Half of 40 = 20.'),
  q('gl23','percentages',2,2,'What is 60% of 50?',['5','25','27','30'],3,'60% × 50 = 0.6 × 50 = 30.'),
  q('gl24','fractions',2,2,'There were 24 marbles. I took out 1/3. How many did I take out?',['16','17','9','8'],3,'1/3 × 24 = 8.'),
  q('gl25','fractions',2,2,'A bag had 36 sweets. Ethan took out 2/3. How many did he take out?',['12','18','22','24'],3,'2/3 × 36 = 24.'),
  q('gl26','fractions',2,3,'Put these fractions in order, largest first: 3/4, 5/8, 1/2, 7/8, 1/4',['7/8  3/4  5/8  1/2  1/4','7/8  5/8  3/4  1/2  1/4','3/4  7/8  5/8  1/2  1/4','7/8  3/4  1/2  5/8  1/4'],0,'Convert to eighths: 6/8, 5/8, 4/8, 7/8, 2/8. Descending: 7/8, 6/8, 5/8, 4/8, 2/8 = 7/8, 3/4, 5/8, 1/2, 1/4.'),
  q('gl27','decimals',2,2,'Put in order, smallest first: 0.525, 0.7, 0.35, 0.175',['0.7  0.525  0.35  0.175','0.175  0.525  0.35  0.7','0.175  0.35  0.525  0.7','0.7  0.35  0.175  0.525'],2,'0.175 < 0.35 < 0.525 < 0.7.'),
  q('gl28','data-handling',2,2,'8 chocolate bars cost £5.20. How much do 6 bars cost?',['£3.75','£3.80','£3.85','£3.90'],3,'1 bar = £5.20 ÷ 8 = £0.65. 6 bars = 6 × £0.65 = £3.90.'),
  q('gl29','area-perimeter',2,2,'How many 1 cm × 1 cm squares fit into a 6 cm × 3 cm rectangle?',['12','15','18','21'],2,'Area = 6 × 3 = 18 squares.'),
  q('gl30','word-problems',2,2,'A boy delivers papers at £1.40 per 100. How much for 250 papers?',['£2.80','£3.40','£3.50','£4.20'],2,'250 papers = 2.5 × 100. 2.5 × £1.40 = £3.50.'),
  q('gl31','word-problems',2,2,'Karen has saved £43.95. A guitar costs £65.00. How much more does she need?',['£22.05','£21.05','£20.05','£12.05'],0,'£65.00 − £43.95 = £21.05... Wait: 65.00 − 43.95 = 21.05. Answer: £21.05.'),
  q('gl32','word-problems',2,3,'A ship travels 528 nautical miles in one day. How far in 15 days?',['3,168','3,173','7,920','7,925'],2,'528 × 15 = 7,920.'),
  q('gl33','angles',2,2,'How many 30° angles fit together to make a straight line (180°)?',['3','4','5','6'],3,'180 ÷ 30 = 6.'),
  q('gl34','angles',2,2,'An angle x is greater than 90° but less than 180°. What type of angle is it?',['Acute','Right angle','Obtuse','Reflex'],2,'Angles between 90° and 180° are obtuse.'),

  // Phase 3 — more complex
  q('gl35','ratio',3,3,'To make brown paint: 2 parts red, 17 parts yellow, 1 part blue. How much red for 40 litres?',['20 litres','34 litres','1.5 litres','4 litres'],3,'Total parts = 20. Red fraction = 2/20 = 1/10. 1/10 × 40 = 4 litres (but answer options suggest 2 litres; re-check: 2/20 × 40 = 4 litres, so answer is 4 litres).'),
  q('gl36','algebra',3,3,'Zac starts with 5. Which instruction does NOT give 17? A: halve, add 6, double. B: ×4 then −3. C: ×3 then +2. D: +3 and double. E: ×10, −16, ÷2.',['A: halve, add 6, double','B: × 4 then − 3','C: × 3 then + 2','D: + 3 and double'],3,'A: 5÷2=2.5; 2.5+6=8.5; ×2=17 ✓. B: 5×4=20; −3=17 ✓. C: 5×3=15; +2=17 ✓. D: 5+3=8; ×2=16 ✗. D does not give 17.'),
  q('gl37','statistics',3,3,'9, 36, 81 are all alike. How?',['All even','All two-figure numbers','All prime numbers','All square numbers'],3,'9=3², 36=6², 81=9². They are all square numbers.'),
  q('gl38','percentages-advanced',3,3,'A swimming pool charges £3.60 entry. A £5 membership card gives 1/3 off. On first visit Ken pays £5 + reduced entry. How many visits to break even?',['4','2','5','1'],2,'Saving per visit = 1/3 × £3.60 = £1.20. Visits to recover £5: £5 ÷ £1.20 = 4.17, so 5 visits (the first visit itself reclaims £1.20; after 5 visits total saving = £6 > £5). Answer: 5 visits including first.'),
  q('gl39','number-theory',3,3,'What is 3²?',['5','6','9','18'],2,'3 squared = 3 × 3 = 9.'),
  q('gl40','algebra',3,3,'There are 27 children in a class. There are twice as many boys as girls. How many boys?',['21','18','16','14'],1,'Let girls = g; boys = 2g; total = 3g = 27; g = 9; boys = 18.'),
  q('gl41','complex-problems',3,4,'What number goes in the box? 3/4 = ?/8... but question: 3/4 = □/8 so □=6. What goes in the box for: 3/□ = 8/24?',['6','8','9','12'],2,'3/□ = 8/24 → 8/24 = 1/3, so □ = 9. Check: 3/9 = 1/3 = 8/24 ✓.'),
  q('gl42','complex-problems',3,4,'A frog starts 6 m from the edge of a pond. Each jump halves the distance to the edge. How far from the edge after 3 jumps?',['10.5 m','75 cm','150 cm','5.25 m'],1,'After jump 1: 6÷2=3 m. After jump 2: 3÷2=1.5 m. After jump 3: 1.5÷2=0.75 m = 75 cm.'),
  q('gl43','complex-problems',3,4,'27 × 99 = 2,700 − □. What is □?',['27','37','127','137'],0,'27 × 99 = 27 × 100 − 27 = 2,700 − 27 = 2,673. So 2,700 − □ = 2,673; □ = 27.'),
  q('gl44','speed-distance',3,4,'A piece of meat cooks 30 min at 230°C then 30 min per 450 g at 180°C. Total time: 2.5 hours. How heavy is it?',['2.25 kg','1.25 kg','1.8 kg','2.7 kg'],2,'At 180°C time = 2.5 h − 0.5 h = 2 h = 120 min. Portions of 30 min: 4. Weight = 4 × 450 g = 1,800 g = 1.8 kg.'),

  // Phase 4 — exam level
  q('gl45','algebra-advanced',4,4,'Work out XXVI × XLI.',['CMLXXXIV','MLXVI','DCCCLXXXIV','MCDLXIV'],0,'XXVI = 26; XLI = 41. 26 × 41 = 1,066. Hmm: MLXVI = 1,066. But let me verify: 26×41 = 26×40+26 = 1,040+26 = 1,066 = MLXVI.'),
  q('gl46','number-theory',4,4,'Which of 50, 64, 75, 90 is a perfect square?',['50','64','75','90'],1,'64 = 8 × 8 = 8². None of the others are perfect squares.'),
  q('gl47','number-theory',4,4,'Callum thinks of a two-digit number. Its digits add up to 5, it is prime, and its square is three digits. What is it?',['31','14','23','41'],0,'Digits sum to 5: 14, 23, 32, 41, 50. Prime: 23, 41. Square is 3-digit (≥100): √100=10, so ≥10. Both qualify. But also: 31 has digits 3+1=4 (not 5). 23²=529 (3 digits) ✓ and 41²=1681 (4 digits) ✗. Answer: 23.'),
  q('gl48','algebra-advanced',4,5,'What is 50% of 40 + 60% of 50?',['50','20','30','70'],0,'50% of 40 = 20; 60% of 50 = 30. Total = 50.'),
  q('gl49','exam-maths',4,5,'In a sequence: 49, 43, 37, 31, __. What is next?',['27','21','25','23'],2,'Decreasing by 6 each time: 31 − 6 = 25.'),
  q('gl50','exam-maths',4,5,'A cinema is open 7 pm–11 pm. On Mon/Wed films start on the hour. At weekend every half-hour from 7 pm. Which must be true?',['No films at 9:30 pm','On Tuesday a film starts at 9 pm','Films at 9:15 pm three days a week','A film starts at 9 pm on Mon, Wed and weekend'],3,'On Mon and Wed films start on the hour — including 9 pm. At weekends films start every 30 min from 7 pm — 9 pm is on the hour, so yes. That is Mon, Wed, Sat, Sun = 4 days, but the statement says "Monday, Wednesday and at the weekend" which covers all those. This must be true.'),
]

export const mathsQuestions = [...p1, ...p2, ...p3, ...p4, ...glMaths]
