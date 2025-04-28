import Papa from "papaparse";

export interface CrashData {
  CrashID: number;
  crash_fatal_fl: boolean;
  crash_speed_limit: number;
  latitude: number;
  longitude: number;
  crash_sev_id: number;
  tot_injry_cnt: number;
  death_cnt: number;
  units_involved: string;
  Crash_timestamp_USCentral : string; // Or Date if you parse it
  Estimated_Maximum_Comprehensive_Cost: number;
  Estimated_Total_Comprehensive_Cost: number;
  Year: number;
  Month: number;
  Day:number;
  DayCycle: string;
}


/**
 * create Classe Method to get, set and filter data for react to use in a use state
 * 
 * interFace Above Matches the cvs file created
 * 
 * To use papaparse as async and beable to use a class constructor method have to use a static method to init the data to the class
 */

export default class DataAustin {
  public data : CrashData[];

  private constructor(data: CrashData[]) {
    this.data = data;
  }

  public static async create(fileName: string): Promise<DataAustin> {  //Use an async static create Method
    const data = await DataAustin.parseCSV(fileName);
    return new DataAustin(data);
  }


  public static async parseCSV(fileName: string): Promise<CrashData[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(fileName, {
        download: true,
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          resolve(result.data as CrashData[]);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  // pass as a filter object?
  public filter(fatal: boolean|undefined, year: number|undefined , crashSeverity: number|undefined, timeOfDay: string|undefined): CrashData[]{
    return this.data.filter((crash)=> {
      let isValid: boolean = true;
      if (fatal !== undefined && crash.crash_fatal_fl !== fatal){
        isValid = false;
      }
      if(year !== undefined && crash.Year !== year){
        isValid = false
      }
      if(crashSeverity !== undefined && crash.crash_sev_id !== crashSeverity){
        isValid = false
      }
      if(timeOfDay !== undefined && crash.DayCycle !== timeOfDay){
        isValid = false
      }
      return isValid
    })
  }

  /**
   * calanderYear
   */
  public static async calendarYear(data : CrashData[]): Promise<number[]> {
    try {
      const calendarData: number[] = []
      for (let i = 1; i <= 12; i++) {
        const count : number = data.filter(e => e.Month == i).length
        calendarData.push(count)
      }
      return calendarData;
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      throw error;
    }
  }



}