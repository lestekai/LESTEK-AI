import { Skeleton } from '@/components/Skeleton';
import { motion } from 'motion/react';

export default function Loading() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col p-6 space-y-6 max-w-7xl mx-auto w-full pt-12"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>

      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-[200px] w-full rounded-2xl" />
        <Skeleton className="h-[120px] w-full rounded-2xl" />
        <Skeleton className="h-[120px] w-full rounded-2xl" />
      </div>
    </motion.div>
  );
}
