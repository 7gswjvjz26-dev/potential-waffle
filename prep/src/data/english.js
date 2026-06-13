const q = (id, topic, phase, diff, question, options, answer, explanation) => ({
  id: `eng-${id}`, subject: 'english', topic, phase, difficulty: diff,
  question, options, answer, explanation,
})

// ── PHASE 1 ──────────────────────────────────────────────────────────────────
const p1 = [
  // Parts of Speech
  q('pos1','parts-of-speech',1,1,'Which word is a noun?',['Quickly','Brave','Mountain','Run'],2,'A noun is a naming word — a person, place, thing or idea. "Mountain" is a thing.'),
  q('pos2','parts-of-speech',1,1,'Which word is a verb?',['Happy','Swiftly','Table','Jumped'],3,'A verb is a doing or being word. "Jumped" describes an action.'),
  q('pos3','parts-of-speech',1,1,'Which word is an adjective?',['Dance','Enormous','Slowly','River'],1,'An adjective describes a noun. "Enormous" tells us about the size of something.'),
  q('pos4','parts-of-speech',1,1,'Which sentence contains an adverb?',['She sang.','She sang a song.','She sang loudly.','Her singing was good.'],2,'"Loudly" is an adverb — it tells us HOW she sang.'),
  q('pos5','parts-of-speech',1,1,'"The dog barked." Which word is the subject?',['The','dog','barked','None'],1,'The subject is the noun or pronoun that performs the action. "The dog" (dog) is the subject.'),
  q('pos6','parts-of-speech',1,2,'Which is a proper noun?',['city','queen','London','street'],2,'Proper nouns are names of specific people, places or things. "London" is a specific city.'),
  q('pos7','parts-of-speech',1,2,'Identify the adjective in: "The small cat sat on the warm mat."',['small','cat','sat','mat'],0,'"Small" describes the cat (a noun), so it is the adjective.'),
  q('pos8','parts-of-speech',1,2,'Which sentence uses "quickly" correctly as an adverb?',['She was quickly.','The quickly dog ran.','She ran quickly.','Quickly is a adjective.'],2,'"She ran quickly." — quickly modifies the verb "ran". ✓'),
  q('pos9','parts-of-speech',1,2,'How many nouns are in: "The brave knight fought the fearsome dragon"?',['1','2','3','4'],1,'"Knight" and "dragon" are both nouns. There are 2 nouns.'),
  q('pos10','parts-of-speech',1,2,'Which sentence has both a noun AND a verb?',['Fast and slow.','Red shoes.','The cat slept.','Very quickly!'],2,'"The cat slept." — "cat" is a noun, "slept" is a verb.'),

  // Sentences
  q('sen1','sentences',1,1,'Which is a complete sentence?',['Running fast.','The dog.','She laughed.','Over the hill!'],2,'A complete sentence needs a subject and a verb. "She laughed" has both.'),
  q('sen2','sentences',1,1,'Which is a question?',['Come here.','What a surprise','Where is my bag?','Stop that.'],2,'A question asks something and ends with a question mark.'),
  q('sen3','sentences',1,1,'Which sentence is an exclamation?',['She left early.','Did she leave?','What a shock!','Please leave now.'],2,'Exclamations express strong feeling and end with an exclamation mark.'),
  q('sen4','sentences',1,2,'What is the object in: "Tom kicked the ball."?',['Tom','kicked','the','ball'],3,'The object receives the action. Tom (subject) kicked (verb) the ball (object).'),
  q('sen5','sentences',1,2,'Which is a command sentence?',['I am tired.','Are you ready?','Sit down now.','She sat down.'],2,'Commands give instructions or orders. "Sit down now" is a command.'),
  q('sen6','sentences',1,2,'How should this sentence begin? "he walked to school every day."',['He','HE','he (correct as written)','hE'],0,'Sentences must begin with a capital letter.'),
  q('sen7','sentences',1,2,'Which joining word makes a compound sentence? "I was tired ___ I kept working."',['but','which','who','where'],0,'"But" is a coordinating conjunction that joins two equal clauses.'),

  // Basic Punctuation
  q('pun1','punctuation-basic',1,1,'Which sentence uses a full stop correctly?',['she ran fast.','She ran fast.','She ran fast','She ran. fast.'],1,'A sentence starts with a capital letter and ends with a full stop.'),
  q('pun2','punctuation-basic',1,1,'When do we use a question mark?',['At the end of every sentence','After commands','After direct questions','After exclamations'],2,'Question marks go at the end of direct questions.'),
  q('pun3','punctuation-basic',1,1,'Which sentence is correctly punctuated?',['I like cats dogs and rabbits.','I like cats, dogs and rabbits.','I like, cats dogs, and rabbits.','I like cats dogs, and, rabbits.'],1,'Commas separate items in a list. The last item before "and" does not need a comma.'),
  q('pun4','punctuation-basic',1,2,'Which sentence needs a comma?',['She ran quickly.','After the rain the sun came out.','He is tall.','We ran home.'],1,'"After the rain" is an introductory phrase; a comma follows it: "After the rain, the sun came out."'),
  q('pun5','punctuation-basic',1,2,'Correct punctuation: "The dog (name rex) was friendly."',['The dog, name rex, was friendly.','The dog — name Rex — was friendly.','The dog (named Rex) was friendly.','The dog named Rex was friendly.'],2,'Brackets (parentheses) enclose extra information. "Rex" should be capitalised as a name.'),
  q('pun6','punctuation-basic',1,2,'Where does the apostrophe go in "the cats toy"?',['cat\'s toy','cats\' toy','cats toy\'','cat\'s to\'y'],0,'"The cat\'s toy" — one cat, so apostrophe after "cat".'),

  // Plurals
  q('pl1','plural-forms',1,1,'What is the plural of "child"?',['childs','childen','children','childer'],2,'"Children" is an irregular plural — it does not follow the usual rule.'),
  q('pl2','plural-forms',1,1,'What is the plural of "box"?',['boxs','boxes','boxes','box'],2,'Words ending in -x, -ch, -sh, -ss take -es in the plural: boxes.'),
  q('pl3','plural-forms',1,1,'What is the plural of "leaf"?',['leafs','leafes','leaves','leaf'],2,'Words ending in -f often change to -ves in the plural: leaf → leaves.'),
  q('pl4','plural-forms',1,1,'What is the plural of "city"?',['citys','cities','cityes','city'],1,'Words ending in consonant + y change y to i and add -es: city → cities.'),
  q('pl5','plural-forms',1,2,'What is the plural of "foot"?',['foots','feet','feets','foot'],1,'"Foot" is an irregular plural: foot → feet.'),
  q('pl6','plural-forms',1,2,'What is the plural of "mouse"?',['mouses','meese','mice','mouse'],2,'"Mouse" is an irregular plural: mouse → mice.'),
  q('pl7','plural-forms',1,2,'What is the plural of "tomato"?',['tomatos','tomatoe','tomatoes','tomato'],2,'Words ending in -o can take -es: tomato → tomatoes (also: potato → potatoes).'),
  q('pl8','plural-forms',1,2,'What is the plural of "sheep"?',['sheeps','sheepes','sheep','sheepies'],2,'"Sheep" is an irregular plural — it stays the same: one sheep, two sheep.'),

  // Basic Comprehension
  q('cmp1','comprehension-basic',1,1,'Read: "The dog wagged its tail when Tom came home." Why did the dog wag its tail?',['It was cold','Tom came home','It was hungry','It was scared'],1,'The text says the tail was wagged "when Tom came home" — the event that caused it.'),
  q('cmp2','comprehension-basic',1,1,'Read: "Sara had a red coat and blue boots." What colour were Sara\'s boots?',['Red','Purple','Blue','Green'],2,'The text states directly: "blue boots".'),
  q('cmp3','comprehension-basic',1,2,'Read: "Despite the heavy rain, Maya decided to go for a run." What does "despite" mean here?',['Because of','After','Even though','Before'],2,'"Despite" means "even though" — Maya ran even though it was raining heavily.'),
  q('cmp4','comprehension-basic',1,2,'Read: "The ancient temple stood on a hill overlooking the village." Where was the temple?',['In the village','On a hill above the village','Beside the village','Underground'],1,'"On a hill overlooking the village" — on a hill above the village.'),
  q('cmp5','comprehension-basic',1,2,'Read: "Tom smiled broadly as he unwrapped his gift." How did Tom feel?',['Sad','Bored','Surprised','Happy'],3,'Smiling broadly suggests happiness.'),

  // Spelling Patterns
  q('sp1','spelling-patterns',1,1,'Choose the correct spelling.',['recieve','receive','receve','recive'],1,'"Receive" — remember "i before e except after c".'),
  q('sp2','spelling-patterns',1,1,'Choose the correct spelling.',['beleive','believe','beleeve','beleve'],1,'"Believe" — not after c, so "ie": bel-ie-ve.'),
  q('sp3','spelling-patterns',1,1,'Which word ends in the "shun" sound spelled -tion?',['nation','nacion','nashion','nasion'],0,'"Nation" — the -tion suffix makes the "shun" sound.'),
  q('sp4','spelling-patterns',1,2,'Choose the correct spelling.',['seperate','sepperate','separate','separete'],2,'"Separate" — remember: sep-A-rate. There is an A in the middle.'),
  q('sp5','spelling-patterns',1,2,'Choose the correct spelling.',['neccessary','necessary','neccesary','necesary'],1,'"Necessary" — one c, two s\'s: ne-c-ess-ary.'),
  q('sp6','spelling-patterns',1,2,'Which is the correct spelling?',['occured','occurred','ocurred','occurrd'],1,'"Occurred" — double c and double r: oc-cur-red.'),
  q('sp7','spelling-patterns',1,2,'Choose the correct spelling.',['definately','definitly','definitely','definitley'],2,'"Definitely" — de-fin-ite-ly. No "a" in the middle.'),

  // Prefixes & Suffixes
  q('prf1','prefixes-suffixes',1,1,'What does the prefix "un-" mean?',['Again','Before','Not','With'],2,'The prefix un- means "not": unhappy = not happy.'),
  q('prf2','prefixes-suffixes',1,1,'Add the suffix -ing to "run". Which is correct?',['runing','running','runnning','runng'],1,'Short vowel + single consonant: double the consonant before adding -ing: running.'),
  q('prf3','prefixes-suffixes',1,1,'Which word uses the prefix "re-" correctly?',['readvertise (to advertise again)','remember (to not member)','restart (to start again)','rethe (to not the)'],2,'"Re-" means "again". Restart = to start again. ✓'),
  q('prf4','prefixes-suffixes',1,2,'Add the suffix -ful to "care". Which is correct?',['carful','careful','carfull','carefull'],1,'"Care" + "-ful" = "careful". The suffix -ful has only one l.'),
  q('prf5','prefixes-suffixes',1,2,'What does "dis-" mean in "disappear"?',['Again','Not or opposite of','Before','With'],1,'"Dis-" means "not" or "opposite of": disappear = to not appear / go away.'),
  q('prf6','prefixes-suffixes',1,2,'Which word is formed by adding -ness to "dark"?',['darken','darkly','darkness','darknessly'],2,'"Dark" + "-ness" = "darkness" (the state of being dark).'),
  q('prf7','prefixes-suffixes',1,2,'The prefix "pre-" means:',['After','Before','Against','Under'],1,'"Pre-" means "before": preview = to see before; predict = to say before.'),

  // Synonyms
  q('syn1','synonyms-basic',1,1,'Which word is a synonym of "happy"?',['Sad','Joyful','Angry','Tired'],1,'A synonym has a similar meaning. "Joyful" means very happy.'),
  q('syn2','synonyms-basic',1,1,'Which is a synonym of "fast"?',['Slow','Heavy','Quick','Tall'],2,'"Quick" means the same as "fast".'),
  q('syn3','synonyms-basic',1,1,'Which is a synonym of "big"?',['Tiny','Large','Short','Quiet'],1,'"Large" has a similar meaning to "big".'),
  q('syn4','synonyms-basic',1,2,'Which word is closest in meaning to "ancient"?',['New','Modern','Old','Recent'],2,'"Ancient" means very old. Closest synonym: "old".'),
  q('syn5','synonyms-basic',1,2,'Which word is closest in meaning to "difficult"?',['Easy','Simple','Hard','Pleasant'],2,'"Difficult" means hard or challenging. Closest synonym: "hard".'),
  q('syn6','synonyms-basic',1,2,'Which word is closest in meaning to "gloomy"?',['Bright','Sunny','Cheerful','Dark'],3,'"Gloomy" means dark, dull or depressing. Closest synonym: "dark".'),

  // Antonyms
  q('ant1','antonyms-basic',1,1,'What is the opposite of "hot"?',['Warm','Cold','Bright','Big'],1,'The antonym (opposite) of "hot" is "cold".'),
  q('ant2','antonyms-basic',1,1,'What is the opposite of "sharp"?',['Pointy','Dull','Cut','Fine'],1,'The opposite of "sharp" is "dull" (not pointed/not keen).'),
  q('ant3','antonyms-basic',1,1,'What is the opposite of "ancient"?',['Old','Tall','Modern','Broken'],2,'The antonym of "ancient" (very old) is "modern" (new/current).'),
  q('ant4','antonyms-basic',1,2,'What is the opposite of "generous"?',['Kind','Selfish','Giving','Rich'],1,'A generous person gives freely; the opposite is "selfish".'),
  q('ant5','antonyms-basic',1,2,'What is the opposite of "transparent"?',['Clear','See-through','Opaque','Shiny'],2,'Transparent = you can see through it; opaque = you cannot.'),
  q('ant6','antonyms-basic',1,2,'What is the opposite of "frequently"?',['Often','Usually','Rarely','Always'],2,'"Frequently" means often; the antonym is "rarely".'),

  // Vocabulary
  q('voc1','vocabulary-basic',1,1,'What does "enormous" mean?',['Very small','Very fast','Very big','Very old'],2,'"Enormous" means very large or huge.'),
  q('voc2','vocabulary-basic',1,1,'What does "timid" mean?',['Bold','Shy or nervous','Loud','Angry'],1,'"Timid" means easily frightened or lacking confidence; shy.'),
  q('voc3','vocabulary-basic',1,2,'What does "persevere" mean?',['Give up easily','Try very hard and keep going','Move quickly','Look carefully'],1,'"Persevere" means to continue doing something despite difficulty.'),
  q('voc4','vocabulary-basic',1,2,'What does "bewildered" mean?',['Pleased','Confused and puzzled','Determined','Frightened'],1,'"Bewildered" means completely confused or puzzled.'),
  q('voc5','vocabulary-basic',1,2,'What does "transparent" mean?',['Easily seen through','Completely dark','Very heavy','Extremely loud'],0,'"Transparent" means allowing light through so you can see what is on the other side.'),
]

// ── PHASE 2 ──────────────────────────────────────────────────────────────────
const p2 = [
  // Pronouns & Adverbs
  q('pro1','pronouns-adverbs',2,2,'Which is a possessive pronoun?',['he','she','mine','they'],2,'Possessive pronouns show ownership: mine, yours, his, hers, ours, theirs.'),
  q('pro2','pronouns-adverbs',2,2,'Which adverb tells us HOW?',['Yesterday','Nearby','Swiftly','Often'],2,'"Swiftly" tells us how the action was done — it is a manner adverb.'),
  q('pro3','pronouns-adverbs',2,2,'Which adverb tells us WHEN?',['Quickly','Carefully','Upstairs','Tomorrow'],3,'"Tomorrow" tells us when something will happen — it is a time adverb.'),
  q('pro4','pronouns-adverbs',2,2,'Choose the correct pronoun: "The prize belongs to ___."',['I','me','myself','mine'],1,'After a preposition ("to"), use the object pronoun "me".'),
  q('pro5','pronouns-adverbs',2,3,'Which sentence uses a reflexive pronoun correctly?',['She hurt herself.','He hurt hisself.','They saw theirselves.','We done it ourselfs.'],0,'"Herself" is the correct reflexive pronoun for "she".'),
  q('pro6','pronouns-adverbs',2,3,'Identify the relative pronoun: "The book that I read was excellent."',['The','that','read','excellent'],1,'"That" is a relative pronoun introducing the relative clause.'),

  // Advanced Punctuation
  q('apu1','punctuation-advanced',2,2,'Where does the apostrophe go in "the girls bag" (one girl)?',['girl\'s bag','girls\' bag','girls bag\'','girls\'s bag'],0,'One girl: the apostrophe goes after "girl": girl\'s bag.'),
  q('apu2','punctuation-advanced',2,2,'Where does the apostrophe go in "the girls bags" (more than one girl)?',['girl\'s bags','girls\' bags','girl\'s bag\'s','girls bags\''],1,'Multiple girls: the apostrophe goes after the plural "girls": girls\' bags.'),
  q('apu3','punctuation-advanced',2,2,'Which use of an apostrophe shows a contraction?',['The girl\'s coat','It\'s raining.','The boys\' books','My friend\'s house'],1,'"It\'s" = "it is". This apostrophe replaces the missing letter "i".'),
  q('apu4','punctuation-advanced',2,3,'Which sentence uses a colon correctly?',['He had one wish: to fly.','He had one wish, to fly.','He: had one wish to fly.','He had: one wish to fly.'],0,'A colon introduces a list, explanation, or elaboration after a complete sentence.'),
  q('apu5','punctuation-advanced',2,3,'Which sentence uses a semicolon correctly?',['I like dogs; but hate cats.','I like dogs; cats are fine too.','I like; dogs and cats.','I; like dogs and cats.'],1,'A semicolon joins two closely related main clauses.'),
  q('apu6','punctuation-advanced',2,3,'How are speech marks used correctly?',['"Come here," she said.','She said, "come here".','She said "Come here".','Come here, she said.'],0,'Opening speech mark before the speech; closing speech mark and comma INSIDE the closing speech mark.'),

  // Inference
  q('inf1','comprehension-inference',2,2,'Read: "She glanced at the clock and bit her lip." What is she probably feeling?',['Happy','Relaxed','Anxious','Bored'],2,'Glancing at the clock and biting lips are signs of anxiety or worry.'),
  q('inf2','comprehension-inference',2,2,'Read: "He hadn\'t eaten since morning, and his stomach rumbled." What does this imply?',['He is full','He is thirsty','He is hungry','He is tired'],2,'Not eating since morning and a rumbling stomach implies hunger.'),
  q('inf3','comprehension-inference',2,3,'Read: "Despite her cheerful smile, her eyes told a different story." What is implied?',['She is genuinely happy','She is hiding her true feelings','She is bored','She is amused'],1,'The contrast between her smile and her eyes suggests she is hiding sadness.'),
  q('inf4','comprehension-inference',2,3,'Read: "The old house had been empty for years. Weeds choked the path and paint peeled from the door." What do we learn?',['The house is well-kept','The house is neglected','The house is new','The house is busy'],1,'Weeds and peeling paint are signs of neglect and abandonment.'),
  q('inf5','comprehension-inference',2,3,'A character is described as "pressing herself against the wall as footsteps approached." What does this show?',['She is tired','She is curious','She is frightened or hiding','She is happy'],2,'Pressing against a wall to avoid being seen suggests fear or hiding.'),

  // Word Families
  q('wf1','word-families',2,2,'Which word belongs to the same family as "create"?',['creature','creation','creator','all of these'],3,'"Creature", "creation" and "creator" all share the root "creat-" (from Latin "creare" = to make).'),
  q('wf2','word-families',2,2,'Which word belongs to the family of "sign"?',['simple','signal','sight','season'],1,'"Signal" shares the root "sign" (a mark or symbol).'),
  q('wf3','word-families',2,3,'What is the verb form of "decision"?',['decide','decider','decisive','decidal'],0,'"Decide" is the verb; "decision" is the noun form.'),
  q('wf4','word-families',2,3,'What is the adjective form of "courage"?',['courageous','courageously','couragen','courgette'],0,'"Courageous" is the adjective meaning "having courage".'),
  q('wf5','word-families',2,3,'Which word is related to "photograph"?',['telegraphy','photography','phonograph','topography'],1,'"Photography" shares the root "photo-" (light) and "-graph" (writing/recording).'),

  // Homophones
  q('hom1','homophones',2,2,'Choose the correct word: "I could ___  hear the music." (can/could)',['there','their','they\'re','nowhere'],0,'"There" refers to a place. Check: I could hear the music THERE.'),
  q('hom2','homophones',2,2,'Choose the correct word: "The book is ___ on the shelf." (there/their/they\'re)',['there','their','they\'re','thair'],0,'"There" refers to a place. ✓'),
  q('hom3','homophones',2,2,'Choose the correct word: "She ___ her arm." (brake/break)',['brake','break','breck','breek'],1,'"Break" = to damage or fracture. "Brake" = to slow down. ✓'),
  q('hom4','homophones',2,2,'Choose: "___ going to the park." (their/there/they\'re)',['their','there','they\'re','thier'],2,'"They\'re" = "they are". "They are going to the park." ✓'),
  q('hom5','homophones',2,3,'Choose the correct word: "He was the ___ of the race." (winner/whiner)',['principal','principle','principple','principales'],0,'"Principal" = main or head (principal of a school). "Principle" = a rule or belief.'),
  q('hom6','homophones',2,3,'Choose the correct word: "The ___ of the school gave a speech."',['principal','principle','principple','principales'],0,'"Principal" is a noun meaning the head of a school. "Principle" is a rule.'),

  // Conjunctions
  q('con1','conjunctions',2,2,'Which conjunction shows CONTRAST?',['and','because','but','so'],2,'"But" shows contrast between two ideas.'),
  q('con2','conjunctions',2,2,'Which conjunction shows REASON?',['and','because','but','or'],1,'"Because" introduces the reason for something.'),
  q('con3','conjunctions',2,2,'Which is a subordinating conjunction?',['and','but','or','although'],3,'"Although" introduces a subordinate clause — it makes the clause dependent.'),
  q('con4','conjunctions',2,3,'Complete: "She didn\'t stop ___ she finished her work."',['but','or','until','because'],2,'"Until" means she kept going up to the point of finishing.'),
  q('con5','conjunctions',2,3,'Which sentence uses "whereas" correctly?',['I like cats, whereas dogs.','I like cats, whereas my sister prefers dogs.','Whereas I like cats.','I whereas like cats.'],1,'"Whereas" contrasts two ideas in the same sentence.'),

  // Tenses
  q('ten1','tenses',2,2,'Change to past tense: "She runs to school."',['She runned to school.','She run to school.','She ran to school.','She was running to school.'],2,'"Run" is an irregular verb: run → ran (past simple).'),
  q('ten2','tenses',2,2,'Which is in the future tense?',['She wrote.','She writes.','She has written.','She will write.'],3,'"Will write" is the future simple tense.'),
  q('ten3','tenses',2,2,'Identify the tense: "They have been playing all day."',['Past simple','Present perfect continuous','Future simple','Past continuous'],1,'"Have been playing" is present perfect continuous — an action that started in the past and is still continuing.'),
  q('ten4','tenses',2,3,'Which is in the past perfect?',['She went.','She has gone.','She had gone.','She goes.'],2,'"Had gone" is past perfect — it refers to something completed before another past event.'),
  q('ten5','tenses',2,3,'Change to past continuous: "He reads a book."',['He read a book.','He was reading a book.','He has read a book.','He had read a book.'],1,'"Was reading" is the past continuous — an ongoing action in the past.'),

  // Figurative Language
  q('fig1','figurative-language',2,2,'Identify the simile: "The stars shone like diamonds."',['The stars shone','stars shone like diamonds','like diamonds','The stars'],1,'A simile compares two things using "like" or "as". Here: stars are LIKE diamonds.'),
  q('fig2','figurative-language',2,2,'Identify the metaphor: "He is a lion in battle."',['He is','a lion','in battle','He is a lion'],3,'A metaphor says something IS something else (without using "like"). He IS a lion.'),
  q('fig3','figurative-language',2,2,'What is personification?',['Comparing two things using like or as','Giving human qualities to non-human things','Using sounds that imitate a noise','Repeating first consonant sounds'],1,'Personification gives human qualities to animals, objects or ideas: "The wind whispered."'),
  q('fig4','figurative-language',2,3,'Identify the technique: "The waves crashed and clashed against the rocks."',['Simile','Metaphor','Alliteration','Personification'],2,'Alliteration is the repetition of the same initial consonant sound: crashed/clashed.'),
  q('fig5','figurative-language',2,3,'"The thunder roared angrily." What technique is used?',['Simile','Alliteration','Onomatopoeia','Personification'],3,'"Roared angrily" gives the thunder human qualities (anger) — this is personification.'),

  // Vocabulary Building
  q('vb1','vocabulary-medium',2,2,'What does "reluctant" mean?',['Eager and willing','Slow to agree or unwilling','Frightened','Confident'],1,'"Reluctant" means not wanting to do something; unwilling.'),
  q('vb2','vocabulary-medium',2,2,'What does "abundant" mean?',['Rare and scarce','More than enough; plentiful','Noisy','Hidden'],1,'"Abundant" means existing in large quantities; plentiful.'),
  q('vb3','vocabulary-medium',2,3,'What does "deteriorate" mean?',['Improve','Become worse','Stay the same','Disappear'],1,'"Deteriorate" means to get worse over time.'),
  q('vb4','vocabulary-medium',2,3,'What does "meticulous" mean?',['Careless','Giving great attention to detail','Lazy','Reckless'],1,'"Meticulous" means very careful and precise about detail.'),
  q('vb5','vocabulary-medium',2,3,'What does "contemplate" mean?',['React quickly','Disagree strongly','Think carefully about something','Celebrate noisily'],2,'"Contemplate" means to think about something for a long time or to consider it carefully.'),

  // Grammar
  q('gr1','grammar-intermediate',2,2,'Which sentence has correct subject-verb agreement?',['The dogs barks.','The dog bark.','The dogs bark.','The dog are barking.'],2,'Plural subject "dogs" needs plural verb "bark": "The dogs bark."'),
  q('gr2','grammar-intermediate',2,2,'Which sentence is grammatically correct?',['Her and I went.','She and me went.','Her and me went.','She and I went.'],3,'Subject pronouns: "She and I" — both are subjects of the sentence.'),
  q('gr3','grammar-intermediate',2,3,'Identify the clause type: "because she was tired" in "She went home because she was tired."',['Main clause','Subordinate clause','Relative clause','Noun clause'],1,'"Because she was tired" cannot stand alone — it is a subordinate clause.'),
  q('gr4','grammar-intermediate',2,3,'Which sentence contains a relative clause?',['She ran fast.','She ran, although tired.','She is the girl who won.','She ran and she won.'],2,'"Who won" is a relative clause — it gives more information about "the girl".'),
]

