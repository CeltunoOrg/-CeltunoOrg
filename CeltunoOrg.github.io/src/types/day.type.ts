export interface IDay {
  key?: string | null;
  name: string;
  formiddag: string;
  ettermiddag: string;
  natt: string;
  submitted?: boolean;

}
export type IDayActivity = {
  Id: number
  Name: string
  // Description: string
  Image: string
  Order: string
  Selected: boolean
}
export type IPreset = {

  Id: number
  Name: string
  Description: string
  Activities: IDayActivity[]
}
export type IImagePreset = {

  Id: number
  Name: string
  // Description: string
  image: string
  Order: string
  Selected: boolean
}
export type ISelectImage = {
  Image: string
  Selected: boolean
}
export type IMyDay = {
  Id: number 
  Name: string
  Description: string
  // images: string[]
  Activities: IDayActivity[]
}

export enum  DataType {
  Planner = "planner",
  Presets = "presets",
  User = "user"
}

export type IUser = {
  Id: number,
  Name: string,
  Days: IMyDay[] , 
  Presets: IPreset[]
  LastDay: IMyDay | null
  Config:{
    title: string,
    titleSize: string,
    color1: string,
    color2: string,
    background: string,
    role:string
  }
  // LastActivity: IDayActivity
  // LastPreset: IPreset
}
export default IDay