export default function FestivalDeatilCard() {
    return (<div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">축제 정보</h3>

        <div className="space-y-4">
            <div>
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📅</span>
                    <span className="font-semibold text-gray-700">날짜</span>
                </div>
                <div className="ml-10 space-y-1">
                    {festivalDates.map((date, index) => (
                        <div key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded text-sm">
                            {date}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📍</span>
                    <span className="font-semibold text-gray-700">위치</span>
                </div>
                <p className="ml-10 text-gray-600 text-sm">
                    전북특별자치도 군산시 구영2길 43 (영화동)<br />
                    군산 원도심 국가유산 일원
                </p>
            </div>

            <div>
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">💰</span>
                    <span className="font-semibold text-gray-700">가격</span>
                </div>
                <div className="ml-10">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        무료
                    </span>
                </div>
            </div>

            <div>
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🏢</span>
                    <span className="font-semibold text-gray-700">주최</span>
                </div>
                <p className="ml-10 text-gray-600">군산시</p>
            </div>

            <div>
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📞</span>
                    <span className="font-semibold text-gray-700">문의</span>
                </div>
                <p className="ml-10 text-gray-600">063-453-2447</p>
            </div>
        </div>
    </div>
    )
}