// ── PHASE 3 ──────────────────────────────────────────────────────────────────
const p3 = [
  // Clauses
  q('cl1','clauses',3,3,'Which is a main clause?',['When she arrived','Although it rained','The dog barked','Because he was late'],2,'"The dog barked" is a complete thought and can stand alone — it is a main clause.'),
  q('cl2','clauses',3,3,'Identify the subordinate clause: "Although it was cold, we went swimming."',['we went swimming','Although it was cold','swimming','cold'],1,'"Although it was cold" cannot stand alone — it is a subordinate clause.'),
  q('cl3','clauses',3,3,'Which contains a relative clause?',['She ran and won.','The book, which I loved, ended sadly.','She ran fast.','She was tired.'],1,'"Which I loved" is a relative clause giving more information about "the book".'),
  q('cl4','clauses',3,4,'What type of clause is "where she had hidden it" in: "She found the key where she had hidden it."?',['Main clause','Adverbial clause','Relative clause','Noun clause'],1,'An adverbial clause tells us where, when, why or how. "Where she had hidden it" tells us where she found it.'),
  q('cl5','clauses',3,4,'Which sentence uses an embedded clause correctly?',['The cat, who meowed, left.','The cat who meowed left.','The cat who left meowed.','The cat, who left, meowed.'],0,'An embedded clause is placed within commas inside the sentence: "The cat, who meowed, left."'),

  // Author's Craft
  q('ac1','comprehension-author',3,3,'Read: "The door groaned as she pushed it open." What does this suggest?',['The door is new','The author is describing the sound — the door is old or stiff','The girl is strong','The door is broken'],1,'Doors "groan" only when they are old or stiff — the author creates atmosphere by giving the door a human quality.'),
  q('ac2','comprehension-author',3,3,'What is the effect of short sentences in a tense scene?',['They slow the pace and create calm','They add description','They speed up the pace and create tension','They confuse the reader'],2,'Short sentences create urgency, tension and pace.'),
  q('ac3','comprehension-author',3,4,'An author uses the colour white throughout a story. What might this symbolise?',['Darkness and fear','Purity, innocence or emptiness','Speed','Wealth'],1,'White commonly symbolises purity, innocence or emptiness in literature.'),
  q('ac4','comprehension-author',3,4,'Read: "The soldiers marched into the burning town." What viewpoint is being used?',['First person','Second person','Third person omniscient','Third person limited'],2,'Third person uses "the soldiers" (not I/you); "omniscient" means the narrator knows everything.'),

  // Persuasive Language
  q('per1','persuasive-language',3,3,'Which technique uses groups of three?',['Anaphora','Rule of three','Hyperbole','Rhetorical question'],1,'The rule of three makes writing persuasive by grouping arguments: "faster, stronger, better."'),
  q('per2','persuasive-language',3,3,'What is a rhetorical question?',['A question with no answer','A question that expects an obvious answer','A question asked politely','A factual question'],1,'A rhetorical question is one asked for effect — the answer is assumed: "Who wouldn\'t want to be healthy?"'),
  q('per3','persuasive-language',3,4,'What is hyperbole?',['Comparing with like or as','Extreme exaggeration for effect','Repeating sounds','Calm understatement'],1,'Hyperbole is deliberate exaggeration: "I\'ve told you a million times!"'),
  q('per4','persuasive-language',3,4,'Identify the persuasive technique: "9 out of 10 dentists recommend this toothpaste."',['Anecdote','Rhetorical question','Statistics/evidence','Emotive language'],2,'Using statistics and evidence makes a persuasive claim seem factual and trustworthy.'),

  // Word Roots
  q('wr1','word-roots',3,3,'The Latin root "port" means "carry". Which word uses this root?',['portrait','porter','portion','porous'],1,'"Porter" = one who carries things. "Portable" = can be carried.'),
  q('wr2','word-roots',3,3,'The Greek root "bio" means "life". Which word uses this root?',['bicycle','biography','biology','both biography and biology'],3,'Both "biography" (writing about a life) and "biology" (study of life) use "bio".'),
  q('wr3','word-roots',3,3,'The Latin root "aud" means "hear". Which word uses this root?',['audio','author','aunt','aura'],0,'"Audio" relates to sound/hearing. "Auditory" = relating to hearing. "Audience" = those who listen.'),
  q('wr4','word-roots',3,4,'The Greek root "graph" means "write". Which word uses this root?',['grateful','graph','grant','grace'],1,'"Graph" comes from "graphein" (to write). A graph is a visual representation (originally drawn/written).'),
  q('wr5','word-roots',3,4,'The Latin root "vis" means "see". Which word uses this root?',['visit','violin','victory','virtue'],0,'"Visit" (to come and see), "vision" (the act of seeing), "visible" (can be seen) all use "vis".'),

  // Literary Devices
  q('lit1','literary-devices',3,3,'What is alliteration?',['Comparing two unlike things','Repetition of a vowel sound','Repetition of a consonant sound at the start of words','Giving human qualities to objects'],2,'Alliteration: "Peter Piper picked a peck of pickled peppers."'),
  q('lit2','literary-devices',3,3,'What is onomatopoeia?',['An extreme exaggeration','A word that sounds like what it describes','A comparison using like or as','A repeated structure'],1,'Onomatopoeia: words that sound like their meaning — bang, crash, hiss, sizzle.'),
  q('lit3','literary-devices',3,4,'What is irony?',['Saying what you mean directly','When the opposite of what is expected occurs','Using very emotional language','An ancient story with a moral'],1,'Irony: when the actual meaning is opposite to what is said or expected.'),
  q('lit4','literary-devices',3,4,'What is pathetic fallacy?',['Giving the weather or nature human emotions','Exaggerating to make a point','Repeating sounds at the start of words','A comparison using like or as'],0,'Pathetic fallacy: when the weather or environment reflects the mood: "The storm raged as she wept."'),
  q('lit5','literary-devices',3,4,'Identify the technique: "And we shall fight on the seas and oceans… we shall fight in the hills."',['Alliteration','Repetition (anaphora)','Onomatopoeia','Oxymoron'],1,'Anaphora is the repetition of a phrase at the start of successive clauses.'),

  // Advanced Vocabulary
  q('av1','vocabulary-advanced',3,3,'What does "ephemeral" mean?',['Eternal and lasting','Lasting only a short time','Very beautiful','Confusing'],1,'"Ephemeral" means short-lived or transient — it does not last.'),
  q('av2','vocabulary-advanced',3,3,'What does "ambiguous" mean?',['Perfectly clear','Open to more than one interpretation','Certain and definite','Meaningless'],1,'"Ambiguous" means having more than one possible meaning or interpretation.'),
  q('av3','vocabulary-advanced',3,4,'What does "exacerbate" mean?',['Improve a situation','Ignore a problem','Make a problem worse','Describe a problem'],2,'"Exacerbate" means to make something already bad even worse.'),
  q('av4','vocabulary-advanced',3,4,'What does "imperious" mean?',['Humble and polite','Very shy','Domineering and arrogant','Poor and unfortunate'],2,'"Imperious" means assuming power or authority over others; bossy and arrogant.'),
  q('av5','vocabulary-advanced',3,4,'What does "veracious" mean?',['Truthful','Greedy','Courageous','Hidden'],0,'"Veracious" means truthful; habitually speaking the truth.'),

  // Active & Passive Voice
  q('ap1','active-passive',3,3,'Change to passive: "The dog bit the postman."',['The postman bit the dog.','The postman was bitten by the dog.','The dog was biting the postman.','The postman has been bitten.'],1,'Passive: The object becomes the subject. "The postman" is the new subject.'),
  q('ap2','active-passive',3,3,'Which sentence is in the passive voice?',['She wrote the letter.','The letter was written by her.','She is writing the letter.','She had written the letter.'],1,'"Was written" = passive. The subject (letter) receives the action.'),
  q('ap3','active-passive',3,4,'Change to active: "The window was broken by the ball."',['The ball broke the window.','The window broke the ball.','The ball was breaking the window.','The window has been broken.'],0,'Active: the agent ("the ball") becomes the subject.'),
  q('ap4','active-passive',3,4,'Why might an author use the passive voice?',['To make the sentence shorter','To hide or de-emphasise who performed an action','To make writing more personal','To add more adjectives'],1,'The passive can conceal the agent ("Mistakes were made" — by whom?) or emphasise the action over the doer.'),

  // Complex Grammar
  q('cg1','complex-grammar',3,4,'Which sentence is in the subjunctive mood?',['If I was king, I would change things.','If I were king, I would change things.','If I am king, I will change things.','When I am king, I will change things.'],1,'The subjunctive uses "were" (not "was") for hypothetical or contrary-to-fact conditions.'),
  q('cg2','complex-grammar',3,4,'Convert to reported speech: She said, "I am tired."',['She said that she is tired.','She said that she was tired.','She said that I was tired.','She said she am tired.'],1,'Reported speech shifts the tense back: "am" → "was". The pronoun changes from "I" to "she".'),
  q('cg3','complex-grammar',3,4,'Which is a conditional sentence?',['She ran fast.','She will go if it stops raining.','She had run fast.','She goes to school.'],1,'Conditionals use "if". "She will go IF it stops raining" is a real/possible condition.'),
  q('cg4','complex-grammar',3,5,'Which uses the past conditional correctly?',['If I studied, I would pass.','If I had studied, I would have passed.','If I studied, I will pass.','If I had studied, I would pass.'],1,'Past conditional (third conditional): If [past perfect], would have + past participle.'),
]

