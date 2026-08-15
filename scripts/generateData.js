import fs from 'fs';
import path from 'path';

const csvPath = path.resolve('train_delay_dataset (3).csv');
const dataStr = fs.readFileSync(csvPath, 'utf8');

const lines = dataStr.split('\n').filter(line => line.trim().length > 0);
const headers = lines[0].split(',');

const data = lines.slice(1).map(line => {
  const values = line.split(',');
  const obj = {};
  headers.forEach((header, index) => {
    obj[header.trim()] = values[index]?.trim();
  });
  return obj;
});

// GENERATE WEEKLY PERFORMANCE (for Analytics)
// day_of_week: 1 (Mon) - 7 (Sun)
const dayStats = {
  1: { total: 0, onTime: 0 },
  2: { total: 0, onTime: 0 },
  3: { total: 0, onTime: 0 },
  4: { total: 0, onTime: 0 },
  5: { total: 0, onTime: 0 },
  6: { total: 0, onTime: 0 },
  7: { total: 0, onTime: 0 },
};

data.forEach(row => {
  const day = parseInt(row.day_of_week);
  if (dayStats[day]) {
    dayStats[day].total++;
    // Let's define onTime realistically: delay_min < 5
    if (parseFloat(row.delay_min) < 5) {
      dayStats[day].onTime++;
    }
  }
});

const daysMap = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun' };
const weeklyPerformance = Object.keys(dayStats).map(dayStr => {
  const day = parseInt(dayStr);
  const stats = dayStats[day];
  const percentage = stats.total > 0 ? Math.round((stats.onTime / stats.total) * 100) : 0;
  return {
    day: daysMap[day],
    percentage,
    highlight: day === 7 // just highlight Sunday for now
  };
});

const analyticsContent = `import type { WeeklyData } from '../types';\n\nexport const WEEKLY_PERFORMANCE: WeeklyData[] = ${JSON.stringify(weeklyPerformance, null, 2)};\n`;
fs.writeFileSync(path.resolve('src/data/analyticsData.ts'), analyticsContent);


// GENERATE TRAIN DATA (for Live Operations)
// Take top 50
const liveTrains = data.slice(0, 50).map((row, i) => {
  const delayMin = parseFloat(row.delay_min);
  
  let status = 'ON TIME';
  if (delayMin > 15) status = 'DELAYED';
  else if (delayMin > 0) status = 'APPROACHING';
  
  let priorityLabel = 'Passenger';
  if (row.priority === '1') priorityLabel = 'Express';
  else if (row.priority === '3') priorityLabel = 'Freight';

  const parts = row.section_id ? row.section_id.split('-') : ['UNK', 'UNK'];
  const loc = parts[0];
  const dest = parts[1];

  return {
    trainNo: row.train_id,
    name: row.train_type + ' Train',
    route: `${loc} → ${dest}`,
    location: loc,
    status: status,
    delay: delayMin === 0 ? 'ON TIME' : `+${delayMin} min`,
    delayMinutes: delayMin,
    platform: `P${(i % 10) + 1}`,
    etd: row.scheduled_departure,
    scheduledTime: row.scheduled_arrival,
    destination: dest,
    speed: 60 + Math.floor(Math.random() * 60),
    priority: priorityLabel,
    currentTrack: row.track_type + ' Track',
    nextStation: dest,
    
    trainType: row.train_type,
    priorityLevel: parseInt(row.priority),
    sectionId: row.section_id,
    scheduledArrival: row.scheduled_arrival,
    scheduledDeparture: row.scheduled_departure,
    actualArrival: row.actual_arrival,
    dayOfWeek: parseInt(row.day_of_week),
    isWeekend: row.is_weekend === '1',
    timeOfDayBucket: row.time_of_day_bucket,
    season: row.season,
    upstreamDelayMin: parseFloat(row.upstream_delay_min),
    sectionCongestionLevel: parseFloat(row.section_congestion_level),
    weatherFlag: parseInt(row.weather_flag),
    trackType: row.track_type,
    delayMin: delayMin
  };
});

const trainsContent = `import type { Train } from '../types';\n\nexport const TRAIN_DATA: Train[] = ${JSON.stringify(liveTrains, null, 2)};\n`;
fs.writeFileSync(path.resolve('src/data/trainsData.ts'), trainsContent);

console.log('Successfully generated analyticsData.ts and trainsData.ts');
