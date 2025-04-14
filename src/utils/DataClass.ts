import Papa from "papaparse";

interface CrashData {
  "Crash ID": number;
  crash_speed_limit: number;
  crash_fatal_fl: boolean;
  latitude: number;
  longitude: number;
  crash_sev_id: number;
  tot_injry_cnt: number;
  death_cnt: number;
  units_involved: string;
  onsys_fl: boolean;
  "Crash timestamp (US/Central)": string; // Or Date if you parse it
  "Crash timestamp": string; // Or Date if you parse it
  "Estimated Maximum Comprehensive Cost": number;
  "Estimated Total Comprehensive Cost": number;
  Year: number;
  Mothn: number;
  Time_of_day: string;
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

  public byYear(year: number){
    this.data = this.data.filter((stat: CrashData)=> stat.Year === year)
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
      if(timeOfDay !== undefined && crash.Time_of_day !== timeOfDay){
        isValid = false
      }
      return isValid
    })
  }



}