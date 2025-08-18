export default function FestivalContactInfoCard() {
    return (
        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            <div className="mb-2">
                <span className="font-semibold">콘텐츠 관리:</span> 지역관광육성팀
            </div>
            <div>
                <span className="font-semibold">축제정보 문의:</span><br />
                <a href="mailto:festivalinfo@knto.or.kr" className="text-blue-600 hover:underline">
                    festivalinfo@knto.or.kr
                </a>
            </div>
        </div>
    )
}