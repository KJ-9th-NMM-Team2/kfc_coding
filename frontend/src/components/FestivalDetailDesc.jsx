export default function FestivalDetailDesc() {
    {/* 1 축제 소개 */ }
    return (
        <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 md:h-96 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-6xl mb-4">🏛️</div>
                        <p className="text-xl font-bold">2025 군산 국가유산 야행</p>
                        <p className="text-lg">축제 포스터</p>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">축제 소개</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        군산 국가유산 야행은 군산 원도심 국가유산 일원에서 총 4일간 진행하는 야간 국가유산 향유 행사입니다.
                        한여름 밤, 원도심 국가유산 일원에서 빛과 소리, 예술과 이야기로 채워진 9夜(야) 테마 프로그램이 진행됩니다.
                    </p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <h3 className="font-bold text-blue-800 mb-2">축제 특징</h3>
                        <ul className="space-y-2 text-blue-700">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                가족, 연인, 친구와 함께 즐기는 문화유산 체험
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                과거와 현재가 만나는 거리에서의 특별한 경험
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                문화유산 학습과 체험, 맛있는 먹거리와 공연
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}