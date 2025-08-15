export interface SearchParams {
  maximumRecords?: number;
  startRecord?: number;
  any?: string;
  speaker?: string;
  nameOfMeeting?: string;
  from?: string;
  export interface SearchParams {
    maximumRecords?: number;
    startRecord?: number;
    any?: string;
    speaker?: string;
    nameOfMeeting?: string;
    from?: string;
    until?: string;
  }

  export interface RecordData {
    speechID?: string;
    issueID?: string;
    meeting?: string;
    date?: string;
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
  }

  export interface KokkaiResponse {
    numberOfRecords: number;
    numberOfReturn: number;
    startRecord: number;
    nextRecordPosition: number;
    records?: RecordData[];
  }
