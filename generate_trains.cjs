const fs = require('fs');

const csvPath = 'train_delay_dataset (3).csv';
const csvData = fs.readFileSync(csvPath, 'utf8');

const lines = csvData.split('\n').filter(l => l.trim().length > 0);
const headers = lines[0].split(',');

const trains = [];
const MOCK_NAMES = ['Rajdhani Express', 'Shatabdi Express', 'Garib Rath', 'Intercity Express', 'Vande Bharat', 'Duronto Express', 'Sampark Kranti', 'Superfast Express'];

for (let i = 1; i <= 100 && i < lines.length; i++) {
  const values = lines[i].split(',');
  const row = {};
  headers.forEach((h, idx) => {
    row[h.trim()] = values[idx] ? values[idx].trim() : '';
  });

  // Calculate delay status
  const delayMin = parseFloat(row.delay_min) || 0;
  let status = 'ON TIME';
  if (delayMin > 0) status = 'DELAYED';
  
  // Mock legacy fields
  const mockName = MOCK_NAMES[i % MOCK_NAMES.length];
  const mockSpeed = Math.floor(Math.random() * 50) + 70;
  const mockPlatform = `P${(i % 10) + 1}`;
  
  const [src, dest] = (row.section_id || 'UNK-UNK').split('-');

  trains.push({
    trainNo: row.train_id,
    name: mockName,
    route: `${src} → ${dest}`,
    location: src,
    status: status,
    delay: delayMin > 0 ? `+${delayMin} min` : '—',
    delayMinutes: delayMin,
    platform: mockPlatform,
    etd: row.scheduled_departure,
    scheduledTime: row.scheduled_arrival,
    destination: dest,
    speed: mockSpeed,
    priority: row.train_type, // 'Freight', 'Express', 'Passenger'
    currentTrack: `${row.track_type} Track`,
    nextStation: dest,
    
    // New Dataset Fields
    trainType: row.train_type,
    priorityLevel: parseInt(row.priority) || 0,
    sectionId: row.section_id,
    scheduledArrival: row.scheduled_arrival,
    scheduledDeparture: row.scheduled_departure,
    actualArrival: row.actual_arrival,
    dayOfWeek: parseInt(row.day_of_week) || 1,
    isWeekend: row.is_weekend === '1',
    timeOfDayBucket: row.time_of_day_bucket,
    season: row.season,
    upstreamDelayMin: parseFloat(row.upstream_delay_min) || 0,
    sectionCongestionLevel: parseFloat(row.section_congestion_level) || 0,
    weatherFlag: parseInt(row.weather_flag) || 0,
    trackType: row.track_type,
    delayMin: delayMin
  });
}

fs.writeFileSync('newTrains.json', JSON.stringify(trains, null, 2));
console.log('Successfully generated newTrains.json');
