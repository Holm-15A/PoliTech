import { Link as RouterLink } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center py-20 md:py-36 space-y-8 md:space-y-14">
        <h1 className="font-semibold text-2xl sm:text-4xl md:text-6xl leading-tight">
          政治を
          <span className="text-blue-400"> もっとオープンに</span>
        </h1>
        <p className="text-gray-500">
          PoliTechは、政治をよりオープンで透明性の高いものにすることを目指すプラットフォームです。
          私たちは、テクノロジーの力を活用して、市民と政治をつなぎ、より良い社会の実現に貢献します。
        </p>
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4">
            <RouterLink
              to="/login"
              className="px-6 py-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
            >
              はじめる
            </RouterLink>
            <RouterLink
              to="/kokkai-search"
              className="px-6 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-50 transition-colors"
            >
              国会議事録を探す
            </RouterLink>
          </div>
          <button
            className="text-sm text-blue-400 hover:underline"
            onClick={() => {
              const element = document.getElementById('about');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            詳しく見る
          </button>
        </div>
      </div>

      <div
        id="about"
        className="text-center pb-20 md:pb-36 space-y-8 md:space-y-14"
      >
        <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl leading-tight">
          近日公開予定
        </h2>
        <p className="text-gray-500">
          より詳しい情報は、まもなく公開いたします。
          <br />
          いち早く情報を受け取りたい方は、ぜひアカウントを作成してください。
        </p>
      </div>
    </div>
  );
};