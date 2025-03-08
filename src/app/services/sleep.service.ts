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
	private static all_sleep_data: (OvernightSleepData | StanfordSleepinessData)[] = [];

	private sleep_records: OvernightSleepData[] = [];
	private sleep_records_subject = new BehaviorSubject<OvernightSleepData[]>(this.sleep_records);

	private sleepiness_records: StanfordSleepinessData[] = [];
	private sleepiness_records_subject = new BehaviorSubject<StanfordSleepinessData[]>(this.sleepiness_records);


	constructor(private storage_service: StorageService) {
		this.initialize_storage();
		// this.load_sleep_data();
	}

	private async initialize_storage() {
		try {
			await this.storage_service.init();
			this.load_sleep_data(); // load after setup is ok
		} catch (error) {
			console.error('Something went wrong when initializing storage ..:', error);
		}
	}

	public get_all_sleep_data() {
		return SleepService.all_sleep_data;
	}

	private async load_sleep_data() {
		try {
			const data = await this.storage_service.get('sleepData') || [];

			if ( data && data.length ) { SleepService.all_sleep_data = data; } 
			else { this.addDefaultData(); }

			this.update_sleep_data_subject();
		} catch (error) {
			console.error('Something went wrong when loading saved data...', error);
			this.addDefaultData(); // loading failed
		}
	}

	private update_sleep_data_subject() {
		// Updating sleep and sleepiness data
		const overnight_data = SleepService.all_sleep_data.filter(data => data instanceof OvernightSleepData) as OvernightSleepData[];
		const sleepiness_data = SleepService.all_sleep_data.filter(data => data instanceof StanfordSleepinessData) as StanfordSleepinessData[];

		this.sleep_records = overnight_data;
		this.sleepiness_records = sleepiness_data;

		this.sleep_records_subject.next([...this.sleep_records]);
		this.sleepiness_records_subject.next([...this.sleepiness_records]); 
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
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate, "")); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public async logOvernightData(sleep_data: OvernightSleepData) {
		SleepService.all_sleep_data.unshift(sleep_data);
		await this.storage_service.set('sleepData', SleepService.all_sleep_data);
		this.update_sleep_data_subject();
	}

	// Method to log sleepiness data
	public async logSleepinessData(sleep_data: StanfordSleepinessData) {
		SleepService.all_sleep_data.unshift(sleep_data);
		await this.storage_service.set('sleepData', SleepService.all_sleep_data);
		this.update_sleep_data_subject();
	}

	public log_sleep(sleep_start: Date, sleep_end: Date) {
		const new_record = new OvernightSleepData(sleep_start, sleep_end);
		this.sleep_records.push(new_record);
		this.sleep_records_subject.next([...this.sleep_records]);
		this.logOvernightData(new_record);
	}

	// Get sleep and sleepiness data
	get_sleep_records(): Observable<OvernightSleepData[]> {
		return this.sleep_records_subject.asObservable();
	}

	get_sleepiness_records(): Observable<StanfordSleepinessData[]> {
		return this.sleepiness_records_subject.asObservable();
	}
}
