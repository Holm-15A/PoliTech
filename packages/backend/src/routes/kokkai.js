"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const KOKKAI_API_BASE_URL = 'https://kokkai.ndl.go.jp/api/speech';
const searchHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const q = req.query;
        const maximumRecordsNum = Number(q.maximumRecords) || 20;
        const startRecordNum = Number(q.startRecord) || 1;
        // 数値パラメータの検証
        if (maximumRecordsNum < 1 || maximumRecordsNum > 100) {
            return res.status(400).json({ error: 'maximumRecordsは1から100の範囲で指定してください' });
        }
        if (startRecordNum < 1) {
            return res.status(400).json({ error: 'startRecordは1以上の値を指定してください' });
        }
        // APIに送信するパラメータを作成
        const params = {
            maximumRecords: maximumRecordsNum,
            startRecord: startRecordNum,
            recordPacking: 'json'
        };
        // 検索条件の追加（空文字列は除外）
        let hasSearchCondition = false;
        if (q.any && q.any.toString().trim() !== '') {
            params.any = q.any.toString().trim();
            hasSearchCondition = true;
        }
        if (q.speaker && q.speaker.toString().trim() !== '') {
            params.speaker = q.speaker.toString().trim();
            hasSearchCondition = true;
        }
        if (q.nameOfMeeting && q.nameOfMeeting.toString().trim() !== '') {
            params.nameOfMeeting = q.nameOfMeeting.toString().trim();
            hasSearchCondition = true;
        }
        // 日付パラメータの検証と追加
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (q.from && q.from.toString().trim() !== '') {
            const from = q.from.toString().trim();
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
        if (q.until && q.until.toString().trim() !== '') {
            const until = q.until.toString().trim();
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
        const response = yield axios_1.default.get(KOKKAI_API_BASE_URL, {
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
    }
    catch (error) {
        console.error('Error fetching from Kokkai API:', error);
        // エラーオブジェクトの型チェック
        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'ECONNABORTED') {
                return res.status(504).json({ error: 'APIリクエストがタイムアウトしました。しばらく待ってから再度お試しください。' });
            }
        }
        // Axiosエラーレスポンスのチェック
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error;
            if ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) {
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
            if ((_c = (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) {
                return res.status(400).json({ error: axiosError.response.data.message });
            }
        }
        const errorResponse = {
            error: '国会議事録APIの取得中にエラーが発生しました'
        };
        res.status(500).json(errorResponse);
        next(error);
    }
});
// register route
router.get('/search', searchHandler);
exports.default = router;
