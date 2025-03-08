import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SleepService {
	// private static LoadDefaultData: boolean = true;
	// public static AllSleepData: SleepData[] = [];
	// public static AllOvernightData: OvernightSleepData[] = [];
	// public static AllSleepinessData: StanfordSleepinessData[] = [];
	private static AllSleepData: (OvernightSleepData | StanfordSleepinessData)[] = [];

	private sleepRecords: OvernightSleepData[] = [];
	private sleepRecordsSubject = new BehaviorSubject<OvernightSleepData[]>(this.sleepRecords);

	private sleepinessRecords: StanfordSleepinessData[] = [];
	private sleepinessRecordsSubject = new BehaviorSubject<StanfordSleepinessData[]>(this.sleepinessRecords);


	constructor(private storageService: StorageService) {
		this.loadSleepData(); // Load existing data on initialization
	}

	private async initializeStorage() {
		// Make sure storage is initialized before loading data
		await this.storageService.init();
		this.loadSleepData(); // Now load data
	}

	public getAllSleepData() {
		return SleepService.AllSleepData;
	}

	private async loadSleepData() {
		try {
			const data = await this.storageService.get('sleepData') || [];
			if (data && data.length) {
				SleepService.AllSleepData = data;
			} else {
				this.addDefaultData(); // load default data if nothing is found
			}
			this.updateSleepDataSubject();
		} catch (error) {
			console.error('Error loading sleep data:', error);
			this.addDefaultData(); // loading failed
		}
	}

	private updateSleepDataSubject() {
		// Updating both sleep and sleepiness data
		const overnightData = SleepService.AllSleepData.filter(data => data instanceof OvernightSleepData) as OvernightSleepData[];
		const sleepinessData = SleepService.AllSleepData.filter(data => data instanceof StanfordSleepinessData) as StanfordSleepinessData[];

		this.sleepRecords = overnightData;
		this.sleepinessRecords = sleepinessData;

		this.sleepRecordsSubject.next([...this.sleepRecords]);
		this.sleepinessRecordsSubject.next([...this.sleepinessRecords]);  // Ensure sleepiness data is emitted too
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public async logOvernightData(sleepData: OvernightSleepData) {
		SleepService.AllSleepData.unshift(sleepData);
		await this.storageService.set('sleepData', SleepService.AllSleepData);
		this.updateSleepDataSubject();
	}

	// Method to log sleepiness data
	public async logSleepinessData(sleepData: StanfordSleepinessData) {
		SleepService.AllSleepData.unshift(sleepData);
		await this.storageService.set('sleepData', SleepService.AllSleepData);
		this.updateSleepDataSubject();
	}

	// Method to add new sleep data
	public logSleep(sleepStart: Date, sleepEnd: Date) {
		const newRecord = new OvernightSleepData(sleepStart, sleepEnd);
		this.sleepRecords.push(newRecord);
		this.sleepRecordsSubject.next([...this.sleepRecords]); // Emit new value
		// Also save to storage
		this.logOvernightData(newRecord);
	}

	// Get sleep and sleepiness data
	getSleepRecords(): Observable<OvernightSleepData[]> {
		return this.sleepRecordsSubject.asObservable();
	}

	getSleepinessRecords(): Observable<StanfordSleepinessData[]> {
		return this.sleepinessRecordsSubject.asObservable();
	}
}
