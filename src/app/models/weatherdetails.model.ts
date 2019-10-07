import {ICoordinates} from './coordinates.model'
import {IWeather} from './weather.model'
import {IMain} from './main.model'
import {IWind} from './wind.model'
import {ICloud} from './clouds.model'
import {ISys} from './sys.model'

export interface IDetails {
    
    coord: ICoordinates;
    weather: IWeather[]
    base: string;
    main: IMain;
    visibility: number;
    wind: IWind;
    clouds: ICloud;
    dt: number;
    sys: ISys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    
}