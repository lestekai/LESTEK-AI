import { EXERCISE_DATABASE } from '../lib/exerciseDatabase';
import fs from 'fs';
import path from 'path';

export function validateExerciseMedia() {
  const result = {
    validExercises: 0,
    missingMedia: 0,
    duplicatedMedia: 0,
    invalidMappings: 0,
    unresolvedExercises: 0,
    failedFiles: [] as string[]
  };

  const mediaSet = new Set<string>();

  EXERCISE_DATABASE.forEach(ex => {
    let valid = true;

    // Check local media existence
    if (ex.media.local) {
      const localPath = path.join(process.cwd(), 'public', ex.media.local);
      if (!fs.existsSync(localPath)) {
        result.missingMedia++;
        result.failedFiles.push(ex.media.local);
        valid = false;
      }
    } else {
      result.unresolvedExercises++;
      valid = false;
    }

    if (ex.media.local && mediaSet.has(ex.media.local)) {
      result.duplicatedMedia++;
    } else if (ex.media.local) {
      mediaSet.add(ex.media.local);
    }

    if (!ex.canonicalName || !ex.normalizedName) {
      result.invalidMappings++;
      valid = false;
    }

    if (valid) {
      result.validExercises++;
    }
  });

  return result;
}

if (require.main === module) {
  const r = validateExerciseMedia();
  const outDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(outDir)) {
     fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'exercise-media-audit.json'), JSON.stringify(r, null, 2));
  console.log(JSON.stringify(r, null, 2));
}
