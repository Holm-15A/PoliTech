export interface SearchParams {
  maximumRecords?: number;
  startRecord?: number;
  any?: string;
  speaker?: string;
  nameOfMeeting?: string;
  from?: string;
  until?: string;
}

export interface SpeechRecord {
  speechID: string;
  issueID?: string;
  imageKind?: string;
  searchObject?: string;
  session?: string;
  nameOfHouse?: string;
  nameOfMeeting?: string;
  issue?: string;
  date?: string;
  closing?: string;
  speechOrder?: number;
  speaker?: string;
  speakerYomi?: string;
  speakerGroup?: string;
  speakerPosition?: string;
  speakerRole?: string;
  speech?: string;
  startPage?: number;
  speechURL?: string;
  meetingURL?: string;
  pdfURL?: string;
}

export interface KokkaiResponse {
  numberOfRecords: number;
  numberOfReturn: number;
  startRecord: number;
  nextRecordPosition: number;
  speechRecord?: SpeechRecord[];
}
