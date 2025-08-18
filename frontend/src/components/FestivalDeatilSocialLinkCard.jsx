export default function FestivalDeatilSocialLinkCard() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">링크 & 소셜</h3>

            <div className="space-y-3">
                <a
                    href="https://gsnightculture.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                    <span className="text-2xl mr-3">🌐</span>
                    <div>
                        <div className="font-semibold text-blue-700">공식 홈페이지</div>
                        <div className="text-sm text-blue-600">gsnightculture.com</div>
                    </div>
                </a>

                <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                    <span className="text-2xl mr-3">📸</span>
                    <div>
                        <div className="font-semibold text-pink-700">인스타그램</div>
                        <div className="text-sm text-pink-600">@2025_gunsan_night_trip</div>
                    </div>
                </div>

                <button
                    onClick={() => window.open('https://map.kakao.com/link/to/군산 국가유산 야행,35.99019795680884,126.70986638828877', '_blank')}
                    className="w-full flex items-center justify-center p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                >
                    <span className="text-2xl mr-3">🗺️</span>
                    <span className="font-semibold text-yellow-700">길찾기</span>
                </button>
            </div>
        </div>
    )
}