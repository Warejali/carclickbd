export interface ISecondStepStoreAbleData {
  mainPhotoFile: File | any;
  enteriorPhotoFiles: File[] | any;
  exteriorPhotoFiles: File[] | any;
  mechanicalPhotoFiles: File[] | any;
  otherPhotoFiles: File[] | any;
  docsPhotoFiles: File[] | any;
  videoLinks: string[] | any;
}

export interface IStoreAbleData {
  key: string;
  value: string;
}
