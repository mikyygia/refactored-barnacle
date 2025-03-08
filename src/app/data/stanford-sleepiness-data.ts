/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
		'Feeling active, vital, alert, or wide awake', //1
		'Functioning at high levels, but not at peak; able to concentrate', //2
		'Awake, but relaxed; responsive but not fully alert', //3
		'Somewhat foggy, let down', //4
		'Foggy; losing interest in remaining awake; slowed down', //5
		'Sleepy, woozy, fighting sleep; prefer to lie down', //6
		'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private logged_value: number;
	private logged_note: string;

	constructor(logged_value: number, loggedAt: Date = new Date(), logged_note: string) {
		super();
		this.logged_value = logged_value;
		this.loggedAt = loggedAt;
		this.logged_note = logged_note;
	}

	override summaryString(): string {
		return this.logged_value + ": " + StanfordSleepinessData.ScaleValues[this.logged_value];
	}

	override get_note(): string {
		return this.logged_note;
	}
}