// ── PHASE 4 ──────────────────────────────────────────────────────────────────
const p4 = [
  q('ex1','comprehension-exam',4,4,'Read: "The explorers pressed on through the dense jungle, their clothes soaked, their spirits undimmed." What does "undimmed" suggest about their spirits?',['Their spirits had grown weak','Their spirits were still strong and enthusiastic','Their spirits were confused','Their spirits had improved'],1,'"Undimmed" = not made dim/dark. Their enthusiasm and determination remained strong.'),
  q('ex2','comprehension-exam',4,4,'Which word best describes the mood created by: "The grey sky hung low, pressing down on the silent village."?',['Joyful','Tense and oppressive','Peaceful','Exciting'],1,'Grey sky "pressing down" creates a heavy, oppressive, tense atmosphere.'),
  q('ex3','comprehension-exam',4,5,'Read: "He turned the letter over in his hands, but could not bring himself to open it." What does this suggest about the character?',['He cannot read','He is excited','He is anxious or afraid of the contents','He has broken his hand'],2,'Unable to open the letter suggests anxiety or dread about what it might contain.'),
  q('ex4','vocabulary-exam',4,4,'What does "querulous" mean?',['Silent and still','Complaining or whining','Content and satisfied','Energetic'],1,'"Querulous" describes a person who complains frequently in a whining way.'),
  q('ex5','vocabulary-exam',4,4,'What does "tenacious" mean?',['Weak and yielding','Fearful','Holding firmly; persistent','Confused'],2,'"Tenacious" means holding on firmly; determined and not giving up.'),
  q('ex6','vocabulary-exam',4,5,'What does "obsequious" mean?',['Bossy and domineering','Excessively eager to please; fawning','Clever and cunning','Distant and cold'],1,'"Obsequious" means excessively compliant or eager to serve to win favour.'),
  q('ex7','grammar-exam',4,4,'Which sentence contains a dangling modifier?',['Running fast, she won the race.','Running fast, the race was won.','She ran fast and won the race.','She won the race by running fast.'],1,'"Running fast" must modify a person, but "the race" cannot run. This is a dangling modifier.'),
  q('ex8','grammar-exam',4,4,'Choose the correct form: "Neither the cats nor the dog ___ happy."',['are','were','is','have been'],2,'When "neither...nor" joins subjects, the verb agrees with the nearest subject (dog = singular → "is").'),
  q('ex9','grammar-exam',4,5,'Which correctly punctuates the non-restrictive clause?',['The man who is tall left.','The man, who is tall, left.','The man who, is tall left.','The man who is tall, left.'],1,'A non-restrictive clause adds extra (non-essential) information and must be set off with commas.'),
  q('ex10','mixed-english',4,5,'Identify the error: "Each of the students have submitted their work."',['students','have','submitted','their'],1,'"Each" is singular, so the verb must be singular: "Each of the students has submitted..."'),
  q('ex11','mixed-english',4,4,'What is the meaning of the prefix "mal-"?',['Good','Again','Bad or wrongly','Under'],2,'"Mal-" means bad or badly: malfunction (function badly), malicious (bad intent).'),
  q('ex12','mixed-english',4,5,'Which sentence demonstrates the subjunctive mood correctly?',['I wish I was there.','I wish I were there.','I wish I am there.','I wish I will be there.'],1,'Subjunctive: "I wish I WERE there" — contrary to fact, so use "were" not "was".'),
]

export const englishQuestions = [...p1, ...p2, ...p3, ...p4]
