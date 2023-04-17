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

export type IUser = {
  // Id: number,
  // Name: string,
  // Week: IMyDay[] , 
  Presets: IPreset[]
  LastDay: IMyDay | null
  // LastActivity: IDayActivity
  // LastPreset: IPreset
}
export default IDay