import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { SearchParams, KokkaiResponse, RecordData } from '../types/api';

const router = Router();
const KOKKAI_API_BASE_URL = 'https://kokkai.ndl.go.jp/api/speech';

interface ErrorResponse {
  error: string;
}

const searchHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maximumRecordsNum = Number(req.query.maximumRecords) || 20;
    const startRecordNum = Number(req.query.startRecord) || 1;

    // 数値パラメータの検証
    if (maximumRecordsNum < 1 || maximumRecordsNum > 100) {
      return res.status(400).json({ error: 'maximumRecordsは1から100の範囲で指定してください' });
    }

    if (startRecordNum < 1) {
      return res.status(400).json({ error: 'startRecordは1以上の値を指定してください' });
    }

    // APIに送信するパラメータを作成
    const params: Record<string, string | number> = {
      maximumRecords: maximumRecordsNum,
      startRecord: startRecordNum,
      recordPacking: 'json'
    };

    // 検索条件の追加（空文字列は除外）
    let hasSearchCondition = false;

    if (req.query.any && req.query.any.toString().trim() !== '') {
      params.any = req.query.any.toString().trim();
      hasSearchCondition = true;
    }

    if (req.query.speaker && req.query.speaker.toString().trim() !== '') {
      params.speaker = req.query.speaker.toString().trim();
      hasSearchCondition = true;
    }

    if (req.query.nameOfMeeting && req.query.nameOfMeeting.toString().trim() !== '') {
      params.nameOfMeeting = req.query.nameOfMeeting.toString().trim();
      hasSearchCondition = true;
    }

    // 日付パラメータの検証と追加
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (req.query.from && req.query.from.toString().trim() !== '') {
      const from = req.query.from.toString().trim();
      if (!dateRegex.test(from)) {
        return res.status(400).json({ error: 'fromはYYYY-MM-DD形式で指定してください' });
      }
      // 日付の妥当性をチェック
      const fromDate = new Date(from);
      if (isNaN(fromDate.getTime())) {
        return res.status(400).json({ error: 'fromの日付が無効です' });
      }
      params.from = from;
      hasSearchCondition = true;
    }

    if (req.query.until && req.query.until.toString().trim() !== '') {
      const until = req.query.until.toString().trim();
      if (!dateRegex.test(until)) {
        return res.status(400).json({ error: 'untilはYYYY-MM-DD形式で指定してください' });
      }
      // 日付の妥当性をチェック
      const untilDate = new Date(until);
      if (isNaN(untilDate.getTime())) {
        return res.status(400).json({ error: 'untilの日付が無効です' });
      }
      params.until = until;
      hasSearchCondition = true;
    }

    // 検索条件が一つも指定されていない場合はエラー
    if (!hasSearchCondition) {
      return res.status(400).json({ error: '検索条件（キーワード、発言者、会議名、期間）を少なくとも1つ指定してください' });
    }

    console.log('Sending request to Kokkai API with params:', params);
    const response = await axios.get<KokkaiResponse>(KOKKAI_API_BASE_URL, {
      params,
      timeout: 10000
    });

    // APIレスポンスをフロントエンド用の形式に変換
    const apiResponse = response.data;
    const transformedResponse = {
      numberOfRecords: apiResponse.numberOfRecords,
      numberOfReturn: apiResponse.numberOfReturn,
      startRecord: apiResponse.startRecord,
      nextRecordPosition: apiResponse.nextRecordPosition,
      speechRecord: (apiResponse.records || []).map(record => ({
        speechID: record.speechID,
        issueID: record.issueID,
        imageKind: 'meetingRecord',
        searchObject: 'speech',
        session: '',
        nameOfHouse: '',
        nameOfMeeting: record.meeting,
        issue: '',
        date: record.date,
        closing: '',
        speechOrder: record.speechOrder,
        speaker: record.speaker,
        speakerYomi: record.speakerYomi,
        speakerGroup: record.speakerGroup,
        speakerPosition: record.speakerPosition,
        speakerRole: record.speakerRole,
        speech: record.speech,
        startPage: record.startPage,
        speechURL: record.speechURL,
        meetingURL: record.meetingURL,
        pdfURL: record.speechURL.replace('/speech/', '/pdf/')
      }))
    };

    console.log('Transformed response:', transformedResponse);
    return res.json(transformedResponse);

  } catch (error) {
    console.error('Error fetching from Kokkai API:', error);

    // エラーオブジェクトの型チェック
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'ECONNABORTED') {
        return res.status(504).json({ error: 'APIリクエストがタイムアウトしました。しばらく待ってから再度お試しください。' });
      }
    }

    // Axiosエラーレスポンスのチェック
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: any } };
      if (axiosError.response?.status) {
        const status = axiosError.response.status;
        if (status === 400) {
          return res.status(400).json({ error: '検索パラメータが不正です' });
        }
        if (status === 404) {
          return res.status(404).json({ error: 'データが見つかりませんでした' });
        }
        if (status === 503) {
          return res.status(503).json({ error: 'サービスが混み合っています。しばらく待ってから再度お試しください。' });
        }
      }

      // APIからのエラーメッセージがある場合はそれを使用
      if (axiosError.response?.data?.message) {
        return res.status(400).json({ error: axiosError.response.data.message });
      }
    }

    const errorResponse: ErrorResponse = {
      error: '国会議事録APIの取得中にエラーが発生しました'
    };
    res.status(500).json(errorResponse);
    next(error);
  }
};

router.get('/search', async (req, res, next) => await searchHandler(req, res, next));

export default router;