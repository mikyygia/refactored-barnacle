import { nanoid } from 'nanoid';

export class SleepData {
	id: string;
	loggedAt: Date;

	constructor() {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		this.id = nanoid();
		this.loggedAt = new Date();
	}

	summaryString(): string {
		return 'Unknown sleep data';
	}

	dateString(): string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	get_note(): string {
		return "";
	}

	get_logged_at(): any {
		return this.loggedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: "numeric" }) + " @ " + 
				this.loggedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit',hour12: true });
	}
}
