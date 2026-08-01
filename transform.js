const fs = require('fs');
let code = fs.readFileSync('exerciseRender.tsx', 'utf8');

// 1. Remove the outer AnimatePresence and motion.div
// Let's find the start of the Objective div
const objIdx = code.indexOf('🎯 OBJETIVO DA SÉRIE');
// Let's find the div containing it: <div className="bg-surface/60 backdrop-blur-md...
let startContent = code.lastIndexOf('<div', objIdx);
// Actually, let's include everything from Objective down to the end of the motion.div, except the closing tags of motion.div and AnimatePresence

const endCooldownIdx = code.indexOf('{todayPlan?.cooldown && todayPlan.cooldown.length > 0 && (');

let innerContent = code.substring(startContent, endCooldownIdx);

// Now wrap it in the accordion logic
const finalCode = `
        <div className="space-y-4">
          {exercises.map((currentExercise, index) => {
            const isExpanded = activeExerciseIndex === index;
            // Safely get library data if needed
            const libraryExercise = EXERCISE_LIBRARY.find(
              (ex) =>
                ex.id === currentExercise.libraryId ||
                ex.name.toLowerCase() === currentExercise.name.toLowerCase()
            );

            return (
              <div key={\`\${currentExercise.id}-\${index}\`} className={\`bg-surface/40 border transition-all duration-300 overflow-hidden \${isExpanded ? 'border-neon-blue/30 rounded-3xl shadow-[0_0_30px_rgba(0,210,255,0.1)]' : 'border-white/5 rounded-2xl'}\`}>
                
                {/* Accordion Header */}
                <div 
                  onClick={() => {
                     setActiveExerciseIndex(index);
                     // Optionally start prep if they jump around?
                     // Let's keep it simple.
                  }}
                  className={\`flex items-center gap-4 p-4 cursor-pointer transition-colors \${isExpanded ? 'bg-white/5' : 'hover:bg-white/[0.02]'}\`}
                >
                  <div 
                    className="w-16 h-16 rounded-xl shrink-0 relative overflow-hidden bg-background border border-white/10 group"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setFullscreenExercise(currentExercise);
                    }}
                  >
                     <ExerciseMedia
                        exerciseNameOrId={currentExercise.libraryId || currentExercise.name || currentExercise.id}
                        fallbackMuscle={currentExercise.targetMuscles?.[0] || currentExercise.target || "Corpo Todo"}
                        priority={isExpanded}
                     />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play size={20} className="text-white" />
                     </div>
                  </div>

                  <div className="flex-1 min-w-0">
                     <h3 className={\`text-sm font-black truncate \${isExpanded ? 'text-neon-blue' : 'text-white'}\`}>{currentExercise.name}</h3>
                     <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{currentExercise.sets} Séries • {currentExercise.reps}</p>
                     
                     <div className="flex gap-2 mt-2 flex-wrap">
                       {currentExercise.supersetGroup && (
                          <span className="text-[9px] bg-neon-blue/20 text-neon-blue uppercase px-1.5 py-0.5 rounded font-extrabold tracking-wider">
                             🔄 {currentExercise.supersetGroup}
                          </span>
                       )}
                       {currentExercise.advancedTechnique && currentExercise.advancedTechnique !== "Nenhuma" && (
                          <span className="text-[9px] bg-red-500/20 text-red-500 uppercase px-1.5 py-0.5 rounded font-extrabold tracking-wider">
                             🔥 {currentExercise.advancedTechnique}
                          </span>
                       )}
                     </div>
                  </div>

                  <div className="shrink-0 text-white/30 p-2">
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </motion.div>
                  </div>
                </div>

                {/* Accordion Body */}
                <AnimatePresence>
                   {isExpanded && (
                      <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="border-t border-white/5"
                      >
                         <div className="p-4 space-y-6">
                            ${innerContent}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
              </div>
            );
          })}

          {todayPlan?.cooldown && todayPlan.cooldown.length > 0 && (
            <div className="p-4 rounded-xl border bg-surface border-surface-light mt-6">
              <h3 className="font-bold text-white text-[15px] mb-3 flex items-center gap-2">
                <Activity size={18} className="text-neon-purple" />
                Resfriamento & Alongamento
              </h3>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                {todayPlan.cooldown.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setShowAddMenu(true)}
            className="w-full bg-surface border border-surface-light py-4 rounded-xl text-xs font-bold uppercase text-text-secondary hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Adicionar Novo Exercício
          </button>
        </div>
`;

fs.writeFileSync('newExerciseRender.tsx', finalCode);
