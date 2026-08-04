const fs = require('fs');
let code = fs.readFileSync('lib/store.tsx', 'utf8');

const replacement = `
      setTasks: (tasks) => set({ tasks }),
      setGoals: (goals) => set({ goals }),
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),
      removeTransaction: (id) => set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) })),
      logout: () => set({ profile: null, tasks: [], goals: [], transactions: [] }),
`;

code = code.replace(/logout:\s*\(\)\s*=>\s*set\(\{ profile: null, tasks: \[\], goals: \[\], transactions: \[\] \}\),/, replacement);

fs.writeFileSync('lib/store.tsx', code);
