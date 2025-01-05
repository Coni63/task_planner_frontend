import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanDuration',
  standalone: true,
})
export class HumanDurationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Match the pattern "days HH:MM:SS"
    const match = value.match(/^(\d+)\s+(\d{2}):(\d{2}):(\d{2})$/);
    if (!match) return 'Invalid Duration';

    const days = parseInt(match[1]);
    const hours = parseInt(match[2]);
    const minutes = parseInt(match[3]);
    const seconds = parseInt(match[4]);

    const parts = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return parts.join(' ') || '0 seconds';
  }
}
