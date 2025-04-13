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
  }


export function fatal(data :CrashData){


}