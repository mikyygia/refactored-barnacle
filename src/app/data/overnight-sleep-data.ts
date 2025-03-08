import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	public sleep_start: Date;
	public sleep_end: Date;

	constructor(sleep_start: Date, sleep_end: Date) {
		super();
		this.sleep_start = sleep_start;
		this.sleep_end = sleep_end;

		console.log("Overnight: ", this.sleep_start, this.sleep_end);
	}

	override summaryString(): string {
		var sleepStart_ms = this.sleep_start.getTime();
		var sleepEnd_ms = this.sleep_end.getTime();

		var difference_ms = sleepEnd_ms - sleepStart_ms;

		return Math.floor(difference_ms / (1000 * 60 * 60)) + " hours, " + Math.floor(difference_ms / (1000 * 60) % 60) + " minutes";
	}

	override dateString(): string {
		const formattedDate_start = this.sleep_start.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});

		const formattedDate_end = this.sleep_end.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});

		// return "Night of " + this.sleep_start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
		return `${formattedDate_start} to ${formattedDate_end}`;
	}
}